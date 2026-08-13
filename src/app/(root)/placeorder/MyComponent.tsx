"use client";

// import Header from "~/components/header";
import { Suspense, useCallback, useEffect, useState } from "react";
// import { useSearchParams, usePathname } from "next/navigation";
import { useAuthContext } from "~/Context/AuthContext";
import type DataCart from "~/types/book";
import shippingOptions from "~/components/constants/shippingMethod";
import type ShippingType from "~/types/shipping";
import type TaxCalculationApiResponse from "~/types/taxCalculationApiResponse";
import type CreatePayloadBooksForTax from "~/types/createPayloadBooksForTax";
import socket from "~/utils/socket";
import { useToast } from "~/hooks/use-toast";
import type { placeOrderPayload } from "~/types/placeOrderPayload";
import { formatDate, formatDateTime } from "~/utils/dateAndTime";
import { useRouter } from "next/navigation";
import { generateOTP } from "~/utils/generateOTP";
import Button from "~/components/ui-components/Button";
import { Tabs } from "~/components/ui/tabs";
import Input from "~/components/ui-components/Input";
import Spinner from "~/components/spinner";
import type PayloadForTransactionLink from "~/types/payloadForTransactionLink";
import { ScrollArea } from "~/components/ui/scroll-area";
import CartItem from "~/components/ui-components/CartItem";
import AlertBox from "~/components/alertBox/alert";
import moment from "moment";
import TableRates from "~/components/constants/tablerates";
import { type ShippingRate } from "~/types/taxCalculationApiResponse";
import { Countries_States } from "~/components/constants/countries_states";
import {
  Select as RadixSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
// import { v4 as uuidv4, v5 as uuidv5 } from "uuid";

const MyComponent = () => {
  const {
    cartItems,
    checkoutData,
    getCheckoutFormData,
    removeAllCartItems,
    uuidLocal,
    setTransactionData,
    // setUUID,
    token,
    userInfo,
    // isLoggedIn,
    booknetCustomerId,
    removeCartItems,
    increaseCartItemQuantity,
  } = useAuthContext();
  const [items, setItems] = useState<DataCart[]>([]);
  const [newItems, setNewItems] = useState<DataCart[]>([]);
  const [shipping, setShipping] = useState<ShippingType | null>(
    shippingOptions[0] ?? null,
  );
  const [total, setTotal] = useState<number>(0);
  const [totalOriginal, setTotalOriginal] = useState<number>(0);
  const [discountLoader, setDiscountLoader] = useState(false);
  const { toast } = useToast();
  const [calculateLoader, setCalculateLoader] = useState<boolean>(false);
  // const [customerId, setCustomerId] = useState<number>();
  const [isOpenPaymentAlert, setIsOpenPaymentAlert] = useState(false);
  const [discountType, setDiscountType] = useState("Voucher");
  const [discountValue, setDiscountValue] = useState("");
  const [transactionData, setLocalTransactionData] =
    useState<transactionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [placeOrderLoader, setPlaceOrderLoader] = useState<boolean>(false);
  const [removeItem, setRemoveItem] = useState<DataCart | null>(null);
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState<boolean>(false);
  const [isOpenShippingAlert, setIsOpenShippingAlert] = useState<boolean>(false);
  const [collectCampus, setCollectCampus] = useState<string>("");
  // const [socketStatus, setSocketStatus] = useState(true);
  const [totalAfterCalculation, setTotalAfterCalculation] =
    useState<TaxCalculationApiResponse>();
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const router = useRouter();
  // const NAMESPACE = uuidv5('uniShop', uuidv5.URL);
  // const myuuid = uuidv4();
  // const gg = uuidv5("fareedAkbar10gmail.com", NAMESPACE);
  // console.log(gg)
  // load checkout from data
  useEffect(() => {
    const loadData = async () => {
      try {
        await getCheckoutFormData();
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };
    loadData().catch((error) => {
      console.error("Failed to load data in useEffect:", error);
    });
  }, []);

  // get and set cart items
  useEffect(() => {
    const itemsCart: DataCart[] =
      typeof cartItems === "string"
        ? (JSON.parse(cartItems) as DataCart[])
        : cartItems!;
    setItems(itemsCart);
  }, [cartItems]);

  // Clear voucher and reset totals when cart becomes empty
  useEffect(() => {
    if (items && items.length === 0) {
      if (typeof window !== "undefined") {
        const storedCart = localStorage.getItem("cart-items");
        if (storedCart) {
          try {
            const parsed = JSON.parse(storedCart) as DataCart[];
            if (Array.isArray(parsed) && parsed.length > 0) {
              // Cart items are still loading from localStorage, do not clear
              return;
            }
          } catch (e) {
            console.error("Failed to parse cart items:", e);
          }
        }
      }
      setNewItems([]);
      setTotal(0);
      setTotalOriginal(0);
      setVoucherInfo(null);
      setAppliedVoucher(null);
    }
  }, [items]);

  // get shipping Method
  // useEffect(() => {
  //   if (!checkoutData) return;
  //   const shippnig: ShippingType | null =
  //     shippingOptions.find(
  //       (item) => item.type == checkoutData?.shippingMethod,
  //     ) ?? null;

  //   setShipping(shippnig);
  // }, [checkoutData, shippingOptions]);

  const mergedArray = items.map((item1) => {
    const matchingItem = totalAfterCalculation?.items.find(
      (item2) => item2.item_id === item1.item_id,
    );

    if (matchingItem) {
      return {
        ...item1,
        final_price_including_tax: matchingItem.final_price_including_tax,
        discounts: matchingItem.discounts ?? {},
      };
    }
    return item1;
  });

  useEffect(() => {
    if (!totalAfterCalculation) return;

    const amount = shipping?.amount ?? 0;
    setTotal(amount + totalAfterCalculation?.final_price_including_tax);
    setTotalOriginal(amount + totalAfterCalculation?.original_price);
    const x = mergedArray;
    setNewItems(x);
  }, [totalAfterCalculation]);

  const createItemsPayload = (
    dataArray1: DataCart[],
  ): CreatePayloadBooksForTax[] => {
    return dataArray1.map((book) => ({
      price:
        book.selected_variation?.items_variable_items_sale_price ??
        book.item_sale_price,
      quantity: book.quantity,
      item_id: book.item_id,
      cat_id: book.category,
      textbook_id: book.book_id ?? null,
      is_textbook: book.book_id ? 1 : 0,
      variationId: book.selected_variation?.items_variable_items_id ?? null,
      variable_item: book.selected_variation?.items_variable_items_id ? 1 : 0,
      premium_upgrades_CPM: [],
      is_deal: 0,
      deal_id: null,
      apply_zero_discount: 0,
      discountable_cat: book.category_detail?.discountable_cat ?? 0,
      discountable_item: book.discountable_item ?? 0,
      discounts: book.discounts ?? null,
      tax_exempted: book.tax_exempted ?? 0,
    }));
  };

  interface ApiResponse {
    status: boolean;
    data: TaxCalculationApiResponse;
    message: string;
  }

  const fetchData = async (requestOptions: CreatePayloadBooksForTax[]) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/calculate?check_availability=0`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PASSKEY_TOKEN}`,
          },
          body: JSON.stringify({
            items: requestOptions,
            member_id: checkoutData?.customer_id ?? null,
            customer_type_id: checkoutData?.customer_type ?? null,
          }),
        },
      );

      const result: ApiResponse = (await response.json()) as ApiResponse;

      // Check if result has the expected structure
      if (result?.status) {
        setTotalAfterCalculation(result?.data);

      } else {
        console.error("Unexpected result structure fetchData:", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setCalculateLoader(false);
    }
  };

  interface ApiResponseShippingRates {
    status: boolean;
    data: ShippingRate[];
    message: string;
  }

  const fetchShippingRates = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/shipping_rates`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PASSKEY_TOKEN}`,
          },

        },
      );

      const result: ApiResponseShippingRates = (await response.json()) as ApiResponseShippingRates;

      // Check if result has the expected structure
      if (result?.status) {
        setShippingRates(result?.data);

      } else {
        console.error("Unexpected result structure fetchData:", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setCalculateLoader(false);
    }
  };

  useEffect(() => {
    // toast({
    //   title: "Scheduled: Catch up",
    //   description: "Friday, February 10, 2023 at 5:57 PM",
    // })

    if (!checkoutData) return;

    const loadData = async () => {
      try {
        if (!items) return;
        const itemsPayload = createItemsPayload(items);

        if (!itemsPayload[0]) return;
        setCalculateLoader(true);

        await fetchData(itemsPayload);
        await fetchShippingRates();
      } catch (error) {
        console.error("Failed to load data:", error);
        setCalculateLoader(false);
      }
    };
    loadData().catch((error) => {
      console.error("Failed to load data in useEffect:", error);
      setCalculateLoader(false);
    });
  }, [items, uuidLocal, userInfo]);

  type transactionResponse = {
    amount: number | null;
    customer_id: number | null;
    link: string;
    unique_id: number | null;
    order_id?: number | null;
    tracking_id?: number | null;
  };

  interface ApiResponseForTransactionLink {
    status: boolean;
    data: transactionResponse;
    message: string;
  }

  const getLinkForPayment = async (
    requestOptions: PayloadForTransactionLink,
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PASSKEY_IPOS}api/v1/ipos/payments/insertPaymentsDetailsResponsive`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PASSKEY_TOKEN}`,
          },
          body: JSON.stringify(requestOptions),
        },
      );

      const result: ApiResponseForTransactionLink =
        (await response.json()) as ApiResponseForTransactionLink;

      if (result?.status) {
        setLocalTransactionData(result.data);
        setIsOpenPaymentAlert(true);

        setLoading(true);

        // window.open(result.data.link);
        console.log(result, "result");
      } else {
        console.error("Unexpected result structure getLinkForPayment:", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setCalculateLoader(false);
    }
  };
  useEffect(() => {
    if (isOpenPaymentAlert) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = ""; // Restore scroll
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpenPaymentAlert]);
  const handlePlaceOrder = async () => {
    if (shipping?.value !== "free") {
      const disabledItems = items?.filter((item) => item.disable_shipping === 1) || [];
      if (disabledItems.length > 0) {
        setIsOpenShippingAlert(true);
        return;
      }
    } else {
      if (!collectCampus) {
        toast({
          title: "Campus Required",
          variant: "destructive",
          description: "Please choose a campus for collection.",
        });
        return;
      }
    }
    setPlaceOrderLoader(true);

    const payable = appliedVoucher ? Math.max(0, total - appliedVoucher.appliedTotal) : total;

    if (payable === 0) {
      try {
        await placeOrderApi(null);
      } catch (error) {
        console.error("Failed to place order:", error);
      } finally {
        setPlaceOrderLoader(false);
      }
      return;
    }

    const x = {
      customer_id: checkoutData?.customer_id,
      guest_id: checkoutData?.customer_id ? null : checkoutData?.uuid,
      amount: payable,
    };

    try {
      await getLinkForPayment(x);
      // placeOrderApi(null);
      console.log(x);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
    setPlaceOrderLoader(false);
  };

  type socketResponse = {
    customer_id: number;
    message: string;
    status: boolean;
    transaction_id: number;
  };

  interface dataresponse {
    data: socketResponse;
  }

  const placeOrderApiCall = async (requestOptions: placeOrderPayload) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/orders/web`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PASSKEY_TOKEN}`,
          },
          body: JSON.stringify(requestOptions),
        },
      );

      const result: ApiResponseForTransactionLink =
        (await response.json()) as ApiResponseForTransactionLink;

      // Check if result has the expected structure
      if (result?.status) {
        toast({
          title: "Order Successful",
          variant: "success",
          description: "Your order has been processed successfully.",
        });

        try {
          await removeAllCartItems();
          if (typeof window !== "undefined") {
            sessionStorage.removeItem("APPLIED_VOUCHER_INFO");
          }
          const x = {
            transaction_id: requestOptions.transaction_id,
            order_id: result?.data?.order_id,
            tracking_id: result.data?.tracking_id,
            total_order_price: totalOriginal,
            discounted_price: total,
            paid_by_voucher: appliedVoucher?.appliedTotal ?? 0,
          };
          await setTransactionData(x);
        } catch (error) {
          console.error("Failed to load data:", error);
        }
        router.push("/order-confirmed");
      } else {
        toast({
          title: "Payment Declined",
          variant: "destructive",
          description:
            "Unfortunately, your order could not be processed. Please try again.",
        });
        console.error("Unexpected result structure placeOrderApiCall:", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setCalculateLoader(false);
    }
  };

  async function convertPayload() {
    // Check if inputArray is empty

    if (!Array.isArray(newItems) || newItems.length === 0) {
      console.warn("Input array is empty or not an array:", newItems);
      return [];
    }
    const currentCusId = userInfo?.customer_id ?? checkoutData?.customer_id ?? null;
    let runningVoucherValue = appliedVoucher?.voucherValue ?? 0;

    const x = newItems?.map((item) => {
      // Find if this item has voucher applied
      const itemVoucherAmount = appliedVoucher?.allocation[item.item_id];
      const applied_vouchers = itemVoucherAmount && itemVoucherAmount > 0
        ? [
          {
            cus_id: currentCusId,
            code: appliedVoucher.code,
            total_order_price: null,
            final_order_price: null,
            voucher_value: Number(runningVoucherValue.toFixed(2)),
            used_value: itemVoucherAmount,
            order_id: null,
            discount_unit: appliedVoucher.discUnit
          }
        ]
        : undefined;

      if (itemVoucherAmount && itemVoucherAmount > 0) {
        runningVoucherValue -= itemVoucherAmount;
      }

      console.log("item", item)
      return {
        item_id: item.item_id,
        deal_id: null,
        variable_id: item.selected_variation?.items_variable_items_id ?? null,
        quantity_item: item.quantity,
        // quantity_item:  item.stock?.quantity > 0 &&  item.quantity > item.stock?.quantity ? item.stock?.quantity : item.quantity,
        // back_order_quantity: item.stock?.quantity > 0 &&  item.quantity > item.stock?.quantity ? item.quantity - item.stock?.quantity : 0,
        back_order_quantity: 0,
        notes: "",
        is_deal: null,
        item_price: item.selected_variation?.items_variable_items_id
          ? item.selected_variation?.items_variable_items_sale_price
          : item.item_sale_price,
        discounted_price: item.final_price_including_tax ?? null,
        deal_items: [],
        premium_upgrades: [],
        type: "Normal",
        stock_id: item?.stock?.stock_id ?? 0,
        discounts: item.discounts,
        ...(applied_vouchers ? { applied_vouchers } : {})
      };
    });

    console.log("x", x)

    return x;
  }

  const placeOrderApi = async (id: number | null) => {
    setLocalTransactionData(null);
    const date = new Date();
    const outlet = process.env.NEXT_PUBLIC_PASSKEY_OUTLET ?? "";
    const x = {
      order_type: shipping?.value == "free" ? 1 : 2,
      online_order_type: 1,
      outlet_id: parseInt(outlet),
      tracking_id: generateOTP(12).toString(),
      order_status: 3,
      completed_date: formatDateTime(date),
      started: formatDateTime(date),
      details: "Order Detail| UniShop",
      kitchen_comments: "",
      waiter_id: null,
      table_served: null,
      total_order_price: totalOriginal,
      tab_limit: 0.0,
      final_price_including_tax: total,
      eft_pos_details: {
        card_type: "N.A.",
        card_pan: "N.A.",
        ref_no: "N.A.",
      },
      member_id: checkoutData?.customer_id ?? null,
      transaction_id: id !== null ? id.toString() : null,
      booknet_customer_id: booknetCustomerId,
      // guest: checkoutData?.uuid ? checkoutData?.uuid : null,
      order_items: await convertPayload(),
      address_id: checkoutData?.address?.[0]?.address_id ?? null,
      delivery_charges: shipping?.amount ?? 0,
      collect_campus: shipping?.value === "free" ? collectCampus : "",
    };
    try {
      console.log(x);
      await placeOrderApiCall(x);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  // useEffect(() => {
  //   if (uuidLocal) return;
  //   const addUUid = async () => {
  //     try {
  //       setCalculateLoader(true);
  //       await setUUID(myuuid);
  //     } catch (error) {
  //       console.error("Failed to load data:", error);
  //     }
  //   };
  //   addUUid().catch((error) => {
  //     console.error("Failed to load data in useEffect:", error);
  //   });
  // }, [uuidLocal]);

  useEffect(() => {
    console.log(checkoutData, "checkoutData");
    if (!checkoutData?.uuid && !checkoutData?.customer_id) return;
    socket.disconnect();
    socket.connect();
    const connectHandler = () => {
      console.log("Connected to server", socket.id);
      console.log(
        "Connected to Id",
        checkoutData?.customer_id ?? checkoutData?.uuid,
      );

      socket.emit(
        "/studentHandshake",
        {
          student_id: checkoutData?.customer_id ?? checkoutData?.uuid,
        },
        () => {
          console.log("studentHandshake");
        },
      );
    };

    socket.on("connect", connectHandler);
    return () => {
      socket.off("connect", connectHandler);
      socket.disconnect();
    };
  }, [checkoutData]);

  const PaymentStatus = useCallback(() => {
    if (!checkoutData?.uuid && !checkoutData?.customer_id) return;

    console.log("Payment Socket");

    const handlePaymentStatus = async (dat: dataresponse) => {
      const { data } = dat;
      console.log("PaymentStatus", data);
      console.log("PaymentStatus status", data?.status);

      if (data.status) {
        setIsOpenPaymentAlert(false);

        try {
          await placeOrderApi(data.transaction_id);
        } catch (error) {
          console.error("Failed to load data:", error);
          console.error("Failed to place order");
        }
      } else {
        toast({
          title: "Payment Declined",
          variant: "destructive",
          description:
            "Unfortunately, your payment could not be processed. Please try again.",
        });
        setIsOpenPaymentAlert(false);
      }
      setLocalTransactionData(null);
    };

    socket.on("paymentStatus", handlePaymentStatus);

    return () => {
      socket.off("paymentStatus", handlePaymentStatus);
    };
  }, [checkoutData, transactionData]);

  useEffect(() => {
    if (!checkoutData?.uuid && !checkoutData?.customer_id) return;
    console.log("Payment socket initiated");
    const cleanupPaymentStatus = PaymentStatus();

    return cleanupPaymentStatus;
  }, [checkoutData, transactionData]);

  const closeModal = () => {
    setIsOpenPaymentAlert(false);
  };

  const onChange = (val: ShippingType) => {
    if (val.value !== "free") {
      const disabledItems = items?.filter((item) => item.disable_shipping === 1) || [];
      if (disabledItems.length > 0) {
        setIsOpenShippingAlert(true);
        // Force the shipping back to Click and Collect ("free")
        setShipping({
          value: "free",
          amount: 0,
          type: "Click and Collect.",
          label: "Click and Collect at UniShop service desk.",
        });
        return;
      }
      setCollectCampus("");
    }

    setShipping(val);
    if (Number(val.amount) > 0) {
      setTotal(Number(val.amount) + total);
      setTotalOriginal(Number(val.amount) + totalOriginal);
    } else {
      setTotal(totalAfterCalculation?.final_price_including_tax ?? total - 10);
      setTotalOriginal(
        totalAfterCalculation?.original_price ?? totalOriginal - 10,
      );
    }
  };

  const tabs = [
    {
      title: "Voucher",
      value: "Voucher",
      content: <div />,
    },
    {
      title: "Coupon",
      value: "Coupon",
      content: <div />,
    },
  ];

  type discountVoucherType = {
    code: string;
    total_order_price: number;
    order_id: null;
    till: number;
    cus_id: number;
    membership: null;
    outlet_id?: number;
  };
  type discountCouponType = {
    cus_id: number;
    code: string;
    // "till" : 1,
    outlet_id?: number;
  };

  type discount = {
    verify: boolean;
  };

  type discountResponse = {
    status: boolean;
    message: string;
    data: discount;
  };

  const getDiscounts = async (
    requestOptions: discountVoucherType | discountCouponType,
  ) => {
    try {
      const response = await fetch(
        discountType == "Voucher"
          ? `${process.env.NEXT_PUBLIC_PASSKEY_IPOS}api/v1/ipos/discounts/verifyVoucher`
          : `${process.env.NEXT_PUBLIC_PASSKEY_IPOS}api/v1/ipos/discounts/verifyCoupon`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PASSKEY_TOKEN}`,
          },
          body: JSON.stringify(requestOptions),
        },
      );
      setDiscountLoader(true);
      const result: discountResponse =
        (await response.json()) as discountResponse;

      if (result?.status) {
        // window.open(result.data.link);
        console.log(result);
      } else {
        toast({
          title: "discount Declined",
          variant: "destructive",
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setDiscountLoader(false);
    }
  };

  const handleclick = () => {
    const outlet = process.env.NEXT_PUBLIC_PASSKEY_OUTLET ?? "";
    if (discountValue.trim().length > 0) {
      if (discountType == "Voucher") {
        const xData = {
          code: discountValue.trim(),
          total_order_price: total,
          order_id: null,
          till: 0,
          cus_id: userInfo?.customer_id ?? 0,
          membership: null,
          outlet_id: parseInt(outlet),
        };
        getDiscounts(xData).catch((err) => console.log(err));
      } else {
        const xData = {
          cus_id: userInfo?.customer_id ?? 0,
          code: discountValue.trim(),
          // "till" : 1,
          outlet_id: parseInt(outlet),
        };
        getDiscounts(xData).catch((err) => console.log(err));
      }
    } else {
      toast({
        title: "Invalid code",
        variant: "destructive",
        description: "Please Enter code",
      });
    }
  };

  const onChangeQuantity = async (id: number, number: number) => {
    console.log(id, number);
    await increaseCartItemQuantity(id, number);
  };

  const handleIncrease = async (id: number, number: number) => {
    await increaseCartItemQuantity(id, number);
  };

  const handleDecrease = async (id: number, number: number) => {
    await increaseCartItemQuantity(id, number);
  };

  const handleRemoveFromCart = async (item: DataCart) => {
    if (item) {
      try {
        await removeCartItems(item);
        setIsOpenDeleteAlert(false);
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
      }
    }
  };
  const checkNewPrice = (id: number) => {
    const newPrice = totalAfterCalculation?.items.filter(
      (item) => item.item_id == id,
    );
    if (newPrice?.[0]) {
      return newPrice[0].final_price_including_tax;
    } else {
      return 0;
    }
  };
  const checkOldPrice = (id: number) => {
    const newPrice = totalAfterCalculation?.items.filter(
      (item) => item.item_id == id,
    );
    if (newPrice?.[0]) {
      return newPrice[0].original_value;
    } else {
      return 0;
    }
  };
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  // Voucher Integration Interfaces
  interface VoucherCategory {
    id?: number;
    category_id?: number;
    cat_id?: number;
  }

  interface VoucherData {
    voucher_assign_id: number;
    voucher_id: number;
    all_members: number;
    all_non_members: number;
    all_staff: number;
    all_guests: number;
    cus_id: number | null;
    voucher_code: string;
    disc_id: number;
    valid_until: string | null;
    description: string;
    media_id: number | null;
    item_check: number;
    is_gift: number;
    payment_method: string;
    is_exchange: number;
    title: string;
    mem_disc_value: number;
    disc_value: number;
    guest_disc_value: number;
    staff_disc_value: number;
    disc_unit: number;
    valid_from: string | null;
    active_status: number;
    outlet_id: number;
    is_developer: number;
    type_id: number | null;
    receipt_note: string | null;
    categories: VoucherCategory[];
  }

  interface VerifyVoucherApiResponse {
    status: boolean;
    message: string;
    data: VoucherData;
  }

  interface VoucherLog {
    log_id: number;
    dl_cus_id: number | null;
    dl_used: number;
    dl_value: number;
    dl_used_value: number;
    dl_voucher_code: string;
    order_id: number | null;
    last_updated: string | null;
    order_items_id: number | null;
    back_order_items_id: number | null;
  }

  interface GetVoucherLogsApiResponse {
    status: boolean;
    message: string;
    data: VoucherLog[];
  }

  interface MembershipCheckResponse {
    status: boolean;
    data?: {
      membership: number;
    };
  }

  // Voucher Integration States
  const [voucherCodeInput, setVoucherCodeInput] = useState("");
  const [isOpenVoucherModal, setIsOpenVoucherModal] = useState(false);
  const [voucherLoading, setVoucherLoading] = useState(false);
  const [voucherInfo, setVoucherInfo] = useState<{
    code: string;
    voucherValue: number;
    remainingValue: number;
    categories: VoucherCategory[];
    discUnit: number;
  } | null>(null);

  const [appliedVoucher, setAppliedVoucher] = useState<{
    code: string;
    voucherValue: number;
    remainingValue: number;
    appliedTotal: number;
    allocation: Record<number, number>;
    discUnit: number;
  } | null>(null);

  // Load voucherInfo from sessionStorage on mount (SSR-safe)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("APPLIED_VOUCHER_INFO");
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as {
            code: string;
            voucherValue: number;
            remainingValue: number;
            categories: VoucherCategory[];
            discUnit: number;
          };
          setVoucherInfo(parsed);
        } catch (e) {
          console.error("Failed to parse saved voucher info:", e);
        }
      }
    }
  }, []);

  // Save voucherInfo to sessionStorage whenever it changes (SSR-safe)
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (voucherInfo) {
        sessionStorage.setItem("APPLIED_VOUCHER_INFO", JSON.stringify(voucherInfo));
      } else {
        sessionStorage.removeItem("APPLIED_VOUCHER_INFO");
      }
    }
  }, [voucherInfo]);

  const isCategoryEligible = (item: DataCart, categories: VoucherCategory[]): boolean => {
    if (!categories || categories.length === 0) return true;
    const itemCat = item.category !== undefined && item.category !== null ? Number(item.category) : null;
    const detailCat = item.category_detail?.id !== undefined && item.category_detail?.id !== null ? Number(item.category_detail.id) : null;

    return categories.some((cat) => {
      let catId: number | null = null;
      if (cat && typeof cat === "object") {
        const temp = cat.id ?? cat.category_id ?? cat.cat_id;
        if (temp !== undefined && temp !== null) {
          catId = Number(temp);
        }
      } else if (typeof cat === "number" || typeof cat === "string") {
        catId = Number(cat);
      }

      if (catId === null || isNaN(catId)) return false;
      return (itemCat !== null && itemCat === catId) || (detailCat !== null && detailCat === catId);
    });
  };

  const calculateVoucherAllocation = (
    currentItems: DataCart[],
    voucherCode: string,
    voucherValue: number,
    voucherRemaining: number,
    categories: VoucherCategory[],
    discUnit: number
  ) => {
    let tempRemaining = voucherRemaining;
    const allocation: Record<number, number> = {};
    let appliedTotal = 0;

    for (const item of currentItems) {
      if (tempRemaining <= 0) break;

      if (isCategoryEligible(item, categories)) {
        const itemTotal = Number(item.final_price_including_tax ?? 0) ||
          (Number(item.selected_variation?.items_variable_items_sale_price ?? item.item_sale_price ?? 0) * item.quantity);

        if (itemTotal > 0) {
          const appliedToItem = Math.min(tempRemaining, itemTotal);
          allocation[item.item_id] = appliedToItem;
          tempRemaining -= appliedToItem;
          appliedTotal += appliedToItem;
        }
      }
    }

    return {
      allocation,
      appliedTotal,
    };
  };

  useEffect(() => {
    if (!voucherInfo || !newItems || newItems.length === 0) {
      setAppliedVoucher(null);
      return;
    }

    const { allocation, appliedTotal } = calculateVoucherAllocation(
      newItems,
      voucherInfo.code,
      voucherInfo.voucherValue,
      voucherInfo.remainingValue,
      voucherInfo.categories,
      voucherInfo.discUnit
    );

    setAppliedVoucher({
      code: voucherInfo.code,
      voucherValue: voucherInfo.voucherValue,
      remainingValue: voucherInfo.remainingValue,
      appliedTotal,
      allocation,
      discUnit: voucherInfo.discUnit,
    });
  }, [newItems, voucherInfo]);

  const handleApplyVoucher = async () => {
    if (!voucherCodeInput.trim()) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Please enter a voucher code",
      });
      return;
    }

    setVoucherLoading(true);
    const code = voucherCodeInput.trim();
    const currentCusId = userInfo?.customer_id ?? checkoutData?.customer_id ?? null;
    const outlet = process.env.NEXT_PUBLIC_PASSKEY_OUTLET ?? "";
    const outletId = parseInt(outlet);

    try {
      // Step 1: Check membership
      let hasMembership = 0;
      if (currentCusId) {
        try {
          const memRes = await fetch(
            `${process.env.NEXT_PUBLIC_PASSKEY_IPOS}api/v1/ipos/discounts/membershipCheck`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_PASSKEY_TOKEN}`,
              },
              body: JSON.stringify({ customer_id: currentCusId }),
            }
          );
          const memData = (await memRes.json()) as MembershipCheckResponse;
          if (memData?.status && memData?.data?.membership === 1) {
            hasMembership = 1;
          }
        } catch (err) {
          console.error("Failed to check membership:", err);
        }
      }

      // Step 2: Verify Voucher
      const verifyPayload = {
        code,
        total_order_price: total,
        order_id: null,
        till: 0,
        cus_id: currentCusId,
        membership: hasMembership === 1 ? 1 : null,
        outlet_id: isNaN(outletId) ? 229 : outletId,
      };

      const verifyRes = await fetch(
        `${process.env.NEXT_PUBLIC_PASSKEY_IPOS}api/v1/ipos/discounts/verifyVoucher`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PASSKEY_TOKEN}`,
          },
          body: JSON.stringify(verifyPayload),
        }
      );
      const verifyData = (await verifyRes.json()) as VerifyVoucherApiResponse;

      if (!verifyData?.status || !verifyData?.data) {
        toast({
          title: "Voucher Declined",
          variant: "destructive",
          description: verifyData?.message ?? "Invalid voucher code.",
        });
        setVoucherLoading(false);
        return;
      }

      const vData = verifyData.data;

      // Check active status
      if (vData.active_status !== 1) {
        toast({
          title: "Voucher Declined",
          variant: "destructive",
          description: "Voucher is inactive.",
        });
        setVoucherLoading(false);
        return;
      }

      // Check date range
      const now = new Date();
      const fromDate = vData.valid_from ? new Date(vData.valid_from) : null;
      const untilDate = vData.valid_until ? new Date(vData.valid_until) : null;

      if (fromDate && now < fromDate) {
        toast({
          title: "Voucher Declined",
          variant: "destructive",
          description: "Voucher is not active yet.",
        });
        setVoucherLoading(false);
        return;
      }

      if (untilDate && now > untilDate) {
        toast({
          title: "Voucher Declined",
          variant: "destructive",
          description: "Voucher has expired.",
        });
        setVoucherLoading(false);
        return;
      }

      // Check Customer Assignment & Type eligibility
      let isEligible = false;
      let baseValue = 0;
      let isGuestCase = false;

      if (vData.cus_id !== null) {
        if (Number(currentCusId) === Number(vData.cus_id)) {
          isEligible = true;
          baseValue = (vData.mem_disc_value ?? vData.disc_value ?? 0);
        } else {
          toast({
            title: "Voucher Declined",
            variant: "destructive",
            description: "This voucher is assigned to another customer.",
          });
          setVoucherLoading(false);
          return;
        }
      } else if (vData.all_members === 1 && vData.all_non_members === 1) {
        isEligible = true;
        baseValue = hasMembership === 1 ? (vData.mem_disc_value ?? vData.disc_value ?? 0) : (vData.disc_value ?? 0);
      } else if (vData.all_guests === 1) {
        isEligible = true;
        baseValue = vData.guest_disc_value ?? vData.disc_value ?? 0;
        isGuestCase = true;
      } else {
        // Fallback checks for members or non-members
        if (hasMembership === 1 && vData.all_members === 1) {
          isEligible = true;
          baseValue = vData.mem_disc_value ?? vData.disc_value ?? 0;
        } else if (hasMembership !== 1 && vData.all_non_members === 1) {
          isEligible = true;
          baseValue = vData.disc_value ?? 0;
        }
      }

      if (!isEligible) {
        toast({
          title: "Voucher Declined",
          variant: "destructive",
          description: "You are not eligible for this voucher.",
        });
        setVoucherLoading(false);
        return;
      }

      // Step 3: Get Voucher Logs
      const logsRes = await fetch(
        `${process.env.NEXT_PUBLIC_PASSKEY_IPOS}api/v1/ipos/discounts/getVoucherLogs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PASSKEY_TOKEN}`,
          },
          body: JSON.stringify({ code }),
        }
      );
      const logsData = (await logsRes.json()) as GetVoucherLogsApiResponse;
      const logsList = (logsData?.status && Array.isArray(logsData?.data)) ? logsData.data : [];

      let usedSum = 0;
      if (isGuestCase) {
        // Subtract used values by all customers
        usedSum = logsList.reduce((acc: number, log: VoucherLog) => acc + (Number(log.dl_used_value) || 0), 0);
      } else {
        // Subtract used values by this customer
        usedSum = logsList
          .filter((log: VoucherLog) => currentCusId !== null && Number(log.dl_cus_id) === Number(currentCusId))
          .reduce((acc: number, log: VoucherLog) => acc + (Number(log.dl_used_value) || 0), 0);
      }

      const remaining = baseValue - usedSum;

      if (remaining <= 0) {
        toast({
          title: "Voucher Declined",
          variant: "destructive",
          description: "This voucher has no remaining value.",
        });
        setVoucherLoading(false);
        return;
      }

      setVoucherInfo({
        code,
        voucherValue: baseValue,
        remainingValue: remaining,
        categories: vData.categories ?? [],
        discUnit: vData.disc_unit ?? 1,
      });

      toast({
        title: "Voucher Applied",
        variant: "success",
        description: `Successfully applied voucher. Remaining value: $${remaining.toFixed(2)}`,
      });

      setIsOpenVoucherModal(false);
      setVoucherCodeInput("");

    } catch (err) {
      console.error("Voucher application error:", err);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to verify or apply voucher. Please try again.",
      });
    } finally {
      setVoucherLoading(false);
    }
  };

  function getShippingPrice(

    country_name: string,
    packageWeight: number
  ): number | null {

    const code = Countries_States.find((country) => country?.name == country_name);
    const countryRates = shippingRates?.filter((rate) => rate.country == code?.iso3)
      .sort((a, b) => a.weight_and_above - b.weight_and_above);
    for (let i = countryRates.length - 1; i >= 0; i--) {
      const rate = countryRates[i];
      if (rate && packageWeight >= rate.weight_and_above) {
        const num = Number(rate.shipping_price); // convert to number first
        if (isNaN(num)) return null; // guard against bad data
        return Number(num.toFixed(2));
      }
    }

    return null; // No rate found
  }
  const calculateWeight = () => {
    let totalWeight = 0;
    items.forEach((item) => {
      if (item?.selected_variation?.weight && item.weighable == 1) {
        totalWeight +=
          parseFloat(item?.selected_variation?.weight) * item.quantity;
      } else if (item?.weight && item.weighable == 1) {
        totalWeight += parseFloat(item?.weight) * item.quantity;
      }
    });
    return totalWeight;
  };

  return (
    <div>
      <main className="min-h-screen justify-center pb-8 dark:from-slate-700 dark:to-slate-700">
        <div className="z-10 px-6">
          <div className="mt-3 grid justify-center gap-12 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 lg:gap-5 xl:grid-cols-5">
            <div className="flex flex-col lg:col-span-3 xl:col-span-3">
              <h2 className="mb-2 mt-6 text-xl font-bold text-neutral-800 dark:text-neutral-200">
                Payment Method
              </h2>
              <div className="rounded-xl border border-gray-500 bg-white p-4 shadow dark:bg-slate-800">
                <div className="flex flex-col justify-between lg:flex-row">
                  <div>
                    <span className="text-md mt-2">Credit Card - eWAY</span>
                    <div className="mt-3 flex flex-col">
                      {/* Address */}
                      <div className="mt-4">
                        <span className="pr-1 font-medium text-red-500">
                          Address:
                        </span>
                        <span className="block">
                          {checkoutData?.address?.[0]?.address}
                        </span>

                        {checkoutData?.address?.[0]?.country ? (
                          <span className="block">
                            {checkoutData?.address?.[0]?.country},{" "}
                            {checkoutData?.address?.[0]?.city},{" "}
                            {checkoutData?.address?.[0]?.state},{" "}
                            {checkoutData?.address?.[0]?.postal_code}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>

                      {/* Phone Number */}
                      <div className="mt-4">
                        <span className="pr-1 font-medium text-red-500">
                          Phone Number:
                        </span>
                        <span className="block">
                          +{checkoutData?.address?.[0]?.phone_number}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 w-full lg:w-64">
                    {appliedVoucher ? (
                      <div className="flex flex-col gap-2 rounded-xl border border-green-500 bg-green-50 p-4 dark:bg-green-950/20 dark:border-green-500/30">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                            Voucher Applied
                          </span>
                          <button
                            onClick={() => {
                              setVoucherInfo(null);
                              setAppliedVoucher(null);
                              toast({
                                title: "Voucher Removed",
                                description: "The applied voucher has been removed.",
                              });
                            }}
                            className="text-xs font-semibold text-red-500 hover:text-red-700 underline"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="text-xs text-neutral-600 dark:text-neutral-300">
                          <p className="font-mono font-semibold">Code: {appliedVoucher.code}</p>
                          <p className="mt-1">Applied: ${appliedVoucher.appliedTotal.toFixed(2)}</p>
                          <p>Remaining: ${(appliedVoucher.remainingValue - appliedVoucher.appliedTotal).toFixed(2)} / ${appliedVoucher.remainingValue.toFixed(2)}</p>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setIsOpenVoucherModal(true)}
                        className="w-full"
                        title="Add Voucher"
                      />
                    )}

                  </div>
                </div>
                {checkoutData?.address?.[0]?.country_code === "AUS" ? (
                  <div className="mb-4 mt-4">
                    {shipping?.value === "free" && (
                      <div className="mb-6 animate-in fade-in slide-in-from-top-1 duration-200 w-full ">
                        <label className="block text-sm font-bold text-red-500  mb-2">
                          Select Collection Campus
                        </label>
                        <RadixSelect
                          value={collectCampus}
                          onValueChange={(val) => setCollectCampus(val)}
                        >
                          <SelectTrigger className="w-full border border-gray-500 bg-white p-3 text-sm text-neutral-800 shadow-sm dark:border-white/30 dark:bg-slate-800 dark:text-neutral-200 focus:border-red-500 focus:ring-red-400">
                            <SelectValue placeholder="-- Choose a Campus --" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-slate-800 border border-gray-500 dark:border-white/30 text-neutral-800 dark:text-neutral-200">
                            <SelectItem value="wollongong">Wollongong Campus</SelectItem>
                            <SelectItem value="begaValley">Bega Valley Campus</SelectItem>
                            <SelectItem value="eurobodalla">Eurobodalla Campus</SelectItem>
                            <SelectItem value="shoalhaven">Shoalhaven Campus</SelectItem>
                            <SelectItem value="highlands">Highlands Campus</SelectItem>
                            <SelectItem value="sutherland">Sutherland Campus</SelectItem>
                            <SelectItem value="sydneyCBD">Sydney CBD Campus</SelectItem>
                            <SelectItem value="liverpool">Liverpool Campus</SelectItem>
                          </SelectContent>
                        </RadixSelect>
                      </div>
                    )}
                    <p className="mb-2 font-bold">Shipping Method</p>
                    <div className="grid-col-1 grid gap-4 lg:grid-cols-2 lg:gap-10 lg:px-10">
                      {shippingOptions.map((option) => (
                        <div
                          key={option.value}
                          className={`rounded-3xl border border-gray-500 dark:border-white/30 ${shipping?.value === option.value
                            ? "bg-[#F2FFE4] dark:bg-green-500/20"
                            : ""
                            } p-4`}
                        >
                          <label className="cursor-pointer">
                            <input
                              type="radio"
                              value={option.value}
                              checked={shipping?.value === option.value}
                              onChange={() => onChange(option)}
                              className="accent-green-500"
                              style={{ height: "20px", width: "20px" }}
                            />
                            <div className="text-center text-3xl font-medium">
                              {option.amount === 0
                                ? "Free"
                                : "$" + option.amount}
                            </div>

                            <div className="my-3 text-center text-xl font-medium capitalize">
                              {option.type?.toLowerCase()}
                            </div>

                            <div
                              className={`flex flex-col items-start ${option.amount === 0 ? "gap-4" : "gap-1"
                                }`}
                            >
                              {option.label && (
                                <div className="mt-2 text-left text-lg">
                                  {option.label}
                                </div>
                              )}
                              {option.label2 && (option.value !== "free" || collectCampus === "wollongong") && (
                                <div className="text-left">{option.label2}</div>
                              )}
                              {option.label3 && (
                                <div className="text-left text-sm">
                                  {option.label3}
                                </div>
                              )}
                              {option.label4 && (
                                <div className="text-left text-sm">
                                  {option.label4}
                                </div>
                              )}
                              {option.label5 && (
                                <div className="text-left text-sm">
                                  {option.label5}
                                </div>
                              )}
                              {option.label6 && (
                                <div className="text-left text-sm">
                                  {option.label6}
                                </div>
                              )}
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 mt-4">
                    {shipping?.value === "free" && (
                      <div className="mb-6 animate-in fade-in slide-in-from-top-1 duration-200 w-full ">
                        <label className="block text-sm font-bold text-red-500  mb-2">
                          Select Collection Campus
                        </label>
                        <RadixSelect
                          value={collectCampus}
                          onValueChange={(val) => setCollectCampus(val)}
                        >
                          <SelectTrigger className="w-full border border-gray-500 bg-white p-3 text-sm text-neutral-800 shadow-sm dark:border-white/30 dark:bg-slate-800 dark:text-neutral-200 focus:border-red-500 focus:ring-red-400">
                            <SelectValue placeholder="-- Choose a Campus --" />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-slate-800 border border-gray-500 dark:border-white/30 text-neutral-800 dark:text-neutral-200">
                            <SelectItem value="wollongong">Wollongong Campus</SelectItem>
                            <SelectItem value="begaValley">Bega Valley Campus</SelectItem>
                            <SelectItem value="eurobodalla">Eurobodalla Campus</SelectItem>
                            <SelectItem value="shoalhaven">Shoalhaven Campus</SelectItem>
                            <SelectItem value="highlands">Highlands Campus</SelectItem>
                            <SelectItem value="sutherland">Sutherland Campus</SelectItem>
                            <SelectItem value="sydneyCBD">Sydney CBD Campus</SelectItem>
                            <SelectItem value="liverpool">Liverpool Campus</SelectItem>
                          </SelectContent>
                        </RadixSelect>
                      </div>
                    )}
                    <p className="mb-2 font-bold">Shipping Method</p>
                    <div className="grid-col-1 grid gap-4 lg:grid-cols-2 lg:gap-10 lg:px-10">
                      <div
                        className={`rounded-3xl border border-gray-500 ${shipping?.value === "free"
                          ? "bg-[#F2FFE4] dark:bg-green-500/20"
                          : "dark:border-white/30 dark:bg-gray-800"
                          } p-4`}
                      >
                        <label className="cursor-pointer">
                          <input
                            type="radio"
                            value={"free"}
                            checked={shipping?.value === "free"}
                            onChange={() =>
                              onChange({
                                value: "free",
                                amount: 0,
                                type: "Click and Collect.",
                                label:
                                  "Click and Collect at UniShop service desk.",
                              })
                            }
                            className="accent-green-500"
                            style={{ height: "20px", width: "20px" }}
                          />
                          <div className="text-center text-3xl font-medium">
                            Free
                          </div>
                          <div className="my-4 text-center text-xl font-medium capitalize">
                            Click and Collect
                          </div>
                          <div className="flex flex-col items-start gap-4">
                            <div className="text-lg">
                              Click and Collect at UniShop service desk.
                            </div>
                            {collectCampus === "wollongong" && (
                              <div>
                                Building 11, 2 Northfields Avenue Keiraville
                              </div>
                            )}
                            <div className="text-sm">
                              You will be notified once the order is ready for
                              collection.
                            </div>
                          </div>
                        </label>
                      </div>

                      {getShippingPrice(
                        checkoutData?.address?.[0]?.country ?? "",
                        calculateWeight()
                      ) ? (
                        <div
                          className={`rounded-3xl border border-gray-500 p-4 ${shipping?.value === "Delivery"
                            ? "bg-[#F2FFE4] dark:bg-green-500/20"
                            : "dark:border-white/30 dark:bg-gray-800"
                            }`}
                        >
                          <label className="cursor-pointer">
                            <input
                              type="radio"
                              value={"Delivery"}
                              checked={shipping?.value === "Delivery"}
                              onChange={() =>
                                onChange({
                                  value: "Delivery",
                                  amount:
                                    getShippingPrice(
                                      checkoutData?.address?.[0]
                                        ?.country ?? "",
                                      calculateWeight()) ?? 0,
                                  type: "Delivery",
                                  label:
                                    "Shipping cost is calculated based on the total weight of your order.",
                                })
                              }
                              className="accent-green-500"
                              style={{ height: "20px", width: "20px" }}
                            />
                            <div className="text-center text-3xl font-medium">
                              $
                              {(getShippingPrice(
                                checkoutData?.address?.[0]?.country ?? "",
                                calculateWeight()
                              ) ?? 0).toFixed(2)}
                            </div>
                            <div className="my-4 text-left text-xl font-medium capitalize">
                              Delivery
                            </div>
                            <div className="flex flex-col items-start gap-4">
                              <div className="text-left">
                                International Shipping, Table Rate
                              </div>
                              <div className="text-left">
                                Delivery times for international postage vary.
                              </div>
                              <div className="text-left text-sm">
                                Contact us for an estimate.
                              </div>
                            </div>
                          </label>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-500 p-4 text-center dark:border-white/30 dark:bg-gray-800">
                          <div className="text-center text-3xl font-medium">
                            No shipping available
                          </div>
                          There is no shipping or delivery available for this
                          address.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col lg:col-span-2 xl:col-span-2">
              <h2 className="mb-2 mt-6 text-xl font-bold text-neutral-800 dark:text-neutral-200">
                Cart Items
              </h2>

              <ScrollArea
                className={`relative h-full flex-1 overflow-hidden rounded-lg border border-gray-500 bg-white p-4 shadow transition-all duration-300 dark:bg-slate-800 ${isExpanded ? "max-h-[28rem]" : "max-h-[17rem]"
                  }`}
              >
                {items?.[0] ? (
                  items.map((item, index) => {
                    const itemVoucherAmount = appliedVoucher?.allocation[item.item_id];
                    return (
                      <CartItem
                        key={`${item.item_id}-${item.selected_variation?.items_variable_items_id ?? 'default'}`}
                        title={item.item_name}
                        imageSrc={
                          item?.object_path ?? item.media?.[0]?.object_path ?? ""
                        }
                        price={
                          totalAfterCalculation?.items
                            ? checkOldPrice(item.item_id)
                            : 0
                        }
                        newPrice={
                          totalAfterCalculation?.items
                            ? checkNewPrice(item.item_id)
                            : 0
                        }
                        showRemove={true}
                        onChangeQuantity={(id, number) =>
                          onChangeQuantity(id, number)
                        }
                        onIncrease={() =>
                          handleIncrease(item.item_id, item.quantity + 1)
                        }
                        onDecrease={() =>
                          handleDecrease(item.item_id, item.quantity - 1)
                        }
                        itemQuantity={item.quantity}
                        showQuantityIncrement={true}
                        stock={item.stock}
                        onRemove={() => {
                          setRemoveItem(item);
                          setIsOpenDeleteAlert(true);
                        }}
                        item={item}
                        voucherCode={appliedVoucher?.code}
                        voucherAmount={itemVoucherAmount}
                      />
                    );
                  })
                ) : (
                  <div>
                    <span className="text-lg font-bold text-red-600 dark:text-white">
                      It appears that your cart is empty. Please choose items
                      before proceeding to checkout.
                    </span>
                    <div className="mt-2">
                      <Button
                        title="Continue Shopping"
                        onClick={() => router.push("/")}
                      />
                    </div>
                  </div>
                )}
              </ScrollArea>
              {/* </div> */}

              {/* Expand/Collapse Toggle */}
              <button
                onClick={toggleExpand}
                className="relative z-[5] mx-auto -mt-5 flex w-fit items-center justify-center rounded-full border border-gray-500 bg-white px-2.5 py-1.5 text-red-500 shadow-md dark:bg-slate-600"
              >
                <span>{isExpanded ? "▲" : "▼"}</span>
              </button>
              <div className="mt-4 rounded-xl border border-gray-500 bg-white p-4 shadow dark:bg-slate-800 lg:col-span-2 xl:col-span-2">
                <h2 className="text-xl font-bold">Order Summary</h2>
                {/* {calculateLoader && (
                  <div>
                    <div className="flex flex-col items-center justify-between">
                      <div className="mb-2 h-8 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-600" />

                      <div className="mb-2 h-8 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-600" />
                      <div className="relative h-2/3 w-full animate-pulse">
                        <div className="mb-2 h-52 w-full rounded bg-gray-200 dark:bg-gray-600" />
                      </div>
                    </div>
                  </div>
                )} */}
                {/* {!calculateLoader && ( */}
                <>
                  <div className="my-2 border-t border-gray-300" />
                  {/* <div className="grid grid-cols-2 justify-between">
                    <span className="text-sm">Cart Subtotal</span>
                    <span className="flex justify-end text-sm">
                      ${totalAfterCalculation?.original_price.toFixed(2)}
                    </span>
                  </div> */}
                  <div className="mt-2 grid grid-cols-2 justify-between">
                    <span className="text-sm">Price</span>
                    <span className="flex justify-end text-sm">
                      $
                      {items?.[0]
                        ? totalAfterCalculation?.final_price_including_tax.toFixed(
                          2,
                        )
                        : 0}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 justify-between">
                    <span className="text-sm">GST (Included)</span>
                    <span className="flex justify-end text-sm">
                      $
                      {items?.[0]
                        ? totalAfterCalculation?.item_tax_price.toFixed(2)
                        : 0}
                    </span>
                  </div>
                  {/* <div className="mt-2 grid grid-cols-2 justify-between">
                    <span className="text-sm">Subtotal</span>
                    <span className="flex justify-end text-sm">
                      $
                      {totalAfterCalculation?.final_price_including_tax.toFixed(
                        2,
                      )}
                    </span>
                  </div> */}
                  <div className="mt-2 grid grid-cols-3 justify-between">
                    <div className="col-span-2 flex flex-col">
                      <span className="text-sm">Shipping</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {shipping?.label} - {shipping?.type}
                      </span>
                    </div>

                    <span className="col-span-1 flex justify-end text-sm">
                      ${(shipping?.amount ?? 0).toFixed(2)}
                    </span>
                  </div>
                  {calculateWeight() > 0 && (
                    <div className="mt-2 grid grid-cols-3 justify-between">
                      <div className="col-span-2 flex flex-col">
                        <span className="text-sm">Order Weight</span>
                      </div>

                      <span className="col-span-1 flex justify-end text-sm">
                        {calculateWeight().toFixed(2)} KG
                      </span>
                    </div>
                  )}

                  <div className="mt-2 grid grid-cols-2 justify-between">
                    <div className="flex flex-col">
                      <span className="text-md font-semibold">
                        Order Total
                      </span>
                    </div>

                    <span className="text-md flex justify-end font-bold">
                      ${items?.[0] ? total.toFixed(2) : 0}
                    </span>
                  </div>

                  {appliedVoucher && (
                    <>
                      <div className="mt-2 grid grid-cols-2 justify-between text-green-600 dark:text-green-400 font-medium animate-in fade-in slide-in-from-top-1 duration-200">
                        <span>Voucher Applied ({appliedVoucher.code})</span>
                        <span className="flex justify-end">
                          -${appliedVoucher.appliedTotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="mt-2 grid grid-cols-2 justify-between border-t border-gray-300 dark:border-gray-600 pt-2 text-md font-bold">
                        <span>Amount to Pay</span>
                        <span className="flex justify-end">
                          ${items?.[0] ? Math.max(0, total - appliedVoucher.appliedTotal).toFixed(2) : 0}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="my-2 border-t border-gray-300" />
                  <div className="mt-3 flex">
                    <Button
                      onClick={() => handlePlaceOrder()}
                      disabled={
                        totalAfterCalculation && items?.[0] ? false : true || calculateLoader || placeOrderLoader
                      }
                      width="w-full"
                      title="Place Order"
                      loading={placeOrderLoader}
                    />
                  </div>
                </>
                {/* // )} */}
              </div>
            </div>
          </div>
        </div>
      </main>
      {isOpenPaymentAlert && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-lg">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <h3 className="text-xl font-semibold">Payment</h3>
                <button
                  onClick={() => setIsOpenPaymentAlert(false)}
                  className="text-2xl font-bold text-gray-500 hover:text-black"
                >
                  ×
                </button>
              </div>

              {/* Loader and Iframe */}
              <div className="relative h-[80vh] w-full">
                {loading && (
                  <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
                    <Spinner />
                  </div>
                )}
                <iframe
                  src={transactionData?.link}
                  className="h-full w-full border-none"
                  loading="lazy"
                  data-publicapikey={process.env.NEXT_PUBLIC_EWAY_PUBLIC_KEY}
                  onLoad={() => setLoading(false)}
                  allow="payment"
                />
              </div>

              {/* Footer */}
              <div className="flex justify-end border-t p-4">
                <button
                  className="px-4 py-2 text-sm font-semibold text-red-500 hover:underline"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <AlertBox
        title="Remove Item"
        description="Are you sure you want to remove this item from cart?"
        open={isOpenDeleteAlert}
        onClose={() => setIsOpenDeleteAlert(false)}
        onContinue={() => handleRemoveFromCart(removeItem!)}
      />
      <AlertBox
        title="Delivery Not Available"
        description="The following item(s) are not available for delivery or shipping. Please remove them from your cart to place the order, or choose Click and Collect:"
        open={isOpenShippingAlert}
        onClose={() => setIsOpenShippingAlert(false)}
        onContinue={() => setIsOpenShippingAlert(false)}
        cancelButtonText="Close"
        continueButtonText="OK"
      >
        <div className="mt-2 font-semibold text-red-500 text-left">
          {items?.filter((item) => item.disable_shipping === 1).map((item) => item.item_name).join(", ")}
        </div>
      </AlertBox>

      {isOpenVoucherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" >
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-800 border border-gray-200 dark:border-slate-700 animate-in fade-in zoom-in duration-200 text-left">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Add Voucher
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Enter your voucher code to apply it to your order.
            </p>

            <div className="mt-4">
              <Input
                type="text"
                placeholder="Voucher Code"
                value={voucherCodeInput}
                onChange={(e) => setVoucherCodeInput(e.target.value)}
              />
              {/* <input
                type="text"
                placeholder="Voucher Code"
                value={voucherCodeInput}
                onChange={(e) => setVoucherCodeInput(e.target.value)}
                disabled={voucherLoading}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:bg-white dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-green-400"
              /> */}
            </div>

            <div className="mt-6 flex justify-end gap-3">

              <Button
                onClick={() => {
                  setIsOpenVoucherModal(false);
                  setVoucherCodeInput("");
                }}
                variant="secondary"
                disabled={voucherLoading}
                title="Cancel"
                width="w-auto"
              />

              <Button
                onClick={handleApplyVoucher}
                disabled={voucherLoading || !voucherCodeInput.trim()}
                title="Apply Voucher"
                loading={voucherLoading}
                width="w-auto"
              />

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
