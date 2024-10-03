"use client";
import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg">
      {/* Image Placeholder */}
      <div className="relative w-full animate-pulse">
        <div className="mb-2 h-40 w-40 rounded bg-gray-200 sm:h-48 sm:w-48 lg:h-56 lg:w-56 xl:h-64 xl:w-64"></div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col items-start justify-start">
        <div className="mb-2 h-6 w-28 rounded bg-gray-200 sm:h-4 sm:w-36 lg:h-6 lg:w-40 xl:h-6 xl:w-48"></div>
        <div className="mb-2 h-4 w-28 rounded bg-gray-200 sm:h-2 sm:w-36 lg:h-4 lg:w-40 xl:h-4 xl:w-48"></div>
        <div className="mb-2 h-4 w-40 rounded bg-gray-200 sm:h-2 sm:w-48 lg:h-4 lg:w-52 xl:h-4 xl:w-64"></div>
      </div>
    </div>
  );
}
