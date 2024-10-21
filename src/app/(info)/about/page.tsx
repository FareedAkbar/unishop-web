"use client";

import Image from "next/image";
import { Suspense } from "react";
import Spinner from "~/components/spinner";
import { FaStore, FaTruck, FaUsers } from "react-icons/fa"; // Importing React Icons

const MyComponent = () => {
  return (
    <div className="pt-24 flex min-h-screen flex-col items-center justify-center">
      {/* Image on Top */}
      <div className="w-full max-w-screen-xl p-5 overflow-hidden rounded-xl">
        <Image
          src="/assets/images/About_us.jpg"
          alt="thumbnail"
          className="h-auto w-full object-cover rounded-lg"
          width={1000}
          height={1000}
        />
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 gap-6 px-6 py-12 md:grid-cols-2 lg:grid-cols-3 max-w-screen-xl">
        {/* Card 1 */}
        <div className="p-6 rounded-lg shadow-lg bg-red-100 dark:bg-slate-800">
          <FaStore className="text-red-500 text-4xl animate-swing mb-4 mx-auto" /> {/* Icon */}
          <h2 className="mb-4 text-xl font-semibold text-center text-red-500">
            UNISHOP IS NON-FOR-PROFIT
          </h2>
          <p className="leading-relaxed text-justify text-gray-600 dark:text-gray-300">
            Explore UniShop for exclusive UOW merchandise, from academic
            essentials and official gear to graduation collections. Delight in
            unique Aboriginal art, jewellery, and décor, and benefit from
            clothing sales, varied sizes, competitive prices, and free shipping
            on select items.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-lg shadow-lg bg-red-100 dark:bg-slate-800">
          <FaTruck className="text-red-500 text-4xl animate-swing mb-4 mx-auto" /> {/* Icon */}
          <h2 className="mb-4 text-xl font-semibold text-center text-red-500">
            SHOP ONLINE OR IN-STORE
          </h2>
          <p className="leading-relaxed text-justify text-gray-600 dark:text-gray-300">
            Enjoy convenient delivery or 'CLICK AND COLLECT' options at UniShop,
            located on the scenic UOW campus. As a UOW Pulse venture, your
            purchases directly contribute to enriching student life through
            events, clubs, and more.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-lg shadow-lg bg-red-100 dark:bg-slate-800">
          <FaUsers className="text-red-500 text-4xl animate-swing mb-4 mx-auto" /> {/* Icon */}
          <h2 className="mb-4 text-xl font-semibold text-center text-red-500">
            SUPPORTING STUDENT LIFE
          </h2>
          <p className="leading-relaxed text-justify text-gray-600 dark:text-gray-300">
            UniShop is a UOW Pulse business, with all proceeds from everything
            you buy going straight back to enhancing the student experience on
            campus. Whether that’s through events, festivals, competitions, or
            through our clubs and societies.
          </p>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <MyComponent />
    </Suspense>
  );
};

export default Page;
