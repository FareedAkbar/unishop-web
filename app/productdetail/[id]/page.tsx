"use client"

import { useState } from "react"

import { Icons } from "@/components/icons"
import ProductDetail from "@/components/productdetail/ProductDetail"
import Related from "@/components/productdetail/Related"

const page = ({ params }: any) => {
  console.log("oid", params)
  return (
    <div className="container py-5  ">
      <ProductDetail params={params} />
      <Related />
    </div>
  )
}

export default page
