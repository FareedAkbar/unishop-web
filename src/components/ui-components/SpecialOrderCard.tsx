"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PiEye } from "react-icons/pi";
import { MdRemoveCircle } from "react-icons/md";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai"; // Adding icons used in ProductCard design
import type { SpecialBookType } from "~/types/specialOrderBook";

interface stock {
  quantity: number | null;
}

interface SpecialProductProps {
  openDetail?: () => void;
  stock?: stock;
  item: SpecialBookType;
}

export default function SpecialOrderCard({
  stock,
  item,
  openDetail,
}: SpecialProductProps) {
  const [show, setShow] = useState(false);

  function getPriceRange(books: SpecialBookType) {
    const price = parseFloat(books.price.replace(/[^0-9.-]+/g, ""));
    // Return a range of ±5 AUD
    return `$${(price - 5).toFixed(2)} - $${(price + 5).toFixed(2)}`;
  }

  return (
    <div
      className="group relative  w-1/2 min-w-72 max-w-xs flex flex-col p-2 sm:w-1/2 sm:p-4 md:w-1/4 lg:w-1/4 flex-shrink-0 flex-grow-0"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {/* Main Product Image Section */}
      <div className="relative flex h-40 items-center justify-center rounded-sm bg-gray-200 sm:h-48 lg:h-64">
        <Image
          src="/images/products/product.png" // Assuming placeholder book image
          alt={item.title}
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />

        {/* Conditional badge or sale price */}
        {/* <div className="absolute left-2 top-2 z-20 rounded bg-red-500 px-1 py-0.5 text-[6px] text-white sm:left-6 sm:top-6 sm:px-2 sm:py-1 sm:text-sm">
          {item.price ? getPriceRange(item) : "Unavailable"}
        </div> */}

        {/* Icons for favorite and detail view */}
        <div className="absolute right-3 top-3 flex flex-col gap-1 p-1 sm:right-4 sm:top-4 sm:gap-2 sm:p-2">
          {/* <button className="rounded-full border-none bg-transparent bg-white p-0.5 text-sm hover:text-red-500 sm:p-1 sm:text-xl">
            <AiOutlineHeart />
          </button> */}
          <button
            onClick={() => (openDetail ? openDetail() : "")}
            className="rounded-full border-none bg-transparent bg-white p-0.5 text-sm hover:text-red-500 sm:p-1 sm:text-xl"
          >
            <AiOutlineEye />
          </button>
        </div>

        {/* Conditional Button for Placing Order */}
        <button
          onClick={() => (openDetail ? openDetail() : "")} // Replace with actual functionality
          className="absolute bottom-0 z-20 mt-4 w-full rounded-b-md py-1 text-xs text-white transition-colors sm:py-2 sm:text-sm bg-black hidden group-hover:block"
        >
          Place Order
        </button>
      </div>

      {/* Product Details Section */}
      <h2 className="mt-2 truncate text-sm font-bold sm:mt-4 sm:text-base lg:text-lg text-black dark:text-neutral-200">
        {item.title}
      </h2>
      <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
        {item.distributor}
      </p>
      <p className="mt-1 flex gap-1 sm:mt-2 sm:gap-2">
        <span className="text-sm font-bold text-red-500 sm:text-lg">
          {getPriceRange(item)}
        </span>
      </p>

      {/* Stock Information */}
      {stock && stock.quantity === 0 && (
        <div className="mt-1 flex items-center space-x-1 rounded-full bg-red-400 py-1 pl-2 pr-2 text-xs font-bold text-white dark:bg-zinc-800">
          <MdRemoveCircle className="text-lg" />
          <div className="pl-1">Out of stock</div>
        </div>
      )}
    </div>
  );
}
