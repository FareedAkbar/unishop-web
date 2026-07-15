"use client";
import React from "react";
import { StaticPageContent } from "~/components/StaticPageContent";

const MyComponent: React.FC = () => {
  return (
    <StaticPageContent
      route="/refunds-and-returns"
      headingsVariant="cards"
      lottieSrc="/assets/gifs/refund.json"
    />
  );
};

export default MyComponent;
