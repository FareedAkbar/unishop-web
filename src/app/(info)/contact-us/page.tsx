"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Player } from "@lottiefiles/react-lottie-player";
import { FaPhoneAlt, FaEnvelope, FaUserTie, FaBuilding } from "react-icons/fa";

const MapContainerComponent = dynamic(() => import("~/components/map"), {
  ssr: false,
});

const MyComponent = () => {
  return (
    <div className="bg-gray-50 lg:pt-20 pt-28">
      {/* Header */}
      <div className="flex flex-wrap items-center lg:px-32 justify-between pb-14 bg-white p-8 shadow-md">
        <div className="max-w-md flex-1 text-lg text-gray-700">
          <h1 className="mb-2 text-3xl font-bold text-red-600">Contact Us</h1>
          <p className="text-justify">
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
            className="h-64 w-64"
          />
        </div>
      </div>

      <div className="relative z-10 -mt-14 flex flex-wrap justify-center gap-14 px-8 text-center">
        <div className="w-full rounded-lg bg-red-100  p-6 shadow-md sm:w-1/2 lg:w-1/3">
          <h2 className="mb-4 flex items-center gap-2 text-xl justify-center font-semibold">
            <FaPhoneAlt className="text-red-600" /> General Enquiries
          </h2>
          <p>Phone: 4221 8050</p>
          <p>Email: uow-bookshop@uow.edu.au</p>
        </div>

        <div className="w-full rounded-lg bg-red-100 p-6 text-center shadow-md sm:w-1/2 lg:w-1/3">
          <h2 className="mb-4 flex items-center justify-center gap-2 text-xl font-semibold">
            <FaUserTie className="text-red-600" /> Specialty Enquiries
          </h2>
          <p>Retail Operations Manager: uow-bookshop@uow.edu.au</p>
          <p>Events Coordinator: Anneliese Hennessy (ahennessy@uow.edu.au)</p>
        </div>
      </div>

      {/* Map Section */}
      <div className="flex justify-center w-full p-8">
        <div className="overflow-hidden rounded-lg border w-full z-0 lg:w-2/3">
          <MapContainerComponent height={500} />
        </div>
      </div>

      {/* Address Section */}
      <div className=" flex flex-wrap justify-evenly gap-6 p-8 text-center">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FaBuilding className="text-red-600" /> Postal Address
          </h2>
          <p>UniShop</p>
          <p>P.O. Box U100</p>
          <p>University of Wollongong P.O. NSW 2500</p>
        </div>
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FaBuilding className="text-red-600" /> Delivery Address
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
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
};

export default Page;
