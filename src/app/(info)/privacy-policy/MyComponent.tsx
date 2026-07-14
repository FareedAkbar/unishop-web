"use client";

import React from "react";
import { StaticPageContent } from "~/components/StaticPageContent";

const PrivacyPolicy: React.FC = () => {

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
  return (<>

    <StaticPageContent route="/privacy-policy" />
    <div className="mx-auto my-6 max-w-5xl overflow-x-auto px-4 sm:px-6 lg:px-8">
      <h3>List of cookies we used:</h3>
      <table className="w-full table-fixed border border-gray-300 py-2 text-sm dark:border-gray-600">
        <thead className="bg-red-500 text-white dark:bg-red-600">
          <tr>
            <th className="border px-2 py-1 text-left md:px-4 md:py-2">
              Cookie Name
            </th>
            <th className="border px-2 py-1 text-left md:px-4 md:py-2">
              Cookie Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800">
          {cookieData.map(([name, description], idx) => (
            <tr
              key={idx}
              className={`border-t border-gray-200 dark:border-gray-700 ${idx % 2 === 0
                ? "bg-gray-50 dark:bg-slate-700"
                : ""
                }`}
            >
              <td className="break-words px-2 py-1 font-medium text-gray-800 dark:text-white md:px-4 md:py-2">
                {name}
              </td>
              <td className="px-2 py-1 text-gray-700 dark:text-gray-300 md:px-4 md:py-2">
                {description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>);
};

export default PrivacyPolicy;
