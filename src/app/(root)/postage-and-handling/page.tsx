"use client";

// import Header from "~/components/header";
import { Suspense } from "react";

const MyComponent = () => {
 
 

  // Handle add to cart

  return (
    <div className="min-h-screen">
     
      <div className="px-8 pt-28">
        <div className="grid grid-cols-12 gap-4">
          {/* Your content goes here */}
          <div className="col-span-8">
            <h2 className="relative z-20 mx-auto mt-16 font-serif text-2xl font-bold tracking-tight text-red-600 dark:text-white md:text-2xl lg:text-2xl">
              Delivery
            </h2>

            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-2 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Online orders will be processed within two business days stock
              levels permitting
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat py-2 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              A flat rate of $10 applies to all online orders for delivery
              within Australia.{" "}
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat py-2 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              See terms and conditions for overseas shipping.{" "}
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat py-2 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Any delivery enquiries please contact our customer service staff.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
};

export default Page;
