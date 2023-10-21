import React from "react"

import { Icons } from "../icons"

const FixedTable = () => {
  return (
    <div className="w-full overflow-x-auto mt-5">
      <table className="w-full border">
        <thead className="font-['Poppins']">
          <tr className="border">
            <th className="w-16"></th>
            <th className="px-6 py-3 text-[1rem] text-left">Unit Name</th>
            <th className="px-6 py-3 text-[1rem] text-center max-lg:px-2">
              Unit Price
            </th>
            <th className="px-6 py-3 text-[1rem] text-center max-lg:px-2">
              Date Added
            </th>
            <th className="px-6 py-3 text-[1rem] text-center max-lg:px-0">
              Stock Status
            </th>
            <th className="w-16"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="font-['Poppins']">
            <td className="w-20 px-3">
              <div className="flex items-center gap-3 ">
                <div className="w-5 h-5 rounded-full bg-slate-200 flex justify-center items-center">
                  <Icons.x className="w-3 h-3 cursor-pointer dark:text-black hover:text-[#ED1C29]" />
                </div>
                <div className="bg-slate-200 w-10">
                  <Icons.hodi />
                </div>
              </div>
            </td>
            <td className="px-6 max-lg:px-1 text-[0.9rem] max-md:text-sm py-4 text-left">
              Red Indigenous Coat
            </td>
            <td className="px-6 max-lg:px-1 text-[0.9rem] max-md:text-sm py-4 text-center">
              $10.99
            </td>
            <td className="px-6 max-lg:px-1 text-[0.9rem] max-md:text-sm py-4 text-center">
              October 14, 2023
            </td>
            <td className="px-6 max-lg:px-1 text-[0.9rem] max-md:text-sm py-4 text-center">
              In Stock
            </td>
            <td className="w-16 px-3">
              <button className=" font-['Poppins'] w-32 max-md:w-20 text-[1rem] text-white h-10 bg-red-600 rounded-sm">
                Add to Cart
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default FixedTable
