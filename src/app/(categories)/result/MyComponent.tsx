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
import { IoIosArrowRoundForward, IoIosCloseCircle } from "react-icons/io";

import Spinner from "~/components/spinner";
import dynamic from "next/dynamic";
import { BsFillCartCheckFill } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
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
    searchItems,
    searchInCategory,
    textbookType,
    userInfo
  } = useAuthContext();
  
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
                    item.web_visibility === 1 &&
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
