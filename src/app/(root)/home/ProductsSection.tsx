"use client";

import React, { useEffect, useRef, useState } from "react";
import ProductCard from "~/components/ui-components/ProductCard";
import { HiArrowSmallRight, HiArrowSmallLeft } from "react-icons/hi2";
import CountdownTimer from "~/components/countdownTimer";
import Button from "~/components/ui-components/Button";

type Product = {
  book_title: string;
  item_sale_price: number;
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
const data = {
  book_id: 28,
  item_id: 2089,
  quantity: 0,
  genre_id: 1,
  book_title: "The Great Gatsby",
  subtitle: "new subtitle",
  edition: "12",
  author_first_name: "F. Scott",
  author_last_name: "Fitzgerald",
  book_ISBN: "9780743273565",
  pages: 180,
  hardcover: 1,
  publisher_id: 1,
  book_language: "English",
  additional_notes:
    "A novel set in the Jazz Age exploring themes of wealth, love, and the American Dream.",
  outlet: 221,
  media_id: 0,
  item_name: "The Great Gatsby",
  expiry_date: "2025-12-31 05:00:00",
  barcode: "1234567890123",


  deleted: 0,
  item_sale_price: 25.99,
  
 
  items_type: 3,
 
  SKU: "GATSBY-001",
  SKU_title: "Gatsby Hardcover Edition",
  tax_id: 5,
  event_price: 20,
  event_check: 1,
  cost_price: "12.5000",
  weighable: 0,
  tax_exempted: 1,
  stockable_item: 1,
  readyMade: 1,

  returnable: 1,
  product_id: "PROD-12345",

  genre: "Comedy",
  description: "1 Chandler is the best example of a comedy person",
  stock: {
    suppliers: [],
    quantity_check: false,
    quantity: 0,
    stock_entry: [],
  },
  media: [],
  publisher: {
    publisher_id: 1,
    supplier_id: 370,
    outlet_id: 221,
    publisher_name: "Test Publisher without supplier and supplier Id",
    address: "new address",
    city: "Sydney",
    state: "Sydney",
    country: "AUS",
    postal_code: "2222",
    phone: "12345",
    email: "2345",
    website: "2345",
    created_at: "2024-08-30T01:37:45.000Z",
    updated_at: "2024-09-04T07:56:32.000Z",
  },
};
const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  targetDate,
  headingPartOne,
  headingPartTwo,
}) => {
  const productContainerRef = useRef<HTMLDivElement>(null);
  const [listInStart, setListInStart] = useState(true);

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

  const updateIsListInStart = () => {
    if (productContainerRef.current) {
      const scrollLeft = productContainerRef.current.scrollLeft;
      const maxScrollLeft =
        productContainerRef.current.scrollWidth -
        productContainerRef.current.clientWidth;

      // Update listInStart dynamically based on scroll position
      setListInStart(scrollLeft <= 0);
    }
  };

  useEffect(() => {
    const ref = productContainerRef.current;
    if (ref) {
      // Add the scroll event listener
      ref.addEventListener("scroll", updateIsListInStart);

      // Clean up the event listener on unmount
      return () => {
        ref.removeEventListener("scroll", updateIsListInStart);
      };
    }
  }, []);

  return (
    <div className="max-w-screen overflow-hidden bg-transparent h-fit pl-2">
      <div className="py-8 sm:px-6 sm:py-16 lg:py-24">
        <div className="flex flex-row items-center justify-between md:flex-row">
          <div className="flex flex-row items-end justify-between gap-5 md:flex-row md:gap-10">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-5xl">
              <div className="flex items-center pb-2 sm:pb-4">
                <div className="mr-2 h-8 w-4 rounded bg-red-500 sm:h-12 sm:w-6" />
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

        <div className="w-[92vw] ">
          <div
            className="scrollbar-hidden mt-6 py-6 flex flex-wrap lg:flex-nowrap lg:overflow-x-auto xl:flex-nowrap xl:overflow-x-auto"
            ref={productContainerRef}
          >
            <ProductCard key={1} />
            <ProductCard key={1} />
            <ProductCard key={1} />
            <ProductCard key={1} />
            <ProductCard key={1} />
            <ProductCard key={1} />
            <ProductCard key={1} />
            <ProductCard key={1} />
          </div>
        </div>

        <div className="mt-8 flex justify-center sm:mt-12">
          <Button
            title="View all"
            onClick={() => {
              // Add your onClick functionality here
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
