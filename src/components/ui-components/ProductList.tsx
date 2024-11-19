import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import type { SpecialItems } from "~/types/specialItems";
import { useRouter } from "next/navigation";

interface ProductListProps {
  title?: string; // Optional title prop
  width?: string; // Optional width prop
  index: number;
  specialItems: SpecialItems[] | null;
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  width = "w-64",
  specialItems,
}) => {
  const router = useRouter();

  // useEffect(() => {
  //   const loadData = async () => {
  //     console.log(id)
  //     const x = await getSpecialItems(id)
  //     if (typeof x != "boolean" && x.status && x.data) {
  //       setSpecialItems(x?.data)
  //       console.log(x.data)
  //     }
  //   };
  //   loadData().catch((error) => {
  //     console.error("Failed to load data in useEffect:", error);
  //   });
  // }, [])

  return (
    <>
      {specialItems?.[0] && (
        <div className="flex flex-col space-y-4 p-3 pb-8">
          {title && (
            <h2 className="animate-bounce pl-3 text-xl font-bold text-gray-800 dark:text-white">
              {title}
            </h2>
          )}
          <ScrollArea className="scrollbar-hidden h-64 lg:pr-5">
            <div
              className={`flex flex-col gap-4 pb-6 pl-8 pt-2 lg:pr-6 ${width}`}
            >
              {/* Flex container for horizontal spacing */}
              {specialItems?.map(
                (product, index) =>
                  title == product?.tag_name && (
                    <motion.div
                      key={product.item_id}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-lg border border-neutral-300 bg-white p-3 shadow-lg dark:bg-slate-700 dark:text-white`}
                      initial={{ opacity: 0, x: -20 }} // Start position above
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { type: "spring", stiffness: 100 },
                      }}
                      whileHover={{ scale: 1.05 }} // Scale effect on hover with origin to prevent cutting off
                      transition={{ delay: index * 0.1 }} // Stagger effect
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
                          className="h-20 w-20 animate-swing rounded-lg object-contain"
                          width={1000}
                          height={1000}
                        />
                      ) : (
                        <Image
                          src={"/assets/images/bookicon.png"}
                          alt={"Item"}
                          className="h-20 w-20 animate-swing rounded-lg object-contain"
                          width={1000}
                          height={1000}
                        />
                      )}

                      <div className="flex flex-col">
                        <span
                          className="text-sm font-semibold text-gray-800 dark:text-white"
                          title={product.item_name ?? ""}
                        >
                          {product.item_name}
                        </span>
                        <p className="flex justify-end text-xs text-gray-500 dark:text-gray-300">
                          {product.category_name}
                        </p>
                        {product.item_sale_price ? (
                          <span className="mt-2 flex justify-end font-bold text-red-500">
                            ${product.item_sale_price.toFixed(2)}
                          </span>
                        ) : (
                          ""
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
