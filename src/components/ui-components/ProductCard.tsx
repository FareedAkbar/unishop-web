"use client";

import Image from "next/image";
import React from "react";
import { AiOutlineHeart, AiOutlineEye, AiFillHeart } from "react-icons/ai";
import { useAuthContext } from "~/Context/AuthContext";
import type DataCart from "~/types/book";

interface ProductProps {
  showAddToCart?: boolean;
  onAddToCart?: () => void;
  onRemoveFromCart?: () => void;
  openDetail?: () => void;
  handleFavourite?: () => void;
  product?: DataCart | null;
}

const ProductCard = ({
  product,
  onAddToCart,
  onRemoveFromCart,
  showAddToCart,
  openDetail,
  handleFavourite,
}: ProductProps) => {
  const { favItems } = useAuthContext();
  return (
    <div className="group relative flex w-44 flex-shrink-0 grow-0 flex-col p-2 transition-transform duration-300 hover:scale-110 sm:w-64 md:w-64 lg:w-72">
      <div className="relative flex h-40 grow-0 items-center justify-center rounded-sm bg-gray-200 dark:bg-slate-600 sm:h-48 lg:h-64">
        <div className="absolute left-2 top-2 z-[12] rounded bg-red-500 px-1 py-0.5 text-[6px] text-white sm:left-6 sm:top-6 sm:px-2 sm:py-1 sm:text-sm">
          {product?.item_sale_price ? product?.item_sale_price : 26}
        </div>
        <Image
          src={
            product?.object_path
              ? `https://ipos-storage.s3.amazonaws.com/${product.object_path}`
              : "/assets/images/products/product.png"
          }
          alt={product?.SKU_title ?? ""}
          width={1000}
          height={1000}
          className="h-32 object-contain transition-transform duration-300 group-hover:scale-110 lg:h-56 lg:w-56" // Scale on hover
        />
        <div className="absolute right-5 top-10 flex translate-x-[100%] transform flex-col gap-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <button
            onClick={() => (handleFavourite ? handleFavourite() : "")}
            className="rounded-full border-none bg-transparent bg-white p-0.5 text-sm hover:text-red-500 dark:bg-slate-400 sm:p-1 sm:text-xl"
          >
            {product?.item_id && favItems?.includes(product?.item_id) ? (
              <AiFillHeart color="red" />
            ) : (
              <AiOutlineHeart />
            )}
          </button>
          <button
            onClick={() => (openDetail ? openDetail() : "")}
            className="rounded-full border-none bg-transparent bg-white p-0.5 text-sm hover:text-red-500 dark:bg-slate-400 sm:p-1 sm:text-xl"
          >
            <AiOutlineEye />
          </button>
        </div>
        {product?.item_sale_price ? (
          <button
            onClick={!showAddToCart ? onRemoveFromCart : onAddToCart}
            className={`absolute bottom-0 z-20 mt-4 w-full rounded-b-md py-1 text-xs text-white transition-colors sm:py-2 sm:text-sm ${
              !showAddToCart ? "bg-red-500" : "bg-black"
            } hidden group-hover:block`}
          >
            {!showAddToCart ? "Remove From Cart" : "Add To Cart"}
          </button>
        ) : (
          ""
        )}
      </div>
      <h2 className="mt-2 truncate text-sm font-bold sm:mt-4 sm:text-base lg:text-lg">
        {product?.book_title}
      </h2>
      <span className="truncate text-sm sm:text-sm lg:text-sm">
        Available Stock: {product?.stock?.quantity}
      </span>
      <div className="mt-1 flex gap-1 sm:mt-2 sm:gap-2">
        <span className="text-sm font-bold text-red-500 sm:text-lg">
          ${product?.item_sale_price ? product?.item_sale_price : 26}
        </span>
      </div>
      <div className="flex flex-row justify-between sm:mt-1">
        {/* Additional details like rating can go here */}
      </div>
    </div>
  );
};

export default ProductCard;
