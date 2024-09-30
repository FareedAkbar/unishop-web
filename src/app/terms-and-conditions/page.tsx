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
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              The owner and operator of this website is UOW Pulse ABN 28 915 832
              337.{" "}
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Use of this website is subject to these Terms of Use.
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              1. Prices are in Australia Dollars.
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              2. Please ensure the delivery address and receiver name for your
              order is accurate and complete. UOW Pulse cannot take
              responsibility for any orders that may go missing due to incorrect
              information provided by you.
            </p>

            <h2 className="relative z-20 mx-auto mt-4 font-serif text-2xl font-bold tracking-tight text-red-600 dark:text-white md:text-2xl lg:text-2xl">
              UNISHOP’S PRICE MATCH GUARANTEE
            </h2>

            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Price Match Guarantee is available on textbooks.
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              The Price Match Guarantee is applies to identical products with
              the exact ISBN, in new condition and in the same format. The
              identical product must be in stock at an Australian retailer with
              physical stores or selected Australian online book retailers.
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              UniShop will match the price of identical products immediately in
              stock at online retailers including booktopia.com.au, zookal.com
              and Amazon Australian website. The product must be lower than
              UniShop’s price once all shipping costs and any additional charges
              have been accounted for.
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              The price being matched must be inclusive to any postage charges
              which would be applied to the identical product.
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Price March Guarantee excludes peer-to-peer marketplaces (“other
              sellers on Amazon” or “fulfilled by Amazon”, and all types of Buy
              and Sell marketplaces”).
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Books that receive a price match credit cannot be returned.
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Limit one price match per title per customer.
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Not valid with any other offer.
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Clearance items are not eligible for Price Match Guarantee.
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-6 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              This policy is subject to change or refusal at management’s
              discretion.
            </p>
            <h2 className="relative z-20 mx-auto mt-4 font-serif text-2xl font-bold tracking-tight text-red-600 dark:text-white md:text-2xl lg:text-2xl">
              EXPRESS CLICK AND COLLECT
            </h2>

            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              UniShop online orders must be completed prior to 10:00am
              Australian Eastern Standard Time (AEST) or Australian Eastern
              Standard Daylight Savings Time (AESDT) - whichever is the current
              operating time zone to be eligible for Express Click & Collect
              pick-up after 2pm on the same date stock levels permitting.
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Only valid Monday - Friday. Offer excludes weekend orders.{" "}
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              To collect your click & collect order from UniShop&apos;s UOW
              Wollongong campus store, you must show a copy of your order along
              with valid personal identification at the Click & Collect counter
              located in rear of the store, Building 11 Northfields Ave,
              University of Wollongong.{" "}
            </p>

            <h2 className="relative z-20 mx-auto mt-4 font-serif text-2xl font-bold tracking-tight text-red-600 dark:text-white md:text-2xl lg:text-2xl">
              PULSE PERKS MEMBERSHIP
            </h2>

            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 underline [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Pulse Perks FREE - 10% OFF UOW Merchandise - clothing, stationary,
              gifts
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Not valid with any other offer. Excludes textbooks. No Rainchecks.
              Customer must be a current UOW Pulse Perks member to receive the
              discount offer and use their Pulse membership number in the “Apply
              Discount code” box.
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              App must be shown and logged into if applying discount in store
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 underline [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Pulse Perks VIP - 10% OFF Storewide
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Not valid with any other offer. Excludes textbooks. No Rainchecks.
              Customer must be a current UOW Pulse Perks VIP membership to
              receive the discount offer and use their Pulse membership number
              in the “Apply Discount code” box.{" "}
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              App must be shown and logged into if applying discount in store{" "}
            </p>

            <h2 className="relative z-20 mx-auto mt-4 font-serif text-2xl font-bold tracking-tight text-red-600 dark:text-white md:text-2xl lg:text-2xl">
              OVERSEAS SHIPPING AVAILABLE
            </h2>

            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              International shipping available to USA, UK, China, India, UAE,
              Singapore, Malaysia and Hong Kong.
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Items in categories UOW Merchandise, Clothing and Graduation are
              able to be shipped overseas
            </p>
            <p className="text-1xl md:text-1xl lg:text-1xl inter-var relative left-0 top-[1px] bg-clip-text bg-no-repeat pb-4 font-sans text-zinc-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              The shipping calculation goes up to 20kg. A message is displayed
              with the shipping cost that we will contact you for a difference
              if the weight is above 20kg.
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
