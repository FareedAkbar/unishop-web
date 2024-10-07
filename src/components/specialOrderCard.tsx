"use client";
import React, { useState } from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import Image from "next/image";
// import { FaCartPlus } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import BookIcon from "../../public/bookIcon.png";
// import type DataCart from "~/types/book";
// import { Eye } from "lucide-react";
import { PiEye } from "react-icons/pi";
import type { SpecialBookType } from "~/types/specialOrderBook";
interface stock {
  quantity: number | null;
}

interface ProductGradientProps {
  openDetail?: () => void;
  stock?: stock;
  item: SpecialBookType;
}

export default function SpecialOrderCard({
  stock,
  item,
  openDetail,
}: ProductGradientProps) {
  const [show, setShow] = useState(false);

  function getApproximatePrices(books: SpecialBookType) {
    const price = parseFloat(books.price.replace(/[^0-9.-]+/g, "")); // Extract numeric value
    if (price < 6) {
      return `$${price.toFixed(2)} AUD`;
    }
    return `$${(price - 5).toFixed(2)} to $${(price + 5).toFixed(2)} AUD`;
  }

  return (
    <div
      className="relative mx-auto w-full min-w-72 max-w-xs" // Added relative positioning
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <BackgroundGradient className="flex h-[500px] w-full flex-col justify-between rounded-lg p-4 dark:bg-zinc-900 sm:p-6">
        <div className="relative h-2/3 w-full">
          <Image
            src={
              // object_path
              //   ? `https://ipos-storage.s3.amazonaws.com/${object_path}`
              //   :
              BookIcon
            }
            alt={item.title}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          <p className="mb-2 mt-4 w-32 overflow-hidden whitespace-nowrap text-lg text-black dark:text-neutral-200 sm:text-xl">
            {item.title}
          </p>
          <p className="w-32 overflow-hidden text-center text-sm text-neutral-600 dark:text-neutral-400">
            {item.distributor}
          </p>
          <p className="text-md mb-2 mt-1 font-bold">
            {getApproximatePrices(item)}
          </p>
        </div>
        <div
          className={`absolute bottom-1 left-1/2 flex w-full -translate-x-1/2 transform justify-between gap-3 space-x-2 pl-2 pr-2 ${
            show ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          <div>
            {stock && stock.quantity == 0 && (
              <div className="flex items-center space-x-1 rounded-full bg-red-400 py-1 pl-2 pr-2 text-xs font-bold text-white dark:bg-zinc-800">
                <MdRemoveCircle className="text-lg" />
                <div className="pl-1">Out of stock</div>
              </div>
            )}
          </div>

          <button
            className="flex items-center justify-end space-x-1 rounded-full bg-blue-500 py-1 pl-2 pr-2 text-xs font-bold text-white dark:bg-zinc-800"
            onClick={() => (openDetail ? openDetail() : "")}
          >
            <PiEye className="text-lg hover:text-red-400" />
            <div className="pl-2">View Item</div>
          </button>
        </div>
      </BackgroundGradient>

      {/* Buttons */}
    </div>
  );
}
