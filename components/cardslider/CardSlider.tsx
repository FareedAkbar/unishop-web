"use client"

import React, { useContext, useRef } from "react"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ContextApiData } from "@/context/ContextGlobal"

import CountdownTimer from "../home/CountdownTimer"
import { Icons } from "../icons"
import CardProduct from "../resauble/CardProduct"

const CardSlider = () => {
  const sliderRef = useRef<Slider | null>(null)
  const { data } = useContext(ContextApiData)
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
      <div className="flex items-center">
        <CountdownTimer />
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
      <div className="relative pt-10">
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
