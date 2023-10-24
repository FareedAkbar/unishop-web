import React from "react"

import CardSlider from "../cardslider/CardSlider"

const Today = () => {
  return (
    <>
      {" "}
      <div className="flex items-center gap-5 ">
        <div className="w-7 h-12 relative">
          <div className="w-7 h-12 left-0 top-0 absolute bg-red-600 rounded" />
        </div>
        <div className="text-red-600 text-[0.9rem] max-sm:text-xl font-semibold font-['Poppins'] leading-tight">
          Today’s
        </div>
      </div>
      <div className=" gap-5 flex flex-col">
        <CardSlider />
      </div>
      <div className="flex justify-center  py-10">
        <button className="w-64 h-12 bg-red-600 rounded-sm text-white text-[0.9rem] font-poppins flex justify-center items-center">
          View All Products
        </button>
      </div>
    </>
  )
}

export default Today
