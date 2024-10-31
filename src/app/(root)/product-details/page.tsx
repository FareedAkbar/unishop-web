"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCartPlus, FaRegStar, FaStar } from "react-icons/fa";
import moment from "moment";
import Select from "~/components/Fields/select";
import type { Media, Variation, VariationTag } from "~/types/book";
import type DataCart from "~/types/book";
import { useAuthContext } from "~/Context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import ReviewForm from "~/components/Forms/ReviewForm";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { ScrollArea } from "~/components/ui/scroll-area";
import { getItemsByCategory } from "~/_actions/getitemsbycategory";
import ProductsSection from "~/components/ui-components/ProductsSection";

interface ProductDetailsProps {
  itemDetail: DataCart;
  //   getOptions: (
  //     tagName: string,
  //     dependencies?: Record<string, string>,
  //   ) => { value: string; label: string }[];
  //   handleAddToCart: (item: DataCart) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = (
  {
    // itemDetail,
    //   getOptions,
    //   handleAddToCart,
  },
) => {
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {},
  );
  const { cartItems, addCartItems, removeCartItems, productDetail,increaseCartItemQuantity } = useAuthContext();
  const itemDetail = productDetail
  console.log(productDetail)
  const [category, setCategory] = useState<string>("");
  const [products, setProducts] = useState<DataCart[]>([]);
  const [loader, setLoader] = useState<boolean>(true);

  const params = useSearchParams();

  useEffect(() => {
    const d = params.get("category");
    console.log("dt", d);
    if (d) {
      setCategory(d);
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
  async function getProducts(page: number) {
    try {
      setLoader(true);
      const x = await getItemsByCategory(parseInt(category) ?? 1, page, 1, 0);
      console.log("data", x);

      if (typeof x !== "boolean" && x.status) {
        setProducts(x.data);
      }
      setLoader(false);
      console.log(products);

      // setData(result);
      // setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Failed to load data:", error);
      setLoader(false);
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

  const handleSelectChange = (
    tagName: string,
    option: { value: string; label: string },
  ) => {
    setSelectedValues((prev) => ({
      ...prev,
      [tagName]: option.value,
    }));
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

  const reviews = [
    {
      user: "John Doe",
      comment: "Great app for security, works seamlessly!",
      rating: 5,
      date: "2024-10-20",
    },
    {
      user: "Jane Smith",
      comment: "Good features, but the UI needs improvement.",
      rating: 3,
      date: "2024-09-15",
    },
    {
      user: "Alex Johnson",
      comment: "Decent app, but had some issues with setup.",
      rating: 4,
      date: "2024-08-22",
    },
  ];

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

  const handleQuantity = async (id: number, number: number) => {
    await increaseCartItemQuantity(id, number);
  };
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (itemDetail?.quantity) {
      setQuantity(itemDetail.quantity);
    }
    console.log("ii", itemDetail);
  }, [itemDetail]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
   void handleQuantity(itemDetail?.item_id ? itemDetail?.item_id : 0, newQuantity);
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
  const [selectedImage, setSelectedImage] = useState<Media>(itemDetail?.media[0]!);
  const handleImageClick = (imagePath: Media) => {
    setSelectedImage(imagePath);
  };

  return (
    <div className="p-6 pt-32">
      <h4 className="pb-3 text-center font-serif text-lg font-bold capitalize text-red-500 dark:text-neutral-100 md:text-2xl">
        {itemDetail?.book_title ?? itemDetail?.item_name}
      </h4>
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
            {itemDetail?.media?.map((image, index) => (
              <Image
                key={index}
                src={`https://ipos-storage.s3.amazonaws.com/${image.object_path}`}
                alt={`Image ${index + 1}`}
                width={1000}
                height={1000}
                className={`h-24 w-24 cursor-pointer rounded-lg object-contain shadow ${selectedImage.object_path.includes(image.object_path) ? "ring-1 ring-red-500" : ""}`}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex h-60 w-60 items-center justify-center rounded-lg p-2 shadow lg:h-80 lg:w-80">
            <Image
              src={`https://ipos-storage.s3.amazonaws.com/${selectedImage.object_path}`}
              alt="Selected Image"
              width={2000}
              height={2000}
              className="h-56 w-56 rounded-lg object-contain lg:h-72 lg:w-72"
            />
          </div>
        </div>
        <div className="mx-auto flex max-w-sm flex-col items-start justify-start gap-x-4 gap-y-2">
          <div className="flex flex-col">
            {itemDetail?.item_sale_price && (
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
            )}
            {itemDetail?.SKU && (
              <span className="font-serif text-lg text-zinc-500 dark:text-neutral-300">
                SKU: {itemDetail.SKU}
              </span>
            )}
          </div>
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

          {itemDetail?.pages !== undefined && itemDetail.pages !== null && (
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
          <div className="mt-auto flex w-auto items-center justify-between space-x-2 rounded bg-gray-200 p-1 dark:bg-gray-500">
            <button
              className="p-1"
              disabled={quantity <= 1}
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              <HiOutlineMinus size={14} />
            </button>
            <span className="text-sm">{quantity}</span>
            <button
              className="p-1"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              <HiOutlinePlus size={14} />
            </button>
          </div>
          {itemDetail?.item_id &&
          !isItemInCart(itemDetail.item_id) &&
          itemDetail?.stock?.quantity ? (
            <button
              className="flex items-center space-x-1 rounded-full bg-green-500 py-1 pl-2 pr-2 text-xs font-bold text-white"
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
      {/* Reviews Section */}
      <div className="mt-16 flex flex-col gap-8 md:flex-row">
        <div className="max-h-[487px] rounded-lg border p-6 shadow-md md:w-1/2">
          <h3 className="mb-4 text-2xl font-bold text-red-600">Reviews</h3>
          <ScrollArea className="h-[400px]">
            {reviews.map((review, index) => (
              <div key={index} className="mb-4 border-b pb-2">
                <p className="font-semibold">{review.user}</p>
                <p className="text-sm text-gray-600">{review.comment}</p>
                {/* Star Rating */}
                <div className="flex items-center gap-1 py-2">
                  {Array.from({ length: 5 }, (_, i) =>
                    i < review.rating ? (
                      <FaStar key={i} className="text-yellow-500" />
                    ) : (
                      <FaRegStar key={i} className="text-gray-400" />
                    ),
                  )}
                </div>
                {/* Review Date */}
                <p className="text-xs text-gray-500">
                  {moment(review.date).format("Do MMMM, YYYY")}
                </p>
              </div>
            ))}
          </ScrollArea>
        </div>
        {/* Review Form */}
        <div className="md:w-1/2">
          <ReviewForm />
        </div>
      </div>
      <ProductsSection
        products={products}
        headingPartOne="Related"
        headingPartTwo="Products"
        loader={loader}
        viewAllButton={() => {
          router.push(`/products?detail=${category}`);
        }}
      />
    </div>
  );
};

export default ProductDetails;
