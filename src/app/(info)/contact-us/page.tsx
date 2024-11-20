"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Player } from "@lottiefiles/react-lottie-player";
import { FaPhoneAlt, FaUserTie, FaBuilding } from "react-icons/fa";
import Spinner from "~/components/spinner";

const MapContainerComponent = dynamic(() => import("~/components/map"), {
  ssr: false,
});

const MyComponent = () => {
  return (
    <div className="bg-gray-50 pt-28 dark:bg-slate-800 lg:pt-20">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between bg-white p-8 pb-14 shadow-md dark:bg-slate-600 lg:px-32">
        <div className="max-w-md flex-1 text-lg text-gray-700">
          <h1 className="mb-2 text-3xl font-bold text-red-600">Contact Us</h1>
          <p className="text-justify dark:text-white">
            Need assistance? The UniShop team is here to provide friendly and
            personalized service from start to finish. Reach out via phone or
            email for any inquiries.
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

      <div className="relative z-[5] -mt-14 flex flex-wrap justify-center gap-14 px-8 text-center">
        <div className="w-full rounded-lg bg-red-100 p-6 shadow-md transition-all duration-300 hover:scale-105 dark:bg-slate-700 sm:w-1/2 lg:w-1/3">
          <h2 className="mb-4 flex items-center justify-center gap-2 text-xl font-semibold">
            <FaPhoneAlt className="text-red-500" /> General Enquiries
          </h2>
          <p>
            Phone:
            <a
              href="tel:42218050"
              className="pl-1 text-red-500 underline transition-colors"
            >
              4221 8050
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

        <div className="w-full rounded-lg bg-red-100 p-6 text-center shadow-md transition-all duration-300 hover:scale-105 dark:bg-slate-700 sm:w-1/2 lg:w-1/3">
          <h2 className="mb-4 flex items-center justify-center gap-2 text-xl font-semibold">
            <FaUserTie className="text-red-500" /> Specialty Enquiries
          </h2>
          <p>
            Retail Operations Manager:
            <a
              href="mailto:uow-bookshop@uow.edu.au"
              className="pl-1 text-red-500 underline transition-colors"
            >
              uow-bookshop@uow.edu.au
            </a>
          </p>
          <p>
            Events Coordinator: Anneliese Hennessy
            <a
              href="mailto:ahennessy@uow.edu.au"
              className="text-red-500 underline transition-colors"
            >
              (ahennessy@uow.edu.au)
            </a>
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="flex w-full justify-center p-8">
        <div className="z-0 w-full overflow-hidden rounded-lg border lg:w-2/3">
          <MapContainerComponent height={500} />
        </div>
      </div>

      {/* Address Section */}
      <div className="flex flex-col gap-6 p-8 text-center lg:flex-row lg:justify-evenly">
        <div className="w-full max-w-xs text-left">
          <h2 className="flex items-center gap-2 pb-2 text-lg font-semibold">
            <FaBuilding className="text-red-500" /> Postal Address
          </h2>
          <p>UniShop</p>
          <p>P.O. Box U100</p>
          <p>University of Wollongong P.O. NSW 2500</p>
        </div>
        <div className="w-full max-w-xs text-left">
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

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <MyComponent />
    </Suspense>
  );
};

export default Page;
