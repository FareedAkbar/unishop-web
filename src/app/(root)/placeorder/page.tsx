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
import type PayloadForTrasactionLink from "~/types/payloadForTrasactionLink";
import socket from "~/utils/socket";
import { useToast } from "~/hooks/use-toast";
import type { placeOrderPayload } from "~/types/placeOrderPayload";
import { formatDate, formatDateTime } from "~/utils/dateAndTime";
import { useRouter } from "next/navigation";
import { generateOTP } from "~/utils/generateOTP";
import Button from "~/components/ui-components/Button";
import { outlet223, token221, token223 } from "~/types/tokens";
import { Tabs } from "~/components/ui/tabs";
import Input from "~/components/ui-components/Input";
import Spinner from "~/components/spinner";
// import { v4 as uuidv4, v5 as uuidv5 } from "uuid";

const MyComponent = () => {
  const {
    cartItems,
    checkoutData,
    getCheckoutFormData,
    removeAllCartItems,
    uuidLocal,
    setTrasactionData,
    // setUUID,
    token,
    userInfo,
    // isLoggedIn,
    booknetCustomerId,
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
  const [discountType, setDicountType] = useState("Voucher");
  const [discountValue, setDiscountValue] = useState("");
  const [transactionData, setTransactionData] =
    useState<trasactionResponse | null>(null);
  const [loading, setLoading] = useState(true);
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
        // Optionally set an error state here
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

    // If there's a matching item, merge the new prices
    if (matchingItem) {
      return {
        ...item1,
        final_price_including_tax: matchingItem.final_price_including_tax,
      };
    }

    // If no matching item, return the original item
    return item1;
  });

  useEffect(() => {
    if (!totalAfterCalculation) return;

    const amount = shipping?.amount ?? 0;
    const ship = shipping?.amount ?? 0;

    setTotal(amount + totalAfterCalculation?.final_price_including_tax + ship);
    const x = mergedArray;
    setNewItems(x);
  }, [totalAfterCalculation]);

  const createItemsPayload = (
    dataArray1: DataCart[],
  ): CreatePayloadBooksForTax[] => {
    return dataArray1.map((book) => ({
      price: book.selected_variation?.items_variable_items_sale_price ?? book.item_sale_price, // Extract the item_sale_price
      quantity: book.quantity,
      item_id: book.item_id, // Extract the item_id
      cat_id: book.category, // Extract the category as cat_id
      textbook_id: book.book_id ? book.book_id : null , // Extract the book_id as textbook_id
      is_textbook: book.book_id ? 1 : 0, // Set is_textbook to 1 (fixed value)
      variationId: book.selected_variation?.items_variable_items_id ?? null, 
      variable_item: book.selected_variation?.items_variable_items_id ? 1 : 0, // Set variable_item to 0 (fixed value)
      premium_upgrades_CPM: [], // Set premium_upgrades_CPM to an empty array (fixed value)
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
        "https://booknet-dev.iconsole.com.au/api/calculate?check_availability=0",
        {
          method: "POST", // Assuming you're making a POST request
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token223}`,
          },
          body: JSON.stringify({ items: requestOptions, member_id: null }), // Send the payload as JSON
        },
      );

      const result: ApiResponse = (await response.json()) as ApiResponse;

      // Check if result has the expected structure
      if (result?.status) {
        setTotalAfterCalculation(result?.data);
      } else {
        console.error("Unexpected result structure:", result);
        // Handle unexpected structure here
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
        console.log(items)
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

  type trasactionResponse = {
    amount: number | null;
    customer_id: number | null;
    link: string;
    unique_id: number | null;
    order_id?: number | null;
    tracking_id?: number | null;
  };

  interface ApiResponseForTrasactionLink {
    status: boolean;
    data: trasactionResponse;
    message: string;
  }

  const getLinkForPayment = async (
    requestOptions: PayloadForTrasactionLink,
  ) => {
    try {
      const response = await fetch(
        "https://ipos-dev.iconsole.com.au/api/v1/ipos/payments/insertPaymentsDetailsResponsive",
        {
          method: "POST", // Assuming you're making a POST request
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token223}`,
          },
          body: JSON.stringify(requestOptions), // Send the payload as JSON
        },
      );

      const result: ApiResponseForTrasactionLink =
        (await response.json()) as ApiResponseForTrasactionLink;

      // Check if result has the expected structure
      if (result?.status) {
        setTransactionData(result.data);
        setIsOpenPaymentAlert(true);
        setLoading(true);

        // window.open(result.data.link);
        console.log(result);
      } else {
        console.error("Unexpected result structure:", result);
        // Handle unexpected structure here
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
        "https://booknet-dev.iconsole.com.au/api/orders/web",
        {
          method: "POST", // Assuming you're making a POST request
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token223}`,
          },
          body: JSON.stringify(requestOptions), // Send the payload as JSON
        },
      );

      const result: ApiResponseForTrasactionLink =
        (await response.json()) as ApiResponseForTrasactionLink;

      // Check if result has the expected structure
      if (result?.status) {
        toast({
          title: "Order Successful",
          description: "Your order has been processed successfully.",
        });

        try {
          await removeAllCartItems();
          const x = {
            trasaction_id: requestOptions.transaction_id,
            order_id: result?.data?.order_id,
            tracking_id: result.data?.tracking_id,
          };
          await setTrasactionData(x);
        } catch (error) {
          console.error("Failed to load data:", error);
          // Optionally set an error state here
        }
        router.push("/order-confirmed");
      } else {
        toast({
          title: "Payment Declined",
          variant: "destructive",
          description:
            "Unfortunately, your order could not be processed. Please try again.",
        });
        console.error("Unexpected result structure:", result);
        // Handle unexpected structure here
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
      return []; // Return an empty array if no valid input
    }
    const x = newItems.map((item) => {
      return {
        item_id: item.item_id,
        deal_id: null, // Assuming deal_id is null since it's not provided
        variable_id: item.selected_variation?.items_variable_items_id ?? null , // Assuming variable_id is null since it's not provided
        quantity_item: item.quantity,
        // quantity_item:  item.stock?.quantity > 0 &&  item.quantity > item.stock?.quantity ? item.stock?.quantity : item.quantity,
        // back_order_quantity: item.stock?.quantity > 0 &&  item.quantity > item.stock?.quantity ? item.quantity - item.stock?.quantity : 0,
        back_order_quantity: 0,
        notes: "", // Use additional_notes if present
        is_deal: null, // Assuming is_deal is null since it's not provided
        item_price: item.selected_variation?.items_variable_items_id ? item.selected_variation?.items_variable_items_sale_price : item.item_sale_price,
        discounted_price: null, // Assuming discounted_price is null since it's not provided
        deal_items: [], // Assuming no deal items from the provided input
        premium_upgrades: [], // Assuming no premium upgrades from the provided input
      };
    });

    return x;
  }

  const placeOrderApi = async (id: number) => {
    await setTrasactionData(null);
    const date = new Date();
    const x = {
      order_type: shipping?.type == "free" ? 1 : 2,
      online_order_type: 1,
      outlet_id: outlet223,
      tracking_id: generateOTP(12).toString(),
      order_status: 1,
      completed_date: formatDate(date),
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
      member_id: null,
      transaction_id: id.toString(),
      booknet_customer_id: booknetCustomerId,
      // guest: checkoutData?.uuid ? checkoutData?.uuid : null,
      order_items: await convertPayload(),
    };
    try {
      await placeOrderApiCall(x);
      console.log(x);
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
    console.log("Connected to server after");
    if (!checkoutData?.uuid) return;

    const connectHandler = () => {
      console.log("Connected to server", socket.id);
      console.log(
        "Connected to Id",
        checkoutData?.customer_id
          ? checkoutData?.customer_id
          : checkoutData?.uuid,
      );

      socket.emit(
        "/studentHandshake",
        {
          student_id: checkoutData?.customer_id
            ? checkoutData?.customer_id
            : checkoutData?.uuid,
        },
        () => {
          console.log("studentHandshake");
        },
      );
    };

    socket.on("connect", connectHandler);

    return () => {
      socket.off("connect", connectHandler);
    };
  }, [checkoutData]);

  const PaymentStatus = useCallback(() => {
    if (!checkoutData?.uuid) return;

    console.log("Payment Socket");

    const handlePaymentStatus = async (dat: dataresponse) => {
      console.log("PaymentStatus");
      const { data } = dat;

      console.log(data);

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
      setTransactionData(null);
    };

    // Register the listener
    socket.on("paymentStatus", handlePaymentStatus);

    // Cleanup on unmount
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
      content: <div></div>,
    },
    {
      title: "Coupon",
      value: "Coupon",
      content: <div></div>,
    },
  ];

  type discounVoucherType = {
    code: string;
    total_order_price: number;
    order_id: null;
    till: number;
    cus_id: number;
    membership: null;
    outlet_id: number;
  };
  type discounCouponType = {
    cus_id: number;
    code: string;
    // "till" : 1,
    outlet_id: number;
  };

  type discount = {
    verify: boolean;
  };

  type dicountResponse = {
    status: boolean;
    message: string;
    data: discount;
  };

  const getDiscounts = async (
    requestOptions: discounVoucherType | discounCouponType,
  ) => {
    try {
      const response = await fetch(
        discountType == "Voucher"
          ? "https://ipos-dev.iconsole.com.au/api/v1/ipos/discounts/verifyVoucher"
          : "https://ipos-dev.iconsole.com.au/api/v1/ipos/discounts/verifyCoupon",
        {
          method: "POST", // Assuming you're making a POST request
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token223}`,
          },
          body: JSON.stringify(requestOptions), // Send the payload as JSON
        },
      );
      setDiscountLoader(true);
      const result: dicountResponse =
        (await response.json()) as dicountResponse;

      // Check if result has the expected structure
      if (result?.status) {
        // window.open(result.data.link);
        console.log(result);
      } else {
        toast({
          title: "discount Declined",
          variant: "destructive",
          description: result.message,
        });
        // Handle unexpected structure here
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setDiscountLoader(false);
    }
  };

  const handleclick = () => {
    if (discountValue.trim().length > 0) {
      if (discountType == "Voucher") {
        const xData = {
          code: discountValue.trim(),
          total_order_price: total,
          order_id: null,
          till: 0,
          cus_id: userInfo?.customer_id ? userInfo?.customer_id : 0,
          membership: null,
          outlet_id: outlet223,
        };
        getDiscounts(xData).catch((err) => console.log(err));
      } else {
        const xData = {
          cus_id: userInfo?.customer_id ? userInfo?.customer_id : 0,
          code: discountValue.trim(),
          // "till" : 1,
          outlet_id: outlet223,
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

  return (
    <div>
      <main className="mb-8 min-h-screen justify-center pt-28 lg:pt-20">
        <div className="z-10 bg-white px-6 dark:bg-slate-800">
          <h2 className="mt-6 text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Payment Method
          </h2>
          <div className="xs:grid-cols-1 mt-3 grid justify-center gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <div className="rounded-xl border p-4 lg:col-span-2 xl:col-span-2">
              <div className="flex flex-col justify-between lg:flex-row">
                <div>
                  <span className="text-md mt-2">Credit Card - eWAY</span>
                  <div className="ml-6 mt-3 flex flex-col">
                    <span className="mt-4">{checkoutData?.address}</span>
                    <span>
                      {checkoutData?.country} {checkoutData?.city}{" "}
                      {checkoutData?.state} {checkoutData?.postal_code}
                    </span>
                    <span className="mt-6">
                      <a
                        href={`tel:${checkoutData?.phone_number}`}
                        className="mt-5 hover:text-red-400"
                      >
                        {checkoutData?.phone_number}
                      </a>
                    </span>
                  </div>
                </div>
                {userInfo?.customer_id && (
                  <div>
                    <div className="flex flex-col items-center">
                      <div className="w-48 py-2">
                        <Tabs tabs={tabs} changeTabName={setDicountType} />
                      </div>

                      <div className="mt-2 flex h-10">
                        <Input
                          value={discountValue}
                          icon
                          onChange={(e) => {
                            setDiscountValue(e.target.value);
                          }}

                          // type="number"
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
                )}
              </div>

              <div className="mb-4 mt-10">
                <p className="mb-2 font-bold">Shipping Method</p>
                <div className="flex flex-col">
                  <div>
                    {shippingOptions.map((option) => (
                      <div key={option.value}>
                        <div className="my-4 border-t border-gray-300"></div>
                        <label className="flex items-center gap-4">
                          <input
                            type="radio"
                            value={option.value}
                            checked={shipping?.value === option.value}
                            onChange={() => onChange(option)}
                            className="form-radio"
                          />
                          <div className="flex items-center flex-1">
                            <span className="w-1/6 text-center">
                              {option.amount}
                            </span>
                            <span className="w-1/6 text-center">
                              {option.type}
                            </span>
                            <span className="w-2/3 text-left pl-2">
                              {option.label}
                            </span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border p-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              {calculateLoader && (
                <div>
                  <div className="flex flex-col items-center justify-between">
                    <div className="mb-2 h-8 w-full animate-pulse rounded bg-gray-200"></div>
                    <div className="mb-2 h-8 w-full animate-pulse rounded bg-gray-200"></div>
                    <div className="mb-2 h-8 w-full animate-pulse rounded bg-gray-200"></div>
                    <div className="mb-2 h-8 w-full animate-pulse rounded bg-gray-200"></div>
                    <div className="relative h-2/3 w-full animate-pulse">
                      <div className="mb-2 h-64 w-full rounded bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              )}
              {!calculateLoader && (
                <>
                  <div className="my-4 border-t border-gray-300" />
                  <div className="grid grid-cols-2 justify-between">
                    <span className="text-sm">Cart Subtotal</span>
                    <span className="flex justify-end text-sm">
                      ${totalAfterCalculation?.original_price.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 justify-between">
                    <span className="text-sm">Discounted Price</span>
                    <span className="flex justify-end text-sm">
                      $
                      {totalAfterCalculation?.final_price_excluding_tax.toFixed(
                        2,
                      )}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 justify-between">
                    <span className="text-sm">Tax</span>
                    <span className="flex justify-end text-sm">
                      ${totalAfterCalculation?.item_tax_price.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 justify-between">
                    <span className="text-sm">Discounted Subtotal</span>
                    <span className="flex justify-end text-sm">
                      $
                      {totalAfterCalculation?.final_price_including_tax.toFixed(
                        2,
                      )}
                    </span>
                  </div>
                  <div className="mt-6 grid grid-cols-3 justify-between">
                    <div className="flex flex-col col-span-2">
                      <span className="text-sm">Shipping</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {shipping?.label} - {shipping?.type}
                      </span>
                    </div>

                    <span className="flex justify-end text-sm col-span-1">
                      ${shipping?.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-6 grid grid-cols-2 justify-between">
                    <div className="flex flex-col">
                      <span className="text-md font-bold">Order Total</span>
                    </div>

                    <span className="text-md flex justify-end font-bold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <div className="my-4 border-t border-gray-300" />
                  <div className="mt-6 flex">
                    <Button
                      onClick={() => handlePlaceOrder()}
                      disabled={totalAfterCalculation ? false : true}
                      width="w-full"
                      title="Place Order"
                    />
                  </div>
                  {/* <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <div className="grid grid-cols-2 justify-between">
                          <div className="flex flex-col">
                            <span className="font-sans text-sm">
                              Items in cart: {newItems.length}
                            </span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ScrollArea className="h-96 rounded-md border">
                          {newItems.length > 0 ? (
                            newItems.map((item: DataCart, index: number) => (
                              <CartItemCard
                                key={index}
                                id={item.item_id}
                                name={item.book_title}
                                price={item.item_sale_price}
                                imageUrl={item.object_path}
                                showRemove={false}
                                final_price_including_tax={
                                  item?.final_price_including_tax
                                }
                                stock={item.stock}
                                itemQuantity={item?.quantity}
                                showQuantityIncriment={false}
                                onRemove={() => {
                                  // setRemoveItem(item);
                                  // setIsOpenDeleteAlert(true);
                                }}
                              />
                            ))
                          ) : (
                            <div>
                              <p>You have no items in your shopping cart.</p>
                            </div>
                          )}
                        </ScrollArea>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion> */}
                  {/* <div className="mt-6 grid grid-cols-2 justify-between">
                    <div className="flex flex-col">
                      <span className="font-sans text-sm">
                        Items in cart: {newItems.length}
                      </span>
                    </div>
                  </div> */}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      {isOpenPaymentAlert ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-auto">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
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
                {/*body*/}
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
                    sandbox="allow-scripts allow-same-origin" // Add this only if necessary
                  ></iframe>
                </div>
                {/*footer*/}
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
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
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

const PlaceOrderPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <MyComponent />
    </Suspense>
  );
};

export default PlaceOrderPage;
