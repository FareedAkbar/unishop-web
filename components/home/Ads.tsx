"use client"

import React, { useEffect, useState } from "react"

import { Icons } from "../icons"

const Ads = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set the target date and time for the countdown
    const targetDate = new Date("2023-11-22T00:00:00").getTime()

    const updateTimer = setInterval(() => {
      const currentDate = new Date().getTime()
      const timeRemaining = targetDate - currentDate

      if (timeRemaining <= 0) {
        clearInterval(updateTimer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
        const hours = Math.floor(
          (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        const minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        )
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => {
      clearInterval(updateTimer)
    }
  }, [])
  return (
    <div className="w-full  h-auto max-md:h-auto flex max-lg:flex-col-reverse bg-gradient-to-r px-20 max-lg:px-3 from-red-800 via-red-700 to-red-700  py-10">
      <div className="w-1/2 max-lg:w-full flex flex-col justify-between ">
        <p className="text-[0.9rem] text-[#FF0010] font-semibold">Categories</p>
        <p className=" text-white text-3xl max-sm:text-[1rem]  mt-3 leading-normal max-md:text-center font-semibold font-['Poppins']  ">
          Celebrate Success with Memorable Graduation Gifts
        </p>
        <div className="flex gap-10 max-md:gap-x-20 max-md:justify-evenly mt-5  flex-wrap">
          <div className="w-16 h-16 bg-white dark:text-black  rounded-full flex flex-col justify-center items-center">
            <p className="text-[1rem] font-bold"> {timeLeft.days}</p>
            <p className="text-[0.68rem]">Days</p>
          </div>
          <div className="w-16 h-16 bg-white dark:text-black rounded-full flex flex-col justify-center items-center">
            <p className="text-[1rem] font-bold"> {timeLeft.hours}</p>
            <p className="text-[0.68rem]">Hours</p>
          </div>
          <div className="w-16 h-16 bg-white dark:text-black rounded-full flex flex-col justify-center items-center">
            <p className="text-[1rem] font-bold">{timeLeft.minutes}</p>
            <p className="text-[0.68rem]">Minutes</p>
          </div>
          <div className="w-16 h-16 bg-white dark:text-black rounded-full flex flex-col justify-center items-center">
            <p className="text-[1rem] font-bold">{timeLeft.seconds}</p>
            <p className="text-[0.68rem]">Seconds</p>
          </div>
        </div>
        <div className="flex max-md:justify-center">
          <button className="w-36 h-12 bg-red-600 rounded-sm text-[1rem] mt-10 text-white flex justify-center items-center">
            Buy Now
          </button>
        </div>
      </div>
      <div className="w-1/2 max-lg:w-full flex justify-end max-lg:justify-center items-center">
        <Icons.cap className="w-[24rem] max-md:w-[20rem] max-md:h-[20rem] max-sm:h-[10rem] h-[20rem]" />
      </div>
    </div>
  )
}

export default Ads
