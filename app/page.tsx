"use client"

import { useContext } from "react"
import Link from "next/link"
import { ContextApiData } from "@/context/ContextGlobal"
import { Divide } from "lucide-react"

import {
  catogaryList,
  catogaryListArray,
  serviceFeature,
  siteConfig,
} from "@/config/site"
import SliderTest from "@/components/cardslider/CardSlider"
import Ads from "@/components/home/Ads"
import CardCategorie from "@/components/home/CardCategorie"
import Feature from "@/components/home/Feature"
import ServicesFeature from "@/components/home/ServicesFeature"
import SliderLanding from "@/components/home/SliderLanding"
import ThisMonth from "@/components/home/ThisMonth"
import Today from "@/components/home/Today"
import CategoryFilter from "@/components/resauble/CategoryFilter"

export default function IndexPage() {
  const { data } = useContext(ContextApiData)
  console.log("first", data)
  return (
    <div className="container  py-5 gap-5">
      <div className="flex max-md:flex-col  py-2 gap-5 pb-14">
        <div className="w-1/3 max-md:w-full">
          <CategoryFilter />
        </div>
        <div className="w-full ">
          <SliderLanding />
        </div>
      </div>
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
