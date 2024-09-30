"use client";

import { Controls, Player } from "@lottiefiles/react-lottie-player";
// import Header from "~/components/header";
import ProductGradient from "../../components/productGradient";
import { Suspense, useEffect, useRef, useState } from "react";
// import Pagination from "~/components/pagination";
import { useSearchParams } from "next/navigation";
import BookSkelton from "./bookSkelton";
import { useAuthContext } from "~/Context/AuthContext";
import BooksImage from "../../../public/book.json";
// import type PaginationData from '~/types/paginationData'
import type DataCart from "~/types/book";
import Spinner from "~/components/spinner";
import BookIcon from "../../../public/bookIcon.png";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalProvider,
  useModal,
} from "~/components/ui/animated-modal";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCartPlus } from "react-icons/fa";
import moment from "moment";

const requestOptions: RequestInit = {
  method: "GET",
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MzQ5LCJwcm9maWxlX2lkIjoxOTgsIm91dGxldF9pZCI6IjIyMSIsImZpcnN0X25hbWUiOiJTaGFtcyIsImxhc3RfbmFtZSI6IlFhemkiLCJ0ZW1wbGF0ZV9pZCI6NSwicGFzc3BvcnRfbm8iOm51bGwsImRhdGVfb2ZfYmlydGgiOm51bGwsImdlbmRlciI6bnVsbCwiZGVzaWduYXRpb25faWQiOlsxXSwiZW1haWwiOiJzaGFtcy5xYXppQGdtYWlsLmNvbSIsInBob25lX251bWJlciI6Iis5MjMyMTk1NjUwMjUiLCJzaWduX3VwIjoiMjAyMy0xMi0yMVQwNToxMTo0OC4wMDBaIiwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMjFUMDU6MTE6NDguMDAwWiIsInNlc3Npb25faWQiOjExNjg1LCJzYWx0IjpudWxsLCJpYXQiOjE3MjU5NTgyMDJ9.R-8jJlaDp2ExXVWLJa_X-fgc4lMAsjlWq3DhPjBXs2U`,
    "Content-Type": "application/json", // Optional, depending on your API
  },
  redirect: "follow", // Use the correct type for `redirect`
};

interface ApiResponse {
  // meta: PaginationData; // Adjust based on your actual structure
  data: DataCart[];
  status: boolean;
}

const MyComponent = () => {
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [totalPages, setTotalPages] = useState<number>(1);
  const [loader, setLoader] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [data, setData] = useState<DataCart[]>([]);
  const isFirstRender = useRef(true);
  // const [meta, setMeta] = useState<PaginationData>({
  //   current_page_url: null,
  //   first_page_url: null,
  //   from: 1,
  //   last_page_url: null,
  //   limit: 10,
  //   links: [],
  //   next_page_url: null,
  //   page: 1,
  //   pages: 1,
  //   pagination: false,
  //   prev_page_url: null,
  //   to: 1,
  //   total: 0,
  // });
  const params = useSearchParams();
  const detail = params.get("detail");
  const { setOpen } = useModal();
  const [itemDetail, setItemDetail] = useState<DataCart | null>(null);
  const { cartItems, addCartItems, removeCartItems, genre } = useAuthContext();
  const fetchData = async (genre_id: number) => {
    setLoader(true);
    try {
      const response = await fetch(
        `https://booknet-dev.iconsole.com.au/api/books/getBooksByGenreCat?genre_id=${genre_id}&category_id=27&entries=1&images=1&detailed=1`,
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

  useEffect(() => {
    if (!genre) return;
    const genId = genre?.find((item) => item.genre == detail);
    setDescription(genId?.description ?? "");
    const loadData = async () => {
      try {
        await fetchData(genId?.genre_id ?? 1);
        // setData(result);
        // setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Failed to load data:", error);
        setLoader(false);
        // Optionally set an error state here
      }
    };
    if (isFirstRender.current) {
      isFirstRender.current = false; // Prevents further API calls on first render
    } else {
      loadData().catch((error) => {
        console.error("Failed to load data in useEffect:", error);
      });
    }
  }, [genre, detail]);

  // Handle add to cart
  const handleAddToCart = async (item: DataCart) => {
    try {
      await addCartItems(item);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };
  const handleRemoveFromCart = async (item: DataCart) => {
    try {
      await removeCartItems(item);
    } catch (error) {
      console.error("Failed to remove item to cart:", error);
    }
  };

  const openDetail = async (item: DataCart) => {
    setOpen(true);
    setItemDetail(item);
  };

  const isItemInCart = (itemId: number) => {
    const newItems: DataCart[] =
      typeof cartItems === "string"
        ? (JSON.parse(cartItems) as DataCart[])
        : cartItems!;
    return newItems.findIndex(
      (cartItem: DataCart) => cartItem.item_id === itemId,
    ) > -1
      ? true
      : false;
  };

  // Handle pagination
  // useEffect(() => {
  //   // const startIndex = (currentPage - 1) * meta.limit;
  //   // const endIndex = startIndex + meta.limit;
  //   setTotalPages(Math.ceil(meta.total / meta.limit));
  // }, [currentPage, meta]);

  //  const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  //   // smoothScrollTo(0, 1500); //
  // };

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="grid h-[40rem] w-full items-center justify-between sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="flex flex-col">
            <h2 className="relative z-20 mx-auto mt-32 text-center font-serif text-2xl font-bold tracking-tight text-red-600 dark:text-white md:text-4xl lg:text-5xl">
              {detail}
            </h2>

            <p className="text-1xl inter-var relative left-0 top-[1px] bg-gradient-to-r from-zinc-600 via-zinc-600 to-zinc-500 bg-clip-text bg-no-repeat py-4 text-center font-sans text-transparent [text-shadow:0_0_rgba(0,0,0,0.1)] md:text-2xl lg:text-2xl">
              {description}
            </p>
          </div>
          <div className="mx-auto text-left">
            <Player
              autoplay
              loop
              src={BooksImage}
              style={{ height: "500px", width: "500px" }}
            >
              <Controls buttons={["play", "repeat", "frame", "debug"]} />
            </Player>
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-8"></div>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="sm:grid-cols2 xs:grid-cols-1 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
            {loader && (
              <>
                <BookSkelton />
                <BookSkelton />
                <BookSkelton />
                <BookSkelton />
              </>
            )}
            {!loader &&
              data?.map((item: DataCart) => (
                <ProductGradient
                  key={item.item_id}
                  book_title={item.book_title}
                  description={item.description}
                  object_path={item.object_path}
                  item_sale_price={item.item_sale_price}
                  showAddToCart={!isItemInCart(item.item_id)}
                  onAddToCart={() => handleAddToCart(item)}
                  onRemoveFromCart={() => handleRemoveFromCart(item)}
                  stock={item.stock}
                  item={item}
                  openDetail={() => openDetail(item)}
                />
              ))}
          </div>
          {/* {!loader ? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          ) : ''} */}
        </div>
      </main>
     
        <ModalBody>
          <ModalContent>
            <h4 className="mb-3 text-center font-serif text-lg font-bold text-neutral-600 dark:text-neutral-100 md:text-2xl">
              {itemDetail?.book_title}
            </h4>
            <h6 className="mb-2 text-center text-sm font-bold text-neutral-600 dark:text-neutral-100 md:text-xl">
              {itemDetail?.description}
            </h6>
            <h6 className="mb-8 text-center text-sm text-neutral-600 dark:text-neutral-100 md:text-lg">
              {itemDetail?.additional_notes}
            </h6>
            <div className="flex">
              <div>
                <div className="flex items-center justify-center">
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
                    <Image
                      src={
                        itemDetail?.object_path
                          ? `https://ipos-storage.s3.amazonaws.com/${itemDetail.object_path}`
                          : BookIcon
                      }
                      alt={itemDetail?.object_path || ''}
                      width="500"
                      height="500"
                      className="h-36 w-36 flex-shrink-0 rounded-lg object-cover md:h-80 md:w-48"
                    />
                  </motion.div>
                </div>
              </div>
              <div className="mx-auto flex max-w-sm flex-col items-start justify-start gap-x-4 gap-y-2">
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold text-red-500 dark:text-neutral-300">
                    ${itemDetail?.item_sale_price}
                  </span>
                  <span className="font-serif text-lg text-zinc-500 dark:text-neutral-300">
                    SKU {itemDetail?.SKU}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    Series: {itemDetail?.edition}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  {/* <ElevatorIcon className="mr-1 h-4 w-4 text-neutral-700 dark:text-neutral-300" /> */}
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    Published: {itemDetail?.introduced ? moment(itemDetail.introduced).format('Do MMMM, YYYY') : ''}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    Language: {itemDetail?.book_language}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    Number of Pages: {itemDetail?.pages}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    Publisher: {itemDetail?.publisher.publisher_name}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    Country of Publication: {itemDetail?.publisher.country}
                  </span>
                </div>
                {itemDetail?.item_id && !isItemInCart(itemDetail.item_id) && itemDetail?.stock?.quantity ? (
                  <button
                    className="flex items-center space-x-1 rounded-full bg-green-500 py-1 pl-2 pr-2 text-xs font-bold text-white dark:bg-zinc-800"
                    onClick={()=>handleAddToCart(itemDetail)}
                  >
                    <FaCartPlus className="text-lg" />
                    <div className="pl-2">Add to Cart</div>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            <button
              onClick={() => setOpen(false)}
              className="w-28 rounded-md border border-gray-300 bg-gray-200 px-2 py-1 text-sm text-black dark:border-black dark:bg-black dark:text-white"
            >
              Close
            </button>
            {/* <button className="w-28 rounded-md border border-black bg-black px-2 py-1 text-sm text-white dark:bg-white dark:text-black">
              Book Now
            </button> */}
          </ModalFooter>
        </ModalBody>
      
    </div>
  );
};
const PlaneIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
    </svg>
  );
};

const VacationIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17.553 16.75a7.5 7.5 0 0 0 -10.606 0" />
      <path d="M18 3.804a6 6 0 0 0 -8.196 2.196l10.392 6a6 6 0 0 0 -2.196 -8.196z" />
      <path d="M16.732 10c1.658 -2.87 2.225 -5.644 1.268 -6.196c-.957 -.552 -3.075 1.326 -4.732 4.196" />
      <path d="M15 9l-3 5.196" />
      <path d="M3 19.25a2.4 2.4 0 0 1 1 -.25a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 1 .25" />
    </svg>
  );
};

const ElevatorIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 4m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
      <path d="M10 10l2 -2l2 2" />
      <path d="M10 14l2 2l2 -2" />
    </svg>
  );
};

const FoodIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 20c0 -3.952 -.966 -16 -4.038 -16s-3.962 9.087 -3.962 14.756c0 -5.669 -.896 -14.756 -3.962 -14.756c-3.065 0 -4.038 12.048 -4.038 16" />
    </svg>
  );
};

const MicIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 12.9a5 5 0 1 0 -3.902 -3.9" />
      <path d="M15 12.9l-3.902 -3.899l-7.513 8.584a2 2 0 1 0 2.827 2.83l8.588 -7.515z" />
    </svg>
  );
};

const ParachuteIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M22 12a10 10 0 1 0 -20 0" />
      <path d="M22 12c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3c0 -1.66 -1.57 -3 -3.5 -3s-3.5 1.34 -3.5 3c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3" />
      <path d="M2 12l10 10l-3.5 -10" />
      <path d="M15.5 12l-3.5 10l10 -10" />
    </svg>
  );
};
const BooksPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ModalProvider>
        <MyComponent />
      </ModalProvider>
    </Suspense>
  );
};
export default BooksPage;
