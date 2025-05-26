import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import type { SpecialItems } from "~/types/specialItems";
import { useRouter } from "next/navigation";

interface ProductListProps {
  title?: string;
  width?: string;
  index: number;
  specialItems: SpecialItems[] | null;
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  width = "w-64",
  specialItems,
}) => {
  const router = useRouter();

  return (
    <>
      {specialItems?.[0] && (
        <div className="flex flex-col space-y-4 pb-5">
          {title && (
            <h2 className="animate-bounce pl-8 text-xl font-bold text-gray-800 dark:text-white">
              {title}
            </h2>
          )}
          <ScrollArea className="scrollbar-hidden max-h-64 w-full overflow-hidden">
            <div className={`flex flex-col gap-5 px-5 pb-6 pt-2 ${width}`}>
              {specialItems?.map(
                (product, index) =>
                  title == product?.tag_name && (
                    <motion.div
                      key={product?.item_id}
                      className="mx-3 flex w-full min-w-0 items-center justify-between rounded-lg border border-neutral-300 bg-white p-3 shadow-lg dark:border-neutral-400 dark:bg-slate-700 dark:text-white"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { type: "spring", stiffness: 100 },
                      }}
                      whileHover={{ scale: 1.05, zIndex: 10 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() =>
                        router.push(
                          `/products?category=${product.category_type_id}&name=${product.category_name}&detail=${product.category}`,
                        )
                      }
                    >
                      {product.object_path && product.category_name ? (
                        <Image
                          src={`https://ipos-storage.s3.amazonaws.com/${product.object_path}`}
                          alt={product.category_name}
                          className="h-20 w-20 flex-shrink-0 animate-swing rounded-lg object-contain"
                          width={1000}
                          height={1000}
                        />
                      ) : (
                        <Image
                          src={"/assets/images/bookicon.png"}
                          alt={"Item"}
                          className="h-20 w-20 flex-shrink-0 animate-swing rounded-lg object-contain"
                          width={1000}
                          height={1000}
                        />
                      )}

                      <div className="ml-3 flex min-w-0 flex-1 flex-col overflow-hidden">
                        {/* <span className="truncate text-sm font-semibold text-gray-800 dark:text-white">
                          {product.item_name}
                        </span> */}
                        <span className="overflow-hidden truncate text-ellipsis whitespace-nowrap text-sm font-semibold text-gray-800 dark:text-white">
                          {product.item_name?.includes("Exercise")
                            ? `${product.item_name} asdfghjkl;xcvbnm,.wertyuiop wsdfghjk wsdfghjk wertyui wertyui zxcvbnm wfghjk eryhujki werfkl`
                            : product.item_name}
                        </span>
                        <p className="truncate text-xs text-gray-500 dark:text-gray-300">
                          {product.category_name}
                        </p>
                        {product.item_sale_price && (
                          <span className="mt-2 flex justify-end font-bold text-red-500">
                            ${product.item_sale_price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ),
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </>
  );
};

export default ProductList;
