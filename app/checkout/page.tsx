import React from "react"
import Link from "next/link"

import CartCheckOut from "@/components/checkout/CartCheckOut"
import Newsletter from "@/components/checkout/Newsletter"
import OrderSummery from "@/components/checkout/OrderSummery"
import { Icons } from "@/components/icons"

const CheckOut = () => {
  return (
    <div className="container py-5">
      <div className="flex justify-between flex-wrap max-sm:hidden  ">
        <div className="flex items-center ">
          <div className=" h-4 justify-start items-center gap-1 inline-flex">
            <div className="text-black dark:text-white  text-opacity-60 text-base  font-normal text-[1rem] font-['Poppins']">
              Home
            </div>
            <Icons.chevronRight className="w-5 h-5 " />
          </div>
          <div className=" h-4 justify-start items-center gap-1 inline-flex">
            <div className="text-black dark:text-white text-opacity-60 text-base font-normal text-[1rem] font-['Poppins']">
              UOW Mercahndise
            </div>
            <Icons.chevronRight className="w-5 h-5 " />
          </div>
          <div className="text-black dark:text-white text-opacity-60  text-base font-normal font-['Poppins']">
            Clothing
          </div>
          <Icons.chevronRight className="w-5 h-5 " />

          <div className=" h-4 justify-start items-center gap-1 inline-flex">
            <div className="text-black text-opacity-60  dark:text-white text-base font-normal text-[1rem] font-['Poppins']">
              Cart
            </div>
          </div>
          <Icons.chevronRight className="w-5 h-5 " />

          <div className=" h-4 justify-start items-center gap-1 inline-flex">
            <div className="text-black dark:text-white text-base font-normal text-[1rem] font-['Poppins']">
              Checkout
            </div>
          </div>
        </div>
      </div>
      <div className="flex max-md:flex-col">
        <div className="w-1/2 max-md:w-full">
          <div className=" text-black dark:text-white text-2xl max-lg:text-lg mt-10 font-semibold font-['Poppins']">
            Your Cart
          </div>
          <div className="   rounded-lg border  border-neutral-200">
            {[1, 2, 3, 4].map((item) => (
              <CartCheckOut />
            ))}
          </div>
        </div>
        <div className="w-1/2 flex flex-col max-md:w-full justify-center items-center  px-5">
          <div className="mt-20 max-lg:mt-8">
            <OrderSummery />
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
          <div className="w-full p-5 max-sm:p-0 max-sm:mt-5">
            <div className="w-64 h-14 dark:text-white text-black text-2xl max-lg:text-lg font-semibold font-['Poppins']">
              Optional Note
            </div>
            <textarea
              placeholder="Add an optional note to the seller."
              className="w-full h-32 rounded-lg border -mt-5 border-neutral-200 p-2 outline-none"
            />
          </div>
        </div>
      </div>
      <Newsletter />
    </div>
  )
}

export default CheckOut
