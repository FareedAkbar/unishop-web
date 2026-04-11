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
import { FaArrowCircleLeft, FaCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { IoIosCloseCircle } from "react-icons/io";
import Button from "./Button";

interface ProductProps {
  showAddToCart?: boolean;
  showButton?: boolean;
  onAddToCart?: () => void;
  onRemoveFromCart?: () => void;
  openDetail?: () => void;
  goToDetail?: () => void;
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
  goToDetail,
}: ProductProps) => {
  const { favItems, productTags, textbookType } = useAuthContext();

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
        .filter(
          (usage) =>
            usage.default_semester === 1 || usage.default_trimester === 1,
        )
        .map((usage) => ({
          type_id: usage.type_id, // Assuming `type_id` exists
          subject_name: usage.subject_name,
          subject_code: usage.subject_code, // Assuming `subject_name` exists
        }));
    }
    return [];
  };
  interface TagJson {
    forFrontDesk?: boolean;
    [key: string]: unknown; // Allow other properties we don't care about
  }
  const checkTag = (tagName: string): boolean => {
    const yenIndex = tagName.indexOf("¥");
    if (yenIndex === -1) {
      return true;
    }

    try {
      const jsonStr = tagName.slice(yenIndex + 1);
      const jsonObj = JSON.parse(jsonStr) as TagJson;

      // Explicitly check if forFrontDesk exists and is a boolean
      if (typeof jsonObj.forFrontDesk === "boolean") {
        return !jsonObj.forFrontDesk;
      }

      return true;
    } catch (e) {
      return true;
    }
  };

  return (
    <div className="group relative flex w-full flex-shrink-0 grow-0 flex-col rounded-md border border-gray-400 p-2 shadow dark:border-gray-600 dark:bg-slate-900 xs:w-56 sm:w-64 lg:w-72">
      {((product?.items_type === 1 && !product?.variations?.[0]) ??
        product?.item_sale_price) && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center rounded bg-black/30 dark:bg-white/30">
          <span className="-rotate-45 font-semibold text-white dark:text-black">
            Currently no variation is available
          </span>
        </div>
      )}

      {product?.items_type == 0 && !product.stock.stock_id && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center rounded bg-black/30 dark:bg-white/30">
          <span className="-rotate-45 font-semibold text-white dark:text-black">
            Currently no stock is available
          </span>
        </div>
      )}

      <div className="relative my-4 flex h-40 grow-0 flex-col items-center justify-center rounded-sm bg-white dark:bg-slate-900 sm:h-48 md:h-72">
        {tagNames.length > 0 ? (
          <div className="absolute left-2 top-0 flex flex-col">
            {tagNames.map((tag, index) => {
              return (
                checkTag(tag) && (
                  <span
                    key={`${tag}-${index}`}
                    className="z-[5] mr-2 mt-1 rounded border border-gray-300 bg-gray-200 px-1 py-0.5 text-[11px] text-red-600 dark:border-gray-500 dark:bg-gray-700 dark:text-red-500 sm:left-6 sm:top-6 sm:px-2 sm:py-1"
                  >
                    {tag.split("¥")[0]}
                  </span>
                )
              );
            })}
          </div>
        ) : (
          ""
        )}
        <Image
          onClick={goToDetail}
          src={
            product?.object_path
              ? `https://ipos-storage.s3.amazonaws.com/${product.object_path}`
              : product?.media && product?.media.length > 0
                ? `https://ipos-storage.s3.amazonaws.com/${product.media[0]?.object_path}`
                : "/assets/images/products/product.png"
          }
          alt={product?.SKU_title ?? ""}
          width={1000}
          height={1000}
          className="my-2 h-full w-full cursor-pointer object-contain transition-transform duration-300 hover:scale-105" // Scale on hover
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
      </div>
      {showButton &&
      (product?.variations?.[0]?.items_variable_items_sale_price ??
        (product?.item_sale_price &&
          ((product?.stock?.quantity && product?.stock?.quantity > 0) ||
            product?.allow_special_order == 1))) ? (
        <Button
          width="w-full"
          onClick={!showAddToCart ? onRemoveFromCart : onAddToCart}
          title={!showAddToCart ? "Remove From Cart" : "Add To Cart"}
          variant={showAddToCart ? "primary" : "secondary"}
        />
      ) : (
        ""
      )}
      <span
        className="mb-1 mt-2 font-serif font-semibold capitalize sm:mt-4"
        title={product?.item_name}
      >
        {product?.item_name.split("¥").join(" ")}
      </span>
      {product?.SKU ? (
        <span className="truncate font-serif text-xs">
          {product?.book_id && product?.food_id == null ? "ISBN: " : "SKU: "}{" "}
          {product?.book_ISBN ? product?.book_ISBN : product?.SKU}
        </span>
      ) : (
        ""
      )}
      {/* {product?.stock?.quantity ? (
        <span className="truncate text-xs">
          Available Stock: {product?.stock?.quantity}
        </span>
      ) : (
        ""
      )} */}

      {product?.book_id && product?.food_id == null ? (
        <div className="flex flex-wrap gap-2 text-sm">
          {
            manageUsage().length > 0
              ? manageUsage().map((item, index) => {
                  const matchedType = textbookType?.find(
                    (t) => t.item_book_type_id === item.type_id,
                  );
                  return (
                    <div
                      key={`usage-${item.subject_code}-${index}-pair`}
                      className="flex flex-col items-start gap-1 sm:flex-row"
                    >
                      <span
                        className={`inline-block w-fit rounded ${matchedType?.type_name === "Textbook" ? "text-red-500" : "text-yellow-600 dark:text-yellow-500"} py-1 text-sm`}
                      >
                        {matchedType?.type_name ?? ""}: {item.subject_name}{" "}
                        {item.subject_code}
                      </span>
                      {/* <span className="inline-block w-fit rounded bg-yellow-200 px-2 py-1 text-xs text-black dark:bg-yellow-500">
                    
                  </span> */}
                    </div>
                  );
                })
              : ""
            // <p className="font-serif text-xs">
            //   Textbook is not used in this session
            // </p>
          }
        </div>
      ) : (
        ""
      )}
      {product?.shelf_location && (
        <span className="flex flex-row items-center gap-1 font-serif text-xs">
          Shelf location: {product?.shelf_location}
        </span>
      )}

      <div className="mt-1 flex gap-1 sm:mt-2 sm:gap-2">
        {product?.variations?.[0]?.items_variable_items_sale_price ? (
          <span className="text-sm font-bold text-red-500 sm:text-lg">
            $
            {product?.variations?.[0]?.items_variable_items_sale_price.toFixed(
              2,
            )}
          </span>
        ) : product?.item_sale_price ? (
          <span className="text-sm font-bold text-red-500 sm:text-lg">
            ${product?.item_sale_price.toFixed(2)}
          </span>
        ) : (
          ""
        )}
      </div>
      {product?.items_type != 1 &&
        (product?.stock.quantity ? (
          <span className="flex w-fit flex-row items-center gap-1 rounded border border-green-500 p-1 font-serif text-xs text-green-500">
            <FaCheckCircle /> In stock
          </span>
        ) : product?.allow_special_order == 1 ? (
          <span className="flex w-fit flex-row items-center gap-1 rounded border border-yellow-500 p-1 font-serif text-xs text-yellow-500">
            <FaArrowCircleLeft /> Backorder
          </span>
        ) : (
          <span className="flex w-fit flex-row items-center gap-1 rounded border border-red-500 p-1 font-serif text-xs text-red-500">
            <IoIosCloseCircle /> Out of stock
          </span>
        ))}
      {product?.items_type === 1 && (
        <span className="flex w-fit flex-row items-center gap-1 rounded bg-red-500 p-1 px-2 font-serif text-xs text-white">
          Variable Item
        </span>
      )}
    </div>
  );
};

export default ProductCard;
