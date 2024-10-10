import React from "react";
import { motion } from "framer-motion"; // Import framer-motion for animations
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="flex flex-col space-y-4">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          className="mx-auto flex w-64 items-center justify-between gap-3 rounded-lg bg-white p-3 shadow-lg" // Set a fixed width
          initial={{ opacity: 0, y: -20 }} // Start position above
          animate={{
            opacity: 1, 
            y: 0,
            transition: { type: "spring", stiffness: 100 },
          }}
          whileHover={{ scale: 1.05 }} // Scale effect on hover
          transition={{ delay: index * 0.1 }} // Stagger effect
        >
          <motion.div
            animate={{
              rotate: [0, 4, 0], // Rotate animation
              transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            className="mr-4"
          >
            <Image
              src={product.image}
              alt={product.name}
              className="h-20 w-20 rounded-lg object-cover"
              width={100}
              height={100}
            />
          </motion.div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
            <span className="mt-2 text-lg font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductList;
