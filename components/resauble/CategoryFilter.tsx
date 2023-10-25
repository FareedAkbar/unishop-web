"use client"

import React, { useContext } from "react"
import { ContextApiData } from "@/context/ContextGlobal"

import { catogaryListArray } from "@/config/site"
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
  console.log("uniqueCategoryObjects", uniqueCategoryObjects)
  return (
    <ScrollArea className="w-full border font-['Poppins'] p-5 max-md:w-full h-[26rem]">
      <p className="text-[1rem] font-medium">Categories</p>
      {uniqueCategoryObjects?.map((item: any, index: any) => (
        <CardCategorie
          category={item?.category_name}
          subcategories={item?.immediate_parent}
        />
      ))}
    </ScrollArea>
  )
}

export default CategoryFilter
