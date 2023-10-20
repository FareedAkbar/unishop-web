import React from "react"
import Link from "next/link"

import { CategoryProps } from "@/types/nav"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Icons } from "../icons"

const CardCategorie = ({ category, subcategories }: CategoryProps) => {
  console.log(category, subcategories)

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={category}>
        <AccordionTrigger>{category}</AccordionTrigger>
        <AccordionContent>
          {subcategories.map((item, index) => (
            <Accordion type="single" collapsible className="border borde-b">
              <AccordionItem key={index} value={item.nestedcategory}>
                <AccordionTrigger>
                  <p className="pl-2 font-['Poppins']">{item.nestedcategory}</p>
                </AccordionTrigger>

                {item.subnestedcategories?.map((subItem, index) => (
                  <AccordionContent key={index}>
                    <Link href={"/category"}>
                      <li className="pl-5 cursor-pointer font-['Poppins'] hover:underline">
                        {subItem}
                      </li>
                    </Link>
                  </AccordionContent>
                ))}
              </AccordionItem>
            </Accordion>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default CardCategorie
