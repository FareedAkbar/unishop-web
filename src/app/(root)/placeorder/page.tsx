"use client";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Spinner from "~/components/spinner";

const MyComponent = dynamic(
  () => import('./MyComponent'),
  { ssr: false }
)

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <MyComponent />
    </Suspense>
  );
};

export default Page;
