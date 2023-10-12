"use client"

import React, { useRef } from "react"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Icons } from "../icons"
import CardProduct from "../resauble/CardProduct"

const CardSlider = () => {
  const sliderRef = useRef<Slider | null>(null)

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
          slidesToShow: 2,
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
      <div className="pt-10 flex max-md:flex-col  ">
        <div className="text-black  max-md:py-2 text-5xl max-sm:text-xl w-1/3  max-xl:w-full max-md:w-full dark:text-white font-semibold  leading-10 tracking-widest">
          Flash Sales
        </div>
        <div className="flex ">
          <div className="   justify-center items-start gap-1 pl-10 max-md:pl-0  ">
            <div className=" dark:text-white  text-black text-sm font-medium font-['Poppins'] leading-none flex justify-center ">
              Days
            </div>
            <div className=" dark:text-white  flex justify-center text-black text-4xl  font-bold font-['Inter'] leading-loose tracking-wider">
              03
            </div>
          </div>

          <p className="text-[3rem] flex items-center text-[#ED1C29]">:</p>

          <div className="  justify-center items-start ">
            <div className=" dark:text-white text-black text-sm font-medium font-['Poppins'] leading-none flex justify-center ">
              Hours
            </div>
            <div className=" dark:text-white  flex justify-center text-black text-4xl  font-bold font-['Inter'] leading-loose tracking-wider">
              23
            </div>
          </div>
          <p className="text-[3rem] flex items-center text-[#ED1C29]">:</p>

          <div className="  justify-center items-start gap-1 ">
            <div className=" dark:text-white text-black text-sm font-medium font-['Poppins'] leading-none flex justify-center ">
              Minutes
            </div>
            <div className="dark:text-white   flex justify-center text-black text-4xl  font-bold font-['Inter'] leading-loose tracking-wider">
              19
            </div>
          </div>
          <p className="text-[3rem] flex items-center text-[#ED1C29]">:</p>

          <div className="  justify-center items-start gap-1 ">
            <div className=" dark:text-white text-black text-sm font-medium font-['Poppins'] leading-none flex justify-center ">
              Seconds
            </div>
            <div className=" dark:text-white  flex justify-center text-black text-4xl  font-bold font-['Inter'] leading-loose tracking-wider">
              56
            </div>
          </div>
        </div>
        <div className="w-2/3 max-md:w-full  max-md:py-5 flex max-sm:justify-center justify-end gap-5">
          <div
            onClick={handlePrev}
            className="w-11 h-11 relative cursor-pointer"
          >
            <div className="w-11 h-11 left-0 hover:bg-[#ED1C29] dark:text-black dark:hover:text-white hover:text-white flex justify-center items-center top-0 absolute bg-neutral-100 rounded-full">
              <Icons.arrowLeft />
            </div>
          </div>
          <div
            onClick={handleNext}
            className="w-11 h-11 relative cursor-pointer "
          >
            <div className="w-11  rotate-180 h-11 left-0 flex justify-center dark:text-black dark:hover:text-white items-center top-0 absolute bg-neutral-100 hover:bg-[#ED1C29] hover:text-white rounded-full">
              <Icons.arrowLeft />
            </div>
          </div>
        </div>
      </div>
      <div className="relative ">
        <div className="flex  max-sm:flex-col max-sm:pt-2"></div>
        <div className="">
          <Slider ref={sliderRef} {...settings} className="">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <CardProduct />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default CardSlider
