"use client"

import React, { useContext, useEffect, useState } from "react"
import { ContextApiData } from "@/context/ContextGlobal"

import CardProduct from "@/components/resauble/CardProduct"
import CardWishlist from "@/components/wishlist/CardWishlist"

const Wishlist = () => {
  const [WishlistData, setWishlistData] = useState([])
  const { data } = useContext(ContextApiData)

  useEffect(() => {
    // Get the cart data from localStorage
    const existingWishlistData = localStorage.getItem("wishlist")
    if (existingWishlistData) {
      const parsedWishlistData = JSON.parse(existingWishlistData)
      setWishlistData(parsedWishlistData)
    }
  }, [])
  return (
    <div className=" px-10 py-5 overflow-hidden">
      <div className="w-96 h-10 dark:text-white text-black text-[1rem] font-semibold font-['Poppins']">
        Favourite items
      </div>
      <div className=" w-1/2 max-lg:w-full   opacity-80 dark:text-white text-black text-[0.9rem] font-normal font-['Poppins'] leading-normal">
        Guest favourites are only saved to your device for 7 days, or until you
        clear your cache. Sign in or create an account to hang on to your picks.
      </div>
      {WishlistData.length ? (
        WishlistData?.map((item) => <CardWishlist data={item} />)
      ) : (
        <div className="text-lg font-bold text-red-600 mt-10">
          No Item in Wishlist
        </div>
      )}
      <div className="h-14 max-lg:justify-center flex w-full dark:text-white text-black max-sm:text-lg text-2xl mt-20 font-semibold font-['Poppins']">
        Similar to this Collection
      </div>
      <div className="flex pb-10 flex-wrap gap-3 justify-between max-lg:justify-center  max-sm:-ml-5">
        {data?.data?.map((item: any) => (
          <CardProduct data={item} />
        ))}
      </div>
    </div>
  )
}

export default Wishlist
