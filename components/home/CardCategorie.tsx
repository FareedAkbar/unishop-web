import React from "react"
import Link from "next/link"

import { CategoryProps } from "@/types/nav"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const CardCategorie = ({ category, subcategories, id }: any) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={category}>
        {subcategories.length > 0 ? (
          <AccordionTrigger>{category}</AccordionTrigger>
        ) : (
          <div className="pl-2 p-1 mt-1 cursor-pointer dark:hover:bg-black  hover:bg-[#F5F5F5] ">
            {category}
          </div>
        )}
        <AccordionContent>
          {subcategories?.map((item: any, index: any) => (
            <Accordion type="single" collapsible className=" border-b  ml-5">
              <AccordionItem key={index} value={item.title_name}>
                <p className="p-2 cursor-pointer hover:underline font-['Poppins']">
                  {item.title_name}
                </p>
              </AccordionItem>
            </Accordion>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default CardCategorie
