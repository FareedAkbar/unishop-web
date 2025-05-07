"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";
import dynamic from "next/dynamic";

import BackgroundSquares from "~/components/ui-components/BackgroundSquares";

const Spinner = dynamic(() => import("~/components/spinner"), { ssr: false });

interface Section {
  title: string;
  content: (string | string[] | [string, string])[];
}

const PrivacyPolicy: React.FC = () => {
  const sections: Section[] = [
    {
      title: "What We Collect",
      content: [
        "We may collect the following information:",
        [
          "Name",
          "Contact information including email address",
          "Demographic information such as postcode, preferences, and interests",
          "Other information relevant to customer surveys and/or offers",
        ],
      ],
    },
    {
      title: "What We Do With the Information",
      content: [
        "We require this information to understand your needs and provide better service, specifically for:",
        [
          "Internal record keeping.",
          "Improving our products and services.",
          "Sending promotional emails about new products, offers, or information you may find interesting.",
          "Contacting you for market research via email, phone, fax or mail.",
          "Customizing the website to your interests.",
        ],
      ],
    },
    {
      title: "Security",
      content: [
        "We implement suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.",
      ],
    },
    {
      title: "How We Use Cookies",
      content: [
        "Cookies help analyze web traffic and let you know when you visit a particular site. They allow web applications to respond to your preferences individually.",
        [
          "We use traffic log cookies to identify used pages for statistical analysis.",
          "Cookies do not give us access to your computer or any private data.",
          "You can choose to accept or decline cookies via browser settings.",
        ],
      ],
    },
    {
      title: "Links to Other Websites",
      content: [
        "Our website may link to other websites. We are not responsible for the privacy practices of those sites. Please review their privacy statements.",
      ],
    },
    {
      title: "Controlling Your Personal Information",
      content: [
        "You can restrict the collection/use of your personal information:",
        [
          "Check for a box on forms to opt out of direct marketing.",
          "Contact us to change your preferences at any time.",
          "We do not sell, lease or distribute your personal info without consent or legal requirement.",
          "You can request your personal data under the Data Protection Act 1998. A fee may apply.",
          "If any information we hold is incorrect, contact us to correct it promptly.",
        ],
      ],
    },
    {
      title: "List of Cookies We Collect",
      content: [
        "The table below shows the cookies we collect and what they store:",
      ],
    },
  ];

  const cookieData = [
    [
      "FORM_KEY",
      "Stores randomly generated key used to prevent forged requests.",
    ],
    ["PHPSESSID", "Your session ID on the server."],
    ["GUEST-VIEW", "Allows guests to view and edit their orders."],
    ["PERSISTENT_SHOPPING_CART", "A link to cart and viewing history info."],
    ["STF", "Info on products emailed to friends."],
    ["STORE", "The store view or language selected."],
    [
      "USER_ALLOWED_SAVE_COOKIE",
      "Indicates whether a customer allows cookies.",
    ],
    ["MAGE-CACHE-SESSID", "Facilitates caching of content on browser."],
    ["MAGE-CACHE-STORAGE", "Facilitates caching of content on browser."],
    [
      "MAGE-CACHE-STORAGE-SECTION-INVALIDATION",
      "Facilitates caching of content on browser.",
    ],
    ["MAGE-CACHE-TIMEOUT", "Facilitates caching of content on browser."],
    ["SECTION-DATA-IDS", "Facilitates caching of content on browser."],
    ["PRIVATE_CONTENT_VERSION", "Facilitates caching of content on browser."],
    ["X-MAGENTO-VARY", "Facilitates caching of content on server."],
    [
      "MAGE-TRANSLATION-FILE-VERSION",
      "Facilitates translation of content to other languages.",
    ],
    [
      "MAGE-TRANSLATION-STORAGE",
      "Facilitates translation of content to other languages.",
    ],
  ];

  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setActiveIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className="relative min-h-screen p-6 pb-20 md:p-10">
      <BackgroundSquares />

      <h1 className="mb-6 text-center text-3xl font-extrabold text-red-600">
        Privacy Policy
      </h1>

      <p className="mx-auto max-w-2xl pb-7 text-center leading-8 lg:text-lg">
        This privacy policy explains how our website uses and protects any
        information you give us. By continuing to use the website, you agree to
        the terms described below. We may update this page from time to time, so
        please check periodically.
      </p>

      <div className="mx-auto max-w-5xl">
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
              {activeIndices.includes(index) ? (
                <FaChevronUp className="text-gray-600 dark:text-gray-300" />
              ) : (
                <FaChevronDown className="text-gray-600 dark:text-gray-300" />
              )}
            </div>

            <div
              className={`mt-2 overflow-hidden rounded bg-white transition-all duration-300 ease-in-out dark:bg-slate-700 ${
                activeIndices.includes(index) ? "max-h-[2000px]" : "max-h-0"
              }`}
            >
              <div className="mt-3 px-4 pb-4 pt-1 text-gray-800 dark:text-gray-100">
                <ul className="ml-4 space-y-2">
                  {section.content.map((item, idx) =>
                    Array.isArray(item) ? (
                      <ul key={idx} className="ml-6 space-y-1">
                        {item.map((sub, i) =>
                          Array.isArray(sub) ? (
                            <li key={i} className="flex items-start gap-2">
                              <FaCheck className="mt-1 text-red-500" />
                              <strong>{sub[0]}</strong>: {sub[1]}
                            </li>
                          ) : (
                            <li key={i} className="flex items-start gap-2">
                              <FaCheck className="mt-1 text-red-500" />
                              {sub}
                            </li>
                          ),
                        )}
                      </ul>
                    ) : (
                      <li key={idx}>{item}</li>
                    ),
                  )}
                </ul>

                {/* Cookie Table */}
                {section.title === "List of Cookies We Collect" && (
                  <div className="mt-6 overflow-auto">
                    <table className="min-w-full border border-gray-300 text-sm dark:border-gray-600">
                      <thead className="bg-red-500 text-white dark:bg-red-600">
                        <tr>
                          <th className="border px-4 py-2 text-left">
                            Cookie Name
                          </th>
                          <th className="border px-4 py-2 text-left">
                            Cookie Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-slate-800">
                        {cookieData.map(([name, description], idx) => (
                          <tr
                            key={idx}
                            className={`border-t border-gray-200 dark:border-gray-700 ${
                              idx % 2 === 0
                                ? "bg-gray-50 dark:bg-slate-700"
                                : ""
                            }`}
                          >
                            <td className="px-4 py-2 font-medium text-gray-800 dark:text-white">
                              {name}
                            </td>
                            <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
                              {description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
