"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCartPlus } from "react-icons/fa";
import moment from "moment";
import Select from "~/components/Fields/select";
import type { Variation, VariationTag } from "~/types/book";
import type DataCart from "~/types/book";
import { useAuthContext } from "~/Context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

interface ProductDetailsProps {
  itemDetail: DataCart;
  //   getOptions: (
  //     tagName: string,
  //     dependencies?: Record<string, string>,
  //   ) => { value: string; label: string }[];
  //   handleAddToCart: (item: DataCart) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = (
  {
      // itemDetail,
    //   getOptions,
    //   handleAddToCart,
  },
) => {
 
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {},
  );
  const { cartItems, addCartItems, removeCartItems, productDetail } = useAuthContext();
  const itemDetail = productDetail
  console.log(productDetail)
  const isItemInCart = (itemId: number) => {
    const newItems: DataCart[] =
      typeof cartItems === "string"
        ? (JSON.parse(cartItems) as DataCart[])
        : cartItems!;
    return newItems.findIndex(
      (cartItem: DataCart) => cartItem.item_id === itemId,
    ) > -1
      ? true
      : false;
  };

  const handleSelectChange = (
    tagName: string,
    option: { value: string; label: string },
  ) => {
    setSelectedValues((prev) => ({
      ...prev,
      [tagName]: option.value,
    }));
  };

  const getOptions = (
    tagName: string,
    dependencies: Record<string, string | undefined>,
  ) => {
    return Array.from(
      new Set(
        itemDetail?.variations
          ?.filter((variation) => {
            // Check all previous tag dependencies
            return Object.keys(dependencies).every((key) => {
              return variation.variation_tags.some(
                (tag) =>
                  tag.items_variations_tags_name === key &&
                  tag.items_variations_tags_links_values_value ===
                    dependencies[key],
              );
            });
          })
          .map((variation) => {
            // Return only unique values for the current tag
            return variation.variation_tags.find(
              (tag) => tag.items_variations_tags_name === tagName,
            )?.items_variations_tags_links_values_value;
          }),
      ),
    )
      .filter(Boolean)
      .map((value) => ({
        tagName, // include tagName in the result
        dependencies, // include dependencies in the result
        value: value!,
        label: value!,
      }));
  };

  const handleAddToCart = async (item: DataCart) => {
    const x = item;
    if (item?.variations?.[0] && item?.tag_links) {
      Object.assign(x, { selected_variation: filteredVariations?.[0] });
      Object.assign(x, {
        item_sale_price:
          filteredVariations?.[0]?.items_variable_items_sale_price,
      });
      Object.assign(x, { selectedValues: selectedValues });
    }
    try {
      await addCartItems(x);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const handleRemoveFromCart = async (item: DataCart) => {
    try {
      await removeCartItems(item);
    } catch (error) {
      console.error("Failed to remove item to cart:", error);
    }
  };

  const filterVariationsBySelectedValues = (
    variations: Variation[],
    selectedValues: Record<string, string | undefined>,
  ) => {
    return variations?.filter((variation) => {
      // Check if every selected value matches in the variation's tags
      return Object.keys(selectedValues).every((tagName) => {
        const selectedValue = selectedValues[tagName];

        // Only proceed if the selected value is not undefined
        if (!selectedValue) {
          return false;
        }

        return variation.variation_tags.some((tag: VariationTag) => {
          return (
            tag.items_variations_tags_name === tagName &&
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            tag.items_variations_tags_links_values_value === selectedValue
          );
        });
      });
    });
  };

  const filteredVariations: Variation[] = filterVariationsBySelectedValues(
    itemDetail?.variations ? itemDetail?.variations : [],
    selectedValues,
  );
  return (
    <div className="p-6 pt-28">
      <h4 className="pb-3 text-center font-serif text-lg font-bold text-red-500 dark:text-neutral-100 md:text-2xl">
        {itemDetail?.book_title ?? itemDetail?.item_name}
      </h4>
      <h6 className="pb-2 text-center text-sm font-bold text-neutral-600 dark:text-neutral-100 md:text-xl">
        {itemDetail?.description}
      </h6>
      <h6 className="pb-4 text-center text-sm text-neutral-600 dark:text-neutral-100 md:text-lg">
        {itemDetail?.additional_notes}
      </h6>
      <div className="flex">
        <div>
          <div className="flex items-center justify-center">
            <motion.div
              key={"images"}
              style={{
                rotate: Math.random() * 20 - 10,
              }}
              whileHover={{
                scale: 1.1,
                rotate: 0,
                zIndex: 100,
              }}
              whileTap={{
                scale: 1.1,
                rotate: 0,
                zIndex: 100,
              }}
              className="mr-4 mt-4 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
            >
              <Image
                src={
                  itemDetail?.object_path
                    ? `https://ipos-storage.s3.amazonaws.com/${itemDetail.object_path}`
                    : "/bookIcon.png"
                }
                alt={itemDetail?.object_path ?? ""}
                width={500}
                height={500}
                className="h-36 w-36 flex-shrink-0 rounded-lg object-cover md:h-64 md:w-44"
              />
            </motion.div>
          </div>
        </div>
        <div className="mx-auto flex max-w-sm flex-col items-start justify-start gap-x-4 gap-y-2">
          <div className="flex flex-col">
            {itemDetail?.item_sale_price && (
              <span className="font-serif text-2xl font-bold text-red-500 dark:text-neutral-300">
                ${" "}
                {itemDetail?.variations?.[0] &&
                filteredVariations?.[0]?.items_variable_items_sale_price
                  ? filteredVariations?.[0]?.items_variable_items_sale_price
                  : itemDetail?.variations?.[0]
                    ? itemDetail?.variations?.[0]
                        .items_variable_items_sale_price
                    : itemDetail?.item_sale_price}
              </span>
            )}
            {itemDetail?.SKU && (
              <span className="font-serif text-lg text-zinc-500 dark:text-neutral-300">
                SKU {itemDetail.SKU}
              </span>
            )}
          </div>

          {itemDetail?.edition && (
            <div className="flex items-center justify-center">
              <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                Series:
              </span>
              <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                {itemDetail.edition}
              </span>
            </div>
          )}

          {itemDetail?.introduced && (
            <div className="flex items-center justify-center">
              <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                Published:
              </span>
              <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300">
                {moment(itemDetail.introduced).format("Do MMMM, YYYY")}
              </span>
            </div>
          )}

          {itemDetail?.book_language && (
            <div className="flex items-center justify-center">
              <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                Language:
              </span>
              <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                {itemDetail.book_language}
              </span>
            </div>
          )}

          {itemDetail?.pages !== undefined && itemDetail.pages !== null && (
            <div className="flex items-center justify-center">
              <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                Number of Pages:
              </span>
              <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                {itemDetail.pages}
              </span>
            </div>
          )}

          {itemDetail?.publisher?.publisher_name && (
            <div className="flex items-center justify-center">
              <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                Publisher:
              </span>
              <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                {itemDetail.publisher.publisher_name}
              </span>
            </div>
          )}

          {itemDetail?.publisher?.country && (
            <div className="flex items-center justify-center">
              <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                Country of Publication:
              </span>
              <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                {itemDetail.publisher.country}
              </span>
            </div>
          )}
          {itemDetail?.variations?.[0]?.variation_tags && (
            <div>
              <div>
                <div>
                  <div>
                    {!Object.keys(selectedValues)[0] ? (
                      <span className="text-md pb-1 font-bold text-red-500">
                        Please Select Variations
                      </span>
                    ) : (
                      <span className="font-bold text-red-500">
                        Selected Variations
                      </span>
                    )}

                    <ul>
                      {Object.keys(selectedValues).map((key) => (
                        <>
                          {selectedValues[key] && (
                            <li key={key} className="flex items-center">
                              <span className="font-bold capitalize text-neutral-700 dark:text-neutral-300">
                                {key}:{" "}
                              </span>
                              <span className="pl-1 text-neutral-700 dark:text-neutral-300">
                                {selectedValues[key] ?? "Please Select"}
                              </span>
                            </li>
                          )}
                          {!selectedValues[key] && (
                            <li key={key} className="text-red-400">
                              <span className="font-bold capitalize text-neutral-700 dark:text-neutral-300">
                                {key}:{" "}
                              </span>
                              <span className="pl-1 text-neutral-700 dark:text-neutral-300">
                                {selectedValues[key] ?? "Please Select"}
                              </span>{" "}
                            </li>
                          )}
                        </>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {itemDetail?.variations?.[0]?.variation_tags.map((tag, index) => {
                const tagName = tag.items_variations_tags_name;
                const prevTags =
                  itemDetail?.variations?.[0]?.variation_tags.slice(0, index);

                const dependencies = prevTags?.reduce(
                  (acc: Record<string, string | undefined>, currTag) => {
                    if (selectedValues[currTag.items_variations_tags_name]) {
                      acc[currTag.items_variations_tags_name] =
                        selectedValues[currTag.items_variations_tags_name];
                    }
                    return acc;
                  },
                  {},
                );

                const isDisabled =
                  index > 0 &&
                  !prevTags?.every(
                    (prevTag) =>
                      selectedValues[prevTag.items_variations_tags_name],
                  );

                const options = getOptions(tagName, dependencies ?? {});

                const handleSizeClick = (size: string) => {
                  handleSelectChange(tagName, {
                    value: size,
                    label: size,
                  });
                };

                return (
                  <div
                    key={tagName}
                    className={`my-4 w-full ${tagName == "size" ? "flex items-center gap-1" : ""}`}
                  >
                    <h3 className="text-lg font-semibold capitalize">
                      {tagName}
                    </h3>

                    {tagName.toLowerCase().includes("size") ? (
                      <div className="scrollbar-hidden flex justify-center gap-2 overflow-x-auto px-1 pl-3 lg:max-w-full">
                        {options.map((option) => (
                          <button
                            key={option.value}
                            className={`min-w-10 rounded border p-1 text-center ${
                              selectedValues[tagName] === option.value
                                ? "bg-red-500 text-white"
                                : "border-red-500 bg-white dark:bg-slate-700"
                            } ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
                            onClick={() => handleSizeClick(option.value)}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <Select
                        id={tagName}
                        name={tagName}
                        options={options}
                        value={
                          selectedValues[tagName] ? selectedValues[tagName] : ""
                        }
                        placeholder={`Select ${tagName}`}
                        onChange={(option: { value: string; label: string }) =>
                          handleSelectChange(tagName, option)
                        }
                        isDisabled={isDisabled}
                      />
                    )}
                  </div>
                );
              })}

              {/* Display selected options */}
            </div>
          )}
          {itemDetail?.item_id &&
          !isItemInCart(itemDetail.item_id) &&
          itemDetail?.stock?.quantity ? (
            <button
              className="flex items-center space-x-1 rounded-full bg-green-500 py-1 pl-2 pr-2 text-xs font-bold text-white "
              onClick={() => handleAddToCart(itemDetail)}
            >
              <FaCartPlus className="text-lg" />
              <div className="pl-2">Add to Cart</div>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
