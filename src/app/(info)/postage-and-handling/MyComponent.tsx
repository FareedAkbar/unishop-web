"use client";
import React from "react";
import { StaticPageContent } from "~/components/StaticPageContent";

const MyComponent: React.FC = () => {
  return (
    <StaticPageContent
      route="/postage-and-handling"
      headingsVariant="cards"
      lottieSrc="/assets/gifs/delivery.json"
    />
  );
};

export default MyComponent;
