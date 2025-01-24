"use client";
import { Suspense } from "react";


import dynamic from "next/dynamic";

const MyComponent = dynamic(() => import("./MyComponent"), {
  ssr: false,
});
const Spinner = dynamic(
    () => import('~/components/spinner'),
    { ssr: false }
  )
const Page: React.FC = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <MyComponent />
    </Suspense>
  );
};

export default Page;
