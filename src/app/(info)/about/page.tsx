"use client";

// import Header from "~/components/header";
import { Suspense } from "react";
import { CardContainer, CardItem } from "~/components/ui/3d-card";
import Image from "next/image";
import Spinner from "~/components/spinner";
const MyComponent = () => {
  // Handle add to cart

  return (
    <div className="min-h-screen">
      <main className="flex flex-col items-center justify-center pt-28"></main>
      <div className="min-2-md flex justify-center px-8">
        <div className="grid w-full max-w-screen-xl grid-cols-8 gap-4">
          <div className="col-span-12">
            <CardContainer className="inter-var w-full">
              <CardItem translateZ="100" className="mt-4 w-full">
                <Image
                  src={"/homePage/About_us.jpg"}
                  objectFit="contain"
                  className="h-auto w-full rounded-xl object-cover group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
            </CardContainer>
          </div>
          {/* Your content goes here */}
          <div className="col-span-8">
            <h2 className="relative z-20 mx-auto mt-16 font-serif text-2xl font-bold tracking-tight text-red-600 dark:text-white md:text-2xl lg:text-2xl">
              UNISHOP IS NON-FOR-PROFIT
            </h2>

            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat py-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Explore UniShop for exclusive UOW merchandise, from academic
              essentials and official gear to graduation collections. Delight in
              unique Aboriginal art, jewellery, and décor, and benefit from
              clothing sales, varied sizes, competitive prices, and free
              shipping on select items. Visit us in-store or online for an
              exceptional shopping experience.
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat py-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Enjoy convenient delivery or &apos;CLICK AND COLLECT&apos; options
              at UniShop, located on the scenic UOW campus. As a UOW Pulse
              venture, your purchases directly contribute to enriching student
              life through events, clubs, and more. Thank you for supporting the
              UOW community.{" "}
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat py-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              UniShop is a UOW Pulse business, with all proceeds from everything
              you buy going straight back to enhancing the student experience on
              campus. Whether that&apos;s through events, festivals,
              competitions or through our clubs and societies.Thank you for
              supporting the UOW campus experience.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <MyComponent />
    </Suspense>
  );
};

export default Page;
