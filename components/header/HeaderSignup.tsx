import React from "react"

import { Icons } from "../icons"

const HeaderSignup = () => {
  return (
    <div className="bg-[#ED1C29] h-14 max-sm:h-8 w-full text-[1rem] max-sm:text-[8px] flex justify-center  text-white">
      <div className="container flex items-center justify-center">
        <p className="w-full justify-center items-center flex">
          Sign up and get 20% off to your first order.{"  "}
          <span className="underline cursor-pointer"> Sign Up Now</span>
        </p>
        <div className="flex justify-end cursor-pointer ">
          <Icons.x className="max-sm:w-3" />
        </div>
      </div>
    </div>
  )
}

export default HeaderSignup
