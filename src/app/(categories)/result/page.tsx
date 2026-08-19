"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Spinner from "~/components/spinner";

const LazyMyComponent = dynamic(() => import("./MyComponent"), {
  ssr: false,
  loading: () => <Spinner />,
});

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <LazyMyComponent />
    </Suspense>
  );
};

export default Page;
