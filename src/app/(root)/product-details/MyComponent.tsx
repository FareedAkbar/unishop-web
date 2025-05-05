"use client";
import React, { useState, useEffect, Suspense, useRef } from "react";
import Image from "next/image";
import { FaCheckCircle, FaRegStar, FaStar } from "react-icons/fa";
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

import Spinner from "~/components/spinner";
import { Tabs } from "~/components/ui/tabs";
import { Player } from "@lottiefiles/react-lottie-player";

const MyComponent = () => {
  const [selectedValues, setSelectedValues] = useState<
    Record<string, string | undefined>
  >({});
  const {
    cartItems,
    addCartItems,
    removeCartItems,
    productDetail,
    isLoggedIn,
    checkoutData,
    productTags,
    textbookType,
    logout
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
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(
    null,
  );
  const [currentImage, setCurrentImage] = useState<string>(
    itemDetail?.object_path ?? "",
  );
  const { toast } = useToast();
  const params = useSearchParams();

  type Position = {
    px: number;
    py: number;
    percentX: number;
    percentY: number;
  };

  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState<Position>({
    px: 0,
    py: 0,
    percentX: 0,
    percentY: 0,
  });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (imageRef.current) {
      const { left, top, width, height } =
        imageRef.current.getBoundingClientRect();

      const x = e.clientX - left;
      const y = e.clientY - top;

      // Save both percentage for transform origin and pixels for lens placement
      const percentX = (x / width) * 100;
      const percentY = (y / height) * 100;
      const xClamped = Math.max(0, Math.min(x, width));
      const yClamped = Math.max(0, Math.min(y, height));
      setPosition({
        px: xClamped,
        py: yClamped,
        percentX,
        percentY,
      });
    }
  };

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
    if (typeof window === "undefined") return;
    const loadData = async () => {
      await getReviews(itemDetail?.item_id);
      setCurrentImage(itemDetail?.object_path ?? "");
      setSelectedValues({});
      setSelectedVariation(null);
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

        setCurrentImage(itemDetail?.object_path ?? "");
      } else {
        setSelectedVariation(null); // Reset if not all tags are selected

        setCurrentImage(itemDetail?.object_path ?? "");
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

  const handleSubmitReviews = async (data: ReviewData) => {
    if (isLoggedIn) {
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
    void logout()

    setLoginAlert(false);

    router.push("/login");
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

  // console.log(itemDetail, "itemDetail");
  function ImageMagnifier({
    src,
    width,
    height,
    magnifierHeight = 100,
    magnifieWidth = 100,
    zoomLevel = 1.5
  }: {
    src: string;
    width?: string;
    height?: string;
    magnifierHeight?: number;
    magnifieWidth?: number;
    zoomLevel?: number;
  }) {
    const [[x, y], setXY] = useState([0, 0]);
    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
    const [showMagnifier, setShowMagnifier] = useState(false);
    return (
      <div
        style={{
          position: "relative",
          height: height,
          width: width
        }}
      >
        <Image
          src={src}

          // style={{ height: height, width: width }}
          onMouseEnter={(e) => {
            // update image size and turn-on magnifier
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            // update cursor position
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();

            // calculate cursor position on the image
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            // close magnifier
            setShowMagnifier(false);
          }}
          width={2000}
          height={2000}
          className="h-56 w-56 rounded-lg object-contain lg:h-72 lg:w-72"
          alt={"img"}
        />

        <div
          style={{
            display: showMagnifier ? "" : "none",
            position: "absolute",

            // prevent magnifier blocks the mousemove event of img
            pointerEvents: "none",
            // set size of magnifier
            height: `${magnifierHeight}px`,
            width: `${magnifieWidth}px`,
            // move element center to cursor pos
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifieWidth / 2}px`,
            opacity: "1", // reduce opacity so you can verify position
            border: "1px solid lightgray",
            // backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",

            //calculate zoomed image size
            backgroundSize: `${imgWidth * zoomLevel + 100}px ${imgHeight * zoomLevel
              }px`,

            //calculate position of zoomed image.
            backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
          }}
          className="bg-white dark:bg-slate-900"
        ></div>
      </div>
    );
  }
  return (
    <div className="p-6 md:mt-0">
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
        <h4 className="pb-2 text-center text-md font-bold capitalize text-neutral-600 dark:text-neutral-100 md:text-xl">
          Category: {itemDetail?.category_detail?.category_name}
        </h4>

        {/* Invisible Placeholder */}
        <div className="w-10" />
      </div>
      <h6 className="flex-1 text-center font-serif text-sm font-bold capitalize text-red-500 md:text-2xl">
        {itemDetail?.book_title ?? itemDetail?.item_name}
      </h6>
      <h6 className="md:text-md px-3 pb-2 text-center font-sans text-sm text-neutral-600 dark:text-neutral-100 md:px-28">
        {itemDetail?.additional_notes}
      </h6>

      <div className="relative flex flex-wrap gap-3">
        <div className="mx-auto flex flex-col items-center">
          {ImageMagnifier({
            src: currentImage ? `https://ipos-storage.s3.amazonaws.com/${currentImage}` : "/assets/images/products/product.png",
            width: "100%",
            height: "100%",
            magnifierHeight: 200,
            magnifieWidth: 200,
            zoomLevel: 1.5
          })}
          {/* <div
            className="relative flex h-60 w-60 cursor-zoom-in items-center justify-center rounded-lg p-2 shadow lg:h-80 lg:w-80"
            ref={imageRef}
            onMouseEnter={() => (currentImage ? setIsHovering(true) : null)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={(e) => (currentImage ? handleMouseMove(e) : null)}
          >
            <Image
              src={
                currentImage
                  ? `https://ipos-storage.s3.amazonaws.com/${currentImage}`
                  : "/assets/images/products/product.png"
                // selectedVariation?.media?.[currentImageIndex]?.object_path
                //   ? `https://ipos-storage.s3.amazonaws.com/${selectedVariation.media[currentImageIndex].object_path}`
                //   : itemDetail?.media?.[currentImageIndex]?.object_path ? `https://ipos-storage.s3.amazonaws.com/${itemDetail.media[currentImageIndex].object_path}` :

                //     itemDetail?.object_path
                //       ? `https://ipos-storage.s3.amazonaws.com/${itemDetail.object_path}`
                //       : "/assets/images/products/product.png"
              }
              alt={
                selectedVariation?.media?.[0]?.object_path
                  ? `${itemDetail?.item_name} - ${selectedValues.size ?? ""} ${selectedValues.color ?? ""}`
                  : (itemDetail?.item_name ?? "Product image")
              }
              width={2000}
              height={2000}
              className="h-56 w-56 rounded-lg object-cover lg:h-72 lg:w-72"
            />
          </div> */}


          {(
            (!selectedVariation &&
              itemDetail?.media &&
              itemDetail?.media?.length > 0)) && (
              <div
                className="mt-2 flex gap-2 overflow-x-auto h-fit">
                {(itemDetail?.media
                  ? [
                    {
                      object_id: "001",
                      object_path: itemDetail?.object_path ?? "",
                    },
                    ...itemDetail.media,
                  ]
                  : []
                ).map((media, index) => (
                  <button
                    key={`thumbnail-${`fallback-${index}`}`}
                    onClick={() => { setCurrentImage(media.object_path); }}
                    className={`w-14 flex-shrink-0 overflow-hidden rounded-md border ${currentImage === media.object_path ? "border-red-500" : "border-gray-300"}`}
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
          {(selectedVariation?.media &&
            selectedVariation?.media?.length > 1) && (
              <div className="mt-2 flex gap-2 overflow-x-auto h-fit ">
                {(selectedVariation?.media?.length > 0
                  ? [{ object_id: "001", object_path: itemDetail?.object_path ?? "" }, ...selectedVariation.media]

                  : []
                ).map((media, index) => (
                  <button
                    key={`thumbnail-${`fallback-${index}`}`}
                    onClick={() => { setCurrentImage(media.object_path); }}
                    className={`w-14 flex-shrink-0 overflow-hidden rounded-md border ${currentImage === media.object_path ? "border-red-500" : "border-gray-300"}`}
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
          {/* {selectedVariation?.media && selectedVariation?.media?.length > 1 && (
            <div className="mt-2 flex gap-2 overflow-x-auto py-2">
              {(selectedVariation?.media?.length > 0
                ? [
                    {
                      object_id: "001",
                      object_path: itemDetail?.object_path ?? "",
                    },
                    ...selectedVariation.media,
                  ]
                : []
              ).map((media, index) => (
                <button
                  key={`thumbnail-${media.object_id ?? `fallback-${index}`}`}
                  onClick={() => {
                    setCurrentImage(media.object_path);
                  }}
                  className={`h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border ${currentImage === media.object_path ? "border-red-500" : "border-gray-300"}`}
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
          )} */}
        </div>

        <div className="mx-auto flex max-w-sm flex-col items-start justify-start gap-x-4">
          <div className="flex flex-col">
            {itemDetail ? (
              <span className="font-sans text-2xl font-bold text-red-500 dark:text-neutral-300">
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
          {tagNames?.length > 0 ? (
            <div className="flex">
              {tagNames.map((tag, index) => {
                return (
                  <span
                    key={`productTag-${tag}-${index}`}
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
          <span className="flex flex-row items-center text-md sm:text-sm font-serif text-green-500">
            <FaCheckCircle />
            {filteredVariations?.[0]
              ? filteredVariations?.[0]?.stock?.quantity
                ? "In stock"
                : "Backorder"
              : itemDetail?.stock.quantity
                ? "In stock"
                : "Backorder"
                }
          </span>
          {itemDetail?.book_id && itemDetail?.subtitle && (
            <div className="flex items-center justify-center">
              <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                Subtitle:
              </span>
              <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300">
                {itemDetail.subtitle}
              </span>
            </div>
          )}
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

          {itemDetail?.book_id && itemDetail?.food_id == null && (
            <div className="flex items-center justify-center">
              {manageUsage().length > 0 ? (
                <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300">
                  {manageUsage().map((item, index) => {
                    const matchedType = textbookType?.find(
                      (t) => t.item_book_type_id === Number(item.type_id),
                    ); // Find the matching type
                    return (
                      <div
                        key={`usage-${item.subject_code}-${index}-name-type`}
                        className="mb-1"
                      >
                        <small
                          key={`usage-${item.subject_code}-${index}-name`}
                          className="mr-1 rounded bg-red-500 px-2 py-1 text-gray-100"
                        >
                          {item.subject_name} {item.subject_code}{" "}
                          {/* Display type_name or fallback */}
                        </small>
                        <small
                          key={`usage-${item.subject_code}-${index}-type`}
                          className="mr-1 rounded bg-yellow-200 px-2 py-1 text-black dark:bg-yellow-500"
                        >
                          {matchedType?.type_name ?? ""}{" "}
                          {/* Display type_name or fallback */}
                        </small>
                      </div>
                    );
                  })}
                </span>
              ) : (
                <>
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Textbook:
                  </span>
                  <span className="pl-1 text-sm capitalize text-neutral-700 dark:text-neutral-300">
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
              <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300">
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
          {itemDetail?.book_id && itemDetail?.food_id == null && (
            <div className="">
              {itemDetail?.audience && (
                <div className="flex items-center">
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Audience:
                  </span>
                  <span className="pl-1 text-sm capitalize text-neutral-700 dark:text-neutral-300">
                    {itemDetail.audience}
                  </span>
                </div>
              )}

              {itemDetail?.format && (
                <div className="flex items-center">
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Format:
                  </span>
                  <span className="pl-1 text-sm capitalize text-neutral-700 dark:text-neutral-300">
                    {itemDetail.format}
                  </span>
                </div>
              )}
              {itemDetail?.book_language && (
                <div className="flex items-center">
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Language:
                  </span>
                  <span className="pl-1 text-xs capitalize text-neutral-700 dark:text-neutral-300">
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
                <div className="flex items-center">
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Published:
                  </span>
                  <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300">
                    {moment(itemDetail.introduced).format("Do MMMM, YYYY")}
                  </span>
                </div>
              )}
              {itemDetail?.publisher?.publisher_name && (
                <div className="flex items-center">
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Publisher:
                  </span>
                  <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300">
                    {itemDetail.publisher.publisher_name}
                  </span>
                </div>
              )}
              {itemDetail?.country_of_publication && (
                <div className="flex items-center">
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Country of Publication:
                  </span>
                  <span className="pl-1 text-sm capitalize text-neutral-700 dark:text-neutral-300">
                    {itemDetail.country_of_publication}
                  </span>
                </div>
              )}
              {itemDetail?.dimensions && (
                <div className="flex items-center">
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Dimensions:
                  </span>
                  <span className="pl-1 text-sm capitalize text-neutral-700 dark:text-neutral-300">
                    {itemDetail?.dimensions}
                  </span>
                </div>
              )}
              {itemDetail?.weight && (
                <div className="flex items-center">
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Weight:
                  </span>
                  <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300">
                    {itemDetail?.weight}
                  </span>
                </div>
              )}
              {itemDetail?.edition && (
                <div className="flex items-center">
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Edition:
                  </span>
                  <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300">
                    {itemDetail.edition}
                  </span>
                </div>
              )}
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
                      {Object.keys(selectedValues).map((key, index) => (
                        <div key={`selectedValues-${key}-${index}-${index}`}>
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
                    key={`variation-tag-${tag.items_variations_tags_name}-${index}`}
                    className={`my-4 w-full ${tagName == "size" ? "flex items-center gap-1" : ""}`}
                  >
                    <h3 className="text-lg font-semibold capitalize">
                      {tagName}
                    </h3>

                    {tagName.toLowerCase().includes("size") ? (
                      <div className="scrollbar-hidden flex justify-center gap-2 overflow-x-auto px-1 pl-3 lg:max-w-full">
                        {options.map((option, optionIndex) => (
                          <button
                            key={`${option.value}-${optionIndex}`}
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
            <button
              className="mt-auto flex items-center space-x-1 rounded bg-red-500 px-3 py-2 font-sans text-white hover:bg-red-600"
              onClick={() => handleRemoveFromCart(itemDetail)}
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
              itemDetail?.item_sale_price) ? (
            <button
              className="mt-auto flex items-center space-x-1 rounded bg-green-500 px-3 py-2 font-sans text-white hover:bg-green-600"
              onClick={() => handleAddToCart(itemDetail)}
            >
              <BsFillCartCheckFill className="text-lg" />
              <div className="pl-2">Add to Cart</div>
            </button>
          ) : itemDetail &&
            itemDetail?.items_type != 1 &&
            !isItemInCart(itemDetail.item_id) ? (
            <button
              className="mt-auto flex items-center space-x-1 rounded bg-green-500 px-3 py-2 font-sans text-white hover:bg-green-600"
              onClick={() => handleAddToCart(itemDetail)}
            >
              <BsFillCartCheckFill className="text-lg" />
              <div className="pl-2">Add to Cart</div>
            </button>
          ) : (
            ""
          )}
          {itemDetail &&
            itemDetail?.items_type != 1 &&
            isItemInCart(itemDetail.item_id) ? (
            <button
              className="mt-auto flex items-center space-x-1 rounded bg-red-500 px-3 py-2 font-sans text-white hover:bg-red-600"
              onClick={() => handleRemoveFromCart(itemDetail)}
            >

              <div className="pl-2">Remove from Cart</div>
            </button>
          ) : (
            ""
          )}
          {/* {isHovering && (
            <div
              className="pointer-events-none absolute top-1/3 z-10 h-96 w-96 overflow-hidden bg-white shadow-md dark:bg-slate-700 dark:shadow-slate-500 md:right-[20%]"
              style={{
                transform: "translate(-50%, -50%)",
              }}
            >
              <Image
                src={
                  `https://ipos-storage.s3.amazonaws.com/${currentImage}`
                  // selectedVariation?.media?.[currentImageIndex]?.object_path
                  //   ? `https://ipos-storage.s3.amazonaws.com/${selectedVariation.media[currentImageIndex].object_path}`
                  //   : itemDetail?.object_path
                  //     ? `https://ipos-storage.s3.amazonaws.com/${itemDetail.object_path}`
                  //     : "/assets/images/products/product.png"
                }
                style={{
                  position: "absolute",

                  backgroundRepeat: "no-repeat",
                  transform: `scale(2)`,
                  transformOrigin: `${position.percentX}% ${position.percentY}%`,
                }}
                alt="Magnified view"
                width={2000}
                height={2000}
                className="h-full w-full"
              />
            </div>
          )} */}
        </div>
      </div>

      {/* Reviews Section */}

      <div className="mt-16 flex w-full flex-col gap-8 md:flex-row">
        {/* {getReviewsLoader && (
          <div className="max-h-[477px] rounded-lg border p-6 shadow-md dark:bg-slate-800 md:w-1/2">
            <h3 className="mb-4 text-2xl font-bold text-red-600">Reviews</h3>
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
          </div>
        )} */}
        <div className="flex h-[500px] w-full flex-col items-center justify-center">
          <Tabs
            key={`tabs-${itemDetail?.item_id}`}
            tabs={[
              {
                title: "Details",
                value: "Details",
                content: (
                  <div className="rounded-lg border bg-white p-6 shadow-md dark:bg-slate-800">
                    <h3 className="mb-4 text-2xl font-bold text-red-600">
                      Details
                    </h3>

                    <ScrollArea className="h-72 overflow-y-auto">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {itemDetail?.detail ? (
                          <div>
                            <div>{itemDetail.detail}</div>

                            {/* {itemDetail?.additional_notes && (
                              <div>
                                <div className="">
                                  <h3 className="mt-4 mb-2 text-xl font-bold text-red-600">
                                    Additional Notes
                                  </h3>
                                  <span className="pl-1 text-sm text-neutral-700 dark:text-neutral-300">
                                    {itemDetail.additional_notes}
                                  </span>
                                </div>
                              </div>
                            )} */}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <p>No details available</p>
                            <Player
                              autoplay
                              loop
                              src="/assets/gifs/no-details.json"
                              className="h-fit w-64 bg-yellow-300"
                            />
                          </div>
                        )}
                        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur non odio aspernatur nam recusandae quia, dolor est sunt, doloremque iure pariatur sit quis iste explicabo laudantium error facilis tempora sed. */}
                      </div>
                    </ScrollArea>
                  </div>
                ),
              },
              {
                title: "Reviews",
                value: "reviews",
                content: (
                  <div className="rounded-lg border bg-white p-6 shadow-md dark:bg-slate-800">
                    <h3 className="mb-4 text-2xl font-bold text-red-600">
                      Reviews
                    </h3>

                    <ScrollArea className="h-72 overflow-y-auto">
                      {!getReviewsLoader &&
                        reviews?.map((review, index) => (
                          <div
                            key={`review-${review.item_id ?? `fallback-${index}`}`}
                            className="mb-4 border-b border-gray-600 pb-2 dark:border-gray-600"
                          >
                            <p className="font-semibold">{review.username}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {review.review}
                            </p>
                            <div className="flex items-center gap-1 py-2">
                              {Array.from({ length: 5 }, (_, i) =>
                                i < (review.stars ?? 0) ? (
                                  <FaStar
                                    key={`star-${review.item_id}-${index}-${i}`}
                                    className="text-yellow-500"
                                  />
                                ) : (
                                  <FaRegStar
                                    key={`regstar-${review.item_id}-${index}-${i}`}
                                    className="text-gray-400"
                                  />
                                ),
                              )}
                            </div>
                            <p className="text-xs text-gray-500">
                              {review?.created_at
                                ? moment(review?.created_at).format(
                                  "Do MMMM, YYYY",
                                )
                                : ""}
                            </p>
                          </div>
                        ))}
                      {!getReviewsLoader &&
                        (!reviews?.length || reviews == null) && (
                          <div className="flex h-full flex-col items-center justify-center gap-5">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              No reviews available
                            </p>
                            <Player
                              autoplay
                              loop
                              src="/assets/gifs/no-reviews.json"
                              className="h-fit w-72"
                            />
                          </div>
                        )}
                    </ScrollArea>
                    {getReviewsLoader && (
                      <ScrollArea className="h-[300px] overflow-y-auto">
                        {Array.from({ length: 6 }).map((_, index) => (
                          <div
                            key={index}
                            className="mb-4 animate-pulse border-b border-gray-600 pb-2 dark:border-gray-400"
                          >
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
                    )}
                  </div>
                ),
              },
            ]}
          />
        </div>

        {/* {!getReviewsLoader && reviews?.[0] && (
         
        )} */}

        <div className="flex-end md:mt-24 md:w-1/2 lg:mt-24">
          <ReviewForm
            submitValues={(val) => handleSubmitReviews(val)}
            submitLoader={submitLoader}
          />
        </div>
      </div>
      <div className="mt-20">
        <ProductsSection
          products={products}
          headingPartOne="Related"
          headingPartTwo="Products"
          loader={loader}
          viewAllButton={() => {
            router.back();
          }}
        />
      </div>

      <AlertBox
        title="Login Your Account"
        description="Please Login first, then enter the review"
        open={loginAlert}
        onClose={() => setLoginAlert(false)}
        onContinue={() => goToLogin()}
      />
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <MyComponent />
    </Suspense>
  );
};

export default Page;
