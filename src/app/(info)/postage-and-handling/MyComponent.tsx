"use client";
import dynamic from "next/dynamic";
import React from "react";

import {
  FaShippingFast,
  FaDollarSign,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);

const MyComponent: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-slate-800">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between bg-white p-8 pb-14 shadow-md dark:bg-slate-600 lg:px-32">
        <div className="max-w-md flex-1 text-lg text-gray-700">
          <h1 className="mb-2 text-3xl font-bold text-red-600">
            Delivery Information
          </h1>
          <p className="text-justify dark:text-white">
            We are committed to ensuring that your orders are delivered
            efficiently and on time. For any delivery-related questions, feel
            free to contact our customer service team.
          </p>
        </div>
        <div className="flex justify-center sm:mt-0 sm:flex-shrink-0">
          <Player
            autoplay
            loop
            src="/assets/gifs/delivery.json"
            className="h-64 w-64 scale-[1.5]"
          />
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative z-[5] -mt-14 flex flex-wrap justify-center gap-14 px-8 text-center">
        {/* Card 1: Order Processing */}
        <div className="w-full rounded-lg bg-red-100 p-6 shadow-md transition-all duration-300 hover:scale-105 dark:bg-slate-700 sm:w-1/2 lg:w-1/3">
          <h2 className="mb-4 flex items-center justify-center gap-2 text-xl font-semibold">
            <FaShippingFast className="text-red-500" /> Order Processing
          </h2>
          <p>
            Online orders are processed within two business days, stock
            permitting.
          </p>
        </div>

        {/* Card 2: Delivery Charges */}
        <div className="w-full rounded-lg bg-red-100 p-6 shadow-md transition-all duration-300 hover:scale-105 dark:bg-slate-700 sm:w-1/2 lg:w-1/3">
          <h2 className="mb-4 flex items-center justify-center gap-2 text-xl font-semibold">
            <FaDollarSign className="text-red-500" /> Delivery Charges
          </h2>
          <p>A flat rate of $10 applies to all orders within Australia.</p>
        </div>
      </div>

      {/* Address Section */}
      <div className="flex flex-wrap justify-center gap-14 p-8 text-center">
        <div className="text-left sm:w-1/2 lg:w-1/3">
          <h2 className="flex items-center gap-2 pb-2 text-xl font-bold">
            <FaEnvelope className="text-red-500" /> Terms & Conditions
          </h2>
          <p className="">
            See{" "}
            <a
              href="/terms-and-conditions"
              // onClick={() => router.push("/terms-and-conditions")}
              className="cursor-pointer text-red-500 underline"
            >
              Terms and Conditions
            </a>{" "}
            for overseas shipping.
          </p>
        </div>

        <div className="text-left sm:w-1/2 lg:w-1/3">
          <h2 className="flex items-center gap-2 pb-2 text-xl font-bold">
            <FaPhoneAlt className="text-red-500" /> Delivery Enquiries
          </h2>
          <p>
            For delivery enquiries, please contact our customer service staff.
          </p>
        </div>
      </div>
    </div>
  );
};
export default MyComponent;
