import React from "react"
import Image from "next/image"

import { Icons } from "../icons"

const CardProductDetail = () => {
  return (
    <div className="pt-10">
      {" "}
      <div className="w-96 h-14  dark:text-white  text-black text-[1rem] font-semibold font-['Poppins']">
        UOW Indigenous Hoodie
      </div>
      <div className="flex justify-between max-md:flex-col max-md:gap-5 pl-8 max-sm:pl-5">
        <div className="text-black dark:text-white text-opacity-60 text-[0.9rem]  font-['Poppins'] ">
          <ul style={{ listStyleType: "disc" }}>
            <li>Red colour</li>
            <li>{`White text on left chest, left arm, and back of garment`}</li>
            <li>Zip-up hoodie with separated front pocket</li>
            <li>{`Men's and women's sizing available`}</li>
            <li>Poly/cotton</li>
          </ul>
        </div>
        <div className="w-96 max-sm:w-auto  h-52 max-sm:h-60 relative rounded border  border-black border-opacity-50">
          <div className="left-[16px] top-[24px] absolute justify-start items-center gap-4 inline-flex">
            <Image
              src={Icons.delivery}
              alt=""
              className="w-10 h-10 bg-black text-black relative max-sm:hidden"
            />
            <div className="flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="text-black text-[1rem] dark:text-white font-semibold font-['Poppins'] leading-normal">
                Free Delivery
              </div>
              <div className="text-black text-[0.9rem] dark:text-white font-medium font-['Poppins'] underline leading-none">
                Enter your postal code for Delivery Availability
              </div>
            </div>
          </div>
          <div className="left-[16px] top-[127px] dark:text-white absolute justify-start items-center gap-4 inline-flex">
            <Icons.refresh className="w-9 h-9 relative text-white max-sm:hidden bg-black " />
            <div className="flex-col justify-start items-start gap-2.5 inline-flex">
              <div className="text-black text-[1rem] dark:text-white font-semibold font-['Poppins'] leading-normal">
                Return Delivery
              </div>
              <div>
                <span className="text-black text-[0.9rem] dark:text-white font-medium font-['Poppins'] leading-none">
                  Free 30 Days Delivery Returns.{" "}
                </span>
                <span className="text-black text-sm font-medium font-['Poppins'] underline leading-none">
                  Details
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardProductDetail
