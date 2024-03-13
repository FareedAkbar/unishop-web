"use client"

import React, { useEffect, useState } from "react"

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set the target date and time for the countdown
    const targetDate = new Date("2023-11-01T00:00:00").getTime()

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
    <div className="pt-10 flex max-md:flex-col items-center  ">
      <div className="text-black w-40 justify-end h-14  max-md:py-2 text-[1rem] max-sm:text-xl  max-xl:w-full max-md:w-full dark:text-white font-semibold   ">
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
          <div className=" dark:text-white     w-24 max-md:w-20   flex justify-center max-sm:items-center text-black text-[1rem] max-sm:text-sm max-md:text-[0.9rem]  font-bold font-['Inter'] ">
            {timeLeft.days}
          </div>

          <div className=" dark:text-white     w-10 max-md:w-20 flex justify-center  text-black text-[1rem] max-sm:text-sm max-md:text-[0.9rem]  font-bold font-['Inter'] ">
            {timeLeft.hours}
          </div>

          <div className="dark:text-white    w-24 max-md:w-20  flex justify-center text-black text-[1rem] max-sm:text-sm max-md:text-[0.9rem]  font-bold font-['Inter'] ">
            {timeLeft.minutes}
          </div>

          <div className=" dark:text-white   w-24 max-md:w-20  flex justify-center text-black text-[1rem] max-sm:text-sm max-md:text-[0.9rem]  font-bold font-['Inter'] ">
            {timeLeft.seconds}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountdownTimer
