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
import {
  FaCartPlus,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import moment from "moment";
import React from "react";
import ProductCard from "~/components/ui-components/ProductCard";
import { ScrollArea } from "~/components/ui/scroll-area";
import AlertBox from "~/components/alertBox/alert";
import { useToast } from "~/hooks/use-toast";
import type { Category, SuperCategory } from "~/types/category";
import { getItemsByCategory } from "~/_actions/getitemsbycategory";
import Select from "~/components/Fields/select";
import type { Pagination } from "~/types/pagination";
import type { Variation } from "~/types/book";
import { IoIosArrowRoundForward, IoIosCloseCircle } from "react-icons/io";
import {
  Select as NewSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { FiSearch } from "react-icons/fi";

import Spinner from "~/components/spinner";
import dynamic from "next/dynamic";
import { RxCrossCircled } from "react-icons/rx";
import { BsFillCartCheckFill } from "react-icons/bs";
import ProductModal from "~/components/ui-components/PrductModal";
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
  const [parent, setParent] = useState<number>(-1);
  const [name, setName] = useState<string>("");
  const [categoryType, setCategoryType] = useState<SuperCategory | null>(null);
  const [subcategoryTypes, setSubcategoryTypes] = useState<Category[] | null>(
    null,
  );
  const [itemDetail, setItemDetail] = useState<DataCart | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loginAlert, setLoginAlert] = useState<boolean>(false);
  const [wishListLoader, setWishListLoader] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<
    Record<string, string | undefined>
  >({});
  const [currentPage, setCurrentPage] = useState(
    (pagination?.page ?? params.get("page"))
      ? parseInt(params.get("page")!)
      : 1,
  );
  const [pageSize, setPageSize] = useState(pagination?.limit ?? 15);
  const [totalPages, setTotalPages] = useState(pagination?.pages ?? 1);
  const [displayData, setDisplayData] = useState<DataCart[] | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(
    null,
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    textbookType,
    userInfo,
  } = useAuthContext();

  useEffect(() => {
    const d = params.get("detail");
    const parentCat = params.get("category");
    const name = params.get("name");
    const currentPage = params.get("page");

    if (currentPage) {
      setCurrentPage(parseInt(currentPage));
    } else {
      setCurrentPage(1);
    }
    if (d) {
      setDetail(parseInt(d));
    } else {
      setDetail(-1);
    }
    if (parent && parentCat !== null) {
      setParent(parseInt(parentCat));
    }
    if (name) {
      setName(name);
    }
  }, [params]);

  async function getProducts(page: number, id: number, category_type: number) {
    try {
      setLoader(true);
      setDisplayData(null); // Reset display data before fetching new data
      const x = await getItemsByCategory(id ?? 0, page, category_type);

      if (typeof x !== "boolean" && x.status) {
        setPagination(x.meta);
        setData(x.data);
        setDisplayData(x.data ? x.data : null);
        setTotalPages(x.meta.pages);
        setPageSize(x.meta.limit);
      }
      setTimeout(() => {
        setLoader(false); // Reset flip state after changing the image
      }, 2000);
    } catch (error) {
      console.error("Failed to load data:", error);
      setLoader(false);
    }
  }

  useEffect(() => {
    if (!subCategory) return;
    const genId = subCategory.find((item) => item.id == detail);
    const parentCat = subCategory.filter(
      (item) => item.category_type_id == parent,
    );
    const CategoryType = category?.find(
      (item) => item.category_type_id == parent,
    );
    const catId = category?.find((item) => item.category_type_id == detail);

    if (CategoryType) {
      setCategoryType(CategoryType);
    }

    if (parentCat.length > 0) {
      setSubcategoryTypes(parentCat);
    }

    const loadData = async () => {
      // Fetch products based on `detail` or `parent`
      if (detail !== -1 && (genId || catId)) {
        await getProducts(currentPage, detail, 0);
      } else if (detail === -1 && parent) {
        await getProducts(currentPage, 0, parent);
      }
    };

    loadData().catch((error) => {
      console.error("Failed to load data in useEffect:", error);
    });
  }, [subCategory, detail, name, currentPage]);

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
    setCurrentPage(params.get("page") ? parseInt(params.get("page")!) : 1); // Reset to first page on new filter
    setTotalPages(
      Math.ceil(
        filtered
          ? filtered?.length / pageSize
          : params.get("page")
            ? parseInt(params.get("page")!)
            : 1 / pageSize,
      ),
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
    router.push("/login");
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

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
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
        className="container mx-auto flex min-h-screen flex-col items-center"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex w-full flex-grow flex-row">
          <div className="flex w-full flex-col">
            {/* Header Section */}
            <div className="flex w-full flex-wrap items-end justify-between gap-2 py-4 pl-2">
              <div className="text-left lg:pl-16">
                <h2 className="text-xl font-bold capitalize">
                  {" "}
                  {categoryType?.type}
                </h2>
                {detail > -1 && (
                  <p className="text-sm capitalize text-gray-500 dark:text-gray-300">
                    {name}
                  </p>
                )}
              </div>

              <div className="flex w-full flex-col items-center gap-2 sm:w-[400px] md:flex-row lg:pr-16">
                <div className="w-full">
                  {subcategoryTypes?.[0] && (
                    <NewSelect
                      onValueChange={(x: string) => handleChangeSubCategory(x)}
                      value={
                        detail != null && detail != undefined && detail > -1
                          ? detail.toString()
                          : ""
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select  category" />
                      </SelectTrigger>
                      <SelectContent>
                        {subcategoryTypes?.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.category_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </NewSelect>
                  )}
                </div>
                {/* <div className="relative flex w-full">
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search in this category"
                    className="w-full rounded border-b border-gray-300 bg-gray-100 p-2 pl-8 text-sm shadow-inner focus:outline-none dark:bg-slate-700 dark:text-white"
                  />
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-500 dark:text-white">
                    <FiSearch />
                  </span>
                </div> */}

                <h1 className="w-full text-sm tracking-wider">
                  Showing {displayData?.length} of {data.length} Items
                </h1>
              </div>
            </div>

            {/* <ScrollArea className="min-h-[75vh] pb-10"> */}
            <div className="min-h-[70vh]">
              <div className="flex flex-wrap justify-center gap-4 py-3">
                {loader ? (
                  Array.from({ length: 5 }, (_, index) => (
                    <div key={index}>
                      <ProductCardSkeleton />
                    </div>
                  ))
                ) : displayData && displayData.length > 0 ? (
                  displayData.map(
                    (item: DataCart) =>
                      item.web_visibility === 1 && (
                        <ProductCard
                          key={item.item_id}
                          product={item}
                          showAddToCart={!isItemInCart(item.item_id)}
                          onAddToCart={async () => {
                            if (item?.items_type == 1) {
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
                  // Only display the empty state when data loading is complete and no items are available
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
            </div>
            {/* </ScrollArea> */}
            {pagination && (
              <div className="z-5 flex justify-end px-4 py-4 w-full">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    className={`rounded-md p-2 text-sm border flex items-center justify-center transition-all ${currentPage === 1
                      ? "cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-600"
                      : "cursor-pointer bg-white text-gray-700 border-gray-300 hover:border-red-500 hover:text-red-500 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-200 dark:hover:border-red-500"
                      }`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <FaChevronLeft className="text-xs" />
                  </button>

                  {getPageNumbers().map((page, index) => {
                    if (page === "...") {
                      return (
                        <span
                          key={`dots-${index}`}
                          className="px-2 text-gray-400 dark:text-gray-500 select-none text-sm"
                        >
                          ...
                        </span>
                      );
                    }

                    const pageNum = page as number;
                    const isActive = pageNum === currentPage;

                    return (
                      <button
                        key={`page-${pageNum}`}
                        onClick={() => handlePageChange(pageNum)}
                        className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${isActive
                          ? "bg-red-500 text-white"
                          : "bg-white text-gray-700 border border-gray-300 hover:border-red-500 hover:text-red-500 dark:bg-slate-700 dark:text-gray-200 dark:border-slate-600 dark:hover:border-red-500"
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    className={`rounded-md p-2 text-sm border flex items-center justify-center transition-all ${totalPages === 0 || currentPage === totalPages
                      ? "cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-600"
                      : "cursor-pointer bg-white text-gray-700 border-gray-300 hover:border-red-500 hover:text-red-500 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-200 dark:hover:border-red-500"
                      }`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={totalPages === 0 || currentPage === totalPages}
                  >
                    <FaChevronRight className="text-xs" />
                  </button>
                </div>
              </div>
            )}
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
