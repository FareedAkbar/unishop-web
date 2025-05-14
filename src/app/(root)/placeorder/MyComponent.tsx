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
import PayloadForTransactionLink from "~/types/payloadForTransactionLink";
import { ScrollArea } from "~/components/ui/scroll-area";
import CartItem from "~/components/ui-components/CartItem";
import AlertBox from "~/components/alertBox/alert";
import moment from "moment";
import TableRates from "~/components/constants/tablerates";
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
  const [removeItem, setRemoveItem] = useState<DataCart | null>(null);
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState<boolean>(false);
  // const [socketStatus, setSocketStatus] = useState(true);
  const [totalAfterCalculation, setTotalAfterCalculation] =
    useState<TaxCalculationApiResponse>();
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
      };
    }
    return item1;
  });

  useEffect(() => {
    if (!totalAfterCalculation) return;

    const amount = shipping?.amount ?? 0;
    setTotal(amount + totalAfterCalculation?.final_price_including_tax);
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
            member_id: checkoutData?.customer_id
              ?? null,
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
        console.log(result);
      } else {
        console.error("Unexpected result structure getLinkForPayment:", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setCalculateLoader(false);
    }
  };

  const handlePlaceOrder = async () => {
    // await placeOrderApi(797498821);
    const x = {
      customer_id: checkoutData?.customer_id,
      guest_id: checkoutData?.customer_id ? null : checkoutData?.uuid,
      amount: 0.01,
    };

    try {
      await getLinkForPayment(x);

      console.log(x);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
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
    console.log(requestOptions);
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
          description: "Your order has been processed successfully.",
        });

        try {
          await removeAllCartItems();
          const x = {
            transaction_id: requestOptions.transaction_id,
            order_id: result?.data?.order_id,
            tracking_id: result.data?.tracking_id,
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
    console.log(newItems);
    if (!Array.isArray(newItems) || newItems.length === 0) {
      console.warn("Input array is empty or not an array:", newItems);
      return [];
    }
    const x = newItems.map((item) => {
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
        discounted_price: null,
        deal_items: [],
        premium_upgrades: [],
      };
    });

    return x;
  }

  const placeOrderApi = async (id: number) => {
    setLocalTransactionData(null);
    const date = new Date();
    const outlet = process.env.NEXT_PUBLIC_PASSKEY_OUTLET ?? "";
    const x = {
      order_type: shipping?.type == "free" ? 1 : 2,
      online_order_type: 1,
      outlet_id: parseInt(outlet),
      tracking_id: generateOTP(12).toString(),
      order_status: 1,
      completed_date: formatDateTime(date),
      started: formatDateTime(date),
      details: "order Detail| UniShop",
      kitchen_comments: "",
      waiter_id: null,
      table_served: null,
      total_order_price: total,
      tab_limit: 0.0,
      final_price_including_tax: total,
      eft_pos_details: {
        card_type: "N.A.",
        card_pan: "N.A.",
        ref_no: "N.A.",
      },
      member_id: checkoutData?.customer_id ?? null,
      transaction_id: id.toString(),
      booknet_customer_id: booknetCustomerId,
      // guest: checkoutData?.uuid ? checkoutData?.uuid : null,
      order_items: await convertPayload(),
      address_id: checkoutData?.address?.[0]?.address_id ?? null,
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
    if (!checkoutData?.uuid && !checkoutData?.customer_id) return;
    socket.disconnect();
    socket.connect();
    const connectHandler = () => {
      console.log("Connected to server", socket.id);
      console.log(
        "Connected to Id",
        checkoutData?.customer_id
        ?? checkoutData?.uuid,
      );

      socket.emit(
        "/studentHandshake",
        {
          student_id: checkoutData?.customer_id
            ?? checkoutData?.uuid,
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

      if (data.status) {
        setIsOpenPaymentAlert(false);

        try {
          await placeOrderApi(data.transaction_id);
        } catch (error) {
          console.error("Failed to load data:", error);
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
    if (!checkoutData?.uuid) return;

    console.log("Payment socket initiated");
    const cleanupPaymentStatus = PaymentStatus();

    return cleanupPaymentStatus;
  }, [checkoutData, transactionData]);

  const closeModal = () => {
    setIsOpenPaymentAlert(false);
  };

  const onChange = (val: ShippingType) => {
    setShipping(val);
    if (val.amount > 0) {
      setTotal(val.amount + total);
    } else {
      setTotal(total - 10);
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
  type ShippingRate = {
    Country: string;
    "Region/State": string;
    "Zip/Postal Code": string;
    weight_and_above: number;
    shipping_price: number;
  };
  function getShippingPrice(
    countryCode: string,
    packageWeight: number,
    rates: ShippingRate[]
  ): number | null {
    const countryRates = rates
      .filter(rate => rate.Country === countryCode)
      .sort((a, b) => a.weight_and_above - b.weight_and_above);

    for (let i = countryRates.length - 1; i >= 0; i--) {
      const rate = countryRates[i];
      if (rate && packageWeight >= rate.weight_and_above) {
        return rate.shipping_price;
      }
    }

    return null; // No rate found
  }

  const calculateWeight = () => {
    let totalWeight = 0;
    items.forEach((item) => {
      if (item?.selected_variation?.weight && item.weighable == 1) {
        totalWeight += parseFloat(item?.selected_variation?.weight) * item.quantity;
      } else if (item?.weight && item.weighable == 1) {
        totalWeight += parseFloat(item?.weight) * item.quantity;
      }
    });
    return totalWeight;
  }

  return (
    <div>
      <main className="min-h-screen justify-center bg-gradient-to-r from-[#FFF2F2] to-[#FFEEEE] pb-8 dark:from-slate-700 dark:to-slate-700">
        <div className="z-10 px-6">
          <div className="xs:grid-cols-1 mt-3 grid justify-center gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 lg:gap-5 xl:grid-cols-5">
            <div className="flex flex-col lg:col-span-3 xl:col-span-3">
              <h2 className="mb-2 mt-6 text-xl font-bold text-neutral-800 dark:text-neutral-200">
                Payment Method
              </h2>
              <div className="rounded-xl border bg-white p-4 dark:bg-slate-800">
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
                          {checkoutData?.address?.[0]?.phone_number}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* {userInfo?.customer_id && (
                    <div>
                      <div className="flex flex-col items-center">
                        <div className="w-48 py-2">
                          <Tabs tabs={tabs} changeTabName={setDiscountType} />
                        </div>

                        <div className="mt-2 flex h-10">
                          <Input
                            value={discountValue}
                            icon
                            onChange={(e) => {
                              setDiscountValue(e.target.value);
                            }}
                          />
                          <div className="ml-2 mt-1">
                            <Button
                              height="h-8"
                              title={"Apply discount"}
                              className="text-xs"
                              loading={discountLoader}
                              onClick={() => {
                                handleclick();
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )} */}
                </div>
                {checkoutData?.address?.[0]?.country_code == "AUS" ? (
                  <div className="mb-4 mt-4">
                    <p className="mb-2 font-bold">Shipping Method</p>
                    <div className="grid  grid-cols-2  gap-4">

                      {shippingOptions.map((option) => (
                        <div key={option.value} className={`border rounded-3xl p-4`} style={{ backgroundColor: shipping?.value === option.value ? "#F2FFE4" : "" }}>

                          <label className="cursor-pointer">
                            <input
                              type="radio"
                              value={option.value}
                              checked={shipping?.value === option.value}
                              onChange={() => onChange(option)}
                              className="accent-green-500 "
                              style={{ height: "20px", width: "20px" }}
                            />
                            <div className="text-3xl font-medium text-center">
                              {option.amount == 0
                                ? "Free" : "$" + option.amount}
                            </div>
                            <div className={`mt-3 flex flex-col items-center ${option.amount == 0 ? "gap-4" : "gap-1"}`}>

                              <span className="text-xl font-medium text-center capitalize">
                                {option.type}
                              </span>
                              <div className="mt-2 text-lg">
                                {option.label}
                              </div>
                              <div className="">
                                {option.label2}
                              </div>
                              <div className="text-sm  text-center">
                                {option.label3}
                              </div>
                              <div className="text-sm  text-center">
                                {option.label4}
                              </div>
                              <div className="text-sm  text-center">
                                {option.label5}
                              </div>
                              <div className="text-sm  text-center">
                                {option.label6}
                              </div>

                            </div>
                          </label>
                        </div>
                      ))}

                    </div>
                  </div>
                ) : (
                  <div className="mb-4 mt-10">
                    <p className="mb-2 font-bold">Shipping Method</p>
                    <div className="grid grid-cols-2  gap-6">
                      <div className={`border rounded-3xl p-4`} style={{ backgroundColor: shipping?.value === "free" ? "#F2FFE4" : "" }}>

                        <label className="cursor-pointer">
                          <input
                            type="radio"
                            value={"free"}
                            checked={shipping?.value === "free"}
                            onChange={() => onChange({ value: "free", amount: 0, type: "Click and Collect.", label: "Click and Collect at UniShop service desk." })}
                            className="accent-green-500 "
                            style={{ height: "20px", width: "20px" }}
                          />
                          <div className="text-3xl font-medium text-center">
                            Free

                          </div>

                          <div className="text-xl my-4 font-medium text-center capitalize">
                            Click and Collect
                          </div>
                          <div className={` flex flex-col items-start gap-4`}>

                            <div className=" text-lg">
                              Click and Collect at UniShop service desk.
                            </div>
                            <div className="">
                              Building 11, 2 Northfields Avenue Keiraville
                            </div>
                            <div className="text-sm  ">
                              You will be notified once the order is ready for collection.
                            </div>


                          </div>
                        </label>
                      </div>

                      {getShippingPrice(checkoutData?.address?.[0]?.country_code ?? "", calculateWeight(), TableRates) ? (
                        <div className={`border rounded-3xl p-4`} style={{ backgroundColor: shipping?.value === "free" ? "" : "#F2FFE4" }}>

                          <label className="cursor-pointer">
                            <input
                              type="radio"
                              value={"Delivery"}
                              checked={shipping?.value === "Delivery"}
                              onChange={() => onChange({ value: "Delivery", amount: getShippingPrice(checkoutData?.address?.[0]?.country_code ?? "", calculateWeight(), TableRates) ?? 0, type: "Delivery", label: "Shipping cost is calculated based on the total weight of your order." })}
                              className="accent-green-500 "
                              style={{ height: "20px", width: "20px" }}
                            />
                            <div className="text-3xl font-medium text-center">
                              ${getShippingPrice(checkoutData?.address?.[0]?.country_code ?? "", calculateWeight(), TableRates) ?? 0}
                            </div>
                            <div className="text-xl my-4 font-medium text-center capitalize">
                              {"Delivery"}
                            </div>
                            <div className="flex flex-col items-start gap-4">


                              <div className=" text-left">

                                {"International Shipping, Table Rate"}

                              </div>
                              <div>
                                {`Delivery times for international postage vary.`}
                              </div>
                              <div className="text-sm">
                                {`Contact us for an estimate.`}
                              </div>
                            </div>
                          </label>
                        </div>
                      ) : (
                        <div className="flex flex-col items-start gap-4 ">
                          There is no shipping or delivery available for this address.
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
                className={`relative h-full flex-1 overflow-hidden rounded-lg border bg-white p-4 transition-all duration-300 dark:bg-slate-800 ${isExpanded ? "max-h-[28rem]" : "max-h-[10rem]"
                  }`}
              >
                {items?.[0] ? (
                  items.map((item, index) => (
                    <CartItem
                      key={item.item_id + Math.random() + index}
                      title={item.item_name}
                      imageSrc={item?.object_path ?? item.media?.[0]?.object_path ?? ""}
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
                    />
                  ))
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
                className="relative z-[5] mx-auto -mt-5 flex w-fit items-center justify-center rounded-full border bg-white px-3 py-1.5 text-red-500 shadow-md dark:bg-slate-600"
              >
                <span>{isExpanded ? "▲" : "▼"}</span>
              </button>
              <div className="mt-4 rounded-xl border bg-white p-4 dark:bg-slate-800 lg:col-span-2 xl:col-span-2">
                <h2 className="text-xl font-bold">Order Summary</h2>
                {calculateLoader && (
                  <div>
                    <div className="flex flex-col items-center justify-between">
                      <div className="mb-2 h-8 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-600" />

                      <div className="mb-2 h-8 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-600" />
                      <div className="relative h-2/3 w-full animate-pulse">
                        <div className="mb-2 h-52 w-full rounded bg-gray-200 dark:bg-gray-600" />
                      </div>
                    </div>
                  </div>
                )}
                {!calculateLoader && (
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
                        ${shipping?.amount.toFixed(2)}
                      </span>
                    </div>
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
                    <div className="my-2 border-t border-gray-300" />
                    <div className="mt-3 flex">
                      <Button
                        onClick={() => handlePlaceOrder()}
                        disabled={
                          totalAfterCalculation && items?.[0] ? false : true
                        }
                        width="w-full"
                        title="Place Order"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      {isOpenPaymentAlert ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-auto">
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                  <h3 className="text-3xl font-semibold"></h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                    onClick={() => setIsOpenPaymentAlert(false)}
                  >
                    <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="flex h-screen w-screen items-center justify-center">
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      <Spinner />
                    </div>
                  )}
                  <iframe
                    src={transactionData?.link}
                    className="h-screen w-screen border-none"
                    loading="lazy"
                    onLoad={() => setLoading(false)}
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
                <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                  <button
                    className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => closeModal()}
                  >
                    Close
                  </button>
                  {/* <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setIsOpenPaymentAlert(false)}
                  >
                    Save Changes
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25" />
        </>
      ) : null}
      <AlertBox
        title="Remove Item"
        description="Are you sure you want to remove this item from cart?"
        open={isOpenDeleteAlert}
        onClose={() => setIsOpenDeleteAlert(false)}
        onContinue={() => handleRemoveFromCart(removeItem!)}
      />
      {/* <AlertBox
        title="Payment"
        description=""
        open={isOpenPaymentAlert}
        onClose={() => setIsOpenPaymentAlert(false)}
        onContinue={() => setIsOpenPaymentAlert(false)}
      >
      </AlertBox> */}
    </div>
  );
};

export default MyComponent;
