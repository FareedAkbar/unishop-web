import React from "react"

import CardProduct from "@/components/resauble/CardProduct"
import CardWishlist from "@/components/wishlist/CardWishlist"

const Wishlist = () => {
  return (
    <div className="container py-5 overflow-hidden">
      <div className="w-96 h-10 dark:text-white text-black text-2xl font-semibold font-['Poppins']">
        Favourite items
      </div>
      <div className=" w-1/2 max-lg:w-full max-sm:text-sm  opacity-80 dark:text-white text-black text-md font-normal font-['Poppins'] leading-normal">
        Guest favourites are only saved to your device for 7 days, or until you
        clear your cache. Sign in or create an account to hang on to your picks.
      </div>
      {[1, 2, 3, 4].map((item) => (
        <CardWishlist />
      ))}
      <div className="h-14 max-lg:justify-center flex w-full dark:text-white text-black max-sm:text-lg text-2xl mt-20 font-semibold font-['Poppins']">
        Similar to this Collection
      </div>
      <div className="flex pb-10 flex-wrap max-lg:justify-center max-sm:-ml-5">
        {[1, 2, 3, 4].map((item) => (
          <CardProduct />
        ))}
      </div>
    </div>
  )
}

export default Wishlist
