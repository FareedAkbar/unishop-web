
"use client";
import dynamic from "next/dynamic";
import Spinner from "~/components/spinner";

const MyComponent = dynamic(
  () => import('./MyComponent'),
  { ssr: false }
)

const Page = () => {
  return (
    
      <MyComponent />
  
  );
};

export default Page;
