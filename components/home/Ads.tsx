import React from "react"

import { Icons } from "../icons"

const Ads = () => {
  return (
    <div className="w-full h-[30rem] max-md:h-auto flex max-md:flex-col-reverse bg-gradient-to-r  from-red-800 via-red-700 to-red-700 container py-10">
      <div className="w-1/2 max-md:w-full">
        <p className="text-[1.62rem] text-[#FF0010] font-semibold">
          Categories
        </p>
        <p className=" text-white text-[2.9rem] max-xl:text-[2rem] max-sm:text-[1rem] mt-3 font-semibold font-['Inter']  ">
          Celebrate Success with Memorable Graduation Gifts
        </p>
        <div className="flex gap-10 mt-5  flex-wrap">
          <div className="w-16 h-16 bg-white dark:text-black  rounded-full flex flex-col justify-center items-center">
            <p className="text-[1rem] font-bold">23</p>
            <p className="text-[0.68rem]">Days</p>
          </div>
          <div className="w-16 h-16 bg-white dark:text-black rounded-full flex flex-col justify-center items-center">
            <p className="text-[1rem] font-bold">23</p>
            <p className="text-[0.68rem]">Hours</p>
          </div>
          <div className="w-16 h-16 bg-white dark:text-black rounded-full flex flex-col justify-center items-center">
            <p className="text-[1rem] font-bold">59</p>
            <p className="text-[0.68rem]">Minutes</p>
          </div>
          <div className="w-16 h-16 bg-white dark:text-black rounded-full flex flex-col justify-center items-center">
            <p className="text-[1rem] font-bold">35</p>
            <p className="text-[0.68rem]">Seconds</p>
          </div>
        </div>
        <div className="w-36 h-12 bg-red-600 rounded-sm text-[1.375rem] mt-10 text-white flex justify-center items-center">
          Buy Now
        </div>
      </div>
      <div className="w-1/2 max-md:w-full flex justify-center items-center">
        <Icons.cap className="w-[37rem] max-md:w-[20rem] max-md:h-[20rem] max-sm:h-[10rem] h-[30rem]" />
      </div>
    </div>
  )
}

export default Ads
