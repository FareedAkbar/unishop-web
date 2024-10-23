import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
  title?: string; // Optional title prop
  width?: string; // Optional width prop
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  title,
  width = "w-64",
}) => {
  return (
    <div className="flex flex-col space-y-4 p-2">
      {title && (
        <h2 className="mb-4 text-2xl pl-3 font-bold text-gray-800 dark:text-white animate-bounce">
          {title}
        </h2>
      )}
      <ScrollArea className="h-96 pr-5 scrollbar-hidden"> 
        <div className={`flex flex-col p-3 gap-4 ${width}`}> {/* Flex container for horizontal spacing */}
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className={`flex w-full items-center justify-between cursor-pointer rounded-lg bg-white dark:bg-slate-700 dark:text-white border border-neutral-300 p-3 shadow-lg`} 
              initial={{ opacity: 0, y: -20 }} // Start position above
              animate={{
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 100 },
              }}
              whileHover={{ scale: 1.05 }} // Scale effect on hover with origin to prevent cutting off
              transition={{ delay: index * 0.1 }} // Stagger effect
            >
              <Image
                src={product.image}
                alt={product.name}
                className="h-36 w-36 animate-swing rounded-lg object-cover"
                width={100}
                height={100}
              />
              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {product.category}
                </p>
                <span className="mt-2 text-lg font-bold text-blue-600 dark:text-blue-200">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProductList;
