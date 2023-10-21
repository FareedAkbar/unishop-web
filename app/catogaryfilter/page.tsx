"use client"

import React from "react"

import { Icons } from "@/components/icons"
import CategoryFilter from "@/components/resauble/CategoryFilter"
import ProductCardPaginate from "@/components/resauble/ProductCardPaginate"

const CatogaryFilter = () => {
  return (
    <div className="container py-5">
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
      <div className="flex max-md:flex-col w-full   pt-20 max-sm:pt-5">
        <div className="w-2/3 max-md:w-full">
          <CategoryFilter />
        </div>
        <div className="-mt-12 max-md:-mt-0 max-md:ml-0  max-sm:justify-center ml-20  flex  ">
          <ProductCardPaginate />
        </div>
      </div>
    </div>
  )
}

export default CatogaryFilter
