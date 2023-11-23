import React from "react"
import Link from "next/link"

import { Icons } from "@/components/icons"
import ProductCardPaginate from "@/components/resauble/ProductCardPaginate"

const FeatureFilter = () => {
  return (
    <div className=" p-5">
      <div className="relative">
        <Icons.featureTextbook className="w-full" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white text-xl font-medium font-[Poppins] leading-normal">
          Home / Featured Products
        </div>
      </div>

      <Link
        href={"/filter"}
        className="w-40 h-10 mt-5  bg-red-600 rounded-sm flex jus  text-white justify-center text-sm font-medium font-['Poppins'] items-center "
      >
        Apply Filter
      </Link>
      <div className="">
        <ProductCardPaginate />
      </div>
    </div>
  )
}

export default FeatureFilter
