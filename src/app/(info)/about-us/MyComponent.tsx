"use client";
import React from "react";
import Image from "next/image";
import {
  StaticPageCards,
  StaticPageImages,
  useStaticPage,
} from "~/components/StaticPageContent";

const MyComponent = () => {
  const { page, loading } = useStaticPage("/about-us");

  return (
    <div className="flex flex-col items-center justify-center">
      {/* <div className="w-full max-w-screen-xl overflow-hidden rounded-xl p-5">
        <Image
          src="/assets/images/About_us.jpg"
          alt="thumbnail"
          className="h-auto w-full rounded-lg object-cover"
          width={1000}
          height={1000}
        />
      </div> */}

      {!loading && page && (
        <>
          <div className="flex w-full max-w-screen-xl flex-wrap justify-center gap-6 px-6 py-12">
            <StaticPageCards page={page} />
          </div>
          <StaticPageImages page={page} />
        </>
      )}
    </div>
  );
};

export default MyComponent;
