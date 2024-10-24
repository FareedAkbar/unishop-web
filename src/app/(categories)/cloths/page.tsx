/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "~/Context/AuthContext";
import type DataCart from "~/types/book";
import Spinner from "~/components/spinner";
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
import AlertBox from "~/components/alertBox/alert";
import { useToast } from "~/hooks/use-toast";
import type { Category } from "~/types/category";
import { getItemsByCategory } from "~/_actions/getitemsbycategory";
import Select from "~/components/Fields/select";
import type { Pagination } from "~/types/pagination";
import type { Variation } from "~/types/book";


const MyComponent = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [data, setData] = useState<DataCart[]>([]);
  const isFirstRender = useRef(true);
  const [searchText, setSearchText] = useState("");
  const params = useSearchParams();
  const { setOpen } = useModal();
  const [detail, setDetail] = useState<string>("");
  const [subcategory, setSubcategory] = useState<Category | null>(null);
  const [itemDetail, setItemDetail] = useState<DataCart | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loginAlert, setLoginAlert] = useState<boolean>(false);
  const [wishListLoader, setWishListLoader] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<Record<string, string | undefined>>({});
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
  } = useAuthContext();

  useEffect(() => {
    const d = params.get("detail");
    if (d) {
      setDetail(d);
    }
  }, [params]);
  async function getCloths(page: number) {
    try {
      setLoader(true);
      const x = await getItemsByCategory(parseInt(detail) ?? 1, page, 1, 0);
      if (typeof x !== "boolean" && x.status) {
        setPagination(x.meta)
        setData(x.data);
        setDisplayData(x.data);
        setTotalPages(x.meta.pages);
        setPageSize(x.meta.pages)
      }
      setLoader(false);
      // setData(result);
      // setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Failed to load data:", error);
      setLoader(false);
      // Optionally set an error state here
    }
  }
  useEffect(() => {
    if (!genre) return;
    if (!detail) return;
    const genId = category?.find((item) => item.id == parseInt(detail));
    if (genId) {
      setSubcategory(genId);
      const loadData = async () => {
        await getCloths(1)
      };

      loadData().catch((error) => {
        console.error("Failed to load data in useEffect:", error);
      });

    }

  }, [genre, detail]);



  const filterVariationsBySelectedValues = (variations: Variation[], selectedValues: Record<string, string | undefined>) => {
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

  const filteredVariations: Variation[] =  filterVariationsBySelectedValues(itemDetail?.variations ? itemDetail?.variations : [], selectedValues);
  

  // Handle add to cart
  const handleAddToCart = async (item: DataCart) => {

    const x = item
    if (item?.variations?.[0] && item?.tag_links) {
      Object.assign(x, { selected_variation: filteredVariations?.[0] })
    }
    try {
      console.log(x)
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


  const getOptions = (tagName: string, dependencies: Record<string, string | undefined>) => {
    return Array.from(
      new Set(
        itemDetail?.variations?.filter((variation) => {
          // Check all previous tag dependencies
          return Object.keys(dependencies).every((key) => {
            return variation.variation_tags.some(
              (tag) => tag.items_variations_tags_name === key && tag.items_variations_tags_links_values_value === dependencies[key]
            );
          });
        }).map((variation) => {
          // Return only unique values for the current tag
          return variation.variation_tags.find((tag) => tag.items_variations_tags_name === tagName)?.items_variations_tags_links_values_value;
        })
      )
    )
      .filter(Boolean)
      .map((value) => ({
        tagName,  // include tagName in the result
        dependencies,  // include dependencies in the result
        value: value!, label: value!
      }));
  };



  const openDetail = async (item: DataCart) => {
    setOpen(true);
    setItemDetail(item);
    setSelectedValues({})
  };

  const handleFavourite = async (item: DataCart) => {

    if (checkoutData?.booknet_customer_id) {
      setWishListLoader(true)
      if (item && favItems?.some((favItem) => favItem.item_id === item.item_id)) {

        await removeFavourite(item, checkoutData.booknet_customer_id).then(
          (x) => {
            if (x) {
              toast({
                variant: "destructive",
                title: "Remove From Wishlist",
                description: "Item has been removed successfully.",
              });
            }
          },
        ).finally(() => setWishListLoader(false));
      } else {

        await addFavourite(item, checkoutData.booknet_customer_id).then(
          (x) => {
            if (x) {
              toast({
                variant: "success",
                title: "Added To Wishlist",
                description: "Item has been added successfully.",
              });
            }
          },
        ).finally(() => setWishListLoader(false));
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
    setCurrentPage(filtered ? 1 : pagination?.page ?? 1); // Reset to first page on new filter
    setTotalPages(Math.ceil(
      filtered ? filtered?.length / pageSize : 1 / pageSize,
    ));
    const x = filtered ? filtered?.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize,
    ) : data
    setDisplayData(x)
  };
  // Calculate total pages based on filtered data and page size

  // Get the data to be displayed for the current page

  useEffect(() => {
    filterResult();
  }, [searchText]);

  const goToLogin = () => {
    setLoginAlert(false);
    router.push("login");
  };

  const handleSelectChange = (tagName: string, selectedOption: { value: string; label: string }) => {
    setSelectedValues((prevValues) => {
      const newValues = { ...prevValues, [tagName]: selectedOption.value };

      // Find the current tag's index
      const tagIndex = itemDetail?.variations?.[0]?.variation_tags.findIndex(
        (tag) => tag.items_variations_tags_name === tagName
      );

      // Reset only the dependent dropdowns
      if (tagIndex !== undefined && tagIndex !== -1) {
        const tagsToReset = itemDetail?.variations?.[0]?.variation_tags.slice(tagIndex + 1).map(
          (tag) => tag.items_variations_tags_name
        );
        tagsToReset?.forEach((tag) => {
          newValues[tag] = undefined;
        });
      }

      return newValues;
    });
  };
  const handlePageChange = async (page: number) => {
    setCurrentPage(page)
    await getCloths(page)

  }

  return (
    <div>
      <motion.main
        className="flex min-h-screen flex-col items-center py-20"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
         <div className="flex flex-grow flex-row sm:pt-10">
          <div className="flex min-h-screen w-[95vw] flex-col lg:pl-72">
            {/* Header Section */}
            <div className="flex w-full flex-wrap items-end justify-between pb-4">
              <div className="text-left">
                <h2 className="text-xl font-bold">MERCH & Clothing</h2>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {subcategory?.category_name}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search"
                  className="rounded border border-gray-300 px-2 py-1 dark:bg-slate-700 dark:text-white"
                />
                <h1 className="font-bold">
                  Showing {displayData?.length} of {data.length} Items
                </h1>
              </div>
            </div>

            <ScrollArea className="h-[75vh] pb-10">
              <div className="flex flex-wrap justify-center py-3">
                {loader
                  ? Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className="p-2">
                      <ProductCardSkeleton />
                    </div>
                  ))
                  : displayData?.map((item: DataCart) => (
                    <ProductCard
                      key={item.book_id}
                      product={item}
                      showAddToCart={!isItemInCart(item.item_id)}
                      onAddToCart={async () => {
                        if (item?.variations?.[0]) {
                          await openDetail(item)
                        } else {
                          await handleAddToCart(item);
                        }

                      }}
                      onRemoveFromCart={() => handleRemoveFromCart(item)}
                      openDetail={() => openDetail(item)}
                      handleFavourite={() => handleFavourite(item)}
                      wishListLoader={wishListLoader}
                    />
                  ))}
              </div>
            </ScrollArea>
            {pagination && (
            <div className="z-10 flex justify-between px-4 py-4">
                <button
                  className={`rounded-full p-2 ${currentPage === 1 ? "bg-gray-200 text-black" : "cursor-pointer bg-red-500 text-white"}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FaChevronLeft />
                </button>
                <span className="px-2">
                  Page {currentPage ?? 1} of {totalPages ?? 1}
                </span>
                <button
                  className={`rounded-full p-2 ${currentPage === totalPages ? "bg-gray-200 text-black" : "cursor-pointer bg-red-500 text-white"}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
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
          <h4 className="pb-3 text-center font-serif text-lg font-bold text-red-500 dark:text-neutral-100 md:text-2xl">
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
                  className="mr-4 mt-4 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1 dark:border-slate-900 dark:bg-slate-700"
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
                    className="h-36 w-36 flex-shrink-0 rounded-lg object-cover md:h-64 md:w-44"
                  />
                </motion.div>
              </div>
            </div>
            <div className="mx-auto flex max-w-sm flex-col items-start justify-start gap-x-4 gap-y-2">
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-red-500 dark:text-neutral-300">
                  ${itemDetail?.item_sale_price}
                </span>
                {/* <span className="font-serif text-lg text-zinc-500 dark:text-neutral-300">
                  SKU {itemDetail?.SKU}
                </span> */}
              </div>
              {/* <div className="flex items-center justify-center">
                <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Series:
                </span>
                <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                  {itemDetail?.edition}
                </span>
              </div> */}
              <div className="flex items-center justify-center">
                <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Created at:
                </span>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  {itemDetail?.introduced
                    ? moment(itemDetail.introduced).format("Do MMMM, YYYY")
                    : ""}
                </span>
              </div>
              {/* <div className="flex items-center justify-center">
                <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Language:
                </span>
                <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                  {itemDetail?.book_language}
                </span>
              </div> */}
              {/* <div className="flex items-center justify-center">
                <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Number of Pages:
                </span>
                <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                  {itemDetail?.pages}
                </span>
              </div> */}
              {/* <div className="flex items-center justify-center">
                <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Publisher:
                </span>
                <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                  {itemDetail?.publisher?.publisher_name}
                </span>
              </div> */}
              {/* <div className="flex items-center justify-center">
                <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  Country of Publication:
                </span>
                <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                  {itemDetail?.publisher?.country}
                </span>
              </div> */}
              {itemDetail?.variations?.[0]?.variation_tags && (
                <div>
                  <div>
                    <div>
                      <div>
                        {!Object.keys(selectedValues)[0] ? (
                          <span className="text-red-400 text-md font-bold">Please Select Variations</span>
                        ) : (
                          <span className="font-bold">Selected Variations</span>
                        )}

                        <ul>
                          {Object.keys(selectedValues).map((key) => (
                            <>
                              {selectedValues[key] && (
                                <li key={key}>
                                  {key}: {selectedValues[key] ?? 'Please Select'}
                                </li>
                              )}
                              {!selectedValues[key] && (
                                <li key={key} className="text-red-400">
                                  {key}: {selectedValues[key] ?? 'Please Select'}
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
                    const prevTags = itemDetail?.variations?.[0]?.variation_tags.slice(0, index);
                    const dependencies = prevTags?.reduce((acc: Record<string, string | undefined>, currTag) => {
                      if (selectedValues[currTag.items_variations_tags_name]) {
                        acc[currTag.items_variations_tags_name] = selectedValues[currTag.items_variations_tags_name];
                      }
                      return acc;
                    }, {});
                    const isDisabled = index > 0 && !prevTags?.every((prevTag) => selectedValues[prevTag.items_variations_tags_name]);
                    return (
                      <>
                        <>{tagName}</>
                        <Select
                          key={tagName}
                          id={tagName}
                          name={tagName}
                          options={getOptions(tagName, dependencies ?? {})}
                          value={selectedValues[tagName] ? selectedValues[tagName] : ""}
                          placeholder={`Select ${tagName}`}
                          onChange={(option: { value: string; label: string; }) => handleSelectChange(tagName, option)}
                          isDisabled={isDisabled}
                        // loader={prevTags?.some((prevTag) => !selectedValues[prevTag.items_variations_tags_name])}
                        />
                      </>

                    );
                  })}
                  {/* Display selected options */}

                </div>
              )}




              {/* {itemDetail?.item_id &&
                !isItemInCart(itemDetail.item_id) &&
                itemDetail?.stock?.quantity ? ( */}
              {itemDetail?.variations?.[0]?.variation_tags && Object.keys(selectedValues)[0] && filteredVariations?.[0]?.items_variable_items_id && (
                <button
                  className="flex items-center space-x-1 rounded-full bg-green-500 py-1 pl-2 pr-2 text-xs font-bold text-white"
                  onClick={() => handleAddToCart(itemDetail)}
                >
                  <FaCartPlus className="text-lg" />
                  <div className="pl-2">Add to Cart</div>
                </button>
              )}

              {/* // ) : (
              //   ""
              // )} */}
            </div>
          </div>
        </ModalContent>
        <ModalFooter className="gap-4">
          <button
            onClick={() => setOpen(false)}
            className="w-28 rounded-md border border-gray-300 bg-gray-200 px-2 py-1 text-sm dark:border-slate-950 dark:bg-slate-900"
          >
            Close
          </button>
          {/* <button className="w-28 rounded-md border border-black bg-black px-2 py-1 text-sm text-white dark:bg-white dark:text-black">
              Book Now
            </button> */}
        </ModalFooter>
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

const ClothsPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ModalProvider>
        <MyComponent />
      </ModalProvider>
    </Suspense>
  );
};
export default ClothsPage;
