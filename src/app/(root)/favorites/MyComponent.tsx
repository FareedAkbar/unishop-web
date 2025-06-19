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
import ProductModal from "~/components/ui-components/PrductModal";
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
    userInfo,
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
  return (
    <div>
      <motion.main
        className="flex min-h-screen flex-col items-center"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex w-[90vw] items-center justify-between pb-4 lg:px-10">
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
            {/* <ScrollArea className="max-h-[75vh] pb-5"> */}
            <div className="flex flex-wrap justify-center gap-5 overflow-y-auto py-3">
              {loader
                ? Array.from({ length: 2 }, (_, index) => (
                    <div key={index} className="p-2">
                      <ProductCardSkeleton />
                    </div>
                  ))
                : displayedData?.map(
                    (item: DataCart) =>
                      item.web_visibility === 1 && (
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
                      ),
                  )}
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
            {/* </ScrollArea> */}
          </div>
        </div>
      </motion.main>

      <ModalBody>
        <ModalContent>
          <ProductModal
            itemDetail={itemDetail}
            selectedVariation={selectedVariation}
            currentImageIndex={currentImageIndex}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
            setCurrentImageIndex={setCurrentImageIndex}
            handleSelectChange={handleSelectChange}
            selectedValues={selectedValues}
            filteredVariations={filteredVariations}
            goToDetail={goToDetail}
          />
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
