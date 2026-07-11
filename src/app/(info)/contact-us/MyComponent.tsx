"use client";
import React from "react";
import dynamic from "next/dynamic";
import {
  StaticPageCards,
  StaticPageHeader,
  StaticPageImages,
  useStaticPage,
} from "~/components/StaticPageContent";
import { FaBuilding, FaPhoneAlt, FaUserTie } from "react-icons/fa";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);

const MapContainerComponent = dynamic(() => import("~/components/map"), {
  ssr: false,
});

const MyComponent = () => {
  const { page, loading } = useStaticPage("/contact-us");

  return (
    <div className="bg-gray-50 dark:bg-slate-800">
      <div className="flex flex-wrap items-center justify-between bg-white p-8 pb-14 shadow-md dark:bg-slate-600 lg:px-32">
        <div className="max-w-md flex-1 text-lg text-gray-700">
          {!loading && page && <StaticPageHeader page={page} />}
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
      <div className="container mx-auto space-y-12 px-4 py-8">
        {!loading && page && (
          <>
            <div className="-mt-16 flex flex-wrap justify-center gap-8">
              <StaticPageCards page={page} />
            </div>
            <StaticPageImages page={page} />
          </>
        )}
              <div className="-mt-16 flex flex-wrap justify-center gap-8">
                {/* Card 1 */}
                <div className="w-full rounded-lg bg-red-100 p-6 text-left shadow-md transition-all duration-300 hover:scale-105 dark:bg-slate-700 sm:w-1/2 lg:w-1/3">
                  <h2 className="mb-4 flex items-center justify-center gap-2 text-xl font-semibold">
                    <FaPhoneAlt className="text-red-500" /> General/Order Enquiries
                  </h2>
                  <p>
                    Phone:
                    <a
                      href="tel:42218050"
                      className="pl-1 text-red-500 underline transition-colors"
                    >
                      (02) 4221 8050
                    </a>
                  </p>
                  <p>
                    Email:
                    <a
                      href="mailto:uow-bookshop@uow.edu.au"
                      className="pl-1 text-red-500 underline transition-colors"
                    >
                      uow-bookshop@uow.edu.au
                    </a>
                  </p>
                </div>

                {/* Card 2 */}
                <div className="w-full rounded-lg bg-red-100 p-6 text-left shadow-md transition-all duration-300 hover:scale-105 dark:bg-slate-700 sm:w-1/2 lg:w-1/3">
                  <h2 className="mb-4 flex items-center justify-center gap-2 text-xl font-semibold">
                    <FaUserTie className="text-red-500" /> Specialty Enquiries
                  </h2>
                  <p className="mb-2">
                    Retail Operations Manager / Retail, Merchandise & Branding
                    <span className="flex">
                      Yasmin Jenkin
                      <a
                        href="mailto:yjenkin@uow.edu.au"
                        className="block pl-2 text-red-500 underline transition-colors"
                      >
                        yjenkin@uow.edu.au
                      </a>
                    </span>
                  </p>
                  <p>
                    Book Buyer & Events Coordinator / Academic Liaison Officer
                    <span className="flex">
                      Anneliese Hennessy
                      <a
                        href="mailto:ahennessy@uow.edu.au"
                        className="block pl-2 text-red-500 underline transition-colors"
                      >
                        ahennessy@uow.edu.au
                      </a>
                    </span>
                  </p>
                </div>
      
            </div>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-full lg:w-2/3">
            <MapContainerComponent height={400} />
          </div>
        </div>

        {/* Address Row */}
        <div className="mx-auto w-full text-left lg:w-2/3">
          <h2 className="flex items-center gap-2 pb-2 text-lg font-semibold">
            <FaBuilding className="text-red-500" /> Delivery Address
          </h2>
          <p>UniShop</p>
          <p>2 Northfields Avenue</p>
          <p>Gwynneville NSW 2500</p>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
