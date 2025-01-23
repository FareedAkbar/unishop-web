"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { FaRegStar, FaStar } from "react-icons/fa";
import moment from "moment";
import Select from "~/components/Fields/select";
import type { Media, SpecialTag, Variation, VariationTag } from "~/types/book";
import type DataCart from "~/types/book";
import { useAuthContext } from "~/Context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import ReviewForm from "~/components/Forms/ReviewForm";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { ScrollArea } from "~/components/ui/scroll-area";
import { getItemsByCategory } from "~/_actions/getitemsbycategory";
import ProductsSection from "~/components/ui-components/ProductsSection";
import type { ReviewData } from "~/types/reviews";
import { useToast } from "~/hooks/use-toast";
import { getReviewsApi, submitReviewsApi } from "~/_actions/reviews";
import AlertBox from "~/components/alertBox/alert";
import { BsFillCartCheckFill } from "react-icons/bs";
import { getBooks } from "~/_actions/getbooks";
import { ItemSpecialTag } from "~/types/productTags";
import { ModalProvider } from "~/components/ui/animated-modal";
import Spinner from "~/components/spinner";

const MyComponent = () => {
  const [selectedValues, setSelectedValues] = useState<
    Record<string, string | undefined>
  >({});
  const {
    cartItems,
    addCartItems,
    removeCartItems,
    productDetail,
    increaseCartItemQuantity,
    checkoutData,
    productTags,
  } = useAuthContext();
  const itemDetail = productDetail;
  const [category, setCategory] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [products, setProducts] = useState<DataCart[]>([]);
  const [reviews, setReviews] = useState<ReviewData[] | null>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [submitLoader, setSubmitLoader] = useState<boolean>(false);
  const [getReviewsLoader, setGetReviewsLoader] = useState<boolean>(false);
  const [loginAlert, setLoginAlert] = useState<boolean>(false);
  const { toast } = useToast();
  const params = useSearchParams();

  useEffect(() => {
    const cat = params.get("category");
    const gen = params.get("genre");

    if (cat) {
      setCategory(cat);
    }
    if (gen) {
      setGenre(gen);
    }
  }, [params]);
  const router = useRouter();

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
  async function getProducts(page: number) {
    try {
      setLoader(true);
      const x = await getItemsByCategory(parseInt(category) ?? 0, page, 0);

      if (typeof x !== "boolean" && x.status) {
        setProducts(x.data);
      }
      setLoader(false);

      // setData(result);
      // setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Failed to load data:", error);
      setLoader(false);
    }
  }
  async function getReviews(id: number) {
    setGetReviewsLoader(true);
    try {
      const x = await getReviewsApi(id);

      if (typeof x !== "boolean" && x.status) {
        setReviews(x.data);
      }
      setGetReviewsLoader(false);
    } catch (error) {
      console.error("Failed to load data:", error);
      setGetReviewsLoader(false);
    }
  }
  useEffect(() => {
    if (!category) return;
    const loadData = async () => {
      await getProducts(1);
    };
    loadData().catch((error) => {
      console.error("Failed to load data in useEffect:", error);
    });
  }, [category]);

  useEffect(() => {
    if (!genre) return;
    const loadData = async () => {
      try {
        setLoader(true);
        const x = await getBooks(parseInt(genre) ?? 1);
        if (typeof x !== "boolean" && x.status) {
          setProducts(x.data);
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
  }, [genre]);
  const smoothScrollTo = (targetPosition: number, duration: number) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startPosition + distance * progress);

      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };
  useEffect(() => {
    if (!itemDetail) return;
    const loadData = async () => {
      await getReviews(itemDetail?.item_id);

      smoothScrollTo(0, 1500);
    };
    loadData().catch((error) => {
      console.error("Failed to load data in useEffect:", error);
    });
  }, [itemDetail]);

  const handleSelectChange = (
    tagName: string,
    selectedOption: { value: string; label: string },
  ) => {
    setSelectedValues((prevValues) => {
      const newValues = { ...prevValues, [tagName]: selectedOption.value };

      const tagIndex = itemDetail?.variations?.[0]?.variation_tags.findIndex(
        (tag) => tag.items_variations_tags_name === tagName,
      );

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
      setSelectedValues({});
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

  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const [selectedImage, setSelectedImage] = useState<Media | null>(
    itemDetail?.media?.[0] ? itemDetail?.media?.[0] : null,
  );
  const handleImageClick = (imagePath: Media) => {
    setSelectedImage(imagePath);
  };

  const handleSubmitReviews = async (data: ReviewData) => {
    if (checkoutData?.booknet_customer_id) {
      setSubmitLoader(true);
      const newData = {
        ...data,
        item_id: itemDetail?.item_id,
        user_name: "",
        username: "",
        booknet_customer_id: checkoutData?.booknet_customer_id,
        customer_id: checkoutData?.customer_id
          ? checkoutData?.customer_id
          : null,
      };
      try {
        await submitReviewsApi(newData)
          .then((res) => {
            if (typeof res != "boolean" && res.status) {
              toast({
                title: "Review Submitted",
                description: "Your review has been submitted successfully.",
              });
              if (itemDetail) {
                void getReviews(itemDetail?.item_id);
              }
            }
            if (typeof res != "boolean" && !res.status) {
              toast({
                title: "Review Declined",
                variant: "destructive",
                description: "Review not submitted",
              });
            }

            setSubmitLoader(false);
          })
          .catch((err) => {
            setSubmitLoader(false);
            toast({
              title: "Review Declined",
              variant: "destructive",
              description: "Review not submitted",
            });
            console.log(err);
          });
      } catch (error) {
        setSubmitLoader(false);
        console.error("Failed to checkout:", error);
      }
    } else {
      setLoginAlert(true);
    }
  };
  const goToLogin = () => {
    setLoginAlert(false);

    router.push("login");
  };
  const matchingTags = itemDetail?.special_tags
    ?.map((specialTag: SpecialTag) =>
      productTags?.find(
        (tag: ItemSpecialTag) =>
          tag.item_special_tags_id === specialTag.item_special_tags_id,
      ),
    )
    .filter((tag): tag is ItemSpecialTag => Boolean(tag)); // Filter out undefined values in case there are no matches

  const tagNames: string[] = matchingTags?.map((tag) => tag?.tag_name) ?? [];
  const manageUsage = () => {
    if (itemDetail?.book_usages && itemDetail?.book_usages.length > 0) {
      return itemDetail.book_usages
        .filter((usage) => usage.default_semester === 1)
        .map((usage) => usage.subject_code);
    }
    return [];
  };
  return (
    <div className="p-6 pt-32">
      <div className="flex items-center justify-between pb-2 lg:px-10">
        {/* Left Arrow */}
        <div>
          <button
            onClick={() => router.back()}
            className="rounded-full bg-transparent p-2 transition hover:bg-gray-200 dark:hover:bg-slate-700"
          >
            <HiArrowNarrowLeft className="text-3xl text-red-500" />
          </button>
        </div>

        {/* Title */}
        <h4 className="flex-1 text-center font-serif text-lg font-bold capitalize text-red-500 md:text-3xl">
          {itemDetail?.book_title ?? itemDetail?.item_name}
        </h4>

        {/* Invisible Placeholder */}
        <div className="w-10" />
      </div>
      <h6 className="pb-2 text-center text-sm font-bold capitalize text-neutral-600 dark:text-neutral-100 md:text-xl">
        {itemDetail?.category_detail?.category_name}
      </h6>
      <h6 className="pb-2 text-center text-sm font-bold text-neutral-600 dark:text-neutral-100 md:text-xl">
        {itemDetail?.description}
      </h6>
      <h6 className="pb-4 text-center text-sm text-neutral-600 dark:text-neutral-100 md:text-lg">
        {itemDetail?.additional_notes}
      </h6>
      <div className="flex flex-wrap gap-3">
        <div className="mx-auto flex items-center">
          {/* Thumbnails on the left */}
          <div className="mr-4 flex flex-col space-y-2">
            {itemDetail?.media?.[0] &&
              itemDetail?.media?.map((image, index) => (
                <Image
                  key={index}
                  src={`https://ipos-storage.s3.amazonaws.com/${image.object_path}`}
                  alt={`Image ${index + 1}`}
                  width={1000}
                  height={1000}
                  className={`h-24 w-24 cursor-pointer rounded-lg object-contain shadow ${selectedImage?.object_path.includes(image.object_path) ? "ring-1 ring-red-500" : ""}`}
                  onClick={() => handleImageClick(image)}
                />
              ))}
          </div>

          {/* Main Image */}
          {selectedImage?.object_path ? (
            <div className="flex h-60 w-60 items-center justify-center rounded-lg p-2 shadow lg:h-80 lg:w-80">
              <Image
                src={`https://ipos-storage.s3.amazonaws.com/${selectedImage.object_path}`}
                alt="Selected Image"
                width={2000}
                height={2000}
                className="h-56 w-56 rounded-lg object-contain lg:h-72 lg:w-72"
              />
            </div>
          ) : itemDetail?.object_path ? (
            <div className="flex h-60 w-60 items-center justify-center rounded-lg p-2 shadow lg:h-80 lg:w-80">
              <Image
                src={`https://ipos-storage.s3.amazonaws.com/${itemDetail.object_path}`}
                alt="Selected Image"
                width={2000}
                height={2000}
                className="h-56 w-56 rounded-lg object-contain lg:h-72 lg:w-72"
              />
            </div>
          ) : (
            <div className="flex h-60 w-60 items-center justify-center rounded-lg p-2 shadow lg:h-80 lg:w-80">
              <Image
                src={`/assets/images/products/product.png`}
                alt="Selected Image"
                width={2000}
                height={2000}
                className="h-56 w-56 rounded-lg object-contain lg:h-72 lg:w-72"
              />
            </div>
          )}
        </div>
        <div className="mx-auto flex max-w-sm flex-col items-start justify-start gap-x-4 gap-y-2">
          <div className="flex flex-col">
            {itemDetail ? (
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
            ) : (
              ""
            )}
          </div>
          {tagNames.length > 0 ? (
            <div className="flex">
              {tagNames.map((tag) => {
                return (
                  <span
                    key={tag}
                    className="mr-2 mt-1 rounded bg-red-500 px-1 py-0.5 text-[10px] text-white sm:left-6 sm:top-6 sm:px-2 sm:py-1"
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          ) : (
            ""
          )}
          {itemDetail?.SKU && (
            <span className="font-serif text-lg text-zinc-500 dark:text-neutral-300">
              SKU: {itemDetail.SKU}
            </span>
          )}
          {itemDetail?.book_id && itemDetail?.food_id == null && (
                <div className="flex items-center justify-center">
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Textbook:
                  </span>
                  <span className="pl-1 text-xs text-neutral-700 dark:text-neutral-300">
                    {manageUsage().length > 0 ? (
                      manageUsage().map((item, index) => (
                        <small
                          key={index}
                          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded mr-1"
                        >
                          {item}
                        </small>
                      ))
                    ) : (
                      " not used this session"
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
                Created at:
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

          {itemDetail?.pages !== undefined &&
          itemDetail.pages !== null &&
          itemDetail.pages ? (
            <div className="flex items-center justify-center">
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
            </div>
          )}
          {itemDetail?.variations?.[0] &&
          filteredVariations?.[0]?.items_variable_items_id &&
          Object.values(selectedValues).length ==
            itemDetail?.tag_links?.length &&
          isVariableItemInCart(
            filteredVariations?.[0]?.items_variable_items_id,
          ) ? (
            <span className="pl-1 text-green-500">
              Already added to your cart
            </span>
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
            itemDetail?.item_sale_price) ? (
            <button
              className="mt-auto flex items-center space-x-1 rounded bg-green-500 px-3 py-2 font-bold text-white hover:bg-green-600"
              onClick={() => handleAddToCart(itemDetail)}
            >
              <BsFillCartCheckFill className="text-lg" />
              <div className="pl-2">Add to Cart</div>
            </button>
          ) : itemDetail &&
            !itemDetail?.variations?.[0] &&
            !isItemInCart(itemDetail.item_id) ? (
            <button
              className="mt-auto flex items-center space-x-1 rounded bg-green-500 px-3 py-2 font-bold text-white hover:bg-green-600"
              onClick={() => handleAddToCart(itemDetail)}
            >
              <BsFillCartCheckFill className="text-lg" />
              <div className="pl-2">Add to Cart</div>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* Reviews Section */}
      <div className="mt-16 flex flex-col gap-8 md:flex-row">
        <div className="max-h-[477px] rounded-lg border p-6 shadow-md dark:bg-slate-800 md:w-1/2">
          <h3 className="mb-4 text-2xl font-bold text-red-600">Reviews</h3>
          {getReviewsLoader ? (
            <ScrollArea className="h-[300px]">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="mb-4 animate-pulse border-b pb-2">
                  <div className="mb-2 h-4 w-1/3 rounded bg-gray-300 dark:bg-gray-600" />
                  <div className="mb-2 h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-500" />
                  <div className="flex items-center gap-1 py-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-4 w-4 rounded-full bg-gray-300 dark:bg-gray-600"
                      />
                    ))}
                  </div>
                  <div className="h-3 w-1/4 rounded bg-gray-200 dark:bg-gray-500" />
                </div>
              ))}
            </ScrollArea>
          ) : reviews?.[0] ? (
            <ScrollArea className="h-[300px]">
              {reviews.map((review, index) => (
                <div key={index} className="mb-4 border-b pb-2">
                  <p className="font-semibold">{review.username}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {review.review}
                  </p>
                  <div className="flex items-center gap-1 py-2">
                    {Array.from({ length: 5 }, (_, i) =>
                      i < (review.stars ?? 0) ? (
                        <FaStar key={i} className="text-yellow-500" />
                      ) : (
                        <FaRegStar key={i} className="text-gray-400" />
                      ),
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {review?.created_at
                      ? moment(review?.created_at).format("Do MMMM, YYYY")
                      : ""}
                  </p>
                </div>
              ))}
            </ScrollArea>
          ) : (
            <p className="text-md text-gray-700 dark:text-gray-300">
              {
                "This product hasn't been reviewed yet. Your feedback could help others!"
              }
            </p>
          )}
        </div>
        <div className="md:w-1/2">
          <ReviewForm
            submitValues={(val) => handleSubmitReviews(val)}
            submitLoader={submitLoader}
          />
        </div>
      </div>
      <ProductsSection
        products={products}
        headingPartOne="Related"
        headingPartTwo="Products"
        loader={loader}
        viewAllButton={() => {
          router.back();
        }}
      />
      <AlertBox
        title="Login Your Account"
        description="Please Login to proceed with checkout"
        open={loginAlert}
        onClose={() => setLoginAlert(false)}
        onContinue={() => goToLogin()}
      />
    </div>
  );
};

const ProductDetails = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ModalProvider>
        <MyComponent />
      </ModalProvider>
    </Suspense>
  );
};

export default ProductDetails;
