import React from "react"
import Image from "next/image"

import { featureServiceProps } from "@/types/nav"

const ServicesFeature = ({ title, desc, image }: featureServiceProps) => {
  return (
    <div className=" flex flex-col items-center  justify-center w-1/4 max-lg:w-full ">
      <div className="w-24 h-24  bg-slate-400 max-xl:mt-10 rounded-full flex justify-center items-center ">
        <div className="w-20 h-20 bg-black  text-white rounded-full absolute flex justify-center items-center z-10">
          <Image src={image} alt="picture" className="w-10 h-10" />
        </div>
      </div>
      <div className=" text-center text-black dark:text-white text-[1rem] pt-5   font-semibold font-['Poppins'] ">
        {title}
      </div>
      <div className=" text-center  text-black dark:text-white  text-[0.9rem]  pt-2 font-normal font-['Poppins'] ">
        {desc}
      </div>
    </div>
  )
}

export default ServicesFeature
