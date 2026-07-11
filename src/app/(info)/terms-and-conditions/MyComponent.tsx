"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { StaticPageContent } from "~/components/StaticPageContent";

const Spinner = dynamic(() => import("~/components/spinner"), { ssr: false });

const TermsAndConditions = () => {
  return (
    <StaticPageContent
      route="/terms-and-conditions"
      lottieSrc="/assets/gifs/terms.json"
    />
  );
};

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <TermsAndConditions />
    </Suspense>
  );
};

export default Page;
