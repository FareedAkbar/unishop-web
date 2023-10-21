import React from "react"

import CardProduct from "../resauble/CardProduct"

const Related = () => {
  return (
    <div className="pt-16">
      <div className="flex items-center gap-5 ">
        <div className="w-7 h-12 relative">
          <div className="w-7 h-12 left-0 top-0 absolute bg-red-600 rounded" />
        </div>
        <div className="text-red-600 text-[1rem]  font-semibold font-['Poppins'] leading-tight">
          Related Items
        </div>
      </div>
      <div className="flex justify-between py-10">
        {[1, 2, 3, 4].map((item) => (
          <CardProduct />
        ))}
      </div>
    </div>
  )
}

export default Related
