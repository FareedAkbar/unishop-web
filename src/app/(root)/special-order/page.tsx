"use client";

import { Controls, Player } from "@lottiefiles/react-lottie-player";
// import Header from "~/components/header";
import ProductGradient from "../../../components/productGradient";
import { useRouter, useSearchParams } from "next/navigation";
import BooksImage from "../../../../public/book.json";
import { useAuthContext } from "~/Context/AuthContext";
import type DataCart from "~/types/book";
import { Suspense, useState } from "react";
import SearchInput from "~/components/Fields/search";
import { FiSearch } from "react-icons/fi";
// import SpecialOrderCard from "~/components/specialOrderCard";
import {
  BookDetailType,
  SpecialBookType,
  SpecialOrderPayload,
} from "~/types/specialOrderBook";
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
import { Tabs } from "~/components/ui/tabs";
import SpecialOrderCard from "~/components/ui-components/SpecialOrderCard";
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { token221, token223 } from "~/types/tokens";

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

const requestOptions: RequestInit = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token223}`,
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
  const [bookeSearched, setBookSearched] = useState<SpecialBookType | null>(
    null,
  );
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
        console.error("Unexpected result structure fetchData:", result);
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
        console.error("Unexpected result structure fetchDetail:", result);
        // Handle unexpected structure here
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  // Handle add to cart

  const handleSearch = async () => {
    await fetchData(searchValue);
  };

  const handleDetail = async (item: SpecialBookType) => {
    const title = item.title.slice(0, 10);
    const newItem = { ...item, title: title };
    setBookSearched(newItem);
    console.log(newItem);
    await fetchDetail(item.link);
    setShowCheckout(true);
  };

  const handleCreateOrder = (item: BookDetailType) => {
    // fetchDetail(item.link);
    setShowCheckout(true);
    setView("checkout");
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
            Authorization: `Bearer ${token223}`,
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
        console.error("Unexpected result structure placeOrderApiCall:", result);
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
      online_order_type: 1,
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

  const tabs = [
    {
      title: "Checkout",
      value: "checkout",
      content: (
        <CheckoutForm
          title=""
          subTitle=""
          pushPath=""
          push={false}
          handleData={(d) => handleCheckoutSubmit(d)}
        />
      ),
    },
    {
      title: "Booknet Account",
      value: "booknetForm",
      content: (
        <BooknetForm
          push={false}
          handleData={(d) => handleCheckoutSubmit(d)}
          goTo="/"
        />
      ),
    },
  ];

  function getPriceRange(books: SpecialBookType) {
    const price = parseFloat(books.price.replace(/[^0-9.-]+/g, ""));
    // Return a range of ±5 AUD
    return `$${(price - 5).toFixed(2)} - $${(price + 5).toFixed(2)} AUD`;
  }

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center">
        {/* {name}
      <Button onClick={()=>ChangeName()}>change name</Button> */}
        {loader && <Spinner />}
        {!dataDetail && (
          <>
            <div className="flex flex-col items-center justify-center pt-32">
              <h1 className="text-md mb-6 text-center font-semibold text-gray-800 md:text-3xl">
                Discover Your Next Favourite Book
              </h1>
              <div className="w-full">
                <SearchInput
                  placeholder="Search books..."
                  onChange={(val) => setSearchValue(val.target.value)}
                  onIconClick={() => handleSearch()}
                  width="w-full"
                  icon={<FiSearch />}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center py-10">
              {data?.map((item: SpecialBookType) => (
                <SpecialOrderCard
                  key={item.link}
                  // stock={item.stock}
                  item={item}
                  openDetail={() => handleDetail(item)}
                />
              ))}
            </div>
          </>
        )}

        {dataDetail && (
          <div className="w-full rounded-lg bg-white p-4 pt-32 dark:bg-gray-800">
            {/* Header with Close and Back buttons */}
            <div className="mb-6 flex items-center justify-between">
              <button
                className="transform p-2 transition-transform duration-200 ease-in-out hover:scale-105 dark:text-gray-300 md:p-3 lg:p-4"
                onClick={() => setDataDetail(null)} // Back button action
              >
                <AiOutlineArrowLeft size={24} />
              </button>
              <h4 className="mx-4 flex-1 text-center font-bold dark:text-neutral-100 lg:text-lg">
                {dataDetail?.title}
              </h4>
              <button
                className="transform p-2 transition-transform duration-200 ease-in-out hover:scale-105 dark:text-gray-300 md:p-3 lg:p-4"
                onClick={() => setDataDetail(null)} // Close button action
              >
                <AiOutlineClose size={24} />
              </button>
            </div>

            <h5 className="mb-4 text-center text-sm text-neutral-800 dark:text-neutral-100 md:text-lg lg:px-10">
              {dataDetail?.mainDescription}
            </h5>
            <h5 className="md:text-md mb-6 text-center text-sm text-neutral-600 dark:text-neutral-100 lg:px-16">
              {dataDetail?.shortDescription}
            </h5>

            <div className="flex flex-col lg:items-start justify-between md:flex-row lg:justify-between">
              {/* Details Section */}
              <div className="flex flex-col items-start justify-start gap-y-2 lg:w-1/2">
                <motion.div
                  key={"images"}
                  style={{ rotate: Math.random() * 25 - 10 }}
                  whileHover={{ scale: 1.1, rotate: 0, zIndex: 100 }}
                  whileTap={{ scale: 1.1, rotate: 0, zIndex: 100 }}
                  className="mb-4 self-center overflow-hidden rounded-xl border border-neutral-100 bg-white dark:border-neutral-700 dark:bg-neutral-800 md:mb-0"
                >
                  <img
                    src={dataDetail?.coverImageUrl ?? ""}
                    alt={dataDetail?.title ?? "Cover Image"}
                    width="500"
                    height="500"
                    className="h-36 w-36 flex-shrink-0 rounded-lg object-cover md:h-64 md:w-48"
                  />
                </motion.div>
                <span className="font-serif text-2xl font-bold text-red-500 dark:text-neutral-300">
                  {bookeSearched ? getPriceRange(bookeSearched) : ''}
                </span>
                <span className="font-serif text-lg text-zinc-500 dark:text-neutral-300">
                  <span className="font-bold">Format:</span>
                  {dataDetail?.format}
                </span>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="font-bold">Series:</span>
                  {dataDetail?.edition}
                </span>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="font-bold">Published:</span>
                  {dataDetail?.publicationDate
                    ? moment(dataDetail.publicationDate).format("Do MMMM, YYYY")
                    : ""}
                </span>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="font-bold">Subject:</span>
                  {dataDetail?.subject}
                </span>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="font-bold">Number of Pages:</span>
                  {dataDetail?.numberOfPages}
                </span>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="font-bold">Publisher:</span>
                  {dataDetail?.originalPublisher}
                </span>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="font-bold">Author:</span>
                  {dataDetail?.author}
                </span>

                {/* <button
                  className="mt-4 flex items-center space-x-1 self-center rounded bg-green-500 p-2 text-xs font-bold text-white hover:bg-green-600 dark:bg-zinc-800"
                  onClick={() => handleCreateOrder(dataDetail)}
                >
                  <FaCartPlus className="text-lg" />
                  <div className="pl-2">Make Special Order</div>
                </button> */}
              </div>

              {/* Tabs Section */}
              <div className=" mb-4 mt-10 lg:w-1/2 lg:px-10">
                {showCheckout && <Tabs tabs={tabs} />}
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
    <Suspense fallback={<Spinner />}>
      <MyComponent />
    </Suspense>
  );
};

export default SpecialOrderPage;
