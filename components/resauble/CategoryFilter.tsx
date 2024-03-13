"use client"

import React, { useContext } from "react"
import { ContextApiData } from "@/context/ContextGlobal"

import { catogaryList } from "@/config/site"
import { ScrollArea } from "@/components/ui/scroll-area"

import CardCategorie from "../home/CardCategorie"

const CategoryFilter = () => {
  const { CatogaryList } = useContext(ContextApiData)
  // const uniqueCategoryNames = Array.from(
  //   new Set(CatogaryList.data.map((item: any) => item.category_name))
  // )
  console.log("CatogaryList", CatogaryList?.data)

  return (
    <ScrollArea className="w-full border font-['Poppins'] p-5 max-md:w-full h-[26rem]">
      <p className="text-[1rem] font-medium">Categories</p>
      {CatogaryList?.data?.map((item: any, index: any) => (
        <CardCategorie
          key={index}
          id={item?.id}
          category={item?.menu_name}
          subcategories={item?.titles}
        />
      ))}
    </ScrollArea>
  )
}

export default CategoryFilter
