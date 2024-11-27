"use client";

import HomePage from "./home/page";
import { Suspense } from "react";
import Spinner from "~/components/spinner";

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
