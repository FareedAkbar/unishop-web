import React from "react"
import Link from "next/link"

import { Icons } from "../icons"

const OrderSummery = () => {
  return (
    <div>
      <div className="w-full h-auto rounded-lg border border-neutral-200 p-5">
        <div className="text-black dark:text-white max-lg:text-lg text-2xl font-semibold font-['Poppins']">
          Order Summary
        </div>
        <div className="w-full h-8 justify-between items-center inline-flex">
          <div className="text-black dark:text-white text-opacity-60 text-lg max-lg:text-sm font-normal font-['Poppins']">
            Subtotal
          </div>
          <div className="text-right text-black dark:text-white text-xl max-lg:text-sm font-medium font-['Poppins']">
            $565
          </div>
        </div>
        <div className="w-full h-8 justify-between items-center inline-flex">
          <div className="text-black dark:text-white text-opacity-60 text-lg max-lg:text-sm font-normal font-['Poppins']">
            Discount (-20%)
          </div>
          <div className="text-right text-red-600 text-xl max-lg:text-sm font-medium font-['Poppins']">
            -$113
          </div>
        </div>
        <div className="w-full h-8 justify-between items-center inline-flex">
          <div className="text-black dark:text-white text-opacity-60 text-lg max-lg:text-sm font-normal font-['Poppins']">
            Delivery Fee
          </div>
          <div className="text-right text-black dark:text-white text-xl max-lg:text-sm font-medium font-['Poppins']">
            $15
          </div>
        </div>
        <div className="w-full h-9 justify-between items-center inline-flex border-t pt-3">
          <div className="text-black dark:text-white text-xl max-lg:text-sm font-normal font-['Poppins']">
            Total
          </div>
          <div className="text-right text-black dark:text-white text-xl max-lg:text-sm font-semibold font-['Poppins']">
            $467
          </div>
        </div>
        <div className="flex justify-between max-md:flex-col  items-center mt-5">
          <div className="text-black dark:text-white text-opacity-60 text-sm font-normal font-['Poppins']">
            Pulse Perks Members pay $72.86 only.
          </div>
          <button className="w-40 h-12 max-md:mt-5  bg-red-600 rounded-sm justify-center items-center gap-3 inline-flex">
            <div className="text-white text-md font-medium font-['Poppins']">
              Join Pulse Perk
            </div>
          </button>
        </div>
        <Link
          href={"/delievery"}
          className="w-full h-14 px-10 py-4 mt-5 cursor-pointer bg-red-600 rounded-sm justify-center items-center gap-3 inline-flex"
        >
          <div className="text-white text-base font-medium max-sm:text-sm font-['Poppins']">
            Go to Checkout
          </div>
          <Icons.arrowRight className="text-white" />
        </Link>
      </div>
    </div>
  )
}

export default OrderSummery
