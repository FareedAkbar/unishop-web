"use client"

import React from "react"

import { Icons } from "@/components/icons"
import CategoryFilter from "@/components/resauble/CategoryFilter"
import ProductCardPaginate from "@/components/resauble/ProductCardPaginate"

const CatogaryFilter = () => {
  return (
    <div className="container py-5">
      <div className="flex items-center">
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
      <div className="flex pt-20">
        <CategoryFilter />
        <div className="-mt-12">
          <ProductCardPaginate />
        </div>
      </div>
    </div>
  )
}

export default CatogaryFilter
