"use client";
import React from "react";
import dynamic from "next/dynamic";

import { FaPhoneAlt, FaUserTie, FaBuilding } from "react-icons/fa";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);

const MapContainerComponent = dynamic(() => import("~/components/map"), {
  ssr: false,
});

const MyComponent = () => {
  return (
    <div className="bg-gray-50 dark:bg-slate-800">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between bg-white p-8 pb-14 shadow-md dark:bg-slate-600 lg:px-32">
        <div className="max-w-md flex-1 text-lg text-gray-700">
          <h1 className="mb-2 text-3xl font-bold text-red-600">Contact Us</h1>
          <p className="text-justify text-sm dark:text-white md:text-base">
            The UniShop team are here to help! Providing friendly, personalised
            service to make sure you’re fully satisfied with your shopping
            experience from start to finish. Give us a call or send us an email
            if you have an enquiry.
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
      <div className="container mx-auto space-y-12 px-4 py-8">
        {/* Cards Row */}
        <div className="-mt-16 flex flex-wrap justify-center gap-8">
          {/* Card 1 */}
          <div className="w-full rounded-lg bg-red-100 p-6 text-left shadow-md transition-all duration-300 hover:scale-105 dark:bg-slate-700 sm:w-1/2 lg:w-1/3">
            <h2 className="mb-4 flex items-center justify-center gap-2 text-xl font-semibold">
              <FaPhoneAlt className="text-red-500" /> General Enquiries
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
            <p>
              Retail Operations Manager / Retail, Merchandise & Branding
              <p className="flex">
                Yasmin Jenkin
                <a
                  href="mailto:yjenkin@uow.edu.au"
                  className="block pl-2 text-red-500 underline transition-colors"
                >
                  yjenkin@uow.edu.au
                </a>
              </p>
            </p>
            <p>
              Book Buyer & Events Coordinator / Academic Liaison Officer
              <p className="flex">
                Anneliese Hennessy
                <a
                  href="mailto:ahennessy@uow.edu.au"
                  className="block pl-2 text-red-500 underline transition-colors"
                >
                  ahennessy@uow.edu.au
                </a>
              </p>
            </p>
          </div>
        </div>

        {/* Map Row */}
        <div className="flex justify-center">
          <div className="w-full overflow-hidden rounded-lg border shadow-md lg:w-2/3">
            <MapContainerComponent height={500} />
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
