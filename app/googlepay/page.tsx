import React from "react"

import ChosseMethod from "@/components/googlepay/ChosseMethod"
import { Icons } from "@/components/icons"

const page = () => {
  return (
    <div className="px-10  py-5">
      <div className=" flex   ">
        <div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full flex justify-center items-center border border-black border-opacity-40 dark:bg-white ">
                <Icons.check className="text-black text-opacity-40" />
              </div>
            </div>
            <div className="w-40 max-sm:w-20  border border-[#F0EEED]  h-0"></div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-black dark:bg-slate-800  "></div>
            </div>
            <div className="w-40 max-sm:w-20 border border-[#F0EEED]  h-0"></div>

            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full dark:bg-slate-800 bg-[#F0EEED]"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>Delivery</div>
            <div className="font-bold">Payment</div>
            <div>Review</div>
          </div>
        </div>
      </div>
      <ChosseMethod />
    </div>
  )
}

export default page
