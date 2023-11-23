import React from "react"
import { ToastContainer, toast } from "react-toastify"

import { Icons } from "../icons"
import "react-toastify/dist/ReactToastify.css"

const FixedTable = ({ data }: any) => {
  const introducedDate = data?.introduced ? new Date(data.introduced) : null

  // Check if introducedDate is not null before formatting
  const formattedDate = introducedDate
    ? introducedDate.toISOString().split("T")[0]
    : ""
  const handleAddCardProduct = (data: any) => {
    const existingCartData = localStorage.getItem("cart")

    let cartArray = []

    if (existingCartData) {
      try {
        cartArray = JSON.parse(existingCartData)
      } catch (error) {
        console.error("Error parsing existing cart data:", error)
      }
    }

    cartArray.push(data)

    localStorage.setItem("cart", JSON.stringify(cartArray))
    toast.success("Add to Cart", {
      position: "top-right",
    })
  }
  const handleRemoveFromCart = (id: any) => {
    console.log(id)
    // Get the cart data from localStorage
    const existingCartData = localStorage.getItem("wishlist")

    // Check if cart data exists and parse it into an array
    const cartDataArray = existingCartData ? JSON.parse(existingCartData) : []

    // Use the filter method to remove the item with the specified ID
    const updatedCartData = cartDataArray.filter(
      (item: any) => item.food_id != id
    )
    console.log("updatedCartData", updatedCartData)
    // Update the cart data in both state and localStorage
    localStorage.setItem("wishlist", JSON.stringify(updatedCartData)) // Update localStorage
    toast.success("Remove From Wishlist", {
      position: "top-right",
    })
  }
  return (
    <div className="w-full overflow-x-auto mt-5">
      <ToastContainer />

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
                <div
                  onClick={() => handleRemoveFromCart(data.food_id)}
                  className="w-5 h-5 rounded-full bg-slate-200 flex justify-center items-center"
                >
                  <Icons.x className="w-3 h-3 cursor-pointer dark:text-black hover:text-[#ED1C29]" />
                </div>
                <div className="bg-slate-200 w-10">
                  <Icons.hodi />
                </div>
              </div>
            </td>
            <td className="px-6 max-lg:px-1 text-[0.9rem] max-md:text-sm py-4 text-left">
              {data?.food_name}
            </td>
            <td className="px-6 max-lg:px-1 text-[0.9rem] max-md:text-sm py-4 text-center">
              ${data?.price}
            </td>
            <td className="px-6 max-lg:px-1 text-[0.9rem] max-md:text-sm py-4 text-center">
              {formattedDate}
            </td>
            <td className="px-6 max-lg:px-1 text-[0.9rem] max-md:text-sm py-4 text-center">
              {data?.tockStatus?.quantity_check}
              <ul>
                {data?.stockStatus?.result.map((item: any) => (
                  <li>
                    <div>{item.stock_name}</div>
                  </li>
                ))}
              </ul>
            </td>
            <td className="w-16 px-3">
              <button
                onClick={() => handleAddCardProduct(data)}
                className=" font-['Poppins'] w-32 max-md:w-20 text-[1rem] text-white h-10 bg-red-600 rounded-sm"
              >
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
