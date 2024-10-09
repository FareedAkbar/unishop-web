"use client";

import { useRouter } from "next/navigation";
// import Header from "~/components/header";
import { Suspense } from "react";
import Button from "~/components/ui-components/Button";

const MyComponent = () => {
  const router = useRouter();
  // Handle add to cart

  return (
    <div className="min-h-screen">
      <div className="px-8 pt-28">
        <div className="grid grid-cols-12 gap-4">
          {/* Your content goes here */}
          <div className="col-span-8">
            <h2 className="relative z-20 mx-auto mt-16 font-serif text-2xl font-bold tracking-tight text-red-600 dark:text-white md:text-2xl lg:text-2xl">
              Order placed
            </h2>

            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-2 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Tracking Id:
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-2 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Trasaction Id:
            </p>
          </div>
        </div>
      </div>
      <Button
        title={"Go to home"}
        onClick={() => router.push("/")}
      />
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
