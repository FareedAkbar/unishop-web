import React, { useState } from "react"
import Image from "next/image"

import { Icons } from "../icons"
import CardProductDetail from "./CardProductDetail"
import Faq from "./Faq"
import Review from "./Review"

const ProductDetail = () => {
  const [renderComp, setRender] = useState("Product Detail")
  const [count, setCount] = useState(1)

  return (
    <div>
      <div>
        <div className="flex justify-between flex-wrap max-sm:hidden  ">
          <div className="flex items-center ">
            <div className=" h-4 justify-start items-center gap-1 inline-flex">
              <div className="text-black dark:text-white  text-opacity-60   font-normal text-[1rem] font-['Poppins']">
                Home
              </div>
              <Icons.chevronRight className="w-5 h-5 " />
            </div>
            <div className=" h-4 justify-start items-center gap-1 inline-flex">
              <div className="text-black dark:text-white text-opacity-60  font-normal text-[1rem] font-['Poppins']">
                UOW Mercahndise
              </div>
              <Icons.chevronRight className="w-5 h-5 " />
            </div>
            <div className="text-black dark:text-white text-opacity-60   font-normal font-['Poppins']">
              Clothing
            </div>
            <Icons.chevronRight className="w-5 h-5 " />

            <div className=" h-4 justify-start items-center gap-1 inline-flex">
              <div className="text-black dark:text-white  font-normal text-[1rem] font-['Poppins']">
                Cart
              </div>
            </div>
          </div>
        </div>
        <div className="flex pt-10 max-lg:flex-col">
          <div className="w-1/2 max-sm:flex-col-reverse max-sm:w-full max-lg:w-full max-lg:justify-center flex gap-3">
            <div className="flex flex-col max-sm:flex-row gap-3">
              <div className="bg-[#EEEEEE] flex justify-center items-center max-sm:w-auto max-sm:h-auto w-32 h-32">
                <Icons.hodi className="w-32 h-32 max-sm:w-auto max-sm:h-auto" />
              </div>
              <div className="bg-[#EEEEEE] flex justify-center items-center w-32 h-28 max-sm:w-auto max-sm:h-auto">
                <Icons.hodiBack className="w-24 h-24 max-sm:w-auto max-sm:h-auto" />
              </div>
              <div className="bg-[#EEEEEE] flex mt-2 justify-center items-center w-32 h-28 max-sm:w-auto max-sm:h-auto">
                <Icons.hodiSide className="w-32 h-20 max-sm:w-auto max-sm:h-auto" />
              </div>
            </div>
            <div className="bg-[#EEEEEE] flex justify-center items-center w-96 max-sm:w-auto max-sm:h-auto h-96">
              <Icons.hodi className="w-96  h-96 max-sm:w-auto max-sm:h-auto" />
            </div>
          </div>
          <div className="w-1/2 max-lg:w-full max-lg:mt-10">
            <div className=" text-black dark:text-white text-[1rem]  font-semibold font-['Poppins']">
              UOW Indigenous Hoodie
            </div>
            <div className="flex mt-5 max-lg:gap-10">
              <div className="flex">
                <Icons.star className="w-[1.25rem] h-[1.25rem] text-transparent fill-[#FFAD33]" />
                <Icons.star className="w-[1.25rem] h-[1.25rem] text-transparent fill-[#FFAD33]" />
                <Icons.star className="w-[1.25rem] h-[1.25rem] text-transparent fill-[#FFAD33]" />
                <Icons.star className="w-[1.25rem] h-[1.25rem] text-transparent fill-[#FFAD33]" />
              </div>
              <div>
                <span className="text-black text-[0.9rem] dark:text-white  font-bold font-['Poppins']">
                  4.5/
                </span>
                <span className="text-black dark:text-white text-[0.9rem] text-opacity-60  font-bold font-['Poppins']">
                  5
                </span>
              </div>
            </div>
            <div className="flex mt-5 items-center">
              <div className="text-black dark:text-white text-[1rem] max-sm:text-lg font-semibold font-['Poppins']">
                $260
              </div>
              <div className="text-black text-[1rem] dark:text-white text-opacity-30  max-sm:text-lg font-semibold ml-3 font-['Poppins'] line-through">
                $300
              </div>
              <div className="w-20 h-10 px-[3.5rem] py-[1.5erem] ml-5 bg-red-600 bg-opacity-10 rounded-sm justify-center items-center gap-3 inline-flex">
                <div className="text-red-600 text-[0.9rem] font-bold font-['Poppins']">
                  -40%
                </div>
              </div>
            </div>
            <div className=" mt-3 text-black dark:text-white text-opacity-60 text-[0.9rem] font-['Poppins'] ">
              Hoodie Essentials Wear Unisex Sleeve Crewneck Hoodie Oversize
              Hoodie Simple Sweatshirt Fall Winter Hoodie
            </div>
            <div className="mt-4 text-black dark:text-white text-opacity-60 text-[1rem]  font-bold font-['Poppins']">
              Select Colors
            </div>
            <div className="w-44 h-10 justify-start mt-5 items-start gap-4 inline-flex">
              <div className="w-9 h-9 relative">
                <div className="w-9 h-9 left-0 top-0 absolute bg-red-600 rounded-full cursor-pointer" />
                <Icons.check className="w-5 h-5 left-[8px] top-[10px] absolute text-white font-bold cursor-pointer" />
              </div>
              <div className="w-9 h-9 relative">
                <div className="w-9 h-9 left-0 top-0 absolute bg-gray-700 rounded-full cursor-pointer" />
                {/* <Icons.check className="w-5 h-5 left-[8px] top-[10px] absolute text-white font-bold cursor-pointer" /> */}
              </div>
              <div className="w-9 h-9 relative">
                <div className="w-9 h-9 left-0 top-0 absolute bg-gray-700 rounded-full cursor-pointer" />
                {/* <Icons.check className="w-5 h-5 left-[8px] top-[10px] absolute text-white font-bold cursor-pointer" /> */}
              </div>
            </div>

            <div className=" text-black dark:text-white mt-3 text-[0.9rem] text-opacity-60  font-bold font-['Poppins']">
              Choose Size
            </div>
            <div className="flex gap-5 max-sm:gap-1 mt-5 font-['Poppins']">
              <div className="w-10 h-9  font-bold rounded border border-black dark:border-white hover:bg-[#ED1C29] hover:border-none hover:text-white cursor-pointer border-opacity-50 flex justify-center text-[0.9rem]  items-center">
                XS
              </div>
              <div className="w-10 h-9  font-bold rounded border border-black dark:border-white hover:bg-[#ED1C29] hover:border-none hover:text-white cursor-pointer border-opacity-50 flex justify-center text-[0.9rem]  items-center">
                Xl
              </div>
              <div className="w-10 h-9  font-bold rounded border border-black dark:border-white hover:bg-[#ED1C29] hover:border-none hover:text-white cursor-pointer border-opacity-50 flex justify-center text-[0.9rem]  items-center">
                S
              </div>
              <div className="w-10 h-9  font-bold rounded border border-black dark:border-white hover:bg-[#ED1C29] hover:border-none hover:text-white cursor-pointer border-opacity-50 flex justify-center text-[0.9rem]  items-center">
                M
              </div>
              <div className="w-10 h-9  font-bold rounded border border-black dark:border-white hover:bg-[#ED1C29] hover:border-none hover:text-white cursor-pointer border-opacity-50 flex justify-center text-[0.9rem]  items-center">
                L
              </div>
            </div>
            <div className="flex max-sm:flex-col justify-between items-center">
              <div className="w-52 h-12 mt-5 px-5 py-4 dark:text-black bg-zinc-100 rounded justify-between items-center inline-flex">
                <Icons.plus
                  onClick={() => {
                    if (count < 5) {
                      setCount(count + 1)
                    }
                  }}
                  className="w-6 h-6 relative cursor-pointer hover:text-[#ED1C29]"
                />
                <div className="text-black dark:text-black  font-bold font-['Poppins']">
                  {count}
                </div>
                <Icons.minus
                  onClick={() => {
                    if (count > 1) {
                      setCount(count - 1)
                    }
                  }}
                  className="w-6 h-6 relative cursor-pointer hover:text-[#ED1C29]"
                />
              </div>
              <button className="w-64 h-12 px-14 py-4 font-['Poppins'] max-sm:mt-10 bg-red-600 cursor-pointer text-white text-[1rem] font-bold rounded justify-center items-center gap-3 inline-flex">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-10 ">
        <div
          onClick={() => setRender("Product Detail")}
          className={`w-1/4 dark:text-white text-black text-[1rem] cursor-pointer  max-md:text-sm flex-wrap flex justify-center font-semibold font-['Poppins']  ${
            renderComp === "Product Detail"
              ? "border-b border-black "
              : "text-opacity-60"
          }`}
        >
          Product Details
        </div>
        <div
          onClick={() => setRender("Review")}
          className={`w-1/4 dark:text-white text-center text-black pb-2 cursor-pointer flex justify-center   text-[1rem]  max-md:text-sm font-semibold font-['Poppins'] 
          ${
            renderComp === "Review"
              ? "border-b border-black "
              : "text-opacity-60"
          }
`}
        >
          Rating & Reviews
        </div>
        <div
          onClick={() => setRender("FAQs")}
          className={`w-1/4 dark:text-white text-right cursor-pointer text-black flex justify-center   text-[1rem]  max-md:text-sm font-semibold font-['Poppins']  ${
            renderComp === "FAQs" ? "border-b border-black " : "text-opacity-60"
          }`}
        >
          FAQs
        </div>
      </div>
      {renderComp === "Product Detail" && <CardProductDetail />}
      {renderComp === "Review" && <Review />}
      {renderComp === "FAQs" && <Faq />}
      {/* Product detail */}
      {/* <CardProductDetail /> */}
      {/* Product review */}
      {/* <Review /> */}
      {/* <Faq /> */}
    </div>
  )
}

export default ProductDetail
