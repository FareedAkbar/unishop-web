import React from "react"
import Link from "next/link"

const Googlepay = () => {
  return (
    <div>
      <div className="opacity-80 text-black  dark:text-white text-sm font-normal font-['Poppins'] leading-7">
        {` Continuing will take you to your Google account. You'll be able to
        review and submit your order after you log in.`}
      </div>
      <Link
        href={"/orderreview"}
        className="w-full h-12 mt-5 px-14 max-sm:px-5 py-4 bg-red-600 rounded justify-center items-center flex"
      >
        <div className="text-neutral-50 text-md font-medium font-['Poppins'] leading-normal">
          Review Your Order
        </div>
      </Link>
    </div>
  )
}

export default Googlepay
