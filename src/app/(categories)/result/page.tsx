"use client"
import dynamic from "next/dynamic";


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
