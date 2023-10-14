import React, { useState } from "react"
import Image from "next/image"

import { Icons } from "../icons"
import CardProductDetail from "./CardProductDetail"
import Faq from "./Faq"
import Review from "./Review"

const ProductDetail = () => {
  const [renderComp, setRender] = useState("Product Detail")

  return (
    <div>
      <div className="flex justify-between pt-10 ">
        <div
          onClick={() => setRender("Product Detail")}
          className={`w-1/4 dark:text-white text-black text-2xl cursor-pointer  max-md:text-sm flex-wrap flex justify-center font-semibold font-['Poppins'] leading-snug ${
            renderComp === "Product Detail"
              ? "border-b-2 border-black "
              : "text-opacity-60"
          }`}
        >
          Product Details
        </div>
        <div
          onClick={() => setRender("Review")}
          className={`w-1/4 dark:text-white text-center text-black pb-2 cursor-pointer flex justify-center   text-2xl  max-md:text-sm font-semibold font-['Poppins'] leading-snug
          ${
            renderComp === "Review"
              ? "border-b-2 border-black "
              : "text-opacity-60"
          }
`}
        >
          Rating & Reviews
        </div>
        <div
          onClick={() => setRender("FAQs")}
          className={`w-1/4 dark:text-white text-right cursor-pointer text-black flex justify-center   text-2xl  max-md:text-sm font-semibold font-['Poppins'] leading-snug ${
            renderComp === "FAQs"
              ? "border-b-2 border-black "
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
