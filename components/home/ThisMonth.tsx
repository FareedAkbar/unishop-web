import React from "react"

import CardProduct from "../resauble/CardProduct"

const ThisMonth = () => {
  return (
    <div className="  mt-16 ">
      <div className="flex items-center gap-5">
        <div className="w-7 h-12 relative">
          <div className="w-7 h-12 left-0 top-0 absolute bg-red-600 rounded" />
        </div>
        <div className="text-red-600 text-[0.9rem]  font-semibold font-['Poppins'] leading-tight">
          This Month
        </div>
      </div>
      <div className="flex justify-between max-md:flex-col items-center pt-5">
        <div className="text-black dark:text-white max-md:w-full text-[1rem] flex max-md:items-center max-md:justify-center  pt-5 font-semibold font-['Poppins'] ">
          Best Selling Products
        </div>
        <button className="w-48 h-10 bg-red-600 rounded-sm text-[0.9rem] max-md:mt-4 text-white flex items-center justify-center">
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
