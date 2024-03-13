import React from "react"
import Link from "next/link"

import OrderSummery from "@/components/checkout/OrderSummery"
import { Icons } from "@/components/icons"

const OrderReview = () => {
  return (
    <div className="px-10  py-5">
      <div className=" flex   ">
        <div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full flex justify-center items-center border border-black border-opacity-40 dark:bg-white ">
                <Icons.check className="text-black  text-opacity-40" />
              </div>
            </div>
            <div className="w-40 max-sm:w-20  border border-[#F0EEED]  h-0"></div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full flex justify-center items-center border border-black border-opacity-40 dark:bg-white ">
                <Icons.check className="text-black  text-opacity-40" />
              </div>
            </div>
            <div className="w-40 max-sm:w-20 border border-[#F0EEED]  h-0"></div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-black dark:bg-slate-700 dark:border-white "></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>Delivery</div>
            <div>Payment</div>
            <div className="font-bold">Review</div>
          </div>
        </div>
      </div>
      <div className="pt-20">
        <div className=" h-14 text-black dark:text-white text-3xl font-semibold font-['Poppins']">
          Please Confirm And Submit Your Order
        </div>
        <div className=" h-9 opacity-80 text-black dark:text-white text-md font-normal font-['Poppins'] leading-normal">
          You will not be charged until you review this order on the next page.
        </div>
        <div className="text-black dark:text-white text-3xl font-medium font-['Poppins'] leading-normal">
          Delivery and payment
        </div>
        <div className="mt-5 flex items-center gap-5">
          <div className="w-1/2  rounded-lg border border-neutral-200 p-5">
            <div className="flex w-full justify-between">
              <div className=" h-16 opacity-80 text-black dark:text-white text-sm font-normal font-['Poppins'] leading-relaxed">
                <div className="text-black dark:text-white text-xl font-medium font-['Poppins'] leading-normal">
                  Delivery Address
                </div>
                Building 11, University of Wollongong NSW 2522 Australia
              </div>
              <div className="w-20 h-10 px-12 py-4 bg-red-600 rounded justify-center items-center gap-2.5 inline-flex">
                <div className="text-neutral-50 text-base font-medium font-['Poppins'] leading-normal">
                  Change
                </div>
              </div>
            </div>
            <div className="flex w-full justify-between mt-3">
              <div className=" h-16 opacity-80 text-black dark:text-white text-sm font-normal font-['Poppins'] leading-relaxed">
                <div className="text-black dark:text-white text-xl font-medium font-['Poppins'] leading-normal">
                  Email address
                </div>
                Building 11, University of Wollongong NSW 2522 Australia
              </div>
              <div className="w-20 h-10 px-12 py-4 bg-red-600 rounded justify-center items-center gap-2.5 inline-flex">
                <div className="text-neutral-50 text-base font-medium font-['Poppins'] leading-normal">
                  Change
                </div>
              </div>
            </div>
            <div className="flex w-full justify-between mt-3">
              <div className=" h-16 opacity-80 text-black dark:text-white text-sm font-normal font-['Poppins'] leading-relaxed">
                <div className="text-black dark:text-white text-xl font-medium font-['Poppins'] leading-normal">
                  Payment method
                </div>
                <div className="flex w-fit p-2 items-center border">
                  <Icons.google className="w-6 h-6" />
                  <p>Pay</p>
                </div>
              </div>
              <div className="w-20 h-10 px-12 py-4 bg-red-600 rounded justify-center items-center gap-2.5 inline-flex">
                <div className="text-neutral-50 text-base font-medium font-['Poppins'] leading-normal">
                  Change
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <OrderSummery />
            <Link
              href={"/ordertracking"}
              className="w-full h-12 mt-3 px-14 py-4 bg-red-600 rounded-sm justify-center items-center gap-3 inline-flex"
            >
              <div className="text-white text-base font-medium font-['Poppins']">
                Confirm Order
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderReview
