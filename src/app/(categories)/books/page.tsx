"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "~/Context/AuthContext";
import type DataCart from "~/types/book";
import Spinner from "~/components/spinner";
import ProductCardSkeleton from "~/components/ui-components/ProductCardSkeleton";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalProvider,
  useModal,
} from "~/components/ui/animated-modal";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCartPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import moment from "moment";
import React from "react";
import ProductCard from "~/components/ui-components/ProductCard";
import { ScrollArea } from "~/components/ui/scroll-area";
import { getBooks } from "~/_actions/getbooks";
import { useToast } from "~/hooks/use-toast";
import AlertBox from "~/components/alertBox/alert";

const PRODUCTS_PER_PAGE = 10;

const MyComponent = () => {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [data, setData] = useState<DataCart[]>([]);
  const isFirstRender = useRef(true);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<DataCart[] | null>(null);
  const params = useSearchParams();
  const { setOpen } = useModal();
  const [detail, setDetail] = useState<string | null>(null);
  const [itemDetail, setItemDetail] = useState<DataCart | null>(null);
  const [loginAlert, setLoginAlert] = useState<boolean>(false);
  const {
    cartItems,
    addCartItems,
    removeCartItems,
    genre,
    addFavourite,
    checkoutData,
  } = useAuthContext();
  const { toast } = useToast();

  useEffect(() => {
    const d = params.get("detail");
    setDetail(d);
  }, [params]);

  useEffect(() => {
    if (!genre) return;
    const genId = genre?.find((item) => item.genre == detail);
    if (!genId) return;
    const loadData = async () => {
      try {
        setLoader(true);
        const x = await getBooks(genId?.genre_id ?? 1);
        if (typeof x !== "boolean" && x.status) {
          setData(x.data);
          setFilteredData(x.data);
        }
        setLoader(false);
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

  const handleFavourite = async (item: DataCart) => {
    if (checkoutData?.booknet_customer_id) {
      await addFavourite(item.item_id, checkoutData.booknet_customer_id).then(
        (x) => {
          if (x) {
            toast({
              variant: "success",
              title: "Added To Wishlist",
              description: "Item has been added successfully.",
            });
          }
        },
      );
    } else {
      setLoginAlert(true);
    }
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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Get the products for the current page
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const filterResult = () => {
    let filtered = data;

    // Search filter
    if (searchText) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    }

    // Date range filter

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page on new filter
  };
  // Calculate total pages based on filtered data and page size
  const totalPages = Math.ceil(
    filteredData ? filteredData?.length / pageSize : 1 / pageSize,
  );

  // Get the data to be displayed for the current page
  const displayedData = filteredData?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  useEffect(() => {
    filterResult();
  }, [searchText, data]);

  const goToLogin = () => {
    setLoginAlert(false);
    router.push("login");
  };

  return (
    <div>
      <motion.main
        className="flex min-h-screen flex-col items-center pt-20 pb-5"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-row">
          <div className="flex flex-col px-4 lg:pl-64">
            <div className="m-4 flex flex-wrap items-end justify-between gap-4">
              <div className="text-left">
                <h2 className="text-xl font-bold">Books</h2>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {detail}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search"
                  className="rounded border border-gray-300 px-2 py-1 dark:bg-slate-700 dark:text-white"
                />
                <h1 className="font-bold">
                  Showing {displayedData?.length} of {data.length} Items
                </h1>
              </div>
            </div>

            <ScrollArea className="h-[75vh] pb-5">
              <div className="flex flex-wrap justify-center py-3">
                {loader
                  ? Array.from({ length: 6 }, (_, index) => (
                      <div key={index} className="p-2">
                        <ProductCardSkeleton />
                      </div>
                    ))
                  : displayedData?.map((item: DataCart) => (
                      <ProductCard
                        key={item.book_id}
                        product={item}
                        showAddToCart={!isItemInCart(item.item_id)}
                        onAddToCart={() => handleAddToCart(item)}
                        onRemoveFromCart={() => handleRemoveFromCart(item)}
                        openDetail={() => openDetail(item)}
                        handleFavourite={() => handleFavourite(item)}
                      />
                    ))}
              </div>
            </ScrollArea>
            <div className="z-10 flex justify-between px-4 ">
              <button
                className={`rounded-full p-2 ${currentPage === 1 ? "bg-gray-200 text-black" : "cursor-pointer bg-red-500 text-white"}`}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
              <span className="px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`rounded-full p-2 ${currentPage === totalPages ? "bg-gray-200 text-black" : "cursor-pointer bg-red-500 text-white"}`}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </motion.main>

      <ModalBody>
        <ModalContent>
          <h4 className="pb-3 text-center font-serif text-lg font-bold text-red-500 dark:text-neutral-100 md:text-2xl">
            {itemDetail?.book_title}
          </h4>
          <h6 className="pb-2 text-center text-sm font-bold text-neutral-600 dark:text-neutral-100 md:text-xl">
            {itemDetail?.description}
          </h6>
          <h6 className="pb-4 text-center text-sm text-neutral-600 dark:text-neutral-100 md:text-lg">
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
                  className="mr-4 mt-4 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1 dark:border-slate-900 dark:bg-slate-700"
                >
                  <Image
                    src={
                      itemDetail?.object_path
                        ? `https://ipos-storage.s3.amazonaws.com/${itemDetail.object_path}`
                        : "/bookIcon.png"
                    }
                    alt={itemDetail?.object_path ?? ""}
                    width={500}
                    height={500}
                    className="h-36 w-36 flex-shrink-0 rounded-lg object-cover md:h-64 md:w-44"
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
                <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Series:
                </span>
                <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                  {itemDetail?.edition}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Published:
                </span>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  {itemDetail?.introduced
                    ? moment(itemDetail.introduced).format("Do MMMM, YYYY")
                    : ""}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Language:
                </span>
                <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                  {itemDetail?.book_language}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Number of Pages:
                </span>
                <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                  {itemDetail?.pages}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Publisher:
                </span>
                <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                  {itemDetail?.publisher.publisher_name}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Country of Publication:
                </span>
                <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                  {itemDetail?.publisher.country}
                </span>
              </div>

              {itemDetail?.item_id &&
              !isItemInCart(itemDetail.item_id) &&
              itemDetail?.stock?.quantity ? (
                <button
                  className="flex items-center space-x-1 rounded-full bg-green-500 py-1 pl-2 pr-2 text-xs font-bold text-white"
                  onClick={() => handleAddToCart(itemDetail)}
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
            className="w-28 rounded-md border border-gray-300 bg-gray-200 px-2 py-1 text-sm dark:border-slate-950 dark:bg-slate-900"
          >
            Close
          </button>
          {/* <button className="w-28 rounded-md border border-black bg-black px-2 py-1 text-sm text-white dark:bg-white dark:text-black">
              Book Now
            </button> */}
        </ModalFooter>
      </ModalBody>
      <AlertBox
        title="Login Your Account"
        description="Please login to add item to wishlist"
        open={loginAlert}
        onClose={() => setLoginAlert(false)}
        onContinue={() => goToLogin()}
      />
    </div>
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
