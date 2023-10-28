"use client"

import React, { useState } from "react"
import RangeSlider from "rsuite/RangeSlider"

import "rsuite/dist/rsuite.css"
import Link from "next/link"

import { colors, size } from "@/config/site"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Icons } from "../icons"

const FilterCard = () => {
  const [colorCheck, setcolorCheck] = useState("")
  const [SizeCheck, setSizeCheck] = useState("")
  const [firstValue, setFirstValue] = useState(2)
  const [secondValue, setSecondValue] = useState(10)
  function handleFirstRange(value: any) {
    setFirstValue(value[0])
    setSecondValue(value[1])
  }
  return (
    <ScrollArea className="h-screen  w-[22rem] rounded-md border p-2">
      <div className="flex justify-between px-2 ">
        <div className="text-black dark:text-white text-[1rem] font-bold font-['Poppins']">
          Filters
        </div>
        <Icons.slidersHorizontal className="rotate-90" />
      </div>
      <div className="flex flex-col items-center  mt-3 ">
        <Link
          href={"/catogaryfilter"}
          className="w-64 h-10 dark:text-white decoration-none  bg-red-600 rounded-sm justify-center items-center flex text-white text-[0.9rem] font-medium font-['Poppins']"
        >
          Filte by Category
        </Link>
        <div className="w-64 h-9 bg-[#F0EEED] gap-3 mt-3 rounded-sm flex items-center justify-center ">
          <input
            type="text"
            placeholder="Search textbooks by subject code"
            className="w-52 h-5 text-center bg-[#F0EEED] outline-none text-neutral-400 text-xs font-normal font-['Poppins'] leading-normal"
          />
          <Icons.search className="cursor-pointer w-5 h-5" />
        </div>
        <div className="border-b w-full flex flex-col pl-5 py-3 ">
          <div className="text-black dark:text-white text-opacity-60 text-[0.9rem] font-normal pt-3 cursor-pointer hover:underline font-['Poppins']">
            T-shirts
          </div>
        </div>
        <Accordion type="single" className="border-b w-full" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-black dark:text-white text-[1rem] font-bold font-['Poppins'] w-[15.4rem]">
              Price
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-3 px-5">
                <div>
                  <RangeSlider
                    defaultValue={[2, 10]}
                    onChange={handleFirstRange}
                  />
                  <div className="flex justify-between">
                    <p className="dark:text-white mt-2">{firstValue}</p>
                    <p className="dark:text-white">{secondValue}</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>{" "}
        <Accordion type="single" className="border-b w-full" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-black dark:text-white text-[1rem] font-bold font-['Poppins'] w-[15.4rem]">
              Colors
            </AccordionTrigger>
            <AccordionContent className="flex justify-center ">
              <div className="w-60 h-auto justify-between items-center flex-wrap gap-3 flex">
                {colors.map((item) => (
                  <div
                    onClick={() => setcolorCheck(item)}
                    className={`w-9 h-9 ${item} ${
                      item === "bg-white" ? "border" : ""
                    } rounded-full flex justify-center items-center cursor-pointer  border-black border-opacity-20 `}
                  >
                    {colorCheck === item && (
                      <Icons.check
                        className={` font-bold ${
                          colorCheck === "bg-white"
                            ? "text-black  "
                            : "text-white"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" className="border-b w-full" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-black dark:text-white text-[1rem] font-bold font-['Poppins'] w-[15.4rem]">
              Size
            </AccordionTrigger>
            <AccordionContent className="flex justify-center">
              <div className="w-60 h-auto justify-between items-center flex-wrap gap-3 flex">
                {size.map((item) => (
                  <div
                    onClick={() => setSizeCheck(item)}
                    className={`w-12 h-11 py-3 rounded text-[0.9rem] cursor-pointer  ${
                      SizeCheck === item
                        ? "bg-[#ED1C29] border-none text-white"
                        : "border text-black dark:text-white "
                    } border-opacity-50 justify-center items-center text-black dark:text-white font-medium font-['Poppins'] flex`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" className="border-b w-full" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-black dark:text-white text-[1rem] font-bold font-['Poppins'] w-[15.4rem]">
              Dress Style
            </AccordionTrigger>
            <AccordionContent className="flex flex-col">
              <div className="w-60 h-auto  flex flex-col ml-3">
                {size.map((item) => (
                  <p className="text-[0.9rem] dark:text-white font-['Poppins'] hover:underline mt-2">
                    Casual
                  </p>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="pb-5">
          <button className="w-60 h-12 px-14 py-4 bg-red-600 rounded-sm justify-center items-center gap-3 inline-flex mt-5">
            <div className="text-white text-sm font-medium font-['Poppins']">
              Apply Filter
            </div>
          </button>
        </div>
      </div>
    </ScrollArea>
  )
}

export default FilterCard
