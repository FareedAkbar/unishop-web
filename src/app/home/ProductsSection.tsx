import React, { useEffect, useRef, useState } from "react";
import ProductCard from "~/components/ui-components/ProductCard";
import { HiArrowSmallRight, HiArrowSmallLeft } from "react-icons/hi2";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
};

interface ProductsSectionProps {
  products: Product[];
  targetDate?: Date; // Optional timer date
  headingPartOne: string; // New prop for the first part of the heading
  headingPartTwo: string; // New prop for the second part of the heading
}

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, [targetDate]);

  function calculateTimeRemaining(targetDate: Date) {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    } else {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return {
        days,
        hours,
        minutes,
        seconds,
      };
    }
  }

  return (
    <div className="countdown-timer flex sm:gap-4">
      {["Days", "Hours", "Minutes", "Seconds"].map((label, idx) => (
        <React.Fragment key={label}>
          <div className="time-unit flex flex-col items-center">
            <span className="time-label text-sm sm:text-lg">{label}</span>
            <span className="time-value text-2xl font-bold sm:text-4xl">
              {Object.values(timeRemaining)[idx]}
            </span>
          </div>
          {idx < 3 && (
            <span className="separator pt-3 text-2xl font-bold text-red-500 sm:pt-6 sm:text-4xl">
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const ProductsSection: React.FC<ProductsSectionProps> = ({ products, targetDate, headingPartOne, headingPartTwo }) => {
  const productContainerRef = useRef<HTMLDivElement>(null);
  const [listInStart, setListInStart] = useState(true);

  const handleScrollLeft = () => {
    if (productContainerRef.current) {
      const minScrollLeft = 0;
      productContainerRef.current.scrollTo({
        left: minScrollLeft,
        behavior: "smooth",
      });
    }
    setListInStart(true);
  };

  const handleScrollRight = () => {
    if (productContainerRef.current) {
      const maxScrollLeft =
        productContainerRef.current.scrollWidth - productContainerRef.current.clientWidth;

      productContainerRef.current.scrollTo({
        left: maxScrollLeft,
        behavior: "smooth",
      });
    }
    setListInStart(false);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="flex flex-row items-center justify-between md:flex-row">
          <div className="flex flex-row items-end justify-between gap-5 md:flex-row md:gap-10">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-5xl">
              <div className="flex items-center pb-2 sm:pb-4">
                <div className="mr-2 h-8 w-4 rounded bg-red-500 sm:h-12 sm:w-6" />
                <span className="text-xl text-red-500 sm:text-3xl">{headingPartOne}</span>
              </div>
              {headingPartTwo}
            </h2>
            {targetDate && <CountdownTimer targetDate={targetDate} />}
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

        <div className="mt-6 flex flex-wrap overflow-x-auto lg:flex-nowrap scrollbar-hidden" ref={productContainerRef}>
          {products.map((product, ind) => (
            <ProductCard key={ind} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center sm:mt-12">
          <a
            href="#"
            className="inline-block rounded bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600 sm:px-6 sm:py-3"
          >
            View All Products
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
