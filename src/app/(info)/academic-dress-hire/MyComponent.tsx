"use client";
import React, { Suspense } from "react";
import Image from "next/image";

// import { Player } from "@lottiefiles/react-lottie-player";
import {
  FaPhone,
  FaEnvelope,
  FaGraduationCap,
  FaShoppingBag,
} from "react-icons/fa";
import dynamic from "next/dynamic";

const Spinner = dynamic(() => import("~/components/spinner"), { ssr: false });
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);
const MyComponent = () => {
  return (
    <div className="min-h-screen">
      <div className="flex flex-wrap items-center justify-between bg-white p-8 pb-14 shadow-md dark:bg-slate-600 lg:px-32">
        <div className="max-w-md flex-1 text-lg">
          <div className="space-y-2">
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
        <div className="mt-8 flex w-full justify-center sm:mt-0 sm:w-auto sm:flex-shrink-0">
          <Player
            autoplay
            loop
            src="/assets/gifs/graduation.json"
            className="h-64 w-64 self-center"
          />
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative z-[5] -mt-14 flex flex-wrap justify-center gap-14 px-8 text-center lg:px-12">
        <div className="grid w-full max-w-screen-xl grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 1: Hiring & Purchasing */}
          <div className="rounded-lg bg-red-100 p-6 shadow-lg dark:bg-slate-700">
            <h2 className="mb-4 flex items-center justify-center gap-2 text-xl font-semibold">
              <FaShoppingBag size={28} className="text-red-500" />
              Hiring & Purchasing
            </h2>

            <p className="mt-4 text-center text-lg leading-relaxed text-zinc-500 dark:text-zinc-300">
              UniShop provides graduation gowns and accessories throughout the
              year. Gowns can be purchased as a beautiful keepsake of your time
              at UOW. Alternatively, if you’ve been unable to attend your
              graduation ceremony, you can hire gowns through UniShop and take
              photos with family and friends to help celebrate your amazing
              achievements!
            </p>
          </div>

          {/* Card 2: Graduation Details */}
          <div className="rounded-lg bg-red-100 p-6 shadow-lg dark:bg-slate-700">
            <h2 className="mb-4 flex items-center justify-center gap-2 text-xl font-semibold">
              <FaGraduationCap size={28} className="text-red-500" />
              Graduation Details
            </h2>

            <p className="mt-4 text-center text-lg leading-relaxed text-zinc-500 dark:text-zinc-300">
              To hire or purchase, see the Customer Service counter inside
              UniShop, use the contact details above, or purchase online.
              Academic dress may be hired throughout the year, except during
              graduation ceremony weeks, when all hire is managed by the
              University of Wollongong from Level GA, Building 11.
            </p>
          </div>
        </div>
      </div>

      {/* Image Section - Full Width */}
      <div className="mx-auto max-w-5xl space-y-20 px-4 py-14">
        {/* Hire Charges */}
        <section className="rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800">
          <div className="flex flex-col items-center justify-between md:flex-row md:gap-10">
            <div className="w-full md:w-1/2">
              <h2 className="mb-3 text-4xl font-extrabold text-red-500 dark:text-red-400">
                Hire Charges
              </h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Hire includes gown, hood, and trencher (cap) if needed.
              </p>
              <ul className="space-y-2 text-gray-800 dark:text-gray-200">
                {[
                  ["1 day hire", "$50"],
                  ["2 day hire", "$80"],
                  ["7 day hire", "$150"],
                ].map(([duration, charge], idx) => (
                  <li
                    key={idx}
                    className="flex justify-between border-b border-dotted border-gray-300 py-1 dark:border-gray-600"
                  >
                    <span>{duration}</span>
                    <span>{charge}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex w-full justify-center md:mt-0 md:w-1/2">
              <Image
                src="/assets/images/graduation_attire/cap.png"
                alt="Graduation Cap"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </section>
        {/* Purchase Pricing */}
        <section className="rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800">
          <div className="flex flex-col items-center md:flex-row md:gap-10">
            <div className="w-full md:w-1/2">
              <h2 className="mb-4 text-3xl font-bold text-red-500 dark:text-red-400">
                Purchase Graduation Gowns & Accessories
              </h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                All items can be purchased individually or as a set.
              </p>
              <ul className="space-y-2 text-gray-800 dark:text-gray-200">
                {[
                  ["Bachelor gown", "$215"],
                  ["Masters gown", "$215"],
                  ["PhD gown", "$320"],
                  ["Hood", "$105"],
                  ["Trencher (Cap)", "$60"],
                  ["PhD Bonnet", "$156"],
                ].map(([item, price], idx) => (
                  <li
                    key={idx}
                    className="flex justify-between border-b border-dotted border-gray-300 py-1 dark:border-gray-600"
                  >
                    <span>{item}</span>
                    <span>{price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex w-full justify-center md:mt-0 md:w-1/2">
              <Image
                src="/assets/images/graduation_attire/gown.png"
                alt="Graduation Cap"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </section>
        {/* Gown Size Guide */}
        <section className="rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800">
          <div className="flex flex-col items-center justify-between md:flex-row md:gap-10">
            <div className="w-full md:w-1/2">
              <h2 className="mb-3 text-4xl font-extrabold text-red-500 dark:text-red-400">
                Gown Size Guide
              </h2>
              <div className="grid grid-cols-2 gap-4 border-b border-gray-300 pb-2 text-left text-sm font-medium text-gray-800 dark:border-gray-600 dark:text-gray-200">
                <div>If You Are</div>
                <div>You Should Wear Gown Size</div>
              </div>

              <ul className="mt-2 grid grid-cols-2 gap-4 text-base text-gray-700 dark:text-gray-300">
                {[
                  [150, 110],
                  [155, 115],
                  [160, 120],
                  [165, 120],
                  [170, 125],
                  [175, 130],
                  [180, 130],
                  [185, 135],
                  [190, 140],
                ].map(([height, size], idx) => (
                  <React.Fragment key={idx}>
                    <li className="py-0.5">{height} cm</li>
                    <li className="py-0.5">{size}</li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex justify-center">
              <Image
                src="/assets/images/graduation_attire/gown.png"
                alt="Graduation Gown"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </section>
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
