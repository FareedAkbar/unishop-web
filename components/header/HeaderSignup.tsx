"use client"

import React, { useState } from "react"
import Link from "next/link"

import { Icons } from "../icons"

const HeaderSignup = () => {
  const [Close, setClose] = useState(true)
  return (
    <div
      className={`bg-[#ED1C29] h-10 max-sm:h-8 w-full text-[1rem] max-sm:text-[8px] flex justify-center  text-white ${
        Close ? "block" : "hidden"
      }`}
    >
      <div className="container flex items-center justify-center">
        <p className="w-full justify-center items-center gap-3 flex">
          <span> Sign up and get 20% off to your first order.</span>
          <Link href={"/signup"} className="underline cursor-pointer">
            {" "}
            Sign Up Now
          </Link>
        </p>
        <div
          onClick={() => setClose(false)}
          className="flex justify-end cursor-pointer "
        >
          <Icons.x className="max-sm:w-3" />
        </div>
      </div>
    </div>
  )
}

export default HeaderSignup
