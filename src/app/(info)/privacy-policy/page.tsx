"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";
import { Player } from "@lottiefiles/react-lottie-player";
import BackgroundSquares from "~/components/ui-components/BackgroundSquares";

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
        "We require this information to understand your needs:",
        [
          "Internal record keeping.",
          "Improving our products and services.",
          "Sending promotional emails.",
          "Customizing the website to your interests.",
        ],
      ],
    },
    {
      title: "Security",
      content: [
        "We implement physical, electronic, and managerial procedures to ensure your information is secure.",
      ],
    },
    {
      title: "How We Use Cookies",
      content: [
        [
          "Cookies help improve the site experience by analyzing web traffic.",
          "Cookies do not give us access to your computer or private data.",
          "You can choose to accept or decline cookies in your browser settings.",
        ],
      ],
    },
  ];

  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setActiveIndices((prevIndices) =>
      prevIndices.includes(index)
        ? prevIndices.filter((i) => i !== index)
        : [...prevIndices, index],
    );
  };

  return (
    <div className="relative min-h-screen p-8 pt-32">
      {/* Background Lottie Animation */}
      {/* <div className="absolute inset-0 top-40 -z-10 opacity-20 dark:opacity-70 dark:blur-sm">
        <Player
          autoplay
          loop
          src="/assets/gifs/lists-bg.json"
          className="h-64 w-64 scale-[1.5]"
        />
      </div> */}
      <BackgroundSquares />

      {/* Page Header */}
      <h1 className="mb-6 text-center text-3xl font-extrabold text-red-600">
        Privacy Policy
      </h1>
      <p className="mx-auto max-w-2xl pb-7 text-center leading-10 lg:text-lg">
        This privacy policy outlines how the &quot;Store&quot; collects and
        protects your information while using our website. We are committed to
        safeguarding your privacy and will only use your information in
        accordance with this policy. Please review this page periodically for
        any updates.
      </p>

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
              {activeIndices.includes(index) ? (
                <FaChevronUp className="text-gray-600 dark:text-gray-300" />
              ) : (
                <FaChevronDown className="text-gray-600 dark:text-gray-300" />
              )}
            </div>

            {/* Section Content with Animation */}
            <div
              className={`mt-2 overflow-hidden rounded bg-white transition-all duration-300 ease-in-out dark:bg-slate-700 ${
                activeIndices.includes(index) ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              <ul className="ml-3 mt-2 list-disc py-2 pr-1 lg:ml-6">
                {section.content.map((item, idx) =>
                  Array.isArray(item) ? (
                    <ul key={idx} className="list-disc lg:ml-4">
                      {item.map((subItem, subIdx) =>
                        Array.isArray(subItem) ? (
                          <li key={subIdx} className="mb-1 flex items-center">
                            <FaCheck className="mr-2 h-4 w-4 text-red-500" />
                            <strong className="">{subItem[0]}:</strong>{" "}
                            {subItem[1]}
                          </li>
                        ) : (
                          <li key={subIdx} className="mb-1 flex items-center">
                            <FaCheck className="mr-2 h-4 w-4 text-red-500" />
                            {subItem}
                          </li>
                        ),
                      )}
                    </ul>
                  ) : (
                    <li
                      key={idx}
                      className="mb-1 flex items-center text-gray-700 dark:text-gray-300"
                    >
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
