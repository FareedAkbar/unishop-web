import React from "react"

import CardProduct from "../resauble/CardProduct"

const ThisMonth = () => {
  return (
    <div className="  mt-16 ">
      <div className="flex items-center gap-5">
        <div className="w-7 h-16 relative">
          <div className="w-7 h-16 left-0 top-0 absolute bg-red-600 rounded" />
        </div>
        <div className="text-red-600 text-3xl max-sm:text-xl font-semibold font-['Poppins'] leading-tight">
          This Month
        </div>
      </div>
      <div className="flex justify-between max-md:flex-col items-center pt-5">
        <div className="text-black max-md:w-full max-md:text-4xl max-sm:text-lg flex max-md:items-center max-md:justify-center text-5xl pt-5 font-semibold font-['Inter'] leading-10 tracking-widest">
          Best Selling Products
        </div>
        <button className="w-48 h-16 bg-red-600 rounded-sm text-[1.375rem] max-md:mt-4 text-white flex items-center justify-center">
          View All
        </button>
      </div>
      <div className="flex justify-evenly flex-wrap overflow-hidden w-full mt-16 ">
        {[1, 2, 3, 4].map((item) => (
          <CardProduct />
        ))}
      </div>
    </div>
  )
}

export default ThisMonth
