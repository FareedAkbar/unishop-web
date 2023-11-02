"use client"

import React, { useContext, useEffect, useState } from "react"
import Image from "next/image"
import { ContextApiData } from "@/context/ContextGlobal"

import { Icons } from "@/components/icons"

const MobileViewSubCategoryList = ({ params }: any) => {
  console.log("parems", params)
  const { CatogaryList } = useContext(ContextApiData)
  const listOfsubCatogary = CatogaryList?.data?.find(
    (item: any) => item?.menu_id == params.id
  )
  console.log("listOfsubCatogary", listOfsubCatogary)
  const [showAll, setShowAll] = useState(false)
  const [maxItems, setMaxItems] = useState(4)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMaxItems(window.innerWidth < 768 ? 4 : 14)
    }
  }, [])

  return (
    <>
      <div className="container flex flex-wrap justify-evenly gap-3">
        {listOfsubCatogary?.titles
          ?.slice(0, maxItems)
          .map((item: any, index: any) => (
            <div key={index} className="flex flex-col items-center w-20">
              {/* {item?.object_path ? (
                <Image
                  width={400}
                  height={400}
                  src={`http://192.168.18.225:3001${item?.object_path}`}
                  alt="product image"
                  className="w-20 rounded-full  h-20 object-cover"
                />
              ) : (
                // Render a placeholder or alternative content if object_path is undefined
                <p>Image not found</p>
              )} */}
              <p className="text-[0.9rem] text-center font-['Poppins'] mt-1">
                {item?.title_name}
              </p>
            </div>
          ))}
      </div>
      <div className="flex justify-center mt-5 rota">
        <button
          className="bg-[#ED1C29] flex h-10 w-1/2 max-sm:w-60 gap-3 justify-center items-center font-['Poppins'] rounded-sm text-white text-[0.9rem]"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? <p>Hide all Categories</p> : <p>Show all Categories</p>}
          <Icons.ChevronUp className={`rotate-${showAll ? 0 : 180}`} />
        </button>
      </div>
    </>
  )
}

export default MobileViewSubCategoryList
