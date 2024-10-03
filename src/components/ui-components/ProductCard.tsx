'use client';

import Image from "next/image";
import React, { useState } from "react"; // Import useState
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { FaStar } from "react-icons/fa6";
import DataCart from "~/types/book";

interface ProductGradientProps {
  showAddToCart?: boolean;
  onAddToCart?: () => void;
  onRemoveFromCart?: () => void;
  openDetail?: () => void;
  // stock?: stock;
  product?: DataCart | null;
}


const ProductCard = ({ product, onAddToCart,onRemoveFromCart,showAddToCart,openDetail }: ProductGradientProps ) => {
  


  return (
    <div className="group relative flex w-1/2 flex-shrink-0 flex-col p-2 sm:w-1/2 sm:p-4 md:w-1/3 lg:w-72">
      <div className="relative flex h-40 items-center justify-center rounded-sm bg-gray-200 sm:h-48 lg:h-64">
        <div className="absolute left-2 top-2 z-20 rounded bg-red-500 px-1 py-0.5 text-[6px] text-white sm:left-6 sm:top-6 sm:px-2 sm:py-1 sm:text-sm">
          {/* -
          {Math.floor(
            ((product.originalPrice - product.price) / product.originalPrice) *
            100,
          )}
          % */}{product?.item_sale_price}
        </div>
        <Image
          src={ product?.object_path
            ? `https://ipos-storage.s3.amazonaws.com/${product.object_path}`
            : '/images/products/product.png'}
          alt={product?.SKU_title ?? ""}
          width={100}
          height={100}
          className="object-cover p-4"
        />
        <div className="absolute right-3 top-3 flex flex-col gap-1 p-1 sm:right-4 sm:top-4 sm:gap-2 sm:p-2">
          <button className="rounded-full border-none bg-transparent bg-white p-0.5 text-sm hover:text-red-500 sm:p-1 sm:text-xl">
            <AiOutlineHeart />
          </button>
          <button onClick={() => openDetail ? openDetail() : ""} className="rounded-full border-none bg-transparent bg-white p-0.5 text-sm hover:text-red-500 sm:p-1 sm:text-xl">
            <AiOutlineEye  />
          </button>
        </div>
        <button 
          onClick={!showAddToCart ? onRemoveFromCart : onAddToCart} 
          className={`absolute bottom-0 z-20 mt-4 w-full rounded-b-md py-1 text-xs text-white sm:py-2 sm:text-sm transition-colors ${
            !showAddToCart ? 'bg-red-500' : 'bg-black'
          } group-hover:block hidden`}
        >
          {!showAddToCart ? 'Remove From Cart' : 'Add To Cart'}
        </button>
      </div>
      <h2 className="mt-2 truncate text-sm font-bold sm:mt-4 sm:text-base lg:text-lg">
        {product?.book_title}
      </h2>
      <div className="mt-1 flex gap-1 sm:mt-2 sm:gap-2">
        <span className="text-sm font-bold text-red-500 sm:text-lg">
          ${product?.item_sale_price}
        </span>
        {/* <span className="text-sm text-gray-500 line-through sm:text-lg">
          ${product.originalPrice}
        </span> */}
      </div>
      <div className="mt-1 flex flex-row justify-between sm:mt-2">
        {/* <span className="flex gap-0.5 text-sm text-orange-500 sm:gap-1 sm:text-lg">
          {[...Array(Math.floor(product.rating))].map((_, index) => (
            <FaStar
              key={index}
              className="text-sm text-orange-400 sm:text-lg"
            />
          ))}
        </span>
        <span className="text-xs text-gray-500 sm:text-lg">
          ({product.reviews})
        </span> */}
      </div>
    </div>
  );
};

export default ProductCard;
