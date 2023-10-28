"use client"

import React, { useContext } from "react"
import { ContextApiData } from "@/context/ContextGlobal"

import ProductCardPaginate from "@/components/resauble/ProductCardPaginate"

const Page = () => {
  const { data } = useContext(ContextApiData)

  return (
    <div className="container">
      <ProductCardPaginate data={data.data} />
    </div>
  )
}

export default Page
