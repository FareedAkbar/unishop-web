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
import { FaCartPlus } from "react-icons/fa";
import moment from "moment";
import React from "react";
import ProductCard from "~/components/ui-components/ProductCard";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import type { Category } from "~/types/category";
import { getBooks } from "~/_actions/gettextbooks";
import AlertBox from "~/components/alertBox/alert";
import { useToast } from "~/hooks/use-toast";

const dummyProducts = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  price: parseFloat((Math.random() * 100).toFixed(2)), // Random price between 0 and 100
  originalPrice: parseFloat((Math.random() * 150).toFixed(2)), // Random original price between 0 and 150
  image: `https://via.placeholder.com/150?text=Product+${index + 1}`, // Placeholder image
  rating: parseFloat((Math.random() * 5).toFixed(1)), // Random rating between 0 and 5
  reviews: Math.floor(Math.random() * 100), // Random number of reviews
}));

const PRODUCTS_PER_PAGE = 10;

const MyComponent = () => {
  const {
    cartItems,
    addCartItems,
    removeCartItems,
    category,
    addFavourite,
    favItems,
    removeFavourite,
    checkoutData,
  } = useAuthContext();
  const [loader, setLoader] = useState<boolean>(false);

  const [data, setData] = useState<DataCart[]>([]);
  const [subCategory, setSubCategory] = useState<Category[] | null>(null);
  const [parentSubCategory, setParentSubCategory] = useState<Category | null>(
    null,
  );
  const isFirstRender = useRef(true);
  const router = useRouter();
  const { toast } = useToast();
  const params = useSearchParams();
  const [loginAlert, setLoginAlert] = useState<boolean>(false);
  const { setOpen } = useModal();
  const [itemDetail, setItemDetail] = useState<DataCart | null>(null);
  const [detail, setDetail] = useState<string | null>(null);
  const [wishListLoader, setWishListLoader] = useState<boolean>(false);

  useEffect(() => {
    const d = params.get("detail");
    setDetail(d);
  }, [params]);

  useEffect(() => {
    if (!category) return;
    if (!detail) return;

    const catId = category?.find((item) => item.id == parseInt(detail));
    if (catId) {
      setParentSubCategory(catId);
      const loadData = async () => {
        const x = category?.filter((item) => item.parent == catId?.id);

        setSubCategory(x);
        try {
          setLoader(true);
          const x = await getBooks(catId?.id ?? 1);
          if (typeof x !== "boolean" && x.status) {
            setData(x.data);
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

      loadData().catch((error) => {
        console.error("Failed to load data in useEffect:", error);
      });
    }
  }, [category, detail]);

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
    console.log("ttd",item);
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
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dummyProducts.length / PRODUCTS_PER_PAGE);

  // Get the products for the current page
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  const currentProducts = dummyProducts.slice(start, end);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleChangeSubCategory = async (id: string) => {
    try {
      setLoader(true);
      const x = await getBooks(parseInt(id) ?? 1);
      if (typeof x !== "boolean" && x.status) {
        setData(x.data);
      }
      setLoader(false);
      // await fetchData(parseInt(x) ?? 1);
      // setData(result);
      // setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Failed to load data:", error);
      setLoader(false);
      // Optionally set an error state here
    }
  };
  const handleFavourite = async (item: DataCart) => {
    if (checkoutData?.booknet_customer_id) {
      setWishListLoader(true);
      if (
        item &&
        favItems?.some((favItem) => favItem.item_id === item.item_id)
      ) {
        await removeFavourite(item, checkoutData.booknet_customer_id)
          .then((x) => {
            if (x) {
              toast({
                variant: "destructive",
                title: "Remove From Wishlist",
                description: "Item has been removed successfully.",
              });
            }
          })
          .finally(() => setWishListLoader(false));
      } else {
        await addFavourite(item, checkoutData.booknet_customer_id)
          .then((x) => {
            if (x) {
              toast({
                variant: "success",
                title: "Added To Wishlist",
                description: "Item has been added successfully.",
              });
            }
          })
          .finally(() => setWishListLoader(false));
      }
    } else {
      setLoginAlert(true);
    }
  };
  const goToLogin = () => {
    setLoginAlert(false);
    router.push("login");
  };

  return (
    <div>
      <motion.main
        className="flex flex-col items-center pt-20"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-row">
          <div className="flex min-h-screen w-[95vw] flex-col lg:pl-72">
            <div className="m-4 flex flex-wrap items-end justify-between gap-4">
              <div className="text-left">
                <h2 className="text-xl font-bold">Text Books</h2>
                <p className="text-sm text-gray-500 capitalize dark:text-gray-300">
                  {parentSubCategory?.category_name}
                </p>
              </div>

              <div className="m-4 flex items-center justify-end gap-4">
                {subCategory?.[0] && (
                  <Select
                    onValueChange={(x: string) => handleChangeSubCategory(x)}
                  >
                    <SelectTrigger className="w-72">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      {subCategory?.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.category_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <h1 className="text-end font-bold">
                  Showing {data.length} of {data.length} Products
                </h1>
              </div>
            </div>
            <ScrollArea className="h-[80vh]">
              <div className="flex flex-wrap justify-center py-3">
                {loader
                  ? Array.from({ length: 6 }, (_, index) => (
                      <div key={index} className="p-2">
                        <ProductCardSkeleton />
                      </div>
                    ))
                  : data?.map((item: DataCart) => (
                      <ProductCard
                        key={item.book_id}
                        product={item}
                        showAddToCart={!isItemInCart(item.item_id)}
                        onAddToCart={() => handleAddToCart(item)}
                        onRemoveFromCart={() => handleRemoveFromCart(item)}
                        openDetail={() => openDetail(item)}
                        handleFavourite={() => handleFavourite(item)}
                        wishListLoader={wishListLoader}
                      />
                    ))}
              </div>
            </ScrollArea>
            {/* <div className="mt-4 flex justify-between">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`rounded bg-red-500 px-4 py-2 text-white ${
                  currentPage === 1 ? "cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`rounded bg-red-500 px-4 py-2 text-white ${
                  currentPage === totalPages ? "cursor-not-allowed" : ""
                }`}
              >
                Next
              </button>
            </div> */}
          </div>
        </div>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          {/* {!loader ? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          ) : ''} */}
        </div>
      </motion.main>

      <ModalBody>
        <ModalContent>
          <h4 className="mb-3 text-center font-serif text-lg font-bold text-red-600 dark:text-neutral-100 md:text-2xl">
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
                  className="mr-6 mt-4 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
                >
                  <Image
                    src={
                      itemDetail?.object_path
                        ? `https://ipos-storage.s3.amazonaws.com/${itemDetail.object_path}`
                        : "/assets/images/products/product.png"
                    }
                    alt={itemDetail?.object_path ?? ""}
                    width={1000}
                    height={1000}
                    className="h-36 w-36 flex-shrink-0 rounded-lg object-cover md:h-64 md:w-48"
                  />
                </motion.div>
              </div>
            </div>
            <div className="mx-auto flex flex-col items-start justify-start gap-y-2">
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-red-500 dark:text-neutral-300">
                  ${itemDetail?.item_sale_price}
                </span>
                <span className="font-serif text-lg text-zinc-500 dark:text-neutral-300">
                  SKU {itemDetail?.SKU}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <span className="pr-1 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  Series:
                </span>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  {itemDetail?.edition}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <span className="pr-1 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  Published:
                </span>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  {itemDetail?.introduced
                    ? moment(itemDetail.introduced).format("Do MMMM, YYYY")
                    : ""}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <span className="pr-1 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  Language:
                </span>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  {itemDetail?.book_language}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <span className="pr-1 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  Number of Pages:
                </span>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  {itemDetail?.pages}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <span className="pr-1 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  Publisher:
                </span>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  {itemDetail?.publisher?.publisher_name}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <span className="pr-1 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  Country of Publication:
                </span>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  {itemDetail?.publisher?.country}
                </span>
              </div>

              {itemDetail?.item_id &&
                !isItemInCart(itemDetail.item_id) &&
                itemDetail?.stock?.quantity ? (
                <button
                  className="flex items-center space-x-1 rounded-full bg-green-500 py-1 pl-2 pr-2 text-xs font-bold text-white dark:bg-zinc-800"
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
        {/* <ModalFooter className="gap-4">
          <button
            onClick={() => setOpen(false)}
            className="w-28 rounded-md border border-gray-300 bg-gray-200 px-2 py-1 text-sm text-black dark:border-black dark:bg-black dark:text-white"
          >
            Close
          </button> */}
        {/* <button className="w-28 rounded-md border border-black bg-black px-2 py-1 text-sm text-white dark:bg-white dark:text-black">
              Book Now
            </button> */}
        {/* </ModalFooter> */}
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

const TextBookPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ModalProvider>
        <MyComponent />
      </ModalProvider>
    </Suspense>
  );
};
export default TextBookPage;
