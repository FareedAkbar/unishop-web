"use client"

import React, { useState } from "react"
import { Range, getTrackBackground } from "react-range"

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
  const [priceRange, setPriceRange] = useState([0, 100])
  const [colorCheck, setcolorCheck] = useState("")
  const [SizeCheck, setSizeCheck] = useState("")
  const handlePriceChange = (newRange: any) => {
    setPriceRange(newRange)
  }
  return (
    <ScrollArea className="h-[40rem]  w-[22rem] rounded-md border p-2">
      <div className="flex justify-between ">
        <div className="text-black dark:text-white text-xl font-bold font-['Poppins']">
          Filters
        </div>
        <Icons.slidersHorizontal className="rotate-90" />
      </div>
      <div className="flex flex-col items-center mt-3 ">
        <div className="w-64 h-10 dark:text-white bg-red-600 rounded-sm justify-center items-center flex text-white text-sm font-medium font-['Poppins']">
          Filte by Category
        </div>
        <div className="w-64 h-9 bg-[#F0EEED] gap-3 mt-3 rounded-sm flex items-center justify-center ">
          <input
            type="text"
            placeholder="Search textbooks by subject code"
            className="w-52 h-5 text-center bg-[#F0EEED] outline-none text-neutral-400 text-xs font-normal font-['Poppins'] leading-normal"
          />
          <Icons.search className="cursor-pointer w-5 h-5" />
        </div>
        <div className="border-b w-full flex flex-col pl-5 py-3 ">
          <div className="text-black dark:text-white text-opacity-60 text-base font-normal pt-3 cursor-pointer hover:underline font-['Poppins']">
            T-shirts
          </div>
          <div className="text-black dark:text-white text-opacity-60 text-base font-normal pt-3 cursor-pointer hover:underline font-['Poppins']">
            T-shirts
          </div>
          <div className="text-black dark:text-white text-opacity-60 text-base font-normal pt-3 cursor-pointer hover:underline font-['Poppins']">
            T-shirts
          </div>
          <div className="text-black dark:text-white text-opacity-60 text-base font-normal pt-3 cursor-pointer hover:underline font-['Poppins']">
            T-shirts
          </div>
        </div>
        <Accordion type="single" className="border-b w-full" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-black dark:text-white text-xl font-bold font-['Poppins'] w-[15.4rem]">
              Price
            </AccordionTrigger>
            <AccordionContent>
              <div className="container mx-auto">
                <div className="pt-5">
                  <Range
                    step={10}
                    min={0}
                    max={1000}
                    values={priceRange}
                    onChange={handlePriceChange}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        className="h-2 w-full rounded-full bg-black"
                        style={{
                          background: getTrackBackground({
                            values: priceRange,
                            colors: ["#F0EEED", "black", "#F0EEED"],
                            min: 0,
                            max: 1000,
                          }),
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        className="h-6 w-6 bg-red-500 dark:bg-white rounded-full shadow-md"
                      />
                    )}
                  />
                </div>
                <div className="flex justify-between font-['Poppins'] pt-3">
                  <p className=" ">${priceRange[0]}</p>
                  <p>${priceRange[1]}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>{" "}
        <Accordion type="single" className="border-b w-full" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-black dark:text-white text-xl font-bold font-['Poppins'] w-[15.4rem]">
              Colors
            </AccordionTrigger>
            <AccordionContent className="flex justify-center">
              <div className="w-60 h-auto justify-between items-center flex-wrap gap-3 flex">
                {colors.map((item) => (
                  <div
                    onClick={() => setcolorCheck(item)}
                    className={`w-9 h-9 ${item} rounded-full flex justify-center items-center cursor-pointer  border-black border-opacity-20 `}
                  >
                    {colorCheck === item && (
                      <Icons.check
                        className={` font-bold ${
                          colorCheck === "bg-white "
                            ? "text-black "
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
            <AccordionTrigger className="text-black text-xl font-bold font-['Poppins'] w-[15.4rem]">
              Size
            </AccordionTrigger>
            <AccordionContent className="flex justify-center">
              <div className="w-60 h-auto justify-between items-center flex-wrap gap-3 flex">
                {size.map((item) => (
                  <div
                    onClick={() => setSizeCheck(item)}
                    className={`w-12 h-11 py-3 rounded cursor-pointer ${
                      SizeCheck === item
                        ? "bg-[#ED1C29] border-none text-white"
                        : "border text-black "
                    } border-opacity-50 justify-center items-center text-black text-base font-medium font-['Poppins'] flex`}
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
            <AccordionTrigger className="text-black text-xl font-bold font-['Poppins'] w-[15.4rem]">
              Dress Style
            </AccordionTrigger>
            <AccordionContent className="flex flex-col">
              <div className="w-60 h-auto  flex flex-col ml-3">
                {size.map((item) => (
                  <p className="text-[1rem] font-['Poppins'] hover:underline mt-2">
                    Casual
                  </p>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <button className="w-60 h-12 px-14 py-4 bg-red-600 rounded-sm justify-center items-center gap-3 inline-flex mt-5">
          <div className="text-white text-sm font-medium font-['Poppins']">
            Apply Filter
          </div>
        </button>
      </div>
    </ScrollArea>
  )
}

export default FilterCard
