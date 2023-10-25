"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ScrollAreaCorner } from "@radix-ui/react-scroll-area"

import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Icons } from "../icons"

const CartProductAdd = () => {
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    // Get the cart data from localStorage
    const existingCartData = localStorage.getItem("cart")
    if (existingCartData) {
      const parsedCartData = JSON.parse(existingCartData)
      setCartData(parsedCartData)
    }
  }, [])
  const handleRemoveFromCart = (id: any) => {
    console.log(id)
    // Get the cart data from localStorage
    const existingCartData = localStorage.getItem("cart")

    // Check if cart data exists and parse it into an array
    const cartDataArray = existingCartData ? JSON.parse(existingCartData) : []

    // Use the filter method to remove the item with the specified ID
    const updatedCartData = cartDataArray.filter(
      (item: any) => item.food_id != id
    )
    console.log("updatedCartData", updatedCartData)
    // Update the cart data in both state and localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCartData)) // Update localStorage
  }

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex">
          <Icons.ShoppingBagIcon className="dark:text-white max-sm:w-4 max-sm:h-4  hover:text-[#ED1C29] cursor-pointer" />
          {cartData?.length > 0 && (
            <div className="absolute z-10  text-[10px] w-4 flex justify-center items-center rounded-full h-4 bg-[#ED1C29] text-white">
              {cartData?.length}
            </div>
          )}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="w-72 max-sm:w-40  h-14 max-sm:h-10 text-black dark:text-white text-2xl max-sm:text-lg font-semibold font-['Poppins']">
              Your Basket
            </div>
          </SheetTitle>
          <ScrollArea className="h-screen ">
            <SheetDescription className="mb-36">
              {cartData?.map((item: any, index) => (
                <div
                  key={index}
                  className="flex gap-5 max-sm:flex-col  justify-between  mt-3 border-b py-3 px-5  "
                >
                  <div className=" w-16  h-16 max-sm:justify-center max-sm:w-full  bg-red-100 rounded-lg justify-center items-center flex">
                    {/* <Icons.hodi className="w-14  h-10" /> */}
                    {item?.media?.object_path ? (
                      <Image
                        width={400}
                        height={400}
                        src={`http://192.168.18.224:3001${item?.media[0].object_path}`}
                        alt="product image"
                        className="w-full  h-full object-cover"
                      />
                    ) : (
                      // Render a placeholder or alternative content if object_path is undefined
                      <p>Image not found</p>
                    )}
                  </div>
                  <div className="">
                    <div className="flex gap-5">
                      <div>
                        <div className="text-black dark:text-white text-md text-[0.9rem] font-semibold font-['Poppins']">
                          {item?.name}
                        </div>
                        <div>
                          <span className="text-black dark:text-white text-md text-[0.9rem] font-normal font-['Poppins']"></span>
                          <span className="text-black dark:text-white text-opacity-60 text-md text-[0.9rem] font-normal font-['Poppins']">
                            {item?.food_name}
                          </span>
                        </div>
                        <div className="w-20  text-black dark:text-white text-md text-[0.9rem] font-semibold font-['Poppins']">
                          ${item?.price}
                        </div>
                      </div>
                      <div
                        onClick={() => handleRemoveFromCart(item?.food_id)}
                        className="flex justify-end  max-sm:items-center"
                      >
                        <Icons.delete className="w-5 h-5 cursor-pointer text-[#ED1C29]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-end max-sm:flex-row-reverse max-sm:justify-center gap-3 ">
                      <div className="w-36 px-5 py-3 bg-zinc-100 rounded-sm justify-center items-center gap-5 inline-flex">
                        <Icons.plus className="w-5 h-5 cursor-pointer dark:text-black" />
                        <div className="text-black text-sm font-medium font-['Poppins']">
                          1
                        </div>
                        <Icons.minus className="w-5 h-5 cursor-pointer dark:text-black " />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className=" ">
                <div className="w-full h-auto rounded-lg border border-neutral-200 p-5">
                  <div className="w-full h-8 justify-between items-center inline-flex">
                    <div className="text-black dark:text-white text-opacity-60 text-[1rem] font-normal font-['Poppins']">
                      Subtotal
                    </div>
                    <div className="text-right text-black dark:text-white text-[1rem] font-medium font-['Poppins']">
                      $565
                    </div>
                  </div>

                  <div className="w-full h-8 justify-between items-center inline-flex">
                    <div className="text-black dark:text-white text-opacity-60 text-[1rem]  font-normal font-['Poppins']">
                      Delivery Fee
                    </div>
                    <div className="text-right text-black dark:text-white text-[1rem] font-medium font-['Poppins']">
                      $15
                    </div>
                  </div>
                  <div className="w-full h-9 justify-between items-center inline-flex border-t pt-3">
                    <div className="text-black dark:text-white text-[1rem] font-normal font-['Poppins']">
                      Total
                    </div>
                    <div className="text-right text-black dark:text-white text-[1rem] font-semibold font-['Poppins']">
                      $467
                    </div>
                  </div>
                  <button className="w-full h-12 mt-5 px-12 py-2 bg-[#ED1C29] rounded-sm justify-center items-center gap-3 inline-flex">
                    <div className="text-white text-[1rem] font-medium font-['Poppins']">
                      Confirm Order
                    </div>
                  </button>
                </div>
              </div>
            </SheetDescription>
          </ScrollArea>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default CartProductAdd
