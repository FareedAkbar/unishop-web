import React, { useContext, useEffect, useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { ContextApiData } from "@/context/ContextGlobal"

import { Icons } from "../icons"
import CardProductDetail from "./CardProductDetail"
import Faq from "./Faq"
import Review from "./Review"

const ProductDetail = ({ params }: any) => {
  const { data } = useContext(ContextApiData)
  // console.log("api detail", data)
  const [renderComp, setRender] = useState("Product Detail")
  const [count, setCount] = useState(1)
  // console.log("params in detail", params.id)
  const [CheckCart, setCheckCart] = useState([])
  useEffect(() => {
    // Code inside this useEffect runs on the client side after the component has mounted.
    const existingCartData = localStorage.getItem("cart")
    const cartDataArray = existingCartData ? JSON.parse(existingCartData) : []
    setCheckCart(cartDataArray)

    // Your code that uses cartDataArray goes here
  }, [])
  const singleData = data?.data?.find((item: any) => item?.food_id == params.id)
  // console.log("single data", singleData)
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
  }
  const handleRemoveFromCart = (id: any) => {
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
          <div className="w-1/2 max-sm:flex-col-reverse  max-sm:w-full max-lg:w-full max-lg:justify-center flex gap-3">
            <div className="flex flex-col max-sm:flex-row gap-3">
              <div className="bg-[#EEEEEE] flex justify-center items-center max-sm:w-auto max-sm:h-auto w-32 h-32">
                {/* <Image src={""} alt="product image" className="w-32 h-32 max-sm:w-auto max-sm:h-auto" /> */}
                {singleData?.media[0]?.object_path ? (
                  <Image
                    width={400}
                    height={400}
                    src={`http://192.168.18.224:3001${singleData?.media[0]?.object_path}`}
                    alt="product image"
                    className="w-full h-full object-cover max-sm:w-auto max-sm:h-auto"
                  />
                ) : (
                  // Render a placeholder or alternative content if object_path is undefined
                  <p>Image not found</p>
                )}
              </div>
              <div className="bg-[#EEEEEE] flex justify-center items-center w-32 h-28 max-sm:w-auto max-sm:h-auto">
                {/* <Icons.hodiBack className="w-24 h-24 max-sm:w-auto max-sm:h-auto" /> */}
                {singleData?.media[0]?.object_path ? (
                  <Image
                    width={400}
                    height={400}
                    src={`http://192.168.18.224:3001${singleData?.media[0]?.object_path}`}
                    alt="product image"
                    className="w-full h-full max-sm:w-auto object-cover max-sm:h-auto"
                  />
                ) : (
                  // Render a placeholder or alternative content if object_path is undefined
                  <p>Image not found</p>
                )}
              </div>
              <div className="bg-[#EEEEEE] flex mt-2 justify-center items-center w-32 h-28 max-sm:w-auto max-sm:h-auto">
                {/* <Icons.hodiSide className="w-32 h-20 max-sm:w-auto max-sm:h-auto" /> */}
                {singleData?.media[0]?.object_path ? (
                  <Image
                    width={400}
                    height={400}
                    src={`http://192.168.18.224:3001${singleData?.media[0]?.object_path}`}
                    alt="product image"
                    className="bg-[#EEEEEE] flex  justify-center items-center w-full h-full object-cover"
                  />
                ) : (
                  // Render a placeholder or alternative content if object_path is undefined
                  <p>Image not found</p>
                )}
              </div>
            </div>
            <div className="bg-[#EEEEEE] flex justify-center items-center w-96 max-sm:w-auto max-sm:h-auto h-96">
              {/* <Image
                src={""}
                alt="product image"
                className="w-96  h-96 max-sm:w-auto max-sm:h-auto"
                
              /> */}

              {singleData?.media[0]?.object_path ? (
                <Image
                  width={400}
                  height={400}
                  src={`http://192.168.18.224:3001${singleData?.media[0]?.object_path}`}
                  alt="product image"
                  className="w-full h-full object-cover "
                />
              ) : (
                // Render a placeholder or alternative content if object_path is undefined
                <p>Image not found</p>
              )}
            </div>
          </div>
          <div className="w-1/2 max-lg:w-full max-lg:mt-10">
            <div className=" text-black dark:text-white text-[1rem]  font-semibold font-['Poppins']">
              {singleData?.food_name}
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
                ${singleData?.price}
              </div>
              {singleData?.discount_percentage && (
                <div className="w-20 h-10 px-[3.5rem] py-[1.5erem] ml-5 bg-red-600 bg-opacity-10 rounded-sm justify-center items-center gap-3 inline-flex">
                  <div className="text-red-600 text-[0.9rem] font-bold font-['Poppins']">
                    -{singleData?.discount_percentage}%
                  </div>
                </div>
              )}
            </div>
            <div className=" mt-3 text-black dark:text-white text-opacity-60 text-[0.9rem] font-['Poppins'] ">
              {singleData?.food_desc}
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
              {CheckCart?.some(
                (item: any) => item?.food_id === singleData?.food_id
              ) ? (
                <button
                  onClick={() => handleRemoveFromCart(singleData?.food_id)}
                  className="w-64 h-12 px-12 py-4 font-['Poppins'] max-sm:mt-10 bg-red-600 cursor-pointer text-white text-[1rem] font-bold rounded justify-center items-center gap-3 inline-flex"
                >
                  Remove From Cart
                </button>
              ) : (
                <button
                  onClick={() => handleAddCardProduct(singleData)}
                  className="w-64 h-12 px-14 py-4 font-['Poppins'] max-sm:mt-10 bg-red-600 cursor-pointer text-white text-[1rem] font-bold rounded justify-center items-center gap-3 inline-flex"
                >
                  Add to Cart
                </button>
              )}
            </div>
            <div>
              <div className="text-[1rem] font-bold mt-5 dark:text-white">
                Tages
              </div>
              <div className="flex gap-1 rounded-xl mt-2 flex-wrap">
                {singleData?.tags?.map((item: any, index: any) => (
                  <div
                    key={index}
                    className="bg-slate-100 dark:text-black p-2 w-auto"
                  >
                    {item?.tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-10 ">
        <div
          onClick={() => setRender("Product Detail")}
          className={`w-1/4 dark:text-white text-black text-[1rem] cursor-pointer  max-md:text-sm flex-wrap flex justify-center font-semibold font-['Poppins']  ${
            renderComp === "Product Detail"
              ? "border-b dark:border-white border-black "
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
              ? "border-b dark:border-white border-black "
              : "text-opacity-60"
          }
`}
        >
          Rating & Reviews
        </div>
        <div
          onClick={() => setRender("FAQs")}
          className={`w-1/4 dark:text-white text-right cursor-pointer text-black flex justify-center   text-[1rem]  max-md:text-sm font-semibold font-['Poppins']  ${
            renderComp === "FAQs"
              ? "border-b dark:border-white border-black "
              : "text-opacity-60"
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
