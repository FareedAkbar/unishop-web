/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "~/Context/AuthContext";
import type DataCart from "~/types/book";
import ProductCardSkeleton from "~/components/ui-components/ProductCardSkeleton";
import {
  ModalBody,
  ModalContent,
  ModalProvider,
  useModal,
} from "~/components/ui/animated-modal";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import moment from "moment";
import React from "react";
import ProductCard from "~/components/ui-components/ProductCard";
import { ScrollArea } from "~/components/ui/scroll-area";
import { getBooks } from "~/_actions/getbooks";
import { useToast } from "~/hooks/use-toast";
import AlertBox from "~/components/alertBox/alert";
import Select from "~/components/Fields/select";
import { Variation } from "~/types/book";
import { IoIosArrowRoundForward } from "react-icons/io";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

import Spinner from "~/components/spinner";
import dynamic from "next/dynamic";

const PRODUCTS_PER_PAGE = 10;
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);
const MyComponent = () => {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [data, setData] = useState<DataCart[]>([]);
  const isFirstRender = useRef(true);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<DataCart[] | null>(null);
  const params = useSearchParams();
  const { setOpen } = useModal();
  const [detail, setDetail] = useState<string | null>(null);
  const [itemDetail, setItemDetail] = useState<DataCart | null>(null);
  const [loginAlert, setLoginAlert] = useState<boolean>(false);
  const [wishListLoader, setWishListLoader] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<
    Record<string, string | undefined>
  >({});
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(
    null,
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {
    cartItems,
    addCartItems,
    removeCartItems,
    genre,
    addFavourite,
    removeFavourite,
    checkoutData,
    favItems,
    setProductForDetail,
    textbookType,
  } = useAuthContext();
  const { toast } = useToast();

  useEffect(() => {
    const d = params.get("detail");
    setDetail(d);
  }, [params]);

  useEffect(() => {
    if (!genre) return;
    const genId = genre?.find((item) => item.genre == detail);
    if (!genId) return;
    const loadData = async () => {
      try {
        setLoader(true);
        const x = await getBooks(genId?.genre_id ?? 1);
        if (typeof x !== "boolean" && x.status) {
          console.log(x);
          setData(x.data);
          setFilteredData(x.data);
        }
        setLoader(false);
        // setData(result);
        // setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Failed to load data:", error);
        setLoader(false);
      }
    };

    loadData().catch((error) => {
      console.error("Failed to load data in useEffect:", error);
    });
  }, [genre, detail]);

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

        return variation.variation_tags.some((tag: any) => {
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

  // Handle add to cart
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
      setOpen(false);
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

  const openDetail = async (item: DataCart) => {
    setOpen(true);
    setItemDetail(item);
    setSelectedValues({});
    setSelectedVariation(null);
    setCurrentImageIndex(0);
  };

  const handleFavourite = async (item: DataCart) => {
    if (checkoutData?.booknet_customer_id) {
      setWishListLoader(true);
      if (
        item &&
        favItems?.some((favItem) => favItem.item_id === item.item_id)
      ) {
        await removeFavourite(item, checkoutData.booknet_customer_id)
          .then((x) => {
            if (x) {
              toast({
                variant: "destructive",
                title: "Remove From Wishlist",
                description: "Item has been removed successfully.",
              });
            }
          })
          .finally(() => setWishListLoader(false));
      } else {
        await addFavourite(item, checkoutData.booknet_customer_id)
          .then((x) => {
            if (x) {
              toast({
                variant: "success",
                title: "Added To Wishlist",
                description: "Item has been added successfully.",
              });
            }
          })
          .finally(() => setWishListLoader(false));
      }
    } else {
      setLoginAlert(true);
    }
  };

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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Get the products for the current page
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const filterResult = () => {
    let filtered = data;

    // Search filter
    if (searchText) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    }

    // Date range filter

    setFilteredData(filtered);
    setCurrentPage(1);
  };
  // Calculate total pages based on filtered data and page size
  const totalPages = Math.ceil(
    filteredData ? filteredData?.length / pageSize : 1 / pageSize,
  );

  // Get the data to be displayed for the current page
  const displayedData = filteredData?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  useEffect(() => {
    filterResult();
  }, [searchText, data]);

  const goToLogin = () => {
    setLoginAlert(false);
    router.push("login");
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

  const handleSelectChange = (
    tagName: string,
    selectedOption: { value: string; label: string },
  ) => {
    setSelectedValues((prevValues) => {
      const newValues = { ...prevValues, [tagName]: selectedOption.value };

      // Find the current tag's index
      const tagIndex = itemDetail?.variations?.[0]?.variation_tags.findIndex(
        (tag) => tag.items_variations_tags_name === tagName,
      );

      // Reset only the dependent dropdowns
      if (tagIndex !== undefined && tagIndex !== -1) {
        const tagsToReset = itemDetail?.variations?.[0]?.variation_tags
          .slice(tagIndex + 1)
          .map((tag) => tag.items_variations_tags_name);
        tagsToReset?.forEach((tag) => {
          newValues[tag] = undefined;
        });
      }

      // Find matching variation only when all required tags are selected
      const allTagsSelected = itemDetail?.variations?.[0]?.variation_tags.every(
        (tag) => newValues[tag.items_variations_tags_name],
      );

      if (allTagsSelected && itemDetail?.variations) {
        const matchedVariation = itemDetail.variations.find((variation) => {
          return variation.variation_tags.every((tag) => {
            return (
              newValues[tag.items_variations_tags_name] ===
              tag.items_variations_tags_links_values_value
            );
          });
        });

        setSelectedVariation(matchedVariation ?? null); // Wrap in array if found, otherwise set to null
        setCurrentImageIndex(0);
      } else {
        setSelectedVariation(null); // Reset if not all tags are selected
        setCurrentImageIndex(0);
      }

      return newValues;
    });
  };

  const goToDetail = async (item: DataCart | null) => {
    await setProductForDetail(item);
    router.push(`/product-details?genre=${item?.genre_id}`);
  };
  const manageUsage = () => {
    if (itemDetail?.book_usages && itemDetail?.book_usages.length > 0) {
      return itemDetail.book_usages
        .filter((usage) => usage.default_semester === 1)
        .map((usage) => ({
          type_id: usage.type_id, // Assuming `type_id` exists
          subject_name: usage.subject_name,
          subject_code: usage.subject_code, // Assuming `subject_name` exists
        }));
    }
    return [];
  };
  const type = [
    {
      item_book_type_id: 1,
      type_name: "Textbook",
      type_desc: "Textbook",
    },
    {
      item_book_type_id: 2,
      type_name: "Reference",
      type_desc: "Reference",
    },
    {
      item_book_type_id: 3,
      type_name: "Recommended",
      type_desc: "Recommended",
    },
    {
      item_book_type_id: 4,
      type_name: "Course Notes",
      type_desc: "Course Notes",
    },
    {
      item_book_type_id: 5,
      type_name: "General Reading",
      type_desc: "General Reading",
    },
  ];
  return (
    <div>
      <motion.main
        className="flex min-h-screen flex-col items-center pb-5"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex w-full flex-grow flex-row sm:pt-10">
          <div className="flex min-h-screen w-full flex-col">
            {/* Header Section */}
            <div className="flex w-full flex-wrap items-end justify-between gap-5 pb-4">
              <div className="text-left">
                <h2 className="text-xl font-bold">Books</h2>
                <p className="text-sm capitalize text-gray-500 dark:text-gray-300">
                  {detail}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* <div className="relative">
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search"
                    className="w-full border-b border-gray-300 bg-gray-100 p-2 pl-8 text-sm focus:outline-none dark:bg-slate-700 dark:text-white"
                  />
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-500 dark:text-white">
                    <FiSearch />
                  </span>
                </div> */}
                <h1 className="text-sm font-semibold">
                  Showing {displayedData?.length} of {data.length} Items
                </h1>
              </div>
            </div>

            {/* Scrollable Product Section */}
            <ScrollArea className="min-h-[75vh] pb-5">
              <div className="flex h-full flex-wrap items-center justify-center gap-3 py-3">
                {loader ? (
                  Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className="p-2">
                      <ProductCardSkeleton />
                    </div>
                  ))
                ) : displayedData && displayedData.length > 0 ? (
                  displayedData.map((item: DataCart) => (
                    <ProductCard
                      key={item.item_id}
                      product={item}
                      showAddToCart={!isItemInCart(item.item_id)}
                      onAddToCart={async () => {
                        if (item?.variations?.[0]) {
                          await openDetail(item);
                        } else {
                          await handleAddToCart(item);
                        }
                      }}
                      onRemoveFromCart={() => handleRemoveFromCart(item)}
                      openDetail={() => openDetail(item)}
                      handleFavourite={() => handleFavourite(item)}
                      wishListLoader={wishListLoader}
                      goToDetail={() => goToDetail(item)}
                    />
                  ))
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <p className="mt-4 text-center text-lg text-gray-600 dark:text-gray-300">
                      Currently, you have no items in this category.
                    </p>
                    <Player
                      autoplay
                      loop
                      src="/assets/gifs/emptywishlist.json"
                      className="h-80 w-80"
                    />
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Pagination Section */}
            <div className="z-[5] flex justify-between px-4 py-4">
              <button
                className={`rounded-full p-2 ${currentPage === 1
                    ? "cursor-not-allowed bg-gray-200 text-black"
                    : "cursor-pointer bg-red-500 text-white"
                  }`}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
              <span className="px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`rounded-full p-2 ${currentPage === totalPages || totalPages == 0
                    ? "cursor-not-allowed bg-gray-200 text-black"
                    : "cursor-pointer bg-red-500 text-white"
                  }`}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages == 0}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </motion.main>

      <ModalBody>
        <ModalContent>
          <h4 className="pb-2 text-center font-serif text-lg font-bold text-red-500 dark:text-neutral-100 md:text-2xl">
            {itemDetail?.book_title}
          </h4>

          <h6 className="pb-4 text-center text-sm text-neutral-600 dark:text-neutral-100">
            {itemDetail?.additional_notes}
          </h6>
          <div className="flex">
            <div>
              <div className="flex flex-col items-center justify-center">
                <motion.div
                  key={"images"}
                  style={{
                    rotate:
                      typeof window !== "undefined"
                        ? window.innerWidth > 768
                          ? Math.random() * 20 - 10
                          : 0
                        : 0,
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
                  className="mr-4 mt-4 flex-shrink-0 overflow-hidden rounded-xl border bg-white p-1 dark:border-slate-900 dark:bg-slate-700"
                >
                  <Image
                    src={
                      selectedVariation?.media?.[currentImageIndex]?.object_path
                        ? `https://ipos-storage.s3.amazonaws.com/${selectedVariation.media[currentImageIndex].object_path}`
                        : itemDetail?.object_path
                          ? `https://ipos-storage.s3.amazonaws.com/${itemDetail.object_path}`
                          : "/assets/images/products/product.png"
                    }
                    alt={
                      selectedVariation?.media?.[0]?.object_path
                        ? `${itemDetail?.item_name} - ${selectedValues.size ?? ""} ${selectedValues.color ?? ""}`
                        : (itemDetail?.item_name ?? "Product image")
                    }
                    width={600}
                    height={600}
                    className="h-44 w-44 flex-shrink-0 rounded-lg object-contain md:h-40 md:w-40 lg:h-44 lg:w-44"
                  />
                </motion.div>
                {((selectedVariation?.media &&
                  selectedVariation?.media?.length > 1) ??
                  (selectedVariation?.media?.length === 0 &&
                    itemDetail?.media &&
                    itemDetail?.media?.length > 1)) && (
                    <div className="mt-2 flex gap-2 overflow-x-auto py-2">
                      {(selectedVariation?.media?.length > 0
                        ? selectedVariation.media
                        : itemDetail?.media
                          ? itemDetail.media
                          : []
                      ).map((media, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border ${currentImageIndex === index ? "border-red-500" : "border-gray-300"}`}
                        >
                          <Image
                            src={`https://ipos-storage.s3.amazonaws.com/${media.object_path}`}
                            alt={`Thumbnail ${index + 1}`}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            </div>
            <div className="mx-auto flex max-w-sm flex-col items-start justify-start gap-x-4">
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-red-500 dark:text-neutral-300">
                  $
                  {itemDetail?.variations?.[0] &&
                    filteredVariations?.[0]?.items_variable_items_sale_price
                    ? filteredVariations?.[0]?.items_variable_items_sale_price
                    : itemDetail?.variations?.[0]
                      ? itemDetail?.variations?.[0]
                        .items_variable_items_sale_price
                      : itemDetail?.item_sale_price}
                </span>
                {filteredVariations?.[0]
                  ? filteredVariations?.[0].items_variable_items_sku_number && (
                    <span className="text-md font-serif text-zinc-500 dark:text-neutral-300">
                      SKU: {filteredVariations?.[0].items_variable_items_sku_number}
                    </span>
                  )
                  : itemDetail?.SKU && (
                    <span className="text-md font-serif text-zinc-500 dark:text-neutral-300">
                      SKU: {itemDetail.SKU}
                    </span>
                  )}
              </div>
              {itemDetail?.book_id && itemDetail?.food_id == null && (
                <div className="flex items-center justify-center">
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Textbook:
                  </span>
                  <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                    {manageUsage().length > 0 ? (
                      <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300">
                        {manageUsage().map((item, index) => {
                          const matchedType = textbookType?.find(
                            (t) => t.item_book_type_id === Number(item.type_id),
                          ); // Find the matching type
                          return (
                            <small
                              key={index}
                              className="mr-1 rounded bg-red-500 px-2 py-1 text-gray-100 dark:bg-gray-700 dark:text-gray-300"
                            >
                              {item.subject_name} {item.subject_code},{" "}
                              {matchedType?.type_name ?? ""}{" "}
                              {/* Display type_name or fallback */}
                            </small>
                          );
                        })}
                      </span>
                    ) : (
                      <>
                        <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                          Textbook:
                        </span>
                        <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                          Not used this session
                        </span>
                      </>
                    )}
                  </span>
                </div>
              )}
              {itemDetail?.book_id &&
                itemDetail?.food_id == null && (
                  <div className="">
                    {itemDetail?.audience && (
                      <div className="flex items-center">
                        <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                          Audience:
                        </span>
                        <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300 capitalize">
                          {itemDetail.audience}
                        </span>
                      </div>
                    )}
                    {itemDetail?.format && (
                      <div className="flex items-center ">
                        <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                          Format:
                        </span>
                        <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300 capitalize">
                          {itemDetail.format}
                        </span>
                      </div>
                    )}
                    {itemDetail?.book_language && (
                      <div className="flex items-center">
                        <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                          Language:
                        </span>
                        <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300 capitalize">
                          {itemDetail.book_language}
                        </span>
                      </div>
                    )}
                    {itemDetail?.pages !== undefined &&
                      itemDetail.pages !== null &&
                      itemDetail.pages ? (
                      <div className="flex items-center">
                        <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                          Number of Pages:
                        </span>
                        <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                          {itemDetail.pages}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                    {itemDetail?.introduced && (
                      <div className="flex items-center ">
                        <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                          Published:
                        </span>
                        <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300">
                          {moment(itemDetail.introduced).format("Do MMMM, YYYY")}
                        </span>
                      </div>
                    )}
                    {itemDetail?.publisher?.publisher_name && (
                      <div className="flex items-center ">
                        <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                          Publisher:
                        </span>
                        <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300">
                          {itemDetail.publisher.publisher_name}
                        </span>
                      </div>
                    )}
                    {itemDetail?.country_of_publication && (
                      <div className="flex items-center ">
                        <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                          Country of Publication:
                        </span>
                        <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300 capitalize">
                          {itemDetail.country_of_publication}
                        </span>
                      </div>
                    )}
                    {itemDetail?.dimensions && (
                      <div className="flex items-center ">
                        <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                          Dimensions:
                        </span>
                        <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300 capitalize">
                          {itemDetail?.dimensions}
                        </span>
                      </div>
                    )}
                    {itemDetail?.weight && (
                      <div className="flex items-center ">
                        <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                          Weight:
                        </span>
                        <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300">
                          {itemDetail?.weight}
                        </span>
                      </div>
                    )}
                    {itemDetail?.edition && (
                      <div className="flex items-center ">
                        <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                          Edition:
                        </span>
                        <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300">
                          {itemDetail.edition}
                        </span>
                      </div>
                    )}
                  </div>
                )
              }

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

                  {itemDetail?.variations?.[0]?.variation_tags.map(
                    (tag, index) => {
                      const tagName = tag.items_variations_tags_name;
                      const prevTags =
                        itemDetail?.variations?.[0]?.variation_tags.slice(
                          0,
                          index,
                        );

                      const dependencies = prevTags?.reduce(
                        (acc: Record<string, string | undefined>, currTag) => {
                          if (
                            selectedValues[currTag.items_variations_tags_name]
                          ) {
                            acc[currTag.items_variations_tags_name] =
                              selectedValues[
                              currTag.items_variations_tags_name
                              ];
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
                                  className={`min-w-10 rounded border p-1 text-center ${selectedValues[tagName] === option.value
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
                                selectedValues[tagName]
                                  ? selectedValues[tagName]
                                  : ""
                              }
                              placeholder={`Select ${tagName}`}
                              onChange={(option: {
                                value: string;
                                label: string;
                              }) => handleSelectChange(tagName, option)}
                              isDisabled={isDisabled}
                            />
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              )}
              {itemDetail?.variations?.[0]?.variation_tags &&
                Object.keys(selectedValues)[0] &&
                filteredVariations?.[0]?.items_variable_items_id && (
                  <button
                    className="mt-auto flex items-center space-x-1 rounded bg-green-500 px-3 py-2 font-bold text-white hover:bg-green-600"
                    onClick={() => handleAddToCart(itemDetail)}
                  >
                    <BsFillCartCheckFill className="text-lg" />
                    <div className="pl-2">Add to Cart</div>
                  </button>
                )}
            </div>
          </div>
          <div className="flex w-full justify-end">
            <button
              className="mt-5 flex w-fit flex-row items-center justify-end rounded border-none bg-red-500 px-1 text-[10px] text-white hover:bg-red-600 md:px-3 md:py-1.5 lg:px-4 lg:py-2 lg:text-base"
              onClick={() => goToDetail(itemDetail)}
            >
              <span>More Details</span>
              <IoIosArrowRoundForward className="ml-1 text-lg text-white lg:text-xl" />
            </button>
          </div>
        </ModalContent>
      </ModalBody>
      <AlertBox
        title="Login Your Account"
        description="Please login to add item to wishlist"
        open={loginAlert}
        onClose={() => setLoginAlert(false)}
        onContinue={() => goToLogin()}
      />
    </div>
  );
};

const BooksPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ModalProvider>
        <MyComponent />
      </ModalProvider>
    </Suspense>
  );
};

export default BooksPage;
