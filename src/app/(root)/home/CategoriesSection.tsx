// components/CategoriesSection.tsx
"use client";

import { FC } from "react";
import Image from "next/image";
import type { SuperCategory } from "~/types/category";
import Link from "next/link";

interface CategoriesSectionProps {
  categories: SuperCategory[];
}

const CategoriesSection: FC<CategoriesSectionProps> = ({ categories }) => {
  const dummyImages = [
    "/assets/images/home/cat1.jpg",
    "/assets/images/home/cat2.jpg",
    "/assets/images/home/cat3.jpg",
    "/assets/images/home/cat4.jpg",
    "/assets/images/home/cat5.jpg",
    "/assets/images/home/cat6.jpg",
  ];
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-2 font-serif text-xl font-semibold text-red-500 md:text-3xl">
        Popular Categories
      </h2>
      <p className="text-gray-500">Browse one of our popular categories.</p>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories?.map((item, idx) => (
          <Link
            key={item.category_type_id}
            href={`/products?category=${item.category_type_id}&name=${item.type}&page=1`}
            className="flex cursor-pointer gap-5 rounded-lg border border-gray-300 bg-white p-4 shadow-sm transition hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-600"
            // onClick={() => handleClick(item)}
          >
            <div className="relative h-24 w-24 overflow-hidden rounded-md">
              <Image
                src={
                  item?.object_path
                    ? `https://ipos-storage.s3.amazonaws.com/${item?.object_path}`
                    : dummyImages[idx]!
                }
                alt={item.type}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-medium capitalize text-gray-700 dark:text-gray-200 md:text-lg">
              {item.type}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
