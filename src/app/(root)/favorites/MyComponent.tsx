"use client";

import { Suspense, useEffect, useState } from "react";
// import Pagination from "~/components/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "~/Context/AuthContext";
// import type PaginationData from '~/types/paginationData'
import type DataCart from "~/types/book";
import Select from "~/components/Fields/select";
import ProductCardSkeleton from "~/components/ui-components/ProductCardSkeleton";
import {
  ModalBody,
  ModalContent,
  ModalProvider,
  useModal,
} from "~/components/ui/animated-modal";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCartPlus, FaCheckCircle } from "react-icons/fa";
import moment from "moment";
import React from "react";
import ProductCard from "~/components/ui-components/ProductCard";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useToast } from "~/hooks/use-toast";

import type { Variation, VariationTag } from "~/types/book";
import { IoIosArrowRoundForward, IoIosCloseCircle } from "react-icons/io";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Spinner from "~/components/spinner";
import dynamic from "next/dynamic";
import { RxCrossCircled } from "react-icons/rx";
import { BsFillCartCheckFill } from "react-icons/bs";
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);
const PRODUCTS_PER_PAGE = 10;

const MyComponent = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<DataCart[] | null>(null);
  const params = useSearchParams();
  const { setOpen } = useModal();
  const [itemDetail, setItemDetail] = useState<DataCart | null>(null);
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
    checkoutData,
    favItems,
    removeFavourite,
    setProductForDetail,
    textbookType,
    userInfo
  } = useAuthContext();
  const { toast } = useToast();
  const router = useRouter();

  // async function getFav (){
  //   try {

  //   const x =  await getFavouriteItems(checkoutData?.booknet_customer_id);
  //         if (typeof x !== "boolean" && x.status) {
  //           setData(x.data);
  //           setFilteredData(x.data);
  //         }
  //         setLoader(false);
  //         // setData(result);
  //         // setTotalPages(result.totalPages);
  //       } catch (error) {
  //         console.error("Failed to load data:", error);
  //         setLoader(false);
  //         // Optionally set an error state here
  //       }
  // }
  // useEffect(() => {
  //   if (checkoutData?.booknet_customer_id){
  //     const loadData = async () => {
  //       setLoader(true);
  //      await getFav()
  //     };
  //       loadData().catch((error) => {
  //         console.error("Failed to load data in useEffect:", error);
  //       });
  //   };
  //   // const genId = genre?.find((item) => item.genre == detail);

  // }, [checkoutData]);

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
  const isVariableItemInCart = (itemId: number) => {
    const newItems: DataCart[] =
      typeof cartItems === "string"
        ? (JSON.parse(cartItems) as DataCart[])
        : cartItems!;
    return newItems.findIndex(
      (cartItem: DataCart) =>
        cartItem.selected_variation?.items_variable_items_id === itemId,
    ) > -1
      ? true
      : false;
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
    itemDetail?.variations ?? [],
    selectedValues,
  );
  const handleFavourite = async (item: DataCart) => {
    if (userInfo?.customer_id) {
      setWishListLoader(true);
      if (
        item &&
        favItems?.some((favItem) => favItem.item_id === item.item_id)
      ) {
        await removeFavourite(item, userInfo.customer_id)
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
        await addFavourite(item, userInfo.customer_id)
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
    let filtered = favItems;

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
  }, [searchText, favItems]);

  const goToDetail = async (item: DataCart | null) => {
    await setProductForDetail(item);
    router.push(`/product-details`);
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
  return (
    <div>
      <motion.main
        className="flex min-h-screen flex-col items-center"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex w-screen items-center justify-between pb-4 lg:px-10">
          {/* Left Arrow */}
          <div className="flex w-10 justify-start">
            <button
              onClick={() => router.back()}
              className="rounded-full bg-transparent p-2 transition hover:bg-gray-200 dark:hover:bg-slate-700"
            >
              <HiArrowNarrowLeft className="text-3xl text-red-500" />
            </button>
          </div>

          {/* Title */}
          <h4 className="flex-1 bg-gradient-to-r from-red-700 via-red-400 to-red-700 bg-clip-text text-center text-4xl font-extrabold text-transparent">
            Wishlist Wonders
          </h4>

          {/* Invisible Placeholder */}
          <div className="w-10" />
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col px-4">
            <ScrollArea className="max-h-[75vh] pb-5">
              <div className="flex flex-wrap justify-center py-3">
                {loader
                  ? Array.from({ length: 2 }, (_, index) => (
                    <div key={index} className="p-2">
                      <ProductCardSkeleton />
                    </div>
                  ))
                  : displayedData?.map((item: DataCart) => (
                    <ProductCard
                      key={item.book_id}
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
                  ))}
                {!loader && !favItems[0] && (
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <p className="mt-4 text-center text-lg text-gray-600 dark:text-gray-300">
                      Currently, you have no items in your wishlist.
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
          </div>
        </div>
      </motion.main>

      <ModalBody>
        <ModalContent>
          <h4 className="text-center font-serif text-lg font-bold capitalize text-red-500 dark:text-neutral-100 md:text-2xl">
            {itemDetail?.item_name}
          </h4>
          <h6 className="py-1.5 text-center text-sm font-sans text-neutral-600 dark:text-neutral-100">
            {itemDetail?.additional_notes && itemDetail?.additional_notes?.length > 200
              ? `${itemDetail.additional_notes.slice(0, 200)}...`
              : itemDetail?.additional_notes}
          </h6>
          {/* <h6 className="pb-4 text-center text-sm text-neutral-600 dark:text-neutral-100">
            {itemDetail?.additional_notes}
          </h6> */}
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
                    width={800}
                    height={800}
                    className="h-44 w-44 flex-shrink-0 rounded-lg object-contain md:h-48 md:w-48 lg:h-48 lg:w-48"
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
                          ?? []
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
                  ? filteredVariations?.[0]?.stock?.quantity
                    ? <span className="flex flex-row items-center gap-1 text-sm font-serif bg-green-500 p-1 text-white w-fit rounded ">
                      <FaCheckCircle /> In stock</span>
                    : itemDetail?.allow_special_order == 1 ?
                      <span className="flex flex-row items-center gap-1 text-sm font-serif bg-yellow-200 p-1  w-fit rounded ">
                        <FaCheckCircle /> Backorder</span> :
                      <span className="flex flex-row items-center gap-1 text-sm font-serif bg-red-500 p-1 text-white w-fit rounded ">
                        <IoIosCloseCircle /> Out of stock</span>
                  : itemDetail?.stock.quantity
                    ? <span className="flex flex-row items-center gap-1 text-sm font-serif bg-green-500 p-1 text-white w-fit rounded">
                      <FaCheckCircle /> In stock</span>
                    : itemDetail?.allow_special_order == 1 ?
                      <span className="flex flex-row items-center gap-1 text-sm font-serif bg-yellow-200 p-1  w-fit rounded ">
                        <FaCheckCircle /> Backorder</span> :
                      <span className="flex flex-row items-center gap-1 text-sm font-serif bg-red-500 p-1 text-white w-fit rounded ">
                        <IoIosCloseCircle /> Out of stock</span>
                }

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
                          {Object.keys(selectedValues).map((key, index) => (
                            <div key={`selected-${key}`}>
                              {selectedValues[key] && (
                                <li
                                  key={`selected-${key}-${index}`}
                                  className="flex items-center"
                                >
                                  <span className="font-bold capitalize text-neutral-700 dark:text-neutral-300">
                                    {key}:{" "}
                                  </span>
                                  <span className="pl-1 text-neutral-700 dark:text-neutral-300">
                                    {selectedValues[key] ?? "Please Select"}
                                  </span>
                                </li>
                              )}
                              {!selectedValues[key] && (
                                <li
                                  key={`unselected-${key}-${index}`}
                                  className="text-red-400"
                                >
                                  <span className="font-bold capitalize text-neutral-700 dark:text-neutral-300">
                                    {key}:{" "}
                                  </span>
                                  <span className="pl-1 text-neutral-700 dark:text-neutral-300">
                                    {selectedValues[key] ?? "Please Select"}
                                  </span>{" "}
                                </li>
                              )}
                            </div>
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
                          <h3 className="text-md font-semibold capitalize">
                            {tagName}
                          </h3>

                          {tagName.toLowerCase().includes("size") ? (
                            <div className="scrollbar-hidden flex justify-center gap-2 overflow-x-auto px-1 pl-3 lg:max-w-full">
                              {options.map((option) => (
                                <button
                                  key={option.value}
                                  className={`min-w-10 rounded border p-1 text-center text-sm ${selectedValues[tagName] === option.value
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
                                  ?? ""
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
              {itemDetail?.variations?.[0] &&
                filteredVariations?.[0]?.items_variable_items_id &&
                Object.values(selectedValues).length ==
                itemDetail?.tag_links?.length &&
                isVariableItemInCart(
                  filteredVariations?.[0]?.items_variable_items_id,
                ) ? (
                <button
                  className="mt-auto flex items-center space-x-1 rounded bg-red-500 px-3 py-1 font-sans text-white hover:bg-red-600"
                  onClick={() => handleRemoveFromCart({ ...itemDetail, selected_variation: filteredVariations?.[0] })}
                >
                  <div className="pl-2">Remove from Cart</div>
                </button>
              ) : (
                ""
              )}
              {itemDetail?.variations?.[0] &&
                !isVariableItemInCart(
                  filteredVariations?.[0]?.items_variable_items_id ?? -1,
                ) &&
                !Object.values(selectedValues).some((value) => value === undefined) &&
                Object.values(selectedValues).length ==
                itemDetail?.tag_links?.length &&
                (itemDetail?.variations?.[0]?.items_variable_items_sale_price ??
                  itemDetail?.item_sale_price) ?
                ((itemDetail?.variations?.[0]?.stock?.quantity ?? 0) > 0 || itemDetail?.allow_special_order == 1) ? (
                  <button
                    className="mt-auto flex items-center space-x-1 rounded bg-green-500 px-3 py-1 font-sans text-white hover:bg-green-600"
                    onClick={() => handleAddToCart(itemDetail)}
                  >
                    <BsFillCartCheckFill className="text-lg" />
                    <div className="pl-2">Add to Cart</div>
                  </button>
                ) : (
                  ""
                ) : itemDetail &&
                  itemDetail?.items_type != 1 &&
                  !isItemInCart(itemDetail.item_id) ?
                  itemDetail?.allow_special_order == 1 || (itemDetail?.stock?.quantity ?? 0) > 0 ?
                    (
                      <button
                        className="mt-auto flex items-center space-x-1 rounded bg-green-500 px-3 py-1 font-sans text-white hover:bg-green-600"
                        onClick={() => handleAddToCart(itemDetail)}
                      >
                        <BsFillCartCheckFill className="text-lg" />
                        <div className="pl-2">Add to Cart</div>
                      </button>
                    ) : (
                      ""
                    ) : (
                    ""
                  )}
              {itemDetail &&
                itemDetail?.items_type != 1 &&
                isItemInCart(itemDetail.item_id) ? (
                <button
                  className="mt-auto flex items-center space-x-1 rounded bg-red-500 px-3 py-1 font-sans text-white hover:bg-red-600"
                  onClick={() => handleRemoveFromCart(itemDetail)}
                >

                  <div className="pl-2">Remove from Cart</div>
                </button>
              ) : (
                ""
              )}
              {/* {itemDetail?.variations?.[0]?.variation_tags &&
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
                        <RxCrossCircled />
                        <span className="text-sm font-bold text-red-500">
                          Out of Stock
                        </span>
                      </span>
                    )
                )} */}
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
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ModalProvider>
        <MyComponent />
      </ModalProvider>
    </Suspense>
  );
};

export default Page;
