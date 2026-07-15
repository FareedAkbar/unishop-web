"use client";
import React from "react";
import { StaticPageContent } from "~/components/StaticPageContent";

const MyComponent = () => {
  return (
    <StaticPageContent
      route="/about-us"
      headingsVariant="cards"
    />
  );
};

export default MyComponent;
