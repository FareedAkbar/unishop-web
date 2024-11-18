import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import type { SpecialItems } from "~/types/specialItems";
import { useRouter } from "next/navigation";

interface ProductListProps {
  title?: string; // Optional title prop
  width?: string; // Optional width prop
  index: number,
  specialItems: SpecialItems[] | null
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  width = "w-64",
  specialItems
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
        <div className="flex flex-col space-y-4 p-6 pb-8">
          {title && (
            <h2 className="text-2xl pl-3 font-bold text-gray-800 dark:text-white animate-bounce">
              {title}
            </h2>
          )}
          <ScrollArea className="h-96 pr-5 scrollbar-hidden">
            <div className={`flex flex-col pl-6 pr-6 pt-2 pb-6 gap-4 ${width}`}> {/* Flex container for horizontal spacing */}
              {specialItems?.map((product, index) =>
                title == product?.tag_name && (
                  <motion.div
                    key={product.item_id}
                    className={`flex w-full items-center justify-between cursor-pointer rounded-lg bg-white dark:bg-slate-700 dark:text-white border border-neutral-300 p-3 shadow-lg`}
                    initial={{ opacity: 0, y: -20 }} // Start position above
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 100 },
                    }}
                    whileHover={{ scale: 1.05 }} // Scale effect on hover with origin to prevent cutting off
                    transition={{ delay: index * 0.1 }} // Stagger effect
                    onClick={()=>router.push(`/products?category=${product.category_type_id}&name=${product.category_name}&detail=${product.category}`)}
                  >
                    {product.object_path && product.category_name ? (
                      <Image
                        src={`https://ipos-storage.s3.amazonaws.com/${product.object_path}`}
                        alt={product.category_name}
                        className="h-36 w-36 animate-swing rounded-lg object-contain"
                        width={1000}
                        height={1000}
                      />
                    ) : (
                      <Image
                        src={'/assets/images/bookicon.png'}
                        alt={"Item"}
                        className="h-36 w-36 animate-swing rounded-lg object-contain"
                        width={1000}
                        height={1000}
                      />
                    )}

                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800 dark:text-white" title={product.item_name ?? ""}>
                      {product.item_name}
                      </span>
                      <p className="text-sm flex justify-end text-gray-500 dark:text-gray-300">
                        {product.category_name}
                      </p>
                      {product.item_sale_price ? (
                        <span className="mt-2 flex justify-end text-lg font-bold text-blue-600 dark:text-blue-200">
                          ${product.item_sale_price.toFixed(2)}
                        </span>
                      ):''}

                    </div>
                  </motion.div>
                )

              )}
            </div>
          </ScrollArea>

        </div>
      )}
    </>
  );
};

export default ProductList;
