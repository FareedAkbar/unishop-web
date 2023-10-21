import React from "react"
import Link from "next/link"

import { Icons } from "../icons"

const CardProduct = () => {
  return (
    <div
      // href={"/productdetail"}
      className=" h-[25rem]  relative group w-[18rem] font-['Poppins'] "
    >
      <div className="w-72 h-72  left-0 top-0 absolute bg-[#EEEEEE] rounded group-hover:opacity-90 transition-opacity">
        <div className="left-[293px] top-[12px] absolute flex-col justify-start items-start gap-2 inline-flex">
          <div className="w-8 h-8 relative right-12 cursor-pointer">
            <div className="w-8 h-8 left-0 top-0 absolute flex dark:text-black justify-center items-center bg-white rounded-full">
              <Icons.heart className="hover:text-red-600 relative z-10" />
            </div>
            <div className="w-6 h-6 left-[5px] top-[5px] absolute" />
          </div>
          <div className="w-8 h-8 relative right-12  cursor-pointer">
            <div className="w-8 h-8 left-0 top-0 absolute bg-white rounded-full" />
            <div className="w-6 h-6 px-0.5 py-1 left-[5px]  top-[5px] absolute  justify-center items-center inline-flex">
              <div className="w-5 h-3.5 dark:text-black relative flex justify-center items-center">
                <Icons.eye className="hover:text-red-600 relative z-10" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-14 h-7 px-3 py-1 left-[12px] top-[12px] absolute bg-red-600 rounded" />
        <div className="left-[24px] top-[17px] absolute text-neutral-50 text-sm font-normal font-['Poppins'] leading-none">
          -45%
        </div>
        <button className="w-72 h-10 left-0 top-[260px] text-white items-center justify-center group-hover:opacity-100 absolute group-hover:block hidden  bg-black dark:bg-slate-600 rounded-bl rounded-br cursor-pointer transition-opacity">
          Add To Cart
        </button>

        <Link href={"/productdetail"}>
          <Icons.iPad className="w-[10rem] h-[11rem] left-[69px] top-[55px] absolute cursor-pointer" />
        </Link>
      </div>
      <div className="w-80 h-8 dark:text-white left-[3.64px] top-[311.78px] absolute text-black text-[1rem] font-medium font-['Poppins'] leading-normal">
        UOW Boxed Gift Pen
      </div>
      <div className="w-36 h-8 left-[3.64px] top-[343.71px] absolute justify-start items-start gap-3 inline-flex">
        <div className="text-red-600 text-[1rem] font-medium font-['Poppins'] leading-normal">
          $120
        </div>
        <div className="opacity-50 dark:text-white text-black text-[1rem] font-medium font-['Poppins'] line-through leading-normal">
          $160
        </div>
      </div>
      <div className="w-48 h-7 left-[3.64px] top-[374.70px] absolute justify-start items-start gap-2 inline-flex">
        <div className="items-center flex">
          <Icons.star className="w-[1.25rem] h-[1.25rem] text-transparent fill-[#FFAD33]" />
          <Icons.star className="w-[1.25rem] h-[1.25rem] text-transparent fill-[#FFAD33]" />
          <Icons.star className="w-[1.25rem] h-[1.25rem] text-transparent fill-[#FFAD33]" />
          <Icons.star className="w-[1.25rem] h-[1.25rem] text-transparent fill-[#FFAD33]" />
        </div>

        <div className="w-8 h-5 dark:text-white opacity-50 flex  text-black text-sm font-semibold font-['Poppins'] leading-tight  items-center">
          (88)
        </div>
      </div>
    </div>
  )
}

export default CardProduct
