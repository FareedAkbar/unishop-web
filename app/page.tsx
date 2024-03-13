"use client"

import { useContext } from "react"
import { ContextApiData } from "@/context/ContextGlobal"

import { serviceFeature } from "@/config/site"
import Outlet from "@/components/Outlets/Outlet"
import Ads from "@/components/home/Ads"
import Feature from "@/components/home/Feature"
import MobileViewCategoryList from "@/components/home/MobileViewCategoryList"
import ServicesFeature from "@/components/home/ServicesFeature"
import SliderLanding from "@/components/home/SliderLanding"
import ThisMonth from "@/components/home/ThisMonth"
import Today from "@/components/home/Today"
import CategoryFilter from "@/components/resauble/CategoryFilter"

export default function IndexPage() {
  const { AllOutlets } = useContext(ContextApiData)
  return (
    <div className="  py-5 px-10 max-md:px-10 max-sm:px-5">
      {/* <div className="hidden  max-md:block">
        <MobileViewCategoryList />
      </div> */}
      <div className="flex max-md:flex-col   py-2 gap-5 pb-14">
        <div className="2xl:w-1/4 w-1/3 max-md:w-full max-md:hidden">
          <CategoryFilter />
        </div>
        <div className="w-full ">
          <SliderLanding />
        </div>
      </div>
      {/* <div className="">
        <Outlet data={AllOutlets?.data} />
      </div> */}

      <Today />
      <Ads />
      <ThisMonth />
      <Feature />
      <div className="flex justify-evenly max-md:flex-col  py-20">
        {serviceFeature.map((item) => (
          <ServicesFeature
            title={item.title}
            desc={item.desc}
            image={item.image}
          />
        ))}
      </div>
    </div>
  )
}
