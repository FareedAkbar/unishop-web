import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="group relative flex flex-col w-32 flex-shrink-0 p-1 sm:w-1/2 sm:p-4 md:w-1/3 lg:w-72">
      {/* Image Skeleton */}
      <div className="relative flex h-32 animate-pulse items-center justify-center rounded-sm bg-gray-200">
        <div className="absolute left-1 top-1 z-10 h-3 w-10 rounded bg-gray-300"></div>
        <div className="h-full w-full rounded-sm bg-gray-300 p-2"></div>
      </div>

      {/* Text Skeletons */}
      <div className="mt-1 h-3 w-full animate-pulse rounded bg-gray-300" style={{ width: '90%' }}></div>
      <div className="mt-1 h-3 w-full animate-pulse rounded bg-gray-300" style={{ width: '80%' }}></div>
    </div>
  );
};

export default ProductCardSkeleton;
