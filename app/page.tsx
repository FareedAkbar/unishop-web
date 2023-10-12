import Link from "next/link"

import { catogaryList, serviceFeature, siteConfig } from "@/config/site"
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
      <div className="flex max-md:flex-col  py-5 gap-5 pb-14">
        <div className="w-1/6 max-md:w-full">
          <p className="text-[1.375rem] font-medium">Categories</p>
          {catogaryList.map((item, index) => (
            <CardCategorie name={item.name} />
          ))}
        </div>
        <div className="w-full ">
          <SliderLanding />
        </div>
      </div>
      <Today />
      <Ads />
      <ThisMonth />
      <Feature />
      <div className="flex justify-evenly py-20">
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
