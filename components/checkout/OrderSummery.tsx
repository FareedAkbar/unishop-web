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
      </div>
    </div>
  )
}

export default OrderSummery
