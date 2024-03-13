import React from "react"

import { Icons } from "../icons"

const CartCheckOut = () => {
  return (
    <div className="flex gap-5 max-sm:flex-col  justify-between  mt-3 border-b py-3 px-5  ">
      <div className=" w-20  h-20 max-sm:justify-center max-sm:w-full px-6  bg-red-100 rounded-lg justify-center items-center flex">
        <Icons.hodi className="w-12 h-16" />
      </div>
      <div>
        <div className="text-black dark:text-white max-sm:text-[10px] text-md max-lg:text-sm font-semibold font-['Poppins']">
          UOW Indigenous Hoodie
        </div>
        <div>
          <span className="text-black dark:text-white text-md max-lg:text-sm font-normal font-['Poppins']">
            Size:{" "}
          </span>
          <span className="text-black dark:text-white text-opacity-60 text-md max-lg:text-sm font-normal font-['Poppins']">
            Large
          </span>
        </div>
        <div className="w-20  text-black dark:text-white text-md max-lg:text-sm font-semibold font-['Poppins']">
          $145
        </div>
      </div>
      <div className="flex flex-col max-sm:flex-row-reverse max-sm:justify-center gap-3 ">
        <div className="flex justify-end  max-sm:items-center">
          <Icons.delete className="w-5 h-5 cursor-pointer text-[#ED1C29]" />
        </div>

        <div className="w-36 px-5 py-3 bg-zinc-100 rounded-sm justify-center items-center gap-5 inline-flex">
          <Icons.plus className="w-5 h-5 cursor-pointer dark:text-black" />
          <div className="text-black text-sm font-medium font-['Poppins']">
            1
          </div>
          <Icons.minus className="w-5 h-5 cursor-pointer dark:text-black " />
        </div>
      </div>
    </div>
  )
}

export default CartCheckOut
