"use client";

// import Header from "~/components/header";
import { Suspense } from "react";
import dynamic from "next/dynamic";
const MapContainerComponent = dynamic(() => import("~/components/map"), {
  ssr: false,
});
const MyComponent = () => {
  return (
    <div className="min-h-screen">
     
      <main className="flex flex-col items-center justify-center pt-28">
        {/* {name}
      <Button onClick={()=>ChangeName()}>change name</Button> */}
      </main>
      <div className="flex justify-center px-8">
        <div className="grid w-full max-w-screen-xl grid-cols-8 gap-4">
          {/* Your content goes here */}
          <div className="col-span-8 w-full">
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat py-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              The UniShop team are here to help! Providing friendly,
              personalised service to make sure you’re fully satisfied with your
              shopping experience from start to finish. Give us a call or send
              us an email if you have an enquiry.
            </p>
            <div className="grid w-full max-w-screen-xl grid-cols-12 gap-4">
              <div className="sm:col-span-12 md:col-span-4 lg:col-span-4  w-full">
              <h2 className="relative z-20 mx-auto mt-8 font-serif text-2xl font-bold tracking-tight text-red-600 dark:text-white md:text-2xl lg:text-2xl">
              GENERAL ENQUIRIES
            </h2>

            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pt-2 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              UniShop Phone: 4221 8050
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-2 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              UniShop Email: uow-bookshop@uow.edu.au
            </p>

            <h2 className="relative z-20 mx-auto mt-8 font-serif text-2xl font-bold tracking-tight text-red-600 dark:text-white md:text-2xl lg:text-2xl">
              SPECIALTY ENQUIRIES
            </h2>

            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pt-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Retail Operations Manager / Retail, Merchandise & Branding
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-2 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              uow-bookshop@uow.edu.au
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pt-2 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Book Buyer & Events Coordinator / Academic Liaison Officer
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-2 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Anneliese Hennessy: ahennessy@uow.edu.au
            </p>

            <h2 className="relative z-20 mx-auto mt-8 font-serif text-2xl font-bold tracking-tight text-red-600 dark:text-white md:text-2xl lg:text-2xl">
              POSTAL ADDRESS
            </h2>

            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pt-2 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              UniShop
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              P.O. Box U100
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-2 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              University of Wollongong P.O. NSW 2500
            </p>
            <h2 className="relative z-20 mx-auto mt-8 font-serif text-2xl font-bold tracking-tight text-red-600 dark:text-white md:text-2xl lg:text-2xl">
              DELIVERY ADDRESS
            </h2>

            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pt-2 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              UniShop
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              2 Northfields Avenue
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Gwynneville NSW 2500
            </p>
              </div>
              <div className=" sm:col-span-12 md:col-span-8 lg:col-span-8  w-full border rounded">
                <MapContainerComponent height={700}/>
              </div>
            </div>
            
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
