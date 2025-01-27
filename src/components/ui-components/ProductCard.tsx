"use client";

import Image from "next/image";
import React from "react";
import {
  AiOutlineHeart,
  AiOutlineEye,
  AiFillHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useAuthContext } from "~/Context/AuthContext";
import type DataCart from "~/types/book";
import type { ItemSpecialTag } from "~/types/productTags";
import type { SpecialTag } from "~/types/book";

interface ProductProps {
  showAddToCart?: boolean;
  showButton?: boolean;
  onAddToCart?: () => void;
  onRemoveFromCart?: () => void;
  openDetail?: () => void;
  handleFavourite?: () => void;
  product?: DataCart | null;
  wishListLoader?: boolean;
}

const ProductCard = ({
  product,
  onAddToCart,
  onRemoveFromCart,
  showAddToCart,
  openDetail,
  handleFavourite,
  wishListLoader = false,
  showButton = true,
}: ProductProps) => {
  const { favItems, productTags } = useAuthContext();

  const matchingTags = product?.special_tags
    ?.map((specialTag: SpecialTag) =>
      productTags?.find(
        (tag: ItemSpecialTag) =>
          tag.item_special_tags_id === specialTag.item_special_tags_id,
      ),
    )
    .filter((tag): tag is ItemSpecialTag => Boolean(tag));

  const tagNames: string[] = matchingTags?.map((tag) => tag?.tag_name) ?? [];


  const manageUsage = () => {
    if (product?.book_usages && product?.book_usages.length > 0) {
      return product.book_usages
        .filter((usage) => usage.default_semester === 1)
        .map((usage) => ({
          type_id: usage.type_id,  // Assuming `type_id` exists
          subject_name: usage.subject_name,
          subject_code: usage.subject_code // Assuming `subject_name` exists
        }));
    }
    return [];
  };

  const type = [
    {
      "item_book_type_id": 1,
      "type_name": "Textbook",
      "type_desc": "Textbook"
    },
    {
      "item_book_type_id": 2,
      "type_name": "Reference",
      "type_desc": "Reference"
    },
    {
      "item_book_type_id": 3,
      "type_name": "Recommended",
      "type_desc": "Recommended"
    },
    {
      "item_book_type_id": 4,
      "type_name": "Course Notes",
      "type_desc": "Course Notes"
    },
    {
      "item_book_type_id": 5,
      "type_name": "General Reading",
      "type_desc": "General Reading"
    }
  ]

  return (
    <div className="group relative flex w-44 flex-shrink-0 grow-0 flex-col rounded-md border p-2 transition-transform duration-300 hover:scale-105 sm:w-64 md:w-64 lg:w-72">
      <div className="relative flex h-40 grow-0 items-center justify-center rounded-sm bg-gray-200 dark:bg-slate-600 sm:h-48 lg:h-64">
        {tagNames.length > 0 ? (
          <div className="absolute left-2 top-1 flex flex-col">
            {tagNames.map((tag) => {
              return (
                <span
                  key={tag}
                  className="z-[5] mr-2 mt-1 rounded bg-red-500 px-1 py-0.5 text-[8px] text-white sm:left-6 sm:top-6 sm:px-2 sm:py-1"
                >
                  {tag}
                </span>
              );
            })}
          </div>
        ) : (
          ""
        )}

        <Image
          src={
            product?.object_path
              ? `https://ipos-storage.s3.amazonaws.com/${product.object_path}`
              : product?.media && product?.media.length > 0 ? `https://ipos-storage.s3.amazonaws.com/${product.media[0]?.object_path}`
                : "/assets/images/products/product.png"
          }
          alt={product?.SKU_title ?? ""}
          width={1000}
          height={1000}
          className="h-32 object-contain transition-transform duration-300 group-hover:scale-110 lg:h-56 lg:w-56" // Scale on hover
        />
        <div className="absolute right-5 top-2 flex">
          {showButton && !showAddToCart && (
            <p className="rounded-full border-none bg-red-500 p-0.5 text-sm text-white sm:p-1 sm:text-xl">
              <AiOutlineShoppingCart />
            </p>
          )}
        </div>
        <div className="absolute right-5 top-10 flex translate-x-[100%] transform flex-col gap-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <button
            disabled={wishListLoader}
            onClick={() => (handleFavourite ? handleFavourite() : "")}
            className="rounded-full border-none bg-transparent bg-white p-0.5 text-sm hover:text-red-500 dark:bg-slate-400 sm:p-1 sm:text-xl"
          >
            {product?.item_id &&
              favItems?.some((favItem) => favItem.item_id === product.item_id) ? (
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

        {showButton &&
          (product?.variations?.[0]?.items_variable_items_sale_price ??
            product?.item_sale_price) ? (
          <button
            onClick={!showAddToCart ? onRemoveFromCart : onAddToCart}
            className={`absolute bottom-0 z-20 mt-4 w-full rounded-b-sm py-1 text-xs text-white transition-colors sm:py-2 sm:text-sm ${!showAddToCart ? "bg-red-500" : "bg-black"
              } hidden group-hover:block`}
          >
            {!showAddToCart ? "Remove From Cart" : "Add To Cart"}
          </button>
        ) : (
          ""
        )}
      </div>
      <span className="mt-2 font-semibold sm:mt-4 mb-1" title={product?.item_name}>
        {product?.item_name}
      </span>
      {product?.SKU ? (
        <span className="truncate text-xs">
          SKU: {product?.SKU}
        </span>
      ) : (
        ""
      )}
      {product?.stock?.quantity ? (
        <span className="truncate text-xs">
          Available Stock: {product?.stock?.quantity}
        </span>
      ) : (
        ""
      )}

      {product?.book_id && product?.food_id == null ? (
        <span className="truncate text-sm">
          {manageUsage().length > 0 ? (
            <>
             
              {manageUsage().map((item, index) => {
                const matchedType = type.find((t) => t.item_book_type_id === item.type_id); // Find the matching type
                return (
                  <small
                    key={index}
                    className="bg-red-500 dark:bg-gray-700 text-gray-100 dark:text-gray-300 px-2 py-1 text-md rounded mr-1"
                  >
                    {item.subject_name} {item.subject_code} , {matchedType?.type_name ?? ""} {/* Display type_name or fallback */}
                  </small>
                );
              })}
            </>
          ) : (
            "Textbook not used this session"
          )}

        </span>
      ) : (
        ""
      )}

      <div className="mt-1 flex gap-1 sm:mt-2 sm:gap-2">
        {product?.variations?.[0]?.items_variable_items_sale_price ? (
          <span className="text-sm font-bold text-red-500 sm:text-lg">
            ${product?.variations?.[0]?.items_variable_items_sale_price}
          </span>
        ) : product?.item_sale_price ? (
          <span className="text-sm font-bold text-red-500 sm:text-lg">
            ${product?.item_sale_price}
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProductCard;
