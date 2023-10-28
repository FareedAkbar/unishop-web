"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ToastContainer, toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"
import { Icons } from "../icons"

const CardProduct = ({ data }: any) => {
  // console.log(data?.media[0]?.object_path)
  const [CheckData, setCheckData] = useState([])
  const [CheckDataWishlist, setCheckDataWishlist] = useState([])
  useEffect(() => {
    // Code inside this useEffect runs on the client side after the component has mounted.
    const existingCartData = localStorage.getItem("cart")
    const cartDataArray = existingCartData ? JSON.parse(existingCartData) : []
    setCheckData(cartDataArray)
    const existingCartDataWish = localStorage.getItem("wishlist")
    const cartDataArraywish = existingCartDataWish
      ? JSON.parse(existingCartDataWish)
      : []
    setCheckDataWishlist(cartDataArraywish)
    // Your code that uses cartDataArray goes here
  }, [])
  const handleCheck = () => {}
  const handleRemoveFromCart = (id: any) => {
    // Get the cart data from localStorage
    const existingCartData = localStorage.getItem("cart")

    // Check if cart data exists and parse it into an array
    const cartDataArray = existingCartData ? JSON.parse(existingCartData) : []

    // Use the filter method to remove the item with the specified ID
    const updatedCartData = cartDataArray.filter(
      (item: any) => item.food_id != id
    )
    // Update the cart data in both state and localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCartData)) // Update localStorage
    toast.success("Remove From Cart", {
      position: "top-right",
    })
  }
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
  const handleWishlist = (data: any) => {
    // Retrieve existing wishlist data from localStorage
    const existingWishlist = localStorage.getItem("wishlist")
    // Parse the existing data as JSON (if it exists)
    const existingWishlistArray = existingWishlist
      ? JSON.parse(existingWishlist)
      : []
    console.log(existingWishlistArray)

    // Check if the data is already in the wishlist
    const isAlreadyInWishlist = existingWishlistArray.some((item: any) => {
      // Replace the condition below with your own comparison logic
      return item.food_id === data.food_id // Example: Compare based on a specific property
    })
    console.log("exist", isAlreadyInWishlist)

    if (isAlreadyInWishlist) {
      // If it's already in the wishlist, remove it
      const updatedWishlist = existingWishlistArray.filter(
        (item: any) => item.food_id !== data.food_id
      )
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
      toast.success("Remove From Cart", {
        position: "top-right",
      })
    } else {
      // If it's not in the wishlist, add it
      const updatedWishlist = [...existingWishlistArray, data]
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
      toast.success("Add wishlist", {
        position: "top-right",
      })
    }
  }

  return (
    <div className=" h-[25rem]  relative group w-[18rem] font-['Poppins']  ">
      <ToastContainer />

      <div className="w-72 h-72  left-0 top-0 absolute bg-[#EEEEEE] rounded group-hover:opacity-90 transition-opacity">
        <div className="left-[293px] top-[12px] absolute flex-col justify-start items-start gap-2 inline-flex">
          <div className="w-8 h-8 relative right-12 cursor-pointer">
            <div
              onClick={() => handleWishlist(data)}
              className="w-8 h-8 left-0 top-0 absolute flex dark:text-black justify-center items-center bg-white rounded-full"
            >
              {CheckDataWishlist?.some(
                (item: any) => item?.food_id === data?.food_id
              ) ? (
                <Icons.heart className="text-[#ED1C29] relative z-10" />
              ) : (
                <Icons.heart className="hover:text-[#ED1C29] relative z-10" />
              )}
            </div>

            <div className="w-6 h-6 left-[5px] top-[5px] absolute" />
          </div>
          <div className="w-8 h-8 relative right-12  cursor-pointer">
            <div className="w-8 h-8 left-0 top-0 absolute bg-white rounded-full" />
            <div className="w-6 h-6 px-0.5 py-1 left-[5px]  top-[5px] absolute  justify-center items-center inline-flex">
              <div className="w-5 h-3.5 dark:text-black relative flex justify-center items-center">
                <Icons.eye className="hover:text-[#ED1C29] relative z-10" />
              </div>
            </div>
          </div>
        </div>

        {data?.discount_percentage && (
          <div className="w-14 h-7 px-3 py-1 left-[12px] top-[12px] absolute bg-[#ED1C29] rounded" />
        )}
        <div className="left-[24px] top-[17px] absolute text-neutral-50 text-sm font-normal font-['Poppins'] leading-none">
          {data?.discount_percentage}
        </div>
        {CheckData?.some((item: any) => item?.food_id === data?.food_id) ? (
          <button
            onClick={() => handleRemoveFromCart(data?.food_id)}
            className="w-72 h-10 left-0 top-[260px] text-white items-center justify-center group-hover:opacity-100 absolute group-hover:block hidden  bg-[#ED1C29] dark:bg-slate-600 rounded-bl rounded-br cursor-pointer transition-opacity"
          >
            Remove From Cart
          </button>
        ) : (
          <button
            onClick={() => handleAddCardProduct(data)}
            className="w-72 h-10 left-0 top-[260px] text-white items-center justify-center group-hover:opacity-100 absolute group-hover:block hidden  bg-black dark:bg-slate-600 rounded-bl rounded-br cursor-pointer transition-opacity"
          >
            Add To Cart
          </button>
        )}

        <Link href={`/productdetail/${data?.food_id}`}>
          {data?.media[0]?.object_path ? (
            <Image
              width={400}
              height={400}
              src={`http://192.168.18.224:3001${data.media[0].object_path}`}
              alt="product image"
              className="w-full h-full  object-cover cursor-pointer"
            />
          ) : (
            // Render a placeholder or alternative content if object_path is undefined
            <p>Image not found</p>
          )}
        </Link>
      </div>
      <div className="w-80 h-8 dark:text-white left-[3.64px] top-[311.78px] absolute text-black text-[1rem] font-medium font-['Poppins'] leading-normal">
        {data?.item_name}
      </div>
      <div className="w-36 h-8 left-[3.64px] top-[343.71px] absolute justify-start items-start gap-3 inline-flex">
        <div className="text-red-600 text-[1rem] font-medium font-['Poppins'] leading-normal">
          ${data?.price}
        </div>
        {data?.discount_amount && (
          <div className="opacity-50 dark:text-white text-black text-[1rem] font-medium font-['Poppins'] line-through leading-normal">
            ${data?.discount_amount}
          </div>
        )}
      </div>
      <div className="w-48 h-7 left-[3.64px] top-[374.70px] absolute justify-start items-start gap-2 inline-flex">
        <div className="items-center flex">
          <Icons.star className="w-[1.25rem] h-[1.25rem] text-transparent fill-[#FFAD33]" />
          <Icons.star className="w-[1.25rem] h-[1.25rem] text-transparent fill-[#FFAD33]" />
          <Icons.star className="w-[1.25rem] h-[1.25rem] text-transparent fill-[#FFAD33]" />
          <Icons.star className="w-[1.25rem] h-[1.25rem] text-transparent fill-[#FFAD33]" />
        </div>

        <div className="w-8 h-5 dark:text-white opacity-50 flex  text-black text-sm font-semibold font-['Poppins'] leading-tight  items-center">
          (88)
        </div>
      </div>
    </div>
  )
}

export default CardProduct
