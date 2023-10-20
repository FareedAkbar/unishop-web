import React from "react"

import { catogaryListArray } from "@/config/site"
import { ScrollArea } from "@/components/ui/scroll-area"

import CardCategorie from "../home/CardCategorie"

const CategoryFilter = () => {
  return (
    <ScrollArea className="w-full border font-['Poppins'] p-5 max-md:w-full h-[26rem]">
      <p className="text-[1.375rem] font-medium">Categories</p>
      {catogaryListArray.map((item, index) => (
        <CardCategorie
          category={item.category}
          subcategories={item.subcategories}
        />
      ))}
    </ScrollArea>
  )
}

export default CategoryFilter
