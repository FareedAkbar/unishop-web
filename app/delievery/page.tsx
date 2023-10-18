"use client"

import React from "react"
import Link from "next/link"
import { Icon } from "@radix-ui/react-select"

import { Icons } from "@/components/icons"

import BillingForm from "../../components/delievery/BillingForm"
import BillingOption from "../../components/delievery/BillingOption"

const page = () => {
  const handlePlaceOrderClick = (billingData: any) => {
    console.log("Billing data received in page:", billingData)
  }
  return (
    <div className="container  py-5">
      <div className=" flex">
        <div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-black dark:bg-white "></div>
            </div>
            <div className="w-40 max-sm:w-20  border border-[#F0EEED]  h-0"></div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#F0EEED]"></div>
            </div>
            <div className="w-40 max-sm:w-20 border border-[#F0EEED]  h-0"></div>

            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#F0EEED]"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="font-bold">Delivery</div>
            <div>Payment</div>
            <div>Review</div>
          </div>
        </div>
      </div>
      <div className="w-full h-14 text-black dark:text-white  text-4xl max-md:text-2xl mt-10 font-semibold font-['Poppins']">
        Billing Details
      </div>
      <div className="flex max-md:flex-col">
        <div className="w-1/2 max-md:w-full">
          <BillingForm />
        </div>
        <div className="w-1/2 max-md:w-full">
          <BillingOption submitBillingForm={handlePlaceOrderClick} />
          <Link href={"googlepay"} className="flex justify-center">
            <button
              onClick={handlePlaceOrderClick}
              className="w-1/2 max-lg:w-full h-14 mt-10 px-14 py-4 bg-red-600 rounded-sm justify-center items-center gap-3 inline-flex cursor-pointer"
            >
              <div className="text-neutral-50 text-xl font-medium font-['Poppins'] leading-normal">
                Place Order
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page
