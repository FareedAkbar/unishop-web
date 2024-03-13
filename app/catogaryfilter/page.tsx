"use client"

import React, { useContext } from "react"
import { ContextApiData, ContextGlobal } from "@/context/ContextGlobal"

import { Icons } from "@/components/icons"
import CategoryFilter from "@/components/resauble/CategoryFilter"
import ProductCardPaginate from "@/components/resauble/ProductCardPaginate"

const CatogaryFilter = () => {
  const { data } = useContext(ContextApiData)
  return (
    <div className=" py-5 px-10">
      <div className="flex items-center max-sm:hidden">
        <div className="text-black dark:text-white text-opacity-60 text-sm font-normal font-['Poppins']">
          Home
        </div>
        <div>
          <Icons.chevronRight className="text-black dark:text-white text-opacity-60 h-5 w-5" />
        </div>
        <div className=" text-black dark:text-white text-opacity-60 text-sm font-normal font-['Poppins']">
          UOW Mercahndise
        </div>
        <div>
          <Icons.chevronRight className="text-black dark:text-white text-opacity-60 h-5 w-5" />
        </div>
        <div className="text-black dark:text-white text-sm font-medium font-['Poppins'] leading-normal">
          Clothing
        </div>
      </div>
      <div className="flex max-md:flex-col w-full gap-10 pt-20 max-sm:pt-5">
        <div className="w-1/3 max-md:w-full mt-10">
          <CategoryFilter />
        </div>
        <div className="flex justify-between max-sm:justify-center    ">
          <ProductCardPaginate data={data?.data} />
        </div>
      </div>
    </div>
  )
}

export default CatogaryFilter
