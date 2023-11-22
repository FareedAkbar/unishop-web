"use client"

import React, { useContext } from "react"
import { ContextApiData } from "@/context/ContextGlobal"

import ProductCardPaginate from "@/components/resauble/ProductCardPaginate"

const Page = () => {
  const { data } = useContext(ContextApiData)
  console.log("Shoping cart  ...........", data)
  return (
    <div className="px-10  max-sm:px-5">
      <ProductCardPaginate data={data?.data} />
    </div>
  )
}

export default Page
