"use client"

import React, { useContext, useRef } from "react"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ContextApiData } from "@/context/ContextGlobal"

import { Icons } from "../icons"
import CardProduct from "../resauble/CardProduct"

const CardSlider = () => {
  const sliderRef = useRef<Slider | null>(null)
  const { data } = useContext(ContextApiData)
  console.log(data)
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const handleNext = () => {
    sliderRef.current?.slickNext()
  }

  const handlePrev = () => {
    sliderRef.current?.slickPrev()
  }

  return (
    <div className="">
      <div className="pt-10 flex max-md:flex-col items-center  ">
        <div className="text-black  max-md:py-2 text-[1rem] max-sm:text-xl w-1/3  max-xl:w-full max-md:w-full dark:text-white font-semibold   ">
          Flash Sales
        </div>
        <div className=" max-sm:container  ">
          <div className=" flex  justify-center max-md:justify-evenly items-start  max-sm:gap-3  max-md:pl-0    ">
            <div className=" dark:text-white w-24 max-md:w-24     text-black  font-medium text-[0.9rem] max-sm:text-sm max font-['Poppins']  flex justify-center ">
              Days
            </div>
            <div className=" dark:text-white w-24 max-md:w-20   text-black  font-medium text-[0.9rem] max-sm:text-sm  font-['Poppins']  flex justify-center ">
              Hours
            </div>
            <div className=" dark:text-white text-black    w-24 max-md:w-20 font-medium text-[0.9rem] max-sm:text-sm  font-['Poppins']  flex justify-center ">
              Minutes
            </div>
            <div className=" dark:text-white text-black    w-24 max-md:w-20 font-medium text-[0.9rem] max-sm:text-sm  font-['Poppins']  flex justify-center ">
              Seconds
            </div>
          </div>

          <div className=" flex  justify-evenly max-sm:gap-3">
            <div className=" dark:text-white     w-24 max-md:w-20   flex justify-center max-sm:items-center text-black text-[1rem] max-sm:text-sm max-md:text-[0.9rem]  font-bold font-['Inter'] leading-loose tracking-wider">
              23
            </div>

            <div className=" dark:text-white     w-24 max-md:w-20 flex justify-center  text-black text-[1rem] max-sm:text-sm max-md:text-[0.9rem]  font-bold font-['Inter'] leading-loose tracking-wider">
              03
            </div>

            <div className="dark:text-white    w-24 max-md:w-20  flex justify-center text-black text-[1rem] max-sm:text-sm max-md:text-[0.9rem]  font-bold font-['Inter'] leading-loose tracking-wider">
              19
            </div>
            {/* <p className="text-[1rem] max-md:text-xl max-sm:text-[1rem] flex items-center text-[#ED1C29]">
              :
            </p> */}

            <div className=" dark:text-white   w-24 max-md:w-20  flex justify-center text-black text-[1rem] max-sm:text-sm max-md:text-[0.9rem]  font-bold font-['Inter'] leading-loose tracking-wider">
              56
            </div>
          </div>
        </div>

        <div className="w-2/3 max-md:w-full max-sm:hidden  max-md:py-5 flex max-sm:justify-center justify-end gap-5">
          <div onClick={handlePrev} className="w-8 h-8 relative cursor-pointer">
            <div className="w-8 h-8 left-0 hover:bg-[#ED1C29] dark:text-black dark:hover:text-white hover:text-white flex justify-center items-center top-0 absolute bg-neutral-100 rounded-full">
              <Icons.arrowLeft />
            </div>
          </div>
          <div
            onClick={handleNext}
            className="w-8 h-8 relative cursor-pointer "
          >
            <div className="w-8  rotate-180 h-8 left-0 flex justify-center dark:text-black dark:hover:text-white items-center top-0 absolute bg-neutral-100 hover:bg-[#ED1C29] hover:text-white rounded-full">
              <Icons.arrowLeft />
            </div>
          </div>
        </div>
      </div>
      <div className="relative max-sm:pt-10">
        <Slider ref={sliderRef} {...settings} className="overflow-hidden">
          {data?.data?.map((item: any) => (
            <CardProduct data={item} />
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default CardSlider
