/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense, useEffect, useState } from "react";
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
import { FaCartPlus, FaCheckCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import moment from "moment";
import React from "react";
import ProductCard from "~/components/ui-components/ProductCard";
import { ScrollArea } from "~/components/ui/scroll-area";
import AlertBox from "~/components/alertBox/alert";
import { useToast } from "~/hooks/use-toast";
import type { Category, SuperCategory } from "~/types/category";
import Select from "~/components/Fields/select";
import type { Pagination } from "~/types/pagination";
import type { Variation } from "~/types/book";
import { IoIosArrowRoundForward } from "react-icons/io";

import Spinner from "~/components/spinner";
import dynamic from "next/dynamic";
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);
const MyComponent = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [data, setData] = useState<DataCart[]>([]);
  // const isFirstRender = useRef(true);
  const [searchText, setSearchText] = useState("");
  const params = useSearchParams();
  const { setOpen } = useModal();
  const [detail, setDetail] = useState<number>(-1);

  const [name, setName] = useState<string>("");

  const [itemDetail, setItemDetail] = useState<DataCart | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loginAlert, setLoginAlert] = useState<boolean>(false);
  const [wishListLoader, setWishListLoader] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<
    Record<string, string | undefined>
  >({});
  const [currentPage, setCurrentPage] = useState(pagination?.page ?? 1);
  const [pageSize, setPageSize] = useState(pagination?.limit ?? 15);
  const [totalPages, setTotalPages] = useState(pagination?.pages ?? 1);
  const [displayData, setDisplayData] = useState<DataCart[] | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const {
    cartItems,
    addCartItems,
    removeCartItems,
    genre,
    addFavourite,
    removeFavourite,
    favItems,
    checkoutData,
    category,
    setProductForDetail,
    subCategory,
    searchItems,
    searchInCategory,
    textbookType,
  } = useAuthContext();
  console.log("searchItems", searchItems);
  useEffect(() => {
    const fetchData = async () => {
      const d = params.get("type");
      const id = params.get("id");
      const parentCat = params.get("searchTerm");

      try {
        if (parentCat) {
          setName(parentCat);
          setLoader(true);
          await searchInCategory(parentCat, id!);
          setLoader(false);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoader(false);
      }
    };

    void fetchData(); // Call the async function
  }, [params]);

  const filterVariationsBySelectedValues = (
    variations: Variation[],
    selectedValues: Record<string, string | undefined>,
  ) => {
    return variations?.filter((variation) => {
      return Object.keys(selectedValues).every((tagName) => {
        const selectedValue = selectedValues[tagName];

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
        tagName,
        dependencies,
        value: value!,
        label: value!,
      }));
  };

  const openDetail = async (item: DataCart) => {
    setOpen(true);
    setItemDetail(item);
    setSelectedValues({});
  };

  const handleFavourite = async (item: DataCart) => {
    if (checkoutData?.customer_id) {
      setWishListLoader(true);
      if (
        item &&
        favItems?.some((favItem) => favItem.item_id === item.item_id)
      ) {
        await removeFavourite(item, checkoutData.customer_id)
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
        await addFavourite(item, checkoutData.customer_id)
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

  const filterResult = () => {
    let filtered = [...data];

    // Search filter
    if (searchText) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    }

    // Date range filter
    setCurrentPage(filtered ? 1 : (pagination?.page ?? 1)); // Reset to first page on new filter
    setTotalPages(
      Math.ceil(filtered ? filtered?.length / pageSize : 1 / pageSize),
    );
    const x = filtered
      ? filtered?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      : data;
    setDisplayData(x);
  };

  useEffect(() => {
    filterResult();
  }, [searchText]);

  const goToLogin = () => {
    setLoginAlert(false);
    router.push("login");
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
      return newValues;
    });
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
  };

  const goToDetail = async (item: DataCart | null) => {
    await setProductForDetail(item);
    router.push(`/product-details?category=${item?.category}`);
  };
  const handleChangeSubCategory = async (id: string) => {
    const genId = subCategory?.find((item) => item.id == parseInt(id));
    if (genId?.category_name) {
      setName(genId.category_name);
    }
    setDetail(parseInt(id));
    setCurrentPage(1);
  };

  const manageUsage = () => {
    if (itemDetail?.book_usages && itemDetail?.book_usages.length > 0) {
      return itemDetail.book_usages
        .filter((usage) => (usage.default_semester === 1 || usage.default_trimester === 1))
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
        className="flex min-h-screen flex-col items-center"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-grow flex-row sm:pt-10">
          <div className="flex min-h-screen flex-col">
            {/* Header Section */}
            <div className="flex w-full flex-wrap items-end justify-between gap-2 pb-4 pl-2">
              <div className="flex flex-row items-center gap-3 text-left">
                <h2 className="text-xl font-bold capitalize">
                  Search results for:
                </h2>
                <p className="font-semibold">{` '${name}'`}</p>
              </div>
            </div>

            <ScrollArea className="min-h-[75vh] pb-10">
              <div
                className="flex flex-wrap justify-center gap-3 py-3"
              // key={displayData ? displayData?.[0]?.item_id : "123"}
              >
                {loader ? (
                  Array.from({ length: 5 }, (_, index) => (
                    <div key={index}>
                      <ProductCardSkeleton />
                    </div>
                  ))
                ) : searchItems && searchItems.length > 0 ? (
                  searchItems.map((item: DataCart) => (
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
                  // Only display the empty state when data loading is complete and no items are available
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <p className="mb-2 rounded bg-yellow-200 p-3 text-center text-sm dark:bg-yellow-700 lg:w-2/3">
                      Your search returned no results. If you were searching for
                      a subject code, it is possible textbooks have not been
                      confirmed for this course yet. Please contact the Bookshop
                      at
                      <a
                        href="tel:0242218050"
                        className="mx-1 text-red-500 underline hover:text-red-600"
                      >
                        02 4221 8050
                      </a>
                      or
                      <a
                        href="mailto:uow-bookshop@uow.edu.au"
                        className="mx-1 text-red-500 underline hover:text-red-600"
                      >
                        uow-bookshop@uow.edu.au
                      </a>
                      for further details.
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
            {pagination && (
              <div className="z-5 flex justify-between px-4 py-4">
                <button
                  className={`rounded-full p-2 ${currentPage === 1 ? "cursor-not-allowed bg-gray-200 text-black blur" : "cursor-pointer bg-red-500 text-white"}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FaChevronLeft />
                </button>
                <span className="px-2">
                  Page {currentPage ?? 1} of {totalPages ?? 1}
                </span>
                <button
                  className={`rounded-full p-2 ${totalPages == 0 || currentPage === totalPages ? "cursor-not-allowed bg-gray-200 text-black blur" : "cursor-pointer bg-red-500 text-white"}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={totalPages == 0 || currentPage === totalPages}
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.main>

      <ModalBody>
        <ModalContent>
          <h4 className="text-center font-serif text-lg font-bold capitalize text-red-500 dark:text-neutral-100 md:text-2xl">
            {itemDetail?.item_name}
          </h4>
          {/* <h6 className="py-1.5 text-center text-sm font-bold text-neutral-600 dark:text-neutral-100 md:text-xl">
            {itemDetail?.description}
          </h6> */}
          <h6 className="pb-4 text-center text-sm text-neutral-600 dark:text-neutral-100">
            {itemDetail?.additional_notes}
          </h6>
          <div className="flex">
            <div>
              <div className="flex items-center justify-center">
                <motion.div
                  key={"images"}
                  style={{
                    rotate:
                      typeof window !== "undefined" && window.innerWidth > 768
                        ? Math.random() * 20 - 10
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
                      itemDetail?.object_path
                        ? `https://ipos-storage.s3.amazonaws.com/${itemDetail.object_path}`
                        : "/assets/images/products/product.png"
                    }
                    alt={itemDetail?.object_path ?? ""}
                    width={500}
                    height={500}
                    className="h-36 w-36 flex-shrink-0 rounded-lg object-contain md:h-40 md:w-40 lg:h-44 lg:w-44"
                  />
                </motion.div>
              </div>
            </div>
            <div className="mx-auto flex max-w-sm flex-col items-start justify-start gap-x-4 ">
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
                <span className="flex flex-row items-center gap-1 text-sm font-serif text-green-500 ">
                  <FaCheckCircle />
                  {filteredVariations?.[0]
                    ? filteredVariations?.[0]?.stock?.quantity
                      ? "In stock"
                      : "Backorder"
                    : itemDetail?.stock.quantity
                      ? "In stock"
                      : "Backorder"
                  }
                </span>
                {filteredVariations?.[0]
                  ? filteredVariations?.[0].items_variable_items_sku_number && (
                    <div className="flex items-center justify-center">
                      <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                        SKU:
                      </span>
                      <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300">
                        {filteredVariations?.[0].items_variable_items_sku_number}
                      </span>
                    </div>

                  )
                  : itemDetail?.SKU && (
                    <div className="flex items-center justify-center">
                      <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                        SKU:
                      </span>
                      <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300">
                        {itemDetail.SKU}
                      </span>
                    </div>

                  )}
              </div>
              {itemDetail?.book_id && itemDetail?.food_id == null && (
                <div className="flex items-center justify-center">

                  <span className="text-xs text-neutral-700 dark:text-neutral-300">
                    {manageUsage().length > 0 ? (
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        {manageUsage().map((item, index) => {
                          const matchedType = textbookType?.find(
                            (t) => t.item_book_type_id === Number(item.type_id),
                          ); // Find the matching type
                          return (
                            <span key={`usage-${item.subject_code}-${index}-pair`} className={`inline-block w-fit rounded ${matchedType?.type_name === "Textbook" ? "bg-red-500 text-white" : "bg-yellow-200 dark:bg-yellow-500"} px-2 py-1 text-sm`}>
                              {matchedType?.type_name ?? ""}: {item.subject_name} {item.subject_code}
                            </span>
                          );
                        })}
                      </span>
                    ) : (
                      <>
                        <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                          Textbook:
                        </span>
                        <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                          not used this session
                        </span>
                      </>
                    )}
                  </span>
                </div>
              )}
              {itemDetail?.barcode && (
                <div className="flex items-center justify-center">
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Barcode:
                  </span>
                  <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                    {itemDetail.barcode}
                  </span>
                </div>
              )}
              {itemDetail?.shelf_location && (
                <div className="flex items-center">
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Bin location:
                  </span>
                  <span className="pl-1 text-sm capitalize text-neutral-700 dark:text-neutral-300">
                    {itemDetail.shelf_location}
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
                  ((filteredVariations?.[0]?.stock?.quantity ?? 0) > 0 || itemDetail?.allow_special_order === 1) ?
                    (<button
                      className="mt-auto flex items-center space-x-1 rounded bg-green-500 px-3 py-2 font-bold text-white hover:bg-green-600"
                      onClick={() => handleAddToCart(itemDetail)}
                    >
                      <FaCartPlus className="text-lg" />
                      <div className="pl-2">Add to Cart</div>
                    </button>) :
                    (
                      <span className="flex flex-row items-center gap-1 text-xs font-serif text-red-500 ">
                        <FaCheckCircle />
                        <span className="text-sm font-bold text-red-500">
                          Out of Stock
                        </span>
                      </span>
                    )
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

const Page = () => {
  return (
    <ModalProvider>
      <Suspense fallback={<Spinner />}>
        <MyComponent />
      </Suspense>
    </ModalProvider>
  );
};

export default Page;
