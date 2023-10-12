import React from "react"
import Image from "next/image"

import { featureServiceProps } from "@/types/nav"

const ServicesFeature = ({ title, desc, image }: featureServiceProps) => {
  return (
    <div className=" flex flex-col items-center justify-center w-1/3">
      <div className="w-32 h-32  bg-slate-400 rounded-full flex justify-center items-center ">
        <div className="w-24 h-24 bg-black text-white rounded-full absolute flex justify-center items-center z-10">
          <Image src={image} alt="picture" />
        </div>
      </div>
      <div className=" h-8 text-black text-3xl pt-10 font-semibold font-['Poppins'] leading-7">
        {title}
      </div>
      <div className=" h-8  text-black text-lg pt-10  font-normal font-['Poppins'] leading-tight">
        {title}
      </div>
    </div>
  )
}

export default ServicesFeature
