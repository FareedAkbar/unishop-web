import React from "react"

import { Icons } from "@/components/icons"

const OrderTracking = () => {
  return (
    <div>
      <Icons.trackingBg className="bg-cover object-contain -z-10 absolute  max-md:hidden " />
      <div className="container py-20 max-lg:py-5 ">
        <div className="text-black text-xl max-md:dark:text-white font-medium font-['Poppins'] leading-normal">
          Track Your Package
        </div>
        <div className="w-1/2 max-lg:w-full max-sm:text-center max-md:dark:text-white max-lg:mt-3 text-black  text-5xl max-2xl:text-3xl max-lg:text-xl max-sm:text-sm font-semibold font-['Poppins'] leading-snug">
          Find Your Shipment Items Quickly And Accurately
        </div>
        <div className="w-1/2 max-lg:mt-3 max-sm:text-justify max-md:dark:text-white max-sm:text-md max-lg:w-full mt-10 max-2xl:mt-5  text-black  text-xl font-normal font-['Poppins'] leading-normal">
          Track and find the position of your package, just enter the receipt
          number.{" "}
        </div>
        <div className="w-80 h-7 mt-16 max-2xl:mt-3  max-sm:text-sm opacity-80 text-black  text-xl font-medium font-['Poppins'] leading-normal">
          Enter Your Receipt Number
        </div>
        <div className="max-md:w-full w-1/4 h-12 border rounded-lg relative mt-3 flex items-center bg-neutral-100 max-sm:p-2 p-5">
          <input
            type="text"
            placeholder="Enter Number "
            className="w-full px-3 bg-neutral-100 outline-none dark:text-black"
          />
          <Icons.search className="dark:text-black" />
        </div>
        <button className="w-36 h-12 px-5 mt-10 max-2xl:mt-2 mb-20 max-2xl:mb-10 py-4 bg-red-600 rounded justify-center items-center gap-2.5 inline-flex">
          <div className="text-neutral-50 text-base font-medium font-['Poppins'] leading-normal">
            Track Order
          </div>
        </button>
      </div>
    </div>
  )
}

export default OrderTracking
