"use client";
import React, { Suspense } from "react";

import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";
import dynamic from "next/dynamic";
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);
const Spinner = dynamic(() => import("~/components/spinner"), { ssr: false });

const TermsAndConditions = () => {
  const sections = [
    {
      title: "Unishop’s price match guarantee",
      content: [
        "Price Match Guarantee is available on textbooks.",
        "The Price Match Guarantee applies to identical products with the exact ISBN, in new condition, and in the same format. The identical product must be in stock at an Australian retailer with physical stores or selected Australian online book retailers.",
        "UniShop will match the price of identical products immediately in stock at online retailers including booktopia.com.au, zookal.com, and the Amazon Australian website. The product must be lower than UniShop’s price once all shipping costs and any additional charges have been accounted for.",
        "The price being matched must be inclusive of any postage charges which would be applied to the identical product.",
        "Price Match Guarantee excludes peer-to-peer marketplaces (like other sellers on Amazon or fulfilled by Amazon, and all types of Buy and Sell marketplaces).",
        "Books that receive a price match credit cannot be returned.",
        "Limit one price match per title per customer.",
        "Not valid with any other offer.",
        "Clearance items are not eligible for Price Match Guarantee.",
        "This policy is subject to change or refusal at management’s discretion.",
      ],
    },
    {
      title: "Express click and collect",
      content: [
        "Get your items faster with Express Click and Collect.",
        "Shop online and pick up your order at your nearest UniShop store.",
        "Orders placed before 12:00 PM will be ready for pickup the same day.",
        "Bring your order confirmation email and a valid ID for collection.",
      ],
    },
    {
      title: "Pulse perks membership",
      content: [
        "Join the Pulse Perks membership program for exclusive discounts.",
        "Members receive additional points on every purchase.",
        "Enjoy birthday rewards and special offers throughout the year.",
        "Sign up today and start saving!",
      ],
    },
    {
      title: "Overseas shipping available",
      content: [
        "We offer overseas shipping for select items.",
        "Check the product details to see if it qualifies for international delivery.",
        "Shipping rates vary by destination and weight of the items.",
        "Contact our support team for assistance with overseas orders.",
      ],
    },
  ];

  const [openSections, setOpenSections] = useState<boolean[]>(
    Array(sections.length).fill(false),
  );

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen)),
    );
  };

  return (
    <div className="relative min-h-screen p-8">
      {/* Background Lottie Animation */}
      {/* Page Header */}
      <h1 className="mb-6 text-center text-3xl font-extrabold text-red-600">
        Terms and Conditions
      </h1>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 pb-7 lg:flex-row">
        {/* Animation on the Left (or Top on small screens) */}
        <div className="flex w-full justify-center lg:w-1/3 lg:justify-start">
          <Player
            autoplay
            loop
            src="/assets/gifs/terms.json"
            className="h-48 w-48 scale-110 md:h-64 md:w-64"
          />
        </div>

        {/* Content on the Right (or Bottom on small screens) */}
        <article className="w-full text-center leading-8 lg:w-2/3 lg:text-left">
          <p className="mb-4">
            <strong>Owner and Operator:</strong> The owner and operator of this
            website is <span>UOW Pulse</span> (ABN 28 915 832 337). Use of this
            website is subject to these <a href="#">Terms of Use</a>.
          </p>

          <ul className="list-none space-y-2 text-left">
            <li className="flex items-start">
              <FaCheck className="mr-2 mt-2 h-4 w-4 flex-shrink-0 text-red-500" />
              Prices are in Australian Dollars (AUD).
            </li>
            <li className="flex items-start">
              <FaCheck className="mr-2 mt-2 h-4 w-4 flex-shrink-0 text-red-500" />
              Please ensure the delivery address and receiver name for your
              order are accurate and complete.
            </li>
            <li className="flex items-start">
              <FaCheck className="mr-2 mt-2 h-4 w-4 flex-shrink-0 text-red-500" />
              UOW Pulse cannot take responsibility for any orders that may go
              missing due to incorrect information provided by you.
            </li>
          </ul>
        </article>
      </div>

      {/* Collapsible Sections */}
      <div className="mx-auto max-w-4xl">
        {sections.map((section, index) => (
          <div
            key={index}
            className="mb-4 rounded-lg bg-red-100 p-5 shadow-lg dark:bg-slate-800"
          >
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => toggleSection(index)}
            >
              <h2 className="text-xl font-semibold text-red-600">
                {section.title}
              </h2>
              {openSections[index] ? (
                <FaChevronUp className="text-gray-600 dark:text-gray-300" />
              ) : (
                <FaChevronDown className="text-gray-600 dark:text-gray-300" />
              )}
            </div>

            {/* Section Content with Animation */}
            <div
              className={`mt-2 overflow-hidden rounded bg-white transition-all duration-300 ease-in-out dark:bg-slate-700 ${
                openSections[index] ? "max-h-full" : "max-h-0"
              }`}
            >
              <ul className="ml-2 mt-2 py-2 pr-1 text-sm lg:ml-6">
                {section.content.map((item, idx) => (
                  <li
                    key={idx}
                    className="mb-1 flex items-start text-gray-700 dark:text-white"
                  >
                    <FaCheck className="mr-2 mt-2 h-3 w-3 flex-shrink-0 text-red-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <TermsAndConditions />
    </Suspense>
  );
};

export default Page;
