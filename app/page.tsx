"use client"

import Link from "next/link"

import {
  catogaryList,
  catogaryListArray,
  serviceFeature,
  siteConfig,
} from "@/config/site"
import { ScrollArea } from "@/components/ui/scroll-area"
import SliderTest from "@/components/cardslider/CardSlider"
import Ads from "@/components/home/Ads"
import CardCategorie from "@/components/home/CardCategorie"
import Feature from "@/components/home/Feature"
import ServicesFeature from "@/components/home/ServicesFeature"
import SliderLanding from "@/components/home/SliderLanding"
import ThisMonth from "@/components/home/ThisMonth"
import Today from "@/components/home/Today"

export default function IndexPage() {
  return (
    <div className="container  py-5 gap-5">
      <div className="flex max-md:flex-col  py-2 gap-5 pb-14">
        <ScrollArea className="w-1/5 border p-5 max-md:w-full h-[26rem]">
          <p className="text-[1.375rem] font-medium">Categories</p>
          {catogaryListArray.map((item, index) => (
            <CardCategorie
              category={item.category}
              subcategories={item.subcategories}
            />
          ))}
        </ScrollArea>
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
