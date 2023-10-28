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
      <AccordionItem value={subcategories}>
        <AccordionTrigger>{subcategories}</AccordionTrigger>
        <AccordionContent>
          {/* {subcategories.map((item, index) => (
            <Accordion type="single" collapsible className="border borde-b ">
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
          ))} */}
          {/* {subcategories?.map((item: any, index: any) => ( */}
          <Accordion type="single" collapsible className="border borde-b ">
            <Link href={`/category/${id}`} className="  font-['Poppins']">
              <AccordionItem value={category}>
                {category}

                {/* <AccordionContent key={index}>
                  <Link href={"/category"}>
                  <li className="pl-5 cursor-pointer font-['Poppins'] hover:underline">
                  {subcategories}
                  </li>
                  </Link>
                </AccordionContent> */}
              </AccordionItem>
            </Link>
          </Accordion>
          {/* ))} */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default CardCategorie
