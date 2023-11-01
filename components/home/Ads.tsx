import React from "react"

import { Icons } from "../icons"

const Ads = () => {
  return (
    <div className="w-full  h-auto max-md:h-auto flex max-md:flex-col-reverse bg-gradient-to-r  from-red-800 via-red-700 to-red-700 container py-10">
      <div className="w-1/2 max-md:w-full flex flex-col justify-between">
        <p className="text-[0.9rem] text-[#FF0010] font-semibold">Categories</p>
        <p className=" text-white text-3xl max-sm:text-[1rem]  mt-3 leading-normal max-md:text-center font-semibold font-['Poppins']  ">
          Celebrate Success with Memorable Graduation Gifts
        </p>
        <div className="flex gap-10 max-md:justify-between mt-5  flex-wrap">
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
        <div className="flex max-md:justify-center">
          <button className="w-36 h-12 bg-red-600 rounded-sm text-[1rem] mt-10 text-white flex justify-center items-center">
            Buy Now
          </button>
        </div>
      </div>
      <div className="w-1/2 max-md:w-full flex justify-center  items-center">
        <Icons.cap className="w-[24rem] max-md:w-[20rem] max-md:h-[20rem] max-sm:h-[10rem] h-[20rem]" />
      </div>
    </div>
  )
}

export default Ads
