"use client"

import React, { useContext, useState } from "react"
import Link from "next/link"
import { ContextApiData } from "@/context/ContextGlobal"
import { useMediaQuery } from "react-responsive"

import CardProduct from "../resauble/CardProduct"

const ThisMonth = () => {
  const { data } = useContext(ContextApiData)
  const is2xl = useMediaQuery({ minWidth: 1536 })
  const ItemPerPage = is2xl ? 6 : 4
  const [displayedCards, setDisplayedCards] = useState(ItemPerPage)

  const handleViewAll = () => {
    // Update the number of displayed cards to show all
    setDisplayedCards(data?.data?.length || 0)
  }

  return (
    <div className="mt-16">
      <div className="flex items-center gap-5">
        <div className="w-7 h-12 relative">
          <div className="w-7 h-12 left-0 top-0 absolute bg-red-600 rounded" />
        </div>
        <div className="text-red-600 text-[0.9rem] font-semibold font-['Poppins'] leading-tight">
          This Month
        </div>
      </div>
      <div className="flex justify-between max-md:flex-col items-center pt-5">
        <div className="text-black dark:text-white max-md:w-full text-[1rem] flex max-md:items-center max-md:justify-center pt-5 font-semibold font-['Poppins'] ">
          Best Selling Products
        </div>
        {data?.data?.length > displayedCards && (
          <button
            onClick={handleViewAll}
            className="w-48 h-10 bg-red-600 rounded-sm text-[0.9rem] max-md:mt-4 text-white flex items-center justify-center"
          >
            View All
          </button>
        )}
      </div>
      <div className="flex gap-4 justify-between max-md:gap-5 max-md:justify-center flex-wrap overflow-hidden w-full mt-16">
        {data?.data?.slice(0, displayedCards).map((item: any) => (
          <CardProduct data={item} key={item.id} />
        ))}
      </div>
    </div>
  )
}

export default ThisMonth
