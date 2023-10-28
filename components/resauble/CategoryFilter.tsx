"use client"

import React, { useContext } from "react"
import { ContextApiData } from "@/context/ContextGlobal"

import { ScrollArea } from "@/components/ui/scroll-area"

import CardCategorie from "../home/CardCategorie"

const CategoryFilter = () => {
  const { CatogaryList } = useContext(ContextApiData)
  // const uniqueCategoryNames = Array.from(
  //   new Set(CatogaryList.data.map((item: any) => item.category_name))
  // )
  const uniqueCategoryObjects = Array.from(
    new Set(CatogaryList?.data?.map((item: any) => item?.id))
  ).map((id) => CatogaryList?.data?.find((item: any) => item?.id === id))

  // console.log("CatogaryList", uniqueCategoryNames)
  return (
    <ScrollArea className="w-full border font-['Poppins'] p-5 max-md:w-full h-[26rem]">
      <p className="text-[1rem] font-medium">Categories</p>
      {uniqueCategoryObjects?.map((item: any, index: any) => (
        <CardCategorie
          key={index}
          id={item?.id}
          category={item?.category_name}
          subcategories={item["immediate parent"]}
        />
      ))}
    </ScrollArea>
  )
}

export default CategoryFilter
