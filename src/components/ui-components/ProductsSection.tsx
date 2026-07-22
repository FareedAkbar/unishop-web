"use client";

import React, { useEffect, useRef, useState } from "react";
import ProductCard from "~/components/ui-components/ProductCard";
import { HiArrowSmallRight, HiArrowSmallLeft } from "react-icons/hi2";
import CountdownTimer from "~/components/countdownTimer";
import Button from "~/components/ui-components/Button";
import type DataCart from "~/types/book";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useAuthContext } from "~/Context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "~/hooks/use-toast";
import AlertBox from "../alertBox/alert";

interface ProductsSectionProps {
  products: DataCart[];
  targetDate?: Date;
  headingPartOne: string;
  headingPartTwo: string;
  loader?: boolean;
  viewAllButton?: () => void;
}
const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  targetDate,
  headingPartOne,
  headingPartTwo,
  loader = false,
  viewAllButton,
}) => {
  const productContainerRef = useRef<HTMLDivElement>(null);
  const [listInStart, setListInStart] = useState(true);
  const { checkoutData, favItems, addFavourite, removeFavourite } =
    useAuthContext();
  const [loginAlert, setLoginAlert] = useState<boolean>(false);
  const [wishListLoader, setWishListLoader] = useState<boolean>(false);
  const { toast } = useToast();

  const handleScrollLeft = () => {
    if (productContainerRef.current) {
      productContainerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (productContainerRef.current) {
      const maxScrollLeft =
        productContainerRef.current.scrollWidth -
        productContainerRef.current.clientWidth;

      productContainerRef.current.scrollTo({
        left: maxScrollLeft,
        behavior: "smooth",
      });
    }
  };
  const { setProductForDetail } = useAuthContext();
  const updateIsListInStart = () => {
    if (productContainerRef.current) {
      const scrollLeft = productContainerRef.current.scrollLeft;
      const maxScrollLeft =
        productContainerRef.current.scrollWidth -
        productContainerRef.current.clientWidth;

      setListInStart(scrollLeft <= 0);
    }
  };
  const smoothScrollTo = (targetPosition: number, duration: number) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      startTime ??= currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startPosition + distance * progress);

      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };
  const router = useRouter();
  const goToDetail = async (item: DataCart) => {
    await setProductForDetail(item);
    smoothScrollTo(0, 1500);
    // router.push(`/product-details?category=${item.category}`);
  };
  useEffect(() => {
    const ref = productContainerRef.current;
    if (ref) {
      ref.addEventListener("scroll", updateIsListInStart);
      return () => {
        ref.removeEventListener("scroll", updateIsListInStart);
      };
    }
  }, []);

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
    <div className="w-full h-fit overflow-hidden bg-transparent px-4 sm:px-6 lg:px-8">
      <div className="py-8 sm:px-6 sm:py-16 lg:py-24">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-end justify-between gap-5 md:gap-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              <div className="flex items-center pb-2">
                <div className="mr-2 h-8 w-4 rounded bg-red-500 sm:h-10 sm:w-4" />
                <span className="text-xl text-red-500 sm:text-3xl">
                  {headingPartOne}
                </span>
              </div>
              {headingPartTwo}
            </h2>
            {/* {targetDate && (
              <CountdownTimer
                targetDate={targetDate ? targetDate : new Date()}
              />
            )} */}
          </div>
          <div className="mt-4 hidden items-center md:mt-0 lg:block">
            <button
              onClick={handleScrollLeft}
              className={`mr-2 rounded-full p-2 ${listInStart ? "bg-gray-200 text-black" : "bg-red-500 text-white"}`}
            >
              <HiArrowSmallLeft size={20} />
            </button>
            <button
              onClick={handleScrollRight}
              className={`rounded-full p-2 ${!listInStart ? "bg-gray-200 text-black" : "bg-red-500 text-white"}`}
            >
              <HiArrowSmallRight size={20} />
            </button>
          </div>
        </div>

        <div className="w-full">
          <div
            className="scrollbar-hidden mt-6 flex flex-wrap justify-center gap-4 py-6 lg:flex-nowrap lg:overflow-x-auto justify-start px-2 lg:px-4 xl:flex-nowrap xl:overflow-x-auto"
            ref={productContainerRef}
          >
            {loader
              ? Array.from({ length: 6 }, (_, index) => (
                  <div key={index} className="p-2">
                    <ProductCardSkeleton />
                  </div>
                ))
              : products.map((item, index) => (
                  <ProductCard
                    key={`item.book_id-${item.book_id ?? index}-${index}`}
                    product={item}
                    showAddToCart={false}
                    showButton={false}
                    //  onAddToCart={async () => {
                    //    if (item?.variations?.[0]) {
                    //      await openDetail(item);
                    //    } else {
                    //      await handleAddToCart(item);
                    //    }
                    //  }}
                    //  onRemoveFromCart={() => handleRemoveFromCart(item)}
                    goToDetail={() => goToDetail(item)}
                    openDetail={() => goToDetail(item)}
                    handleFavourite={() => handleFavourite(item)}
                    //  wishListLoader={wishListLoader}
                  />
                ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center sm:mt-12">
          <Button
            title="View all"
            onClick={() => (viewAllButton ? viewAllButton() : "")}
          />
        </div>
      </div>
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

export default ProductsSection;
