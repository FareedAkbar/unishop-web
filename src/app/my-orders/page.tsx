"use client";

import { Controls, Player } from "@lottiefiles/react-lottie-player";
// import Header from "~/components/header";
import ProductGradient from "../../components/productGradient";
import { useRouter, useSearchParams } from "next/navigation";
import BooksImage from "../../../public/book.json";
import { useAuthContext } from "~/Context/AuthContext";
import type DataCart from "~/types/book";
import { Suspense, useCallback, useEffect, useState } from "react";
import SearchInput from "~/components/Fields/search";
import { FiSearch } from "react-icons/fi";
import SpecialOrderCard from "~/components/specialOrderCard";
import type { BookDetailType } from "~/types/specialOrderBook";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import Spinner from "~/components/spinner";
import Image from "next/image";
import moment from "moment";
import { FaCartPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import BooknetForm from "~/components/Forms/booknet-form";
import CheckoutForm from "~/components/Forms/checkout-form";
import type { CheckoutForm as checkoutFormValue } from "~/types/checkoutForm";
import { formatDate, formatDateTime } from "~/utils/dateAndTime";
import { useToast } from "~/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  GetSpecialOrder,
  GetSpecialOrderApiResponse,
  OrderStatus,
  OrderStatusResponse,
  SpecialOrderItem,
  UpdateSpecialOrderPayload,
} from "~/types/getSpecialBackOrders";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import PayloadForTrasactionLink from "~/types/payloadForTrasactionLink";
import socket from "~/utils/socket";


const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MzQ5LCJwcm9maWxlX2lkIjoxOTgsIm91dGxldF9pZCI6IjIyMSIsImZpcnN0X25hbWUiOiJTaGFtcyIsImxhc3RfbmFtZSI6IlFhemkiLCJ0ZW1wbGF0ZV9pZCI6NSwicGFzc3BvcnRfbm8iOm51bGwsImRhdGVfb2ZfYmlydGgiOm51bGwsImdlbmRlciI6bnVsbCwiZGVzaWduYXRpb25faWQiOlsxXSwiZW1haWwiOiJzaGFtcy5xYXppQGdtYWlsLmNvbSIsInBob25lX251bWJlciI6Iis5MjMyMTk1NjUwMjUiLCJzaWduX3VwIjoiMjAyMy0xMi0yMVQwNToxMTo0OC4wMDBaIiwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMjFUMDU6MTE6NDguMDAwWiIsInNlc3Npb25faWQiOjExNjg1LCJzYWx0IjpudWxsLCJpYXQiOjE3MjU5NTgyMDJ9.R-8jJlaDp2ExXVWLJa_X-fgc4lMAsjlWq3DhPjBXs2U`;

const requestOptions: RequestInit = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json", // Optional, depending on your API
  },
  redirect: "follow", // Use the correct type for `redirect`
};

const MyComponent = () => {
  const {  bookentcustomerId,checkoutData } =
    useAuthContext();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState<GetSpecialOrder[]>([]);
  const [selectedItem, setSelectedItem] = useState<GetSpecialOrder | null>(null);
  const [orderStatus, setOrderStatus] = useState<OrderStatus[]>([]);
  const { toast } = useToast();
  const [transactionData, setTransactionData] =
  useState<trasactionResponse | null>(null);
  const [isOpenPaymentAlert, setIsOpenPaymentAlert] = useState(false);
  const [loading, setLoading] = useState(true);

  type trasactionResponse = {
    amount: number | null;
    customer_id: number | null;
    link: string;
    unique_id: number | null;
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
            Authorization: `Bearer ${token}`,
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


  const fetchOrderStatus = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        `https://ipos-dev.iconsole.com.au/api/v1/ipos/orders/getOrderStatuses`,
        requestOptions,
      );
      const result: OrderStatusResponse =
        (await response.json()) as OrderStatusResponse;

      // Check if result has the expected structure
      if (result?.status) {
        // setMeta(result.meta);
        setOrderStatus(result.data);
      } else {
        console.error("Unexpected result structure:", result);
        // Handle unexpected structure here
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };




  const fetchData = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        `https://booknet-dev.iconsole.com.au/api/special/customer?booknet_customer_id=${bookentcustomerId}&special=1`,
        requestOptions,
      );
      const result: GetSpecialOrderApiResponse =
        (await response.json()) as GetSpecialOrderApiResponse;

      // Check if result has the expected structure
      if (result?.status) {
        // setMeta(result.meta);
        setData(result.data);
      } else {
        console.error("Unexpected result structure:", result);
        // Handle unexpected structure here
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  // Handle add to cart

  useEffect(() => {
    if (!bookentcustomerId) return;
    fetchData();
    fetchOrderStatus();
  }, [bookentcustomerId]);

  function getOrderStatusById(orderStatusId: number) {
    return orderStatus.find(status => status.status_id === orderStatusId);
}




const handlePayment = async (item: GetSpecialOrder)=>{
  // setSelectedItem(item)
  // try {
  //   await placeOrderApi(797480017);
  // } catch (error) {
  //   console.error("Failed to load data:", error);
  // }
  setSelectedItem(item)
  const x = {
    customer_id: checkoutData?.customer_id,
    guest_id: checkoutData?.customer_id ? null :checkoutData?.uuid,
    amount: 0.01,
  };
  console.log(x);
  console.log(item);

  try {
    await getLinkForPayment(x);

    console.log(x);
  } catch (error) {
    console.error("Failed to load data:", error);
  }
}



const placeOrderApiCall = async (requestOptions: UpdateSpecialOrderPayload) => {
  console.log(requestOptions);
  try {
    const response = await fetch(
      "https://booknet-dev.iconsole.com.au/api/special/web",
      {
        method: "PUT", // Assuming you're making a POST request
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
        description:
          "Your order has been processed successfully for this order.",
      });
      
      setIsOpenPaymentAlert(false);
     
      router.push("/");
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
  
  if (!Array.isArray(selectedItem?.special_order_items) || selectedItem?.special_order_items.length === 0) {
    console.warn("Input array is empty or not an array:", selectedItem?.special_order_items);
    return []; // Return an empty array if no valid input
  }
 
  const x = selectedItem?.special_order_items.map((item) => {
    return {
      back_order_item_id: item.back_order_item_id,
      quantity_item: item.quantity,
      notes: item.note,
      item_id: item.item_id,
      variable_id: item.variable_id,
      item_price: item.item_price,
      discounted_price: item.discounted_price,
      deal_id: null, // Assuming deal_id is null since it's not provided
      
    };
  });

  return x;
}

const placeOrderApi = async (id: number) => {
 
  if(selectedItem){
    const x = {
      order_type: 0,
      tracking_id: selectedItem?.tracking_id,
      back_order_id: selectedItem?.back_order_id,
      order_status: 70,
      total_order_price: selectedItem?.total_order_price,
      // tab_limit: 0.0,
      outlet_id: selectedItem?.outlet,
      final_price_including_tax: selectedItem?.total_discounted_price,
      transaction_id: id.toString(),
      booknet_customer_id: bookentcustomerId,
      customer_id: checkoutData?.customer_id,
       special_order_items:  await convertPayload(),
    };
    try {
      await placeOrderApiCall(x);
      console.log(x);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  }
  
};



useEffect(() => {
  console.log("Connected to server after");
  if (!checkoutData?.uuid) return;

  const connectHandler = () => {
    console.log("Connected to server", socket.id);
  
    socket.emit("/studentHandshake", { student_id: checkoutData?.customer_id ?? checkoutData?.uuid }, () => {
      console.log("studentHandshake");
    });
  };

  socket.on("connect", connectHandler);

  return () => {
    socket.off("connect", connectHandler);
  };
}, [checkoutData]);

type socketResponse = {
  customer_id: number;
  message: string;
  status: boolean;
  transaction_id: number;
};

interface dataresponse {
  data: socketResponse;
}
const PaymentStatus = useCallback(() => {
  if (!checkoutData?.uuid) return;
  
  console.log("Payment Socket");

  const handlePaymentStatus = async (dat: dataresponse) => {
    
    const { data } = dat;

    if (data.status) {
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully for this order.",
      });
    
     
      try {
        await placeOrderApi(data.transaction_id);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    } else {
      toast({
        title: "Payment Declined",
        variant: "destructive",
        description: "Unfortunately, your payment could not be processed. Please try again.",
      });
      
     
    }
    setTransactionData(null)
    setIsOpenPaymentAlert(false);
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


  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {/* {name}
      <Button onClick={()=>ChangeName()}>change name</Button> */}
        {loader && <Spinner />}

        <div className="z-30 rounded-md border w-full">
          <Table>
            <TableCaption>A list of your recent orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead >Order Status</TableHead>

                <TableHead>Price</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Special items</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((invoice) => (
                <TableRow key={invoice.tracking_id}>
                  <TableCell className="font-medium">
                    {getOrderStatusById(invoice.order_status)?.status_detail}
                  </TableCell>
                  <TableCell>{invoice.total_discounted_price}</TableCell>
                  <TableCell>{moment(invoice.started).format("MM/DD/YYYY")}</TableCell>
                  <TableCell className="text-right">
                    {invoice.total_discounted_price}
                  </TableCell>
                  <TableCell>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <div className="grid grid-cols-2 justify-between">
                          <div className="flex flex-col">
                            <span className="font-sans text-sm">
                              Special order Items:{" "}
                              {invoice.special_order_items.length}
                            </span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="w-3/4">
                        <ScrollArea className="h-sm rounded-md border">
                          {invoice.special_order_items.length > 0 ? (
                            invoice.special_order_items.map(
                              (item: SpecialOrderItem, index: number) => (
                                <div className="flex flex-col" key={index}>
                                  <div>Title: {item.special_items.title}</div>
                                  <div>Author: {item.special_items.author}</div>
                                  
                                  <div>Publication Date: {item.special_items.pubDate}</div>
                                  <div>Peice: {item.special_items.price}</div>
                                </div>
                              ),
                            )
                          ) : (
                            <div>
                              <p>You have no items.</p>
                            </div>
                          )}
                        </ScrollArea>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  </TableCell>
                  <TableCell  className="text-center">
                          {invoice.order_status == 67 && (
                            <Button onClick={()=>handlePayment(invoice)} disabled={invoice.special_order_items.length == 0 }>Payment</Button>
                          )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter> */}
          </Table>
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
                      <span>Loading...</span>{" "}
                      {/* You can replace this with a spinner or any loading indicator */}
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
    </div>
  );
};
const SpecialOrderPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
};

export default SpecialOrderPage;
