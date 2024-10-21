"use client";

import Image from "next/image";
import { Suspense } from "react";
import Spinner from "~/components/spinner";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  FaPhone,
  FaEnvelope,
  FaGraduationCap,
  FaShoppingBag,
} from "react-icons/fa";

const MyComponent = () => {
  return (
    <div className="min-h-screen pt-28 lg:pt-16">
      <div className="flex flex-wrap items-center justify-between bg-white p-8 pb-14 shadow-md dark:bg-slate-600 lg:px-32">
        <div className="max-w-md flex-1 text-lg">
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-semibold">
              ENQUIRE ABOUT HIRING YOUR GRADUATION ATTIRE
            </h2>
            <p className="flex items-center justify-start text-lg text-gray-500 dark:text-gray-300">
              <FaPhone className="mr-2 text-red-500" />
              <a href="tel:42218050" className="hover:text-red-500">
                4221 8050
              </a>
            </p>
            <p className="flex items-center justify-start text-lg text-gray-500 dark:text-gray-300">
              <FaEnvelope className="mr-2 text-red-500" />
              <a
                href="mailto:uow-bookshop@uow.edu.au"
                className="hover:text-red-500"
              >
                uow-bookshop@uow.edu.au
              </a>
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center sm:w-auto sm:flex-shrink-0 mt-8 sm:mt-0">
        <Player
            autoplay
            loop
            src="/assets/gifs/graduation.json"
            className="h-64 w-64 self-center"
          />
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative z-10 -mt-14 flex flex-wrap justify-center gap-14 px-8 text-center lg:px-12">
        <div className="grid w-full max-w-screen-xl grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 1: Hiring & Purchasing */}
          <div className="rounded-lg bg-red-100 p-6 shadow-lg dark:bg-slate-700">
            <h2 className="mb-4 flex items-center justify-center gap-2 text-xl font-semibold">
              <FaShoppingBag size={28} className="text-red-500" />
              Hiring & Purchasing
            </h2>

            <p className="mt-4 text-justify text-lg leading-relaxed text-zinc-500 dark:text-zinc-300">
              Unishop provides graduation gowns and accessories throughout the
              year. Gowns can be purchased as a beautiful keepsake of your time
              at UOW. If you missed your graduation ceremony, hire a gown and
              celebrate with family and friends!
            </p>
          </div>

          {/* Card 2: Graduation Details */}
          <div className="rounded-lg bg-red-100 p-6 shadow-lg dark:bg-slate-700">
            <h2 className="mb-4 flex items-center justify-center gap-2 text-xl font-semibold">
              <FaGraduationCap size={28} className="text-red-500" />
              Graduation Details
            </h2>

            <p className="mt-4 text-justify text-lg leading-relaxed text-zinc-500 dark:text-zinc-300">
              To hire or purchase graduation attire, visit the Customer Service
              counter inside Unishop or use the contact details above. Note that
              academic dress hire is limited during graduation ceremonies.
            </p>
          </div>
        </div>
      </div>

      {/* Image Section - Full Width */}
      <div className="mt-10 space-y-6">
        <Image
          src="/assets/images/graduation_attire/pricing.png"
          alt="Graduation Gown"
          className="h-auto w-full rounded-lg object-cover"
          width={1920}
          height={1080}
        />
        <Image
          src="/assets/images/graduation_attire/charges.png"
          alt="Graduation Ceremony"
          className="h-auto w-full rounded-lg object-cover"
          width={1920}
          height={1080}
        />
        <Image
          src="/assets/images/graduation_attire/sizes.png"
          alt="Graduation Event"
          className="h-auto w-full rounded-lg object-cover"
          width={1920}
          height={1080}
        />
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
