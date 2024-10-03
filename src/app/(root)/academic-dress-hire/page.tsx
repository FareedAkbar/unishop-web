"use client";

// import Header from "~/components/header";
import { Suspense } from "react";

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
          <div className="col-span-8">
            <h2 className="relative z-20 mx-auto mt-16 font-sans text-2xl tracking-tight text-zinc-500 dark:text-white md:text-2xl lg:text-2xl">
              ENQUIRE ABOUT HIRING YOUR
            </h2>
            <h2 className="relative z-20 mx-auto mt-2 font-serif text-2xl font-bold tracking-tight text-red-600 dark:text-white md:text-2xl lg:text-2xl">
              GRADUATION ATTIRE
            </h2>

            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-2 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Phone: 4221 8050
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-2 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              or
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Email: uow-bookshop@uow.edu.au
            </p>
            <h2 className="relative z-20 mx-auto mt-4 font-sans text-2xl tracking-tight text-zinc-500 dark:text-white md:text-2xl lg:text-2xl">
              Hiring & Purchasing
            </h2>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat py-2 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Unishop provides graduation gowns and accessories throughout the
              year. Gowns can be purchased as a beautiful keepsake of your time
              at UOW. Alternatively if you have been unable to attend your
              graduation ceremony you can hire gowns through Unishop and take
              photos with family and friends to help celebrate your amazing
              achievements!
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat py-2 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              To hire or purchase, see the Customer Service counter inside
              Unishop, use contact details above or purchase online here.
              Academic dress may be hired out throughout the year, except for
              the weeks of the graduation ceremonies when all hire is carried
              out by the University of Wollongong. During such times the
              University of Wollongong will have faculty outfits available to
              hire from Level GA, Building 11.
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
