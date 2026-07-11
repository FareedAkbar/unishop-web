"use client";
import React, { Suspense } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  StaticPageCards,
  StaticPageHeader,
  StaticPageImages,
  useStaticPage,
} from "~/components/StaticPageContent";

const Spinner = dynamic(() => import("~/components/spinner"), { ssr: false });
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);

const MyComponent = () => {
  const { page, loading } = useStaticPage("/academic-dress-hire");

  return (
    <div className="min-h-screen">
      <div className="flex flex-wrap items-center justify-between bg-white p-8 pb-14 shadow-md dark:bg-slate-600 lg:px-32">
        <div className="max-w-md flex-1 text-lg">
          {!loading && page && <StaticPageHeader page={page} />}
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

      {!loading && page && (
        <>
          <div className="relative z-[5] -mt-14 flex flex-wrap justify-center gap-14 px-8 text-center lg:px-12">
            <div className="grid w-full max-w-screen-xl grid-cols-1 gap-6 md:grid-cols-2">
              <StaticPageCards page={page} />
            </div>
          </div>
          <StaticPageImages page={page} />
        </>
      )}

      <div className="mx-auto max-w-5xl space-y-20 px-4 py-14">
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
                alt="Graduation Gown"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </section>

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
