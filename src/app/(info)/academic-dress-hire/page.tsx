"use client";
import dynamic from "next/dynamic";


const DynamicComponentWithNoSSR = dynamic(
  () => import('./MyComponent'),
  { ssr: false }
)

const Page = () => {
  return (
    
      <DynamicComponentWithNoSSR />
   
  );
};

export default Page;
