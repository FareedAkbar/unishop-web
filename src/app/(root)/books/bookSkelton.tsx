"use client";
import React from "react";

export default function BookSkelton() {
  return (
    <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg">
      {/* Image Placeholder */}
      <div className="relative w-full animate-pulse">
        <div className="mb-2 h-48 w-48 rounded bg-gray-200 sm:h-56 sm:w-56 lg:h-64 lg:w-64 xl:h-72 xl:w-72"></div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col items-start justify-start">
        <div className="mb-2 h-8 w-32 rounded bg-gray-200 sm:h-4 sm:w-40 lg:h-8 lg:w-48 xl:h-8 xl:w-56"></div>
        <div className="mb-2 h-4 w-32 rounded bg-gray-200 sm:h-2 sm:w-40 lg:h-4 lg:w-48 xl:h-4 xl:w-56"></div>
        <div className="mb-2 h-4 w-48 rounded bg-gray-200 sm:h-2 sm:w-56 lg:h-4 lg:w-64 xl:h-4 xl:w-72"></div>
      </div>
    </div>
  );
}
