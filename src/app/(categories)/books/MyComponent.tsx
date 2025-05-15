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
import { FaCheckCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import moment from "moment";
import React from "react";
import ProductCard from "~/components/ui-components/ProductCard";
import { ScrollArea } from "~/components/ui/scroll-area";
import { getBooks } from "~/_actions/getbooks";
import { useToast } from "~/hooks/use-toast";
import AlertBox from "~/components/alertBox/alert";
import Select from "~/components/Fields/select";
import { Variation } from "~/types/book";
import { IoIosArrowRoundForward, IoIosCloseCircle } from "react-icons/io";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

import Spinner from "~/components/spinner";
import dynamic from "next/dynamic";
import { RxCrossCircled } from "react-icons/rx";
import ProductModal from "~/components/ui-components/PrductModal";

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
  const [currentPage, setCurrentPage] = useState(
    params.get("page") ? parseInt(params.get("page")!) : 1,
  );
  const [pageSize, setPageSize] = useState(15);
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
    userInfo,
  } = useAuthContext();
  const { toast } = useToast();

  useEffect(() => {
    const d = params.get("detail");
    const currentPage = params.get("page");

    if (currentPage) {
      setCurrentPage(parseInt(currentPage));
    } else {
      setCurrentPage(1);
    }
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
    itemDetail?.variations ?? [],
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

  // Get the products for the current page
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const updateSearchParams = (newParams: Record<string, string | null>) => {
    const currentParams = new URLSearchParams(params.toString());
    for (const key in newParams) {
      if (newParams[key] === null || newParams[key] === undefined) {
        currentParams.delete(key); // delete if value is null or undefined
      } else {
        currentParams.set(key, newParams[key]); // set or update
      }
    }
    router.push(`?${currentParams.toString()}`);
  };

  const handlePageChange = async (page: number) => {
    smoothScrollTo(0, 1500);
    setCurrentPage(page);
    updateSearchParams({ page: page.toString() });
  };

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
    setCurrentPage(params.get("page") ? parseInt(params.get("page")!) : 1); // Reset to first page on new filter
  };
  // Calculate total pages based on filtered data and page size
  const totalPages = Math.ceil(
    filteredData
      ? filteredData?.length / pageSize
      : params.get("page")
        ? parseInt(params.get("page")!)
        : 1 / pageSize,
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
  const goToDetail = async (item: DataCart | null) => {
    await setProductForDetail(item);
    router.push(`/product-details?genre=${item?.genre_id}`);
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

  const smoothScrollTo = (targetPosition: number, duration: number) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      startTime ??= currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startPosition + distance * progress);

      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  return (
    <div>
      <motion.main
        className="flex min-h-screen flex-col items-center pb-5"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex w-full flex-grow flex-row">
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
              <div className="flex h-full flex-wrap items-center justify-center gap-3 space-y-2 py-3">
                {loader ? (
                  Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className="p-2">
                      <ProductCardSkeleton />
                    </div>
                  ))
                ) : displayedData && displayedData.length > 0 ? (
                  displayedData.map(
                    (item: DataCart) =>
                      item.web_visibility === 1 && (
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
                      ),
                  )
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
                className={`rounded-full p-2 ${
                  currentPage === 1
                    ? "cursor-not-allowed bg-gray-200 text-black"
                    : "cursor-pointer bg-red-500 text-white"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
              <span className="px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`rounded-full p-2 ${
                  currentPage === totalPages || totalPages == 0
                    ? "cursor-not-allowed bg-gray-200 text-black"
                    : "cursor-pointer bg-red-500 text-white"
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
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
