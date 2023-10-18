"use client"

import React, { useState } from "react"
import Link from "next/link"

import { Icons } from "../icons"

const WithPayCard = () => {
  const availableDates = ["01", "02", "03", "04", "05"]
  const availableYears = ["2022", "2023", "2024", "2025"]
  const [selectedDate, setSelectedDate] = useState(availableDates[0])
  const [selectedYear, setSelectedYear] = useState(availableYears[0])

  const handleDateChange = (e: any) => {
    setSelectedDate(e.target.value)
  }

  const handleYearChange = (e: any) => {
    setSelectedYear(e.target.value)
  }
  return (
    <div>
      <div className="w-44 h-7 opacity-80">
        <span className="text-black dark:text-white text-md font-normal font-['Poppins'] leading-normal">
          Name on Card
        </span>
        <span className="text-red-600 text-md font-normal font-['Poppins'] leading-normal">
          *
        </span>
      </div>
      <input
        type="text"
        placeholder="Make sure to enter the full name that's on your card."
        className="w-full h-10 outline-none relative px-2 border dark:text-black bg-neutral-100 rounded"
      />
      <div className="w-44  opacity-80 mt-3">
        <span className="text-black dark:text-white text-md font-normal font-['Poppins'] leading-normal">
          Card Number
        </span>
        <span className="text-red-600 text-md font-normal font-['Poppins'] leading-normal">
          *
        </span>
      </div>
      <div className="  flex relative items-center bg-neutral-100 rounded">
        <Icons.creditCard className="w-10 h-10 py-1 dark:text-black" />
        <input
          type="text"
          placeholder="Make sure to enter the full name that's on your card."
          className="w-full h-10 outline-none relative px-2 dark:text-black  bg-neutral-100 rounded"
        />
      </div>
      <div className="flex gap-5 mt-3 max-lg:flex-col">
        <div>
          <div className="w-56 h-7 opacity-80">
            <span className="text-black text-md dark:text-white font-normal font-['Poppins'] leading-normal">
              Expiration date
            </span>
            <span className="text-red-600 text-md font-normal font-['Poppins'] leading-normal">
              *
            </span>
          </div>
          <div className=" flex items-center h-12 relative bg-neutral-100 rounded px-2">
            <select
              className="border p-2 dark:bg-white dark:text-black"
              value={selectedDate}
              onChange={handleDateChange}
            >
              {availableDates.map((date) => (
                <option key={date} value={date}>
                  <p className="   "> {date}</p>
                </option>
              ))}
            </select>
            <select
              className="border p-2 dark:bg-white dark:text-black"
              value={selectedYear}
              onChange={handleYearChange}
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className="w-56 h-7 opacity-80">
            <span className="text-black dark:text-white text-md font-normal font-['Poppins'] leading-normal">
              Security Code
            </span>
            <span className="text-red-600 text-md font-normal font-['Poppins'] leading-normal">
              *
            </span>
          </div>
          <div className=" flex items-center h-12 relative bg-neutral-100 rounded px-3">
            <input className=" w-full flex items-center h-12 dark:text-black  outline-none px-2 relative bg-neutral-100 rounded" />
            <Icons.helpCircle className="dark:text-black" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-3">
        <input type="checkbox" />
        <div className=" opacity-80 text-black dark:text-white text-md max-sm:text-[10px] font-normal font-['Poppins'] leading-normal">
          My billing address is the same as my delivery address:
        </div>
      </div>
      <input
        type="text"
        placeholder="Full Address....."
        className="outline-none w-full h-10 mt-2 px-2"
      />
      <Link
        href={"/orderreview"}
        className="w-full h-12 mt-5 px-14 max-sm:px-5 py-4 bg-red-600 rounded justify-center items-center gap-3 inline-flex"
      >
        <div className="text-neutral-50 text-md font-medium font-['Poppins'] leading-normal">
          Review Your Order
        </div>
      </Link>
    </div>
  )
}

export default WithPayCard
