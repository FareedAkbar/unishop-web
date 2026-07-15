"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { StaticPageContent } from "~/components/StaticPageContent";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const Spinner = dynamic(() => import("~/components/spinner"), { ssr: false });

const MyComponent = () => {
  return (
    <StaticPageContent
      route="/academic-dress-hire"
      headingsVariant="cards"
      lottieSrc="/assets/gifs/graduation.json"
      introChildren={
        <div className="mt-4 space-y-2">
          <p className="flex items-center justify-center lg:justify-start text-lg text-gray-500 dark:text-gray-300">
            <FaPhone className="mr-2 text-red-500" />
            <a href="tel:42218050" className="hover:text-red-500 font-medium">
              4221 8050
            </a>
          </p>
          <p className="flex items-center justify-center lg:justify-start text-lg text-gray-500 dark:text-gray-300">
            <FaEnvelope className="mr-2 text-red-500" />
            <a
              href="mailto:uow-bookshop@uow.edu.au"
              className="hover:text-red-500 font-medium"
            >
              uow-bookshop@uow.edu.au
            </a>
          </p>
        </div>
      }
    />
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
