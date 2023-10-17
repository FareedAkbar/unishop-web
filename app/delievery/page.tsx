import React from "react"
import { Icon } from "@radix-ui/react-select"

import { Icons } from "@/components/icons"

const page = () => {
  return (
    <div className="container flex">
      <div className="w-1/2 flex  items-center ">
        {/* <div className="flex flex-col items-center justify-center">
          <Icons.circle />
          <p>Delivery</p>
        </div>
        <div className="border w-20 border-black bg-black rounded-full"></div>
        <div className="flex flex-col justify-center items-center">
          <Icons.smallCircle />
          <p>Payments</p>
        </div>
        <div className="border w-20 border-black bg-black rounded-full"></div>

        <div className="flex flex-col justify-center items-center">
          <Icons.smallCircle />
          <p>Review</p>
        </div> */}
        <div className="mt-10 w-full">
          <div className="w-full border-black border relative "></div>
          <div className="border w-10 h-10 border-black bg-black absolute rounded-full "></div>
        </div>
      </div>
      <div className="w-1/2"></div>
    </div>
  )
}

export default page
