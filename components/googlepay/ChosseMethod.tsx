"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { Icons } from "../icons"
import Googlepay from "./Googlepay"
import WithPayCard from "./WithPayCard"

const ChosseMethod = () => {
  const [googleChecked, setGoogleChecked] = useState(false)
  const [cardChecked, setCardChecked] = useState(false)
  const [paypalChecked, setPaypalChecked] = useState(false)

  const handleGoogleChange = () => {
    setGoogleChecked(true)
    setCardChecked(false)
    setPaypalChecked(false)
  }

  const handleCardChange = () => {
    setGoogleChecked(false)
    setCardChecked(true)
    setPaypalChecked(false)
  }

  const handlePaypalChange = () => {
    setGoogleChecked(false)
    setCardChecked(false)
    setPaypalChecked(true)
  }

  return (
    <div className="flex justify-center items-center pt-10 ">
      <div className="rounded-lg w-1/2 max-md:w-full border border-neutral-200 p-5">
        <div className="text-black dark:text-white text-3xl max-lg:text-xl font-semibold font-['Poppins']">
          Choose A Payment Method
        </div>
        <div className="opacity-80 mt-5 pb-2 border-b text-black dark:text-white text-md max-lg:text-sm font-normal font-['Poppins'] leading-normal">
          You will not be charged until you review this order on the next page.
        </div>
        <div className="flex max-sm:flex-col justify-between py-3">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              className="w-5 h-5 rounded-full border-8 border-zinc-800"
              onChange={handleGoogleChange}
              checked={googleChecked}
            />
            <div className="text-black  dark:text-white text-2xl max-lg:text-sm font-medium font-['Poppins'] leading-normal">
              Pay with Google
            </div>
          </div>
          <div className="flex border max-sm:mt-3 p-2 rounded-md">
            <Icons.google className="w-5 h-5" />
            <p>Pay</p>
          </div>
        </div>
        {googleChecked && <Googlepay />}
        <div className="flex justify-between max-sm:flex-col py-3">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              className="w-5 h-5 rounded-full border-8 border-zinc-800"
              onChange={handleCardChange}
              checked={cardChecked}
            />
            <div className="text-black dark:text-white text-2xl max-lg:text-sm font-medium font-['Poppins'] leading-normal">
              Pay with Card
            </div>
          </div>
          <div className="flex border p-2 w-1/2 max-sm:mt-3 max-sm:w-full justify-between rounded-md">
            <Icons.bKash className="w-10 h-8" />
            <Icons.visa className="w-10 h-8" />
            <Icons.mCard className="w-10 h-8" />
            <Icons.nagad className="w-10 h-8" />
          </div>
        </div>
        {cardChecked && <WithPayCard />}
        <div className="flex justify-between py-3">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              className="w-5 h-5 rounded-full border-8 border-zinc-800"
              onChange={handlePaypalChange}
              checked={paypalChecked}
            />
            <div className="text-black dark:text-white text-2xl max-lg:text-sm font-medium font-['Poppins'] leading-normal">
              Pay with Paypal
            </div>
          </div>
          <div className="flex border p-2 justify-between rounded-md">
            <Icons.paypal className="w-10 max-sm:w-5 max-sm:h-5 h-8" />
          </div>
        </div>
        {paypalChecked && (
          <div>
            <input
              placeholder="Email"
              className="w-full h-10 relative border outline-none bg-neutral-100 rounded px-2"
            />
            <input
              placeholder="Password"
              className="w-full h-10 relative border mt-3 outline-none bg-neutral-100 rounded px-2"
            />
            <Link
              href={"/orderreview"}
              className="w-full cursor-pointer h-12 mt-5 px-14 max-sm:p-5 py-4 bg-red-600 rounded justify-center items-center gap-3 inline-flex"
            >
              <div className="text-neutral-50 text-md font-medium font-['Poppins'] leading-normal">
                Review Your Order
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChosseMethod
