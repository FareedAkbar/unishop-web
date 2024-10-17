"use client";

import { Suspense } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  FaSyncAlt,
  FaShoppingCart,
  FaEnvelope,
  FaPhoneAlt,
  FaCheck, // Import the check icon
} from "react-icons/fa";
import Spinner from "~/components/spinner";

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
        <div className="flex justify-center sm:mt-0 sm:flex-shrink-0">
          <Player
            autoplay
            loop
            src="/assets/gifs/contact.json"
            className="h-64 w-64 scale-[1.5]"
          />
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative z-10 -mt-14 flex flex-wrap justify-center gap-14 px-8 text-center">
        {/* Card 1: In Store Returns */}
        <div className="w-full rounded-lg bg-red-100 p-6 shadow-md dark:bg-slate-700 sm:w-1/2 lg:w-1/3">
          <h2 className="mb-4 flex items-center justify-center gap-2 text-xl font-semibold">
            <FaSyncAlt className="text-red-500" /> In Store Returns
          </h2>
          <ul className="list-none space-y-2 text-left">
            <li className="flex items-start gap-2">
              <FaCheck className="text-red-500 h-4 w-4" /> {/* Fixed size */}
              Exchange or credit note provided within 14 days with a valid
              receipt.
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-red-500 h-4 w-4" /> {/* Fixed size */}
              Items must be in saleable condition.
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-red-500 h-4 w-4" /> {/* Fixed size */}
              Shrink-wrapped items can only be returned if the seal is intact.
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-red-500 h-4 w-4" /> {/* Fixed size */}
              Items with eBooks, access codes, or digital content are
              non-returnable if opened or used (unless faulty).
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-red-500 h-4 w-4" /> {/* Fixed size */}
              Course notes are non-returnable.
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-red-500 h-4 w-4" /> {/* Fixed size */}
              Refunds are issued using the original payment method.
            </li>
          </ul>
        </div>

        {/* Card 2: Online Orders */}
        <div className="w-full rounded-lg bg-red-100 p-6 shadow-md dark:bg-slate-700 sm:w-1/2 lg:w-1/3">
          <h2 className="mb-4 flex items-center justify-center gap-2 text-xl font-semibold">
            <FaShoppingCart className="text-red-500" /> Online Orders
          </h2>
          <ul className="list-none space-y-2 text-left">
            <li className="flex items-start gap-2">
              <FaCheck className="text-red-500 h-4 w-4" /> {/* Fixed size */}
              Returns accepted within 14 days with the original Tax Invoice.
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-red-500 h-4 w-4" /> {/* Fixed size */}
              Items must be in mint condition.
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-red-500 h-4 w-4" /> {/* Fixed size */}
              Reason for return must be indicated on the back of the invoice.
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-red-500 h-4 w-4" /> {/* Fixed size */}
              Faulty or incorrect items are eligible for free return postage.
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-red-500 h-4 w-4" /> {/* Fixed size */}
              For other reasons, the customer covers shipping costs.
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-red-500 h-4 w-4" /> {/* Fixed size */}
              Refunds may take 1-2 billing cycles to appear in your account.
            </li>
          </ul>
        </div>
      </div>

      {/* Terms and Contact Section */}
      <div className="flex flex-wrap justify-evenly gap-6 p-8 text-center">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FaEnvelope className="text-red-500" /> Terms & Conditions
          </h2>
          <p>
            See{" "}
            <a
              href="/terms-and-conditions"
              className="cursor-pointer text-red-500 hover:underline"
            >
              terms and conditions
            </a>{" "}
            for more details about our refund policy.
          </p>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FaPhoneAlt className="text-red-500" /> Contact Us
          </h2>
          <p>
            For further inquiries, please reach out to our customer service
            team.
          </p>
        </div>
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <MyComponent />
    </Suspense>
  );
};

export default Page;
