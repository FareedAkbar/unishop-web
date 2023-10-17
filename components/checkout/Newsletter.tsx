import React from "react"

import { Icons } from "../icons"

const Newsletter = () => {
  return (
    <div className="w-full md:h-60 flex max-md:flex-col bg-[#F0EEED] rounded-lg p-5 ">
      <div className=" text-black text-5xl max-md:text-center max-sm:text-sm max-lg:text-4xl max-md:w-full flex items-center  font-bold font-['Poppins']  w-1/2">
        STAY UPTO DATE ABOUT OUR LATEST OFFER
      </div>
      <div className="w-1/2 max-md:w-full flex max-md:mt-5 items-center gap-5 flex-col justify-center">
        <div className=" bg-white rounded w-full h-14 px-14 max-sm:px-2   max-sm:py-2 py-4  justify-center items-center gap-3 inline-flex">
          <input
            placeholder="Enter your email address"
            className=" text-lg w-full outline-none font-medium  bg-white text-black font-['Poppins']"
          />
          <Icons.sendHorizone className="cursor-pointer" />
        </div>
        <button className="w-full h-14 max-sm:h-12 px-14 py-4 max-sm:px-0 max-sm:py-0 bg-red-600 rounded justify-center items-center flex">
          <div className="text-white text-lg max-sm:text-[14px] font-medium font-['Poppins']">
            Subscribe for Newsletter
          </div>
        </button>
      </div>
    </div>
  )
}

export default Newsletter
