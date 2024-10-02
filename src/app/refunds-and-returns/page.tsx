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
            <h2 className="relative z-20 mx-auto mt-16 font-serif text-2xl font-bold tracking-tight text-red-600 dark:text-white md:text-2xl lg:text-2xl">
              Refunds & Returns
            </h2>
            <h2 className="text-1xl md:text-1xl lg:text-1xl relative z-20 mx-auto pt-4 font-serif font-bold tracking-tight text-zinc-500 dark:text-white">
              In Store Returns
            </h2>

            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              UniShop will provide an exchange or credit note on Books and
              Textbooks returned within 14 days of purchase or delivery, when
              accompanied by a valid receipt. Item/s must be in saleable
              condition and shrink wrapped textbook items can only be returned
              if unopened with shrink wrap intact.
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Goods packaged with eBooks, other digital product, an access code
              and /or on-line tutorial passwords will not be accepted if
              missing, used or have a broken seal unless item is faulty.{" "}
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Course Notes purchases are not returnable. Please refer to your
              course or department administration if you have the wrong
              materials or have changed subject.{" "}
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Refunds or exchanges cannot be given for lost or stolen gift
              vouchers.
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              All refunds will be to the same tender type of original purchase.
              E.g. Cash, credit card, etc.
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-6 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              All other products sold by UniShop are non returnable unless
              faulty.
            </p>
            <h2 className="text-1xl md:text-1xl lg:text-1xl relative z-20 mx-auto font-serif font-bold tracking-tight text-zinc-500 dark:text-white">
              Online Orders
            </h2>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              UniShop will accept returns of books with a copy of the original
              Tax Invoice within 14 days of purchase. Returned items must be in
              mint condition. Please indicate the reason for your return on the
              reverse of the Tax Invoice and include this with your book return.
              Please note that it may take 1-2 billing cycles for your bank to
              post the credit to your statement.
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              If a product is returned for any reason other than it being faulty
              or not as described, the customer is liable for postage.{" "}
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
