"use client"

import React, { useContext } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ContextApiData } from "@/context/ContextGlobal"

import { Icons } from "@/components/icons"
import ProductCardPaginate from "@/components/resauble/ProductCardPaginate"

const Page = ({ params }: any) => {
  console.log(params.id)
  const { data } = useContext(ContextApiData)
  const filterData = data?.data?.filter(
    (item: any) => item?.category == params.id
  )

  const path = usePathname()

  return (
    <div className="">
      <div className="container py-5 font-['Poppins']">
        <div className="flex justify-between flex-wrap">
          <div className="flex items-center max-sm:hidden">
            <div className="h-4 justify-start items-center gap-1 inline-flex">
              <div className="text-black dark-text-white text-opacity-60 font-normal text-[1rem] font-['Poppins']">
                Home
              </div>
              <Icons.chevronRight className="w-5 h-5" />
            </div>
            <div className="h-4 justify-start items-center gap-1 inline-flex">
              <div className="text-black dark-text-white text-opacity-60 font-normal text-[1rem] font-['Poppins']">
                {path.split("/").filter(Boolean)[0]}
              </div>
              <Icons.chevronRight className="w-5 h-5" />
            </div>
          </div>
        </div>
        <Link
          href="/filter"
          className="w-40 h-10 mt-5 bg-red-600 rounded-sm flex justify-center text-white text-sm font-medium font-['Poppins'] items-center"
        >
          Apply Filter
        </Link>
        <div className="w-full">
          {filterData?.length > 0 ? (
            <ProductCardPaginate data={filterData} />
          ) : (
            <div className="flex justify-center">
              <p className="text-lg font-bold text-red-600">
                Category not found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
