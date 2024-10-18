import Image from "next/image";
import React from "react";

interface GiftCategory {
  name: string;
  description: string;
  additionalInfo?: string;
  history?: string;
  tagline?: string;
  mission?: string;
  featuredLocation: string;
  images: string[];
  featuredProducts: string[];
}

interface GiftCategoryInfoProps {
  category: GiftCategory;
}

const GiftCategoryInfo: React.FC<GiftCategoryInfoProps> = ({ category }) => {
  return (
    <div className="p-5 pt-16 lg:pl-72 lg:pt-12">
      <h2 className="mb-2 text-3xl font-extrabold text-red-600">
        {category.name}
      </h2>
      {category.tagline && (
        <p className="mb-4 font-semibold italic text-red-500">
          {category.tagline}
        </p>
      )}
      <div className="mt-6 flex flex-col md:flex-row md:items-start md:gap-8">
        <div className="flex-1">
          <p className="mb-4 text-justify text-gray-700 dark:text-gray-300">
            {category.description}
          </p>
          {category.additionalInfo && (
            <p className="mb-4 text-justify text-gray-600 dark:text-gray-300">
              {category.additionalInfo}
            </p>
          )}
          {category.history && (
            <p className="mb-4 text-gray-600 dark:text-gray-300 text-justify">{category.history}</p>
          )}
          <p className="mb-4 font-semibold text-red-500 text-justify">
            {category.featuredLocation}
          </p>
        </div>

        {category.featuredProducts && category.featuredProducts.length > 0 && (
          <div className="w-full max-w-sm rounded-lg border dark:bg-slate-700 bg-red-100 p-4 shadow-md md:w-1/3">
            <h3 className="mb-2 text-center text-2xl font-bold text-red-600">
              Featured Products
            </h3>
            <ul className="list-disc pl-5 text-gray-800 dark:text-gray-300">
              {category.featuredProducts.map((product, index) => (
                <li key={index} className="mb-1">
                  {product}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col items-center justify-center gap-4 lg:flex-row">
        {category.images.map((image, index) => (
          <div key={index} className="relative max-w-md rounded-lg">
            <Image
              src={image}
              alt={category.name}
              objectFit="contain"
              className="h-64 w-full transform rounded-lg transition-transform hover:scale-105"
              width={1000}
              height={1000}
            />
          </div>
        ))}
      </div>

      <p className="-mb-16 mt-6 text-center text-gray-700 dark:text-gray-300">
        <a href="/contact-us" className="text-red-600 hover:underline">
          Contact us
        </a>{" "}
        for product details or purchase inquiries.
      </p>
    </div>
  );
};

export default GiftCategoryInfo;
