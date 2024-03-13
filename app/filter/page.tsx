"use client"

import React, { useContext } from "react"
import { ContextApiData } from "@/context/ContextGlobal"

import FilterCard from "@/components/filter/FilterCard"
import { Icons } from "@/components/icons"
import ProductCardPaginate from "@/components/resauble/ProductCardPaginate"

const Page = () => {
  const { data } = useContext(ContextApiData)

  return (
    <div className="px-10">
      <div className="flex max-md:w-full items-center max-sm:hidden pt-3">
        <div className="h-4 justify-start items-center gap-1 inline-flex">
          <div className="text-black dark:text-white text-opacity-60 font-normal text-[1rem] font-['Poppins']">
            Home
          </div>
          <Icons.chevronRight className="w-5 h-5" />
        </div>
        <div className="h-4 justify-start items-center gap-1 inline-flex">
          <div className="text-black dark:text-white text-opacity-60 font-normal text-[1rem] font-['Poppins']">
            Text Books
          </div>
          <Icons.chevronRight className="w-5 h-5" />
        </div>
        <div className="text-black text-[1rem] dark:text-white font-normal font-['Poppins']">
          Engineering and Information Sciences EIS
        </div>
      </div>

      <div className="flex pt-5 max-md:flex-col max-md:items-center gap-5">
        <div className="py-5 mt-5">
          <FilterCard />
        </div>
        <div className="flex flex-wrap w-full  justify-center items-center">
          <div className="flex flex-wrap font-['Poppins'] justify-center gap-0 items-center overflow-hidden">
            <ProductCardPaginate data={data?.data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
