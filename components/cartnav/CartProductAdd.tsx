"use client"

import React from "react"
import Link from "next/link"

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
  return (
    <Sheet>
      <SheetTrigger>
        <Icons.ShoppingBagIcon className="dark:text-white max-sm:w-4 max-sm:h-4  hover:text-[#ED1C29] cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="w-72 h-14 text-black dark:text-white text-2xl font-semibold font-['Poppins']">
              Your Basket
            </div>
          </SheetTitle>
          <SheetDescription>
            {[1, 2, 3, 4, 5, 1, 2, 3].map((item) => (
              <div className="flex gap-5 max-sm:flex-col  justify-between  mt-3 border-b py-3 px-5  ">
                <div className=" w-16  h-16 max-sm:justify-center max-sm:w-full px-6  bg-red-100 rounded-lg justify-center items-center flex">
                  <Icons.hodi className="w-14  h-10" />
                </div>
                <div className="">
                  <div className="flex gap-5">
                    <div>
                      <div className="text-black dark:text-white max-sm:text-[10px] text-md max-lg:text-sm font-semibold font-['Poppins']">
                        UOW Indigenous Hoodie
                      </div>
                      <div>
                        <span className="text-black dark:text-white text-md max-lg:text-sm font-normal font-['Poppins']">
                          Size:{" "}
                        </span>
                        <span className="text-black dark:text-white text-opacity-60 text-md max-lg:text-sm font-normal font-['Poppins']">
                          Large
                        </span>
                      </div>
                      <div className="w-20  text-black dark:text-white text-md max-lg:text-sm font-semibold font-['Poppins']">
                        $145
                      </div>
                    </div>
                    <div className="flex justify-end  max-sm:items-center">
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
                  <div className="text-black dark:text-white text-opacity-60 text-lg max-lg:text-sm font-normal font-['Poppins']">
                    Subtotal
                  </div>
                  <div className="text-right text-black dark:text-white text-xl max-lg:text-sm font-medium font-['Poppins']">
                    $565
                  </div>
                </div>

                <div className="w-full h-8 justify-between items-center inline-flex">
                  <div className="text-black dark:text-white text-opacity-60 text-lg max-lg:text-sm font-normal font-['Poppins']">
                    Delivery Fee
                  </div>
                  <div className="text-right text-black dark:text-white text-xl max-lg:text-sm font-medium font-['Poppins']">
                    $15
                  </div>
                </div>
                <div className="w-full h-9 justify-between items-center inline-flex border-t pt-3">
                  <div className="text-black dark:text-white text-xl max-lg:text-sm font-normal font-['Poppins']">
                    Total
                  </div>
                  <div className="text-right text-black dark:text-white text-xl max-lg:text-sm font-semibold font-['Poppins']">
                    $467
                  </div>
                </div>
                <div className="w-full h-12 mt-5 px-14 py-4 bg-red-600 rounded-sm justify-center items-center gap-3 inline-flex">
                  <div className="text-white text-base font-medium font-['Poppins']">
                    Confirm Order
                  </div>
                </div>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default CartProductAdd
