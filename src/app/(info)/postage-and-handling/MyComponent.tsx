"use client";
import dynamic from "next/dynamic";
import React from "react";
import {
  StaticPageCards,
  StaticPageHeader,
  useStaticPage,
} from "~/components/StaticPageContent";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);

const MyComponent: React.FC = () => {
  const { page, loading } = useStaticPage("/postage-and-handling");

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
            src="/assets/gifs/delivery.json"
            className="h-64 w-64 scale-[1.5]"
          />
        </div>
      </div>

      {!loading && page && (
        <div className="relative z-[5] -mt-14 flex flex-wrap justify-center gap-14 px-8 text-center">
          <StaticPageCards page={page} />
        </div>
      )}
    </div>
  );
};

export default MyComponent;
