"use client";

// import Header from "~/components/header";
import { Suspense, useEffect, useRef, useState } from "react";
// import Pagination from "~/components/pagination";
import { useSearchParams } from "next/navigation";
import { useAuthContext } from "~/Context/AuthContext";
// import type PaginationData from '~/types/paginationData'
import type DataCart from "~/types/book";
import Spinner from "~/components/spinner";
import Select from "~/components/Fields/select";
import ProductCardSkeleton from "~/components/ui-components/ProductCardSkeleton";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalProvider,
  useModal,
} from "~/components/ui/animated-modal";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCartPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import moment from "moment";
import React from "react";
import ProductCard from "~/components/ui-components/ProductCard";
import { ScrollArea } from "~/components/ui/scroll-area";
import { getBooks } from "~/_actions/getbooks";
import { getFavouriteItems } from "~/_actions/wishlist";
import { useToast } from "~/hooks/use-toast";
import { Player } from "@lottiefiles/react-lottie-player";
import type { Variation } from "~/types/book";

const PRODUCTS_PER_PAGE = 10;

const MyComponent = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [data, setData] = useState<DataCart[]>([]);
  const isFirstRender = useRef(true);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<DataCart[] | null>(null);
  const params = useSearchParams();
  const { setOpen } = useModal();
  const [detail, setDetail] = useState<string | null>(null);
  const [itemDetail, setItemDetail] = useState<DataCart | null>(null);
  const [wishListLoader, setWishListLoader] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<
  Record<string, string | undefined>
>({});
  const {
    cartItems,
    addCartItems,
    removeCartItems,
    genre,
    addFavourite,
    checkoutData,
    favItems,
    removeFavourite,
  } = useAuthContext();
  const { toast } = useToast();

  useEffect(() => {
    const d = params.get("detail");
    setDetail(d);
  }, [params]);

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
    try {
      await addCartItems(item);
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
    console.log("ftd",item);
    setSelectedValues({});
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

      return newValues;
    });
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
  const handleFavourite = async (item: DataCart) => {
    if (checkoutData?.booknet_customer_id) {
      setWishListLoader(true);
      if (
        item &&
        favItems?.some((favItem) => favItem.item_id === item.item_id)
      ) {
        await removeFavourite(item, checkoutData.booknet_customer_id)
          .then(async (x) => {
            if (x) {
              toast({
                variant: "destructive",
                title: "Remove From Wishlist",
                description: "Item has been removed successfully.",
              });
            }
            // await getFav();
          })
          .finally(() => setWishListLoader(false));
      } else {
        await addFavourite(item, checkoutData.booknet_customer_id)
          .then(async (x) => {
            if (x) {
              toast({
                variant: "success",
                title: "Added To Wishlist",
                description: "Item has been added successfully.",
              });
            }
            // await getFav();
          })
          .finally(() => {
            setWishListLoader(false);
          });
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
    setCurrentPage(1); // Reset to first page on new filter
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

  return (
    <div>
      <motion.main
        className="flex min-h-screen flex-col items-center pt-36 lg:pt-28"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-row">
          <div className="flex flex-col px-4">
            <h2 className="bg-gradient-to-r from-red-700 via-red-400 to-red-700 bg-clip-text text-center text-4xl font-extrabold text-transparent">
              Wishlist Wonders
            </h2>

            <ScrollArea className="h-[75vh] pb-10">
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
                        onAddToCart={() => handleAddToCart(item)}
                        onRemoveFromCart={() => handleRemoveFromCart(item)}
                        openDetail={() => openDetail(item)}
                        handleFavourite={() => handleFavourite(item)}
                        wishListLoader={wishListLoader}
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
                      src="/assets/gifs/emptywishlist.json" // Lottie animation path
                      className="h-80 w-80" // Tailwind classes for responsive sizing
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
          <h4 className="pb-3 text-center font-serif text-lg font-bold text-red-500 dark:text-neutral-100 md:text-2xl">
            {itemDetail?.book_title}
            {itemDetail?.item_name}
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
                    $ {itemDetail?.variations?.[0] &&
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
                  <span className="text-sm pl-1 text-neutral-700 dark:text-neutral-300">
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

              {itemDetail?.pages && (
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
                          <span className="font-bold text-red-500">Selected Variations</span>
                        )}

                        <ul>
                          {Object.keys(selectedValues).map((key) => (
                            <>
                              {selectedValues[key] && (
                                <li key={key} className="flex items-center">
                                  <span className=" font-bold capitalize text-neutral-700 dark:text-neutral-300">
                                    {key}:{" "}
                                  </span>
                                  <span className="pl-1  text-neutral-700 dark:text-neutral-300">
                                    {selectedValues[key] ?? "Please Select"}
                                  </span>
                                </li>
                              )}
                              {!selectedValues[key] && (
                                <li key={key} className="text-red-400">
                                  <span className=" font-bold capitalize text-neutral-700 dark:text-neutral-300">
                                    {key}:{" "}
                                  </span>
                                  <span className="pl-1  text-neutral-700 dark:text-neutral-300">
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
                          <h3 className="text-lg font-semibold capitalize">{tagName}</h3>

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

                  {/* Display selected options */}
                </div>
              )}
              {itemDetail?.item_id &&
              !isItemInCart(itemDetail.item_id) &&
              itemDetail?.stock?.quantity ? (
                <button
                  className="flex items-center space-x-1 rounded-full bg-green-500 py-1 pl-2 pr-2 text-xs font-bold text-white dark:bg-zinc-800"
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
        </ModalContent>
        {/* <ModalFooter className="gap-4">
          <button
            onClick={() => setOpen(false)}
            className="w-28 rounded-md border border-gray-300 bg-gray-200 px-2 py-1 text-sm text-black dark:border-black dark:bg-black dark:text-white"
          >
            Close
          </button>
          
        </ModalFooter> */}
      </ModalBody>
    </div>
  );
};

const FavsPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ModalProvider>
        <MyComponent />
      </ModalProvider>
    </Suspense>
  );
};
export default FavsPage;
