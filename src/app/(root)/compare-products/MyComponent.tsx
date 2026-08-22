"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RxCrossCircled } from "react-icons/rx";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { FaCheckCircle, FaArrowCircleLeft, FaExclamationTriangle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import type DataCart from "~/types/book";
import Button from "~/components/ui-components/Button";
import { useAuthContext } from "~/Context/AuthContext";
import { useToast } from "~/hooks/use-toast";
import dynamic from "next/dynamic";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);

const CompareProductsPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [compareProducts, setCompareProducts] = useState<DataCart[]>([]);
  const router = useRouter();
  const { setProductForDetail, cartItems, addCartItems, removeCartItems } = useAuthContext();
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("compare-products");
    if (stored) {
      try {
        setCompareProducts(JSON.parse(stored) as DataCart[]);
      } catch (e) {
        console.error(e);
      }
    }
    setIsLoaded(true);
  }, []);

  const isItemInCart = (itemId: number) => {
    const newItems: DataCart[] =
      typeof cartItems === "string"
        ? (JSON.parse(cartItems) as DataCart[])
        : cartItems!;
    return newItems?.findIndex(
      (cartItem: DataCart) => cartItem.item_id === itemId,
    ) > -1;
  };

  const removeFromCompare = (itemId: number, title: string) => {
    const updated = compareProducts.filter((p) => p.item_id !== itemId);
    setCompareProducts(updated);
    localStorage.setItem("compare-products", JSON.stringify(updated));
    toast({
      variant: "success",
      title: "Removed",
      description: `${title} has been removed from comparison.`,
    });
  };

  const goToDetail = async (item: DataCart) => {
    await setProductForDetail(item);
    router.push(`/product-details?category=${item.category}`);
  };

  const attributes = [
    { label: "Image", key: "image" },
    { label: "Title", key: "title" },
    { label: "Price", key: "price" },
    { label: "Author", key: "author" },
    { label: "ISBN/SKU", key: "sku" },
    { label: "Language", key: "book_language" },
    { label: "Pages", key: "pages" },
    { label: "Publisher", key: "publisher" },
    { label: "Edition", key: "edition" },
    { label: "Shelf Location", key: "shelf_location" },
    { label: "Stock Status", key: "stock" },
    { label: "Description", key: "description" },
    { label: "Actions", key: "actions" },
  ];

  if (!isLoaded) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (compareProducts.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
        <Player
          autoplay
          loop
          src="/assets/gifs/emptywishlist.json"
          className="h-64 w-64"
        />
        <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">
          No Products to Compare
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 max-w-sm">
          Add up to 5 products to your comparison list from the product detail pages to see them compared here.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-6 flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
        >
          <HiArrowNarrowLeft size={18} />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500 font-medium transition-colors"
        >
          <HiArrowNarrowLeft size={20} />
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Product Comparison ({compareProducts.length}/5)
        </h1>
      </div>

      {/* Comparison Grid/Table Container */}
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm scrollbar-thin">
        <table className="w-full border-collapse text-left min-w-[600px]">
          <tbody>
            {attributes.map((attr) => (
              <tr
                key={attr.key}
                className="border-b border-gray-100 dark:border-slate-700 last:border-0"
              >
                {/* Attribute Name Column */}
                <td className="sticky left-0 z-30 bg-gray-50 dark:bg-slate-900 p-4 font-bold text-sm text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-slate-700 w-32 sm:w-44 flex-shrink-0">
                  {attr.label}
                </td>

                {/* Product Values Columns */}
                {compareProducts.map((prod) => {
                  const productTitle = prod.book_title ?? prod.item_name ?? "Product";
                  return (
                    <td
                      key={`${prod.item_id}-${attr.key}`}
                      className="p-4 border-r border-gray-100 dark:border-slate-700 last:border-0 align-top max-w-xs text-sm text-gray-600 dark:text-gray-300"
                    >
                      {attr.key === "image" && (
                        <div className="relative flex flex-col items-center gap-4">
                          {/* Close Button to remove column */}
                          <button
                            onClick={() => removeFromCompare(prod.item_id, productTitle)}
                            className="absolute -top-2 -right-2 z-10 text-red-500 hover:text-red-700 bg-white dark:bg-slate-800 rounded-full p-1 shadow transition-colors"
                            aria-label={`Remove ${productTitle} from comparison`}
                          >
                            <RxCrossCircled className="text-xl" />
                          </button>
                          <div
                            onClick={() => goToDetail(prod)}
                            className="cursor-pointer overflow-hidden rounded-md border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 h-32 w-28 relative flex items-center justify-center p-2 hover:scale-[1.02] transition-transform"
                          >
                            {prod?.object_path || (prod?.media && prod?.media.length > 0) ? (
                              <Image
                                src={
                                  prod?.object_path
                                    ? `https://ipos-storage.s3.amazonaws.com/${prod.object_path}`
                                    : `https://ipos-storage.s3.amazonaws.com/${prod.media[0]?.object_path}`
                                }
                                alt={productTitle}
                                fill
                                sizes="(max-width: 120px) 100vw"
                                className="object-contain p-1"
                              />
                            ) : (
                              <>
                                <Image
                                  src="/assets/images/products/img light.png"
                                  alt={productTitle}
                                  fill
                                  sizes="(max-width: 120px) 100vw"
                                  className="object-contain p-1 dark:hidden"
                                />
                                <Image
                                  src="/assets/images/products/img.png"
                                  alt={productTitle}
                                  fill
                                  sizes="(max-width: 120px) 100vw"
                                  className="object-contain p-1 hidden dark:block"
                                />
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      {attr.key === "title" && (
                        <span
                          onClick={() => goToDetail(prod)}
                          className="font-semibold text-gray-800 dark:text-white hover:text-red-500 dark:hover:text-red-500 cursor-pointer transition-colors block"
                        >
                          {productTitle}
                        </span>
                      )}

                      {attr.key === "price" && (
                        <span className="font-bold text-red-500 dark:text-red-400">
                          $
                          {prod.variations?.[0]?.items_variable_items_sale_price
                            ? prod.variations[0].items_variable_items_sale_price.toFixed(2)
                            : prod.item_sale_price?.toFixed(2) ?? "0.00"}
                        </span>
                      )}

                      {attr.key === "author" && (
                        <span>
                          {prod.author_first_name || prod.author_last_name
                            ? `${prod.author_first_name ?? ""} ${prod.author_last_name ?? ""}`.trim()
                            : "-"}
                        </span>
                      )}


                      {attr.key === "sku" && (
                        <span>
                          {prod.variations?.[0]?.items_variable_items_sku_number ??
                            prod.SKU ??
                            "-"}
                        </span>
                      )}


                      {attr.key === "book_language" && (
                        <span className="capitalize">{prod.book_language ?? "-"}</span>
                      )}

                      {attr.key === "pages" && (
                        <span>{prod.pages ?? "-"}</span>
                      )}

                      {attr.key === "publisher" && (
                        <span>{prod.publisher?.publisher_name ?? "-"}</span>
                      )}

                      {attr.key === "edition" && (
                        <span>{prod.edition ?? "-"}</span>
                      )}

                      {attr.key === "shelf_location" && (
                        <span>{prod.shelf_location ?? "-"}</span>
                      )}

                      {attr.key === "stock" && (
                        <div className="flex items-center gap-1.5">
                          {prod.variations?.[0] ? (
                            prod.variations[0].stock?.quantity && prod.variations[0].stock.quantity > 0 ? (
                              prod.variations[0].stock.quantity > parseInt(prod.variations[0].stock.lowest_level ?? "0") ? (
                                <span className="flex items-center gap-1 rounded border border-green-500 px-2 py-0.5 text-xs text-green-500 font-medium">
                                  <FaCheckCircle /> In stock
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 rounded border border-yellow-500 px-2 py-0.5 text-xs text-yellow-500 font-medium">
                                  <FaExclamationTriangle /> Low Stock
                                </span>
                              )
                            ) : prod.allow_special_order === 1 ? (
                              <span className="flex items-center gap-1 rounded border border-yellow-500 px-2 py-0.5 text-xs text-yellow-500 font-medium">
                                <FaArrowCircleLeft /> Backorder
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 rounded border border-red-500 px-2 py-0.5 text-xs text-red-500 font-medium">
                                <IoIosCloseCircle /> Out of stock
                              </span>
                            )
                          ) : prod.stock?.quantity && prod.stock.quantity > 0 ? (
                            prod.stock.quantity > parseInt(prod.stock.lowest_level ?? "0") ? (
                              <span className="flex items-center gap-1 rounded border border-green-500 px-2 py-0.5 text-xs text-green-500 font-medium">
                                <FaCheckCircle /> In stock
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 rounded border border-yellow-500 px-2 py-0.5 text-xs text-yellow-500 font-medium">
                                <FaExclamationTriangle /> Low Stock
                              </span>
                            )
                          ) : prod.allow_special_order === 1 ? (
                            <span className="flex items-center gap-1 rounded border border-yellow-500 px-2 py-0.5 text-xs text-yellow-500 font-medium">
                              <FaArrowCircleLeft /> Backorder
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 rounded border border-red-500 px-2 py-0.5 text-xs text-red-500 font-medium">
                              <IoIosCloseCircle /> Out of stock
                            </span>
                          )}
                        </div>
                      )}

                      {attr.key === "description" && (
                        <div className="max-h-24 overflow-y-auto pr-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                          {prod.description
                            ? prod.description.replace(/<\/?[^>]+(>|$)/g, "")
                            : "No description available."}
                        </div>
                      )}

                      {attr.key === "actions" && (
                        <div className="flex flex-col gap-2">
                          {(prod.variations?.[0]?.items_variable_items_sale_price ??
                            (prod.item_sale_price &&
                              ((prod.stock?.quantity && prod.stock?.quantity > 0) ||
                                prod.allow_special_order === 1))) ? (
                            !isItemInCart(prod.item_id) ? (
                              <Button
                                title="Add to Cart"
                                className="w-full text-xs py-1.5"
                                onClick={async () => {
                                  if (prod.variations?.[0]) {
                                    await setProductForDetail(prod);
                                    router.push(`/product-details`);
                                  } else {
                                    await addCartItems(prod);
                                    toast({
                                      variant: "success",
                                      title: "Added to Cart",
                                      description: `${prod.book_title ?? prod.item_name} has been added to your cart.`,
                                    });
                                  }
                                }}
                              />
                            ) : (
                              <Button
                                title="Remove from Cart"
                                variant="secondary"
                                className="w-full text-xs py-1.5"
                                onClick={async () => {
                                  await removeCartItems(prod);
                                  toast({
                                    variant: "destructive",
                                    title: "Removed from Cart",
                                    description: `${prod.book_title ?? prod.item_name} has been removed from your cart.`,
                                  });
                                }}
                              />
                            )
                          ) : (
                            <span className="text-xs text-red-500 font-semibold">Out of Stock</span>
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareProductsPage;
