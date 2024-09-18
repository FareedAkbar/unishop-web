"use client";
import React, { useState } from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";

interface stock {
  quantity: number | null;
}

interface ProductGradientProps {
  book_title: string;
  description: string;
  object_path: string;
  item_sale_price: number;
  showAddToCart: boolean;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  stock?: stock;
}

export default function ProductGradient({
  book_title,
  showAddToCart,
  onAddToCart,
  description,
  object_path,
  item_sale_price,
  onRemoveFromCart,
  stock,
}: ProductGradientProps) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative mx-auto w-full min-w-80 max-w-xs" // Added relative positioning
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <BackgroundGradient className="flex h-[500px] w-full flex-col justify-between rounded-lg p-4 dark:bg-zinc-900 sm:p-6">
        <div className="relative h-2/3 w-full">
          <Image
            src={`https://ipos-storage.s3.amazonaws.com/${object_path}`}
            alt={book_title}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          <p className="mb-2 mt-4 text-lg text-black dark:text-neutral-200 sm:text-xl">
            {book_title}
          </p>
          <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
          <p className="mb-2 mt-1 text-lg font-bold">${item_sale_price}</p>
        </div>
        <div
          className={`absolute bottom-1 left-1/2 flex -translate-x-1/2 transform space-x-2 ${
            show ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          {stock && stock.quantity == 0 && (
            <div className="flex items-center space-x-1 rounded-full bg-red-400 py-1 pl-2 pr-2 text-xs font-bold text-white dark:bg-zinc-800">
              <MdRemoveCircle className="text-lg" />
              <div className="pl-1">Out of stock</div>
            </div>
          )}
          {showAddToCart && stock?.quantity && (
            <button
              className="flex items-center space-x-1 rounded-full bg-green-500 py-1 pl-2 pr-2 text-xs font-bold text-white dark:bg-zinc-800"
              onClick={onAddToCart}
            >
              <FaCartPlus className="text-lg" />
              <div className="pl-2">Add to Cart</div>
            </button>
          )}
          {!showAddToCart && (
            <button
              className="flex items-center space-x-1 rounded-full bg-red-400 py-1 pl-2 pr-2 text-xs font-bold text-white dark:bg-zinc-800"
              onClick={onRemoveFromCart}
            >
              <MdRemoveCircle className="text-lg" />
              <div className="pl-1">Remove</div>
            </button>
          )}
        </div>
      </BackgroundGradient>

      {/* Buttons */}
    </div>
  );
}
