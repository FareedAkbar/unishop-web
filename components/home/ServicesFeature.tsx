import React from "react"
import Image from "next/image"

import { featureServiceProps } from "@/types/nav"

const ServicesFeature = ({ title, desc, image }: featureServiceProps) => {
  return (
    <div className=" flex flex-col items-center  justify-center w-1/4 max-lg:w-full">
      <div className="w-32 h-32  bg-slate-400 max-xl:mt-10 rounded-full flex justify-center items-center ">
        <div className="w-24 h-24 bg-black  text-white rounded-full absolute flex justify-center items-center z-10">
          <Image src={image} alt="picture" />
        </div>
      </div>
      <div className=" text-center text-black dark:text-white text-3xl max-lg:text-lg pt-10 font-semibold font-['Poppins'] leading-7">
        {title}
      </div>
      <div className=" text-center  text-black dark:text-white  text-lg max-lg:text-sm pt-10  font-normal font-['Poppins'] leading-tight">
        {desc}
      </div>
    </div>
  )
}

export default ServicesFeature
