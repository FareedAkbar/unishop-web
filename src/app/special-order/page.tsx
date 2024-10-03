"use client";

import { Controls, Player } from "@lottiefiles/react-lottie-player";
// import Header from "~/components/header";
import ProductGradient from "../../components/productGradient";
import { useRouter, useSearchParams } from "next/navigation";
import BooksImage from "../../../public/book.json";
import { useAuthContext } from "~/Context/AuthContext";
import type DataCart from "~/types/book";
import { Suspense, useState } from "react";
import SearchInput from "~/components/Fields/search";
import { FiSearch } from "react-icons/fi";
import SpecialOrderCard from "~/components/specialOrderCard";
import { BookDetailType, SpecialBookType, SpecialOrderPayload } from "~/types/specialOrderBook";
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
import { generateOTP } from "~/utils/generateOTP";



interface ApiResponse {
  // meta: PaginationData; // Adjust based on your actual structure
  data: SpecialBookType[];
  status: boolean;
}
interface ApiBookDetailResponse {
  // meta: PaginationData; // Adjust based on your actual structure
  data: BookDetailType;
  status: boolean;
}
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
  const { cartItems, addCartItems, removeCartItems } = useAuthContext();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState<SpecialBookType[]>([]);
  const { toast } = useToast();
  const [dataDetail, setDataDetail] = useState<BookDetailType | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [bookeSearched, setBookSearched] = useState<SpecialBookType | null>(null);
  const [view, setView] = useState("checkout");
  const [showCheckout, setShowCheckout] = useState(false);

  const params = useSearchParams();
  const detail = params.get("detail");

  const fetchData = async (search: string) => {
    setLoader(true);
    try {
      const response = await fetch(
        `https://booknet-dev.iconsole.com.au/api/search?term=${search}&by=titletext&ebooks=on&detailed=Search`,
        requestOptions,
      );
      const result: ApiResponse = (await response.json()) as ApiResponse;

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

  const fetchDetail = async (link: string) => {
    setLoader(true);

    try {
      const response = await fetch(
        `https://booknet-dev.iconsole.com.au/api/search/details?title=${link}`,
        requestOptions,
      );
      const result: ApiBookDetailResponse =
        (await response.json()) as ApiBookDetailResponse;

      // Check if result has the expected structure
      if (result?.status) {
        // setMeta(result.meta);
        setDataDetail(result.data);
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

  const handleSearch = () => {
    fetchData(searchValue);
  };

  const handleDetail = (item: SpecialBookType) => {

    let title = item.title.slice(0,10)
    const newItem = {...item, title: title}
    setBookSearched(newItem);
    console.log(newItem)
    fetchDetail(item.link);
    setShowCheckout(true);
  };

  const handleCreateOrder = (item: BookDetailType) => {
    // fetchDetail(item.link);
    setShowCheckout(true);
    setView("checkout");
    console.log(item);
  };

  const placeOrderApiCall = async (requestOptions: SpecialOrderPayload) => {
    console.log(requestOptions);
    setLoader(true);
    try {
      const response = await fetch(
        "https://booknet-dev.iconsole.com.au/api/special",
        {
          method: "POST", // Assuming you're making a POST request
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestOptions), // Send the payload as JSON
        },
      );

      const result: ApiResponse = (await response.json()) as ApiResponse;

      // Check if result has the expected structure
      if (result?.status) {
        toast({
          title: "Order Successful",
          description:
            "Your order has been processed successfully for this order.",
        });

        setDataDetail(null);
        setBookSearched(null);

        // router.push("/");
      } else {
        toast({
          title: "Order Declined",
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
      setLoader(false);
    }
  };

  const handleCheckoutSubmit = async (item: checkoutFormValue) => {
    // fetchDetail(item.link);
    const date = new Date();
    const newData = {
      tracking_id: generateOTP(12).toString(),
      order_type: 2,
      online_order_type: true,
      order_status: 66,
      completed_date: formatDate(date),
      started: formatDateTime(date),
      booknet_customer_id: item?.booknet_customer_id,
      guest: item?.uuid,
      details: "order Detail|Unishop Special order",
      member_id: null,
      special_order_items: [
        {
          book_details: bookeSearched,
          deal_id: null,
          quantity_item: 1.0,
          notes: "item",
          is_deal: null,
        },
      ],
    };
    try {
      await placeOrderApiCall(newData);
      
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  
  };

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center ">
        {/* {name}
      <Button onClick={()=>ChangeName()}>change name</Button> */}
        {loader && <Spinner />}
        {!dataDetail && (
          <>
            <div className="mt-32">
              {" "}
              <SearchInput
                placeholder="book search"
                onChange={(val) => setSearchValue(val.target.value)}
                onIconClick={() => handleSearch()}
                width="w-64"
                icon={<FiSearch />}
              />
            </div>
            
            <div className="mx-auto max-w-5xl px-8"></div>
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
              <div className="xs:grid-cols-1 grid gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
                {data?.map((item: SpecialBookType) => (
                  <SpecialOrderCard
                    key={item.link}
                    // stock={item.stock}
                    item={item}
                    openDetail={() => handleDetail(item)}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {dataDetail && (
          <div className="mt-32 w-2/3">
            <div>
              <div>
                <h4 className="mb-3 text-center font-serif text-lg font-bold text-neutral-600 dark:text-neutral-100 md:text-2xl">
                  {dataDetail?.title}
                </h4>
                <h6 className="mb-2 text-center text-sm text-neutral-600 dark:text-neutral-100 md:text-xl">
                  {dataDetail?.mainDescription}
                </h6>
                <h6 className="mb-8 text-center text-sm text-neutral-600 dark:text-neutral-100 md:text-lg">
                  {dataDetail?.shortDescription}
                </h6>
                <div className="flex justify-evenly">
                  <div className="mx-auto flex items-center justify-end">
                    <motion.div
                      key={"images"}
                      style={{
                        rotate: Math.random() * 20 - 10,
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotate: 0,
                        zIndex: 100,
                      }}
                      whileTap={{
                        scale: 1.1,
                        rotate: 0,
                        zIndex: 100,
                      }}
                      className="-mr-4 mt-4 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
                    >
                      <img
                        src={
                          dataDetail?.coverImageUrl
                            ? dataDetail.coverImageUrl
                            : ""
                        }
                        alt={dataDetail?.coverImageUrl ?? ""}
                        width="500"
                        height="500"
                        className="h-36 w-36 flex-shrink-0 rounded-lg object-cover md:h-96 md:w-64"
                      />
                    </motion.div>
                  </div>

                  <div className="mx-auto flex max-w-sm flex-col items-start justify-start gap-x-4 gap-y-2">
                    <div className="flex flex-col">
                      <span className="font-serif text-2xl font-bold text-red-500 dark:text-neutral-300">
                        ${dataDetail?.price}
                      </span>
                      <span className="font-serif text-lg text-zinc-500 dark:text-neutral-300">
                        Format: {dataDetail?.format}
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        Series: {dataDetail?.edition}
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      {/* <ElevatorIcon className="mr-1 h-4 w-4 text-neutral-700 dark:text-neutral-300" /> */}
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        Published:{" "}
                        {dataDetail?.publicationDate
                          ? moment(dataDetail.publicationDate).format(
                              "Do MMMM, YYYY",
                            )
                          : ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        Subject: {dataDetail?.subject}
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        Number of Pages: {dataDetail?.numberOfPages}
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        Publisher: {dataDetail?.originalPublisher}
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        Author: {dataDetail?.author}
                      </span>
                    </div>

                    <button
                      className="flex items-center space-x-1 rounded-full bg-green-500 py-1 pl-2 pr-2 text-xs font-bold text-white dark:bg-zinc-800"
                      onClick={() => handleCreateOrder(dataDetail)}
                    >
                      <FaCartPlus className="text-lg" />
                      <div className="pl-2">Make Special Order</div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mb-4 mt-10 flex justify-center gap-4">
                <button
                  onClick={() => setDataDetail(null)}
                  className="w-28 rounded-md border border-gray-300 bg-gray-200 px-2 py-1 text-sm text-black dark:border-black dark:bg-black dark:text-white"
                >
                  Close
                </button>
                {/* <button className="w-28 rounded-md border border-black bg-black px-2 py-1 text-sm text-white dark:bg-white dark:text-black">
              Book Now
            </button> */}
              </div>
            </div>
            <div className="mb-4 flex flex-col justify-center">
              {showCheckout && view == "checkout" ? (
                <div className="col-span-2 grid">
                  <CheckoutForm
                    push={false}
                    handleData={(d) => handleCheckoutSubmit(d)}
                  />
                </div>
              ) : (
                <BooknetForm
                  push={false}
                  handleData={(d) => handleCheckoutSubmit(d)}
                  goTo="/"
                />
              )}
              <div className="mt-5 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
              <div className="mt-2 flex justify-center text-black hover:text-red-400">
                <div
                  className="cursor-pointer hover:text-red-500"
                  onClick={() =>
                    setView(view == "checkout" ? "booknetForm" : "checkout")
                  }
                >
                  {view == "checkout"
                    ? "I already have booknet account"
                    : "I don't have booknet account yet"}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
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
