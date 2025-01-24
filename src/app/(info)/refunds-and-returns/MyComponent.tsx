
import React from "react";

import {
  FaSyncAlt,
  FaShoppingCart,
  FaEnvelope,
  FaPhoneAlt,
  FaCheck, // Import the check icon
} from "react-icons/fa";

import { IconType } from "react-icons";
import dynamic from "next/dynamic";

const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player), { ssr: false });

// Reusable Card Component
interface PolicyCardProps {
  title: string;
  icon: IconType;
  items: string[];
}

const ReturnPolicyCard: React.FC<PolicyCardProps> = ({
  title,
  icon: Icon,
  items,
}) => (
  <div className="w-full rounded-lg bg-red-100 p-6 shadow-md transition-all duration-300 hover:scale-105 dark:bg-slate-700 sm:w-1/2 lg:w-1/3">
    <h2 className="mb-4 flex items-center justify-center gap-2 text-xl font-semibold">
      <Icon className="text-red-500" /> {title}
    </h2>
    <ul className="list-none space-y-2 text-left">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <FaCheck className="h-4 w-4 flex-shrink-0 text-red-500" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

// Data Arrays for the Cards
const inStorePolicy = {
  title: "In Store Returns",
  icon: FaSyncAlt,
  items: [
    "Exchange or credit note provided within 14 days with a valid receipt.",
    "Items must be in saleable condition.",
    "Shrink-wrapped items can only be returned if the seal is intact.",
    "Items with eBooks, access codes, or digital content are non-returnable if opened or used (unless faulty).",
    "Course notes are non-returnable.",
    "Refunds are issued using the original payment method.",
  ],
};

const onlineOrderPolicy = {
  title: "Online Orders",
  icon: FaShoppingCart,
  items: [
    "Returns accepted within 14 days with the original Tax Invoice.",
    "Items must be in mint condition.",
    "Reason for return must be indicated on the back of the invoice.",
    "Faulty or incorrect items are eligible for free return postage.",
    "For other reasons, the customer covers shipping costs.",
    "Refunds may take 1-2 billing cycles to appear in your account.",
  ],
};

const MyComponent: React.FC = () => {
  return (
    <div className="bg-gray-50 pt-28 dark:bg-slate-800 lg:pt-20">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between bg-white p-8 pb-14 shadow-md dark:bg-slate-600 lg:px-32">
        <div className="max-w-md flex-1 text-lg text-gray-700">
          <h1 className="mb-2 text-3xl font-bold text-red-600">
            Refunds & Returns
          </h1>
          <p className="text-justify dark:text-white">
            We strive to provide a seamless shopping experience. If you need to
            return or exchange an item, please review the policies below for
            in-store and online purchases.
          </p>
        </div>
        <div className="flex justify-center sm:mt-0 lg:w-fit w-full sm:flex-shrink-0">
          <Player
            autoplay
            loop
            src="/assets/gifs/refund.json"
            className="h-56 w-56"
          />
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative z-[5] -mt-14 flex flex-wrap justify-center gap-14 px-8 text-center">
        <ReturnPolicyCard {...inStorePolicy} />
        <ReturnPolicyCard {...onlineOrderPolicy} />
      </div>

      {/* Terms and Contact Section */}
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
            <FaPhoneAlt className="text-red-500" /> Contact us
          </h2>
          <p>
            For delivery enquiries, please{" "}
            <a
              href="contact-us"
              className="cursor-pointer text-red-500 underline"
            >
              Contact
            </a>{" "}
            our customer service staff.
          </p>
        </div>
      </div>
    </div>
  );
};


export default MyComponent;



