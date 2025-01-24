"use client";

import dynamic from "next/dynamic";
import HomePage from "./home/page";
import { Suspense } from "react";


 const Spinner = dynamic(
  () => import('~/components/spinner'),
  { ssr: false }
)

const Page = () => {
  return (
    <div className="flex">
      <HomePage />
    </div>
  );
};

const BooksPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Page />
    </Suspense>
  );
};

export default BooksPage;
