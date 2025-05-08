"use client";
import React from "react";
import Image from "next/image";

import { FaStore, FaTruck, FaUsers } from "react-icons/fa"; // Importing React Icons

const MyComponent = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {/* Image on Top */}
      <div className="w-full max-w-screen-xl overflow-hidden rounded-xl p-5">
        <Image
          src="/assets/images/About_us.jpg"
          alt="thumbnail"
          className="h-auto w-full rounded-lg object-cover"
          width={1000}
          height={1000}
        />
      </div>

      {/* Cards Section */}
      <div className="grid max-w-screen-xl grid-cols-1 gap-6 px-6 py-12 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <div className="rounded-lg bg-red-100 p-6 shadow-lg transition-all duration-300 hover:scale-105 dark:bg-slate-800">
          <FaStore className="mx-auto mb-4 text-4xl text-red-500" />
          <h2 className="mb-4 text-center text-xl font-semibold text-red-500">
            UNISHOP IS NON-FOR-PROFIT
          </h2>
          <p className="text-center leading-relaxed text-gray-600 dark:text-gray-300">
            {`Explore UniShop for exclusive UOW merchandise, from academic
            essentials and official gear to graduation collections. Delight in
            unique Aboriginal art, jewellery, and décor, and benefit from
            clothing sales, varied sizes, competitive prices, and free shipping
            on select items. Visit us in-store or online for an exceptional
            shopping experience.`}
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-lg bg-red-100 p-6 shadow-lg transition-all duration-300 hover:scale-105 dark:bg-slate-800">
          <FaTruck className="mx-auto mb-4 text-4xl text-red-500" />
          <h2 className="mb-4 text-center text-xl font-semibold text-red-500">
            SHOP ONLINE OR IN-STORE
          </h2>
          <p className="text-center leading-relaxed text-gray-600 dark:text-gray-300">
            {`Enjoy convenient delivery or "CLICK AND COLLECT" options at UniShop,
            located on the scenic UOW campus. As a UOW Pulse venture, your
            purchases directly contribute to enriching student life through
            events, clubs, and more. Thank you for supporting the UOW community.`}
          </p>
        </div>

        {/* Card 3 */}
        <div className="rounded-lg bg-red-100 p-6 shadow-lg transition-all duration-300 hover:scale-105 dark:bg-slate-800">
          <FaUsers className="mx-auto mb-4 text-4xl text-red-500" />
          <h2 className="mb-4 text-center text-xl font-semibold text-red-500">
            SUPPORTING STUDENT LIFE
          </h2>
          <p className="text-center leading-relaxed text-gray-600 dark:text-gray-300">
            {`UniShop is a UOW Pulse business, with all proceeds from everything
            you buy going straight back to enhancing the student experience on
            campus. Whether that's through events, festivals, competitions or
            through our clubs and societies. Thank you for supporting the UOW
            campus experience.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
