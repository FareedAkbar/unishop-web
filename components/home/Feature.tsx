import React from "react"
import Link from "next/link"

import { Icons } from "../icons"

const Feature = () => {
  return (
    <div className="flex gap-5 max-lg:flex-col justify-center md:pt-16 ">
      <div className="relative w-1/3 max-lg:w-full max-md:w-full  justify-start items-start gap-7 inline-flex overflow-hidden">
        {/* Background Image */}
        <Icons.book className="absolute inset-0 w-full h-full object-cover max-xl:h-full max-lg:h-[20rem]" />

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 max-xl:pb-16">
          <p className="text-neutral-50 text-[1rem] max-sm:text-lg font-semibold font-['Poppins'] leading-normal">
            Text Books
          </p>
          <p className="w-full max-xl:w-[10rem] max-lg:w-full text-neutral-50 text-[0.9rem] font-normal font-['Poppins']">
            Discover a world of knowledge with our extensive collection of
            textbooks at Unibar.
          </p>
          <Link
            href={"/featurefilter"}
            className="text-white flex justify-start w-40 cursor-pointer underline font-medium font-['Poppins'] leading-normal"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <div className="w-fit max-sm:flex-col  flex max-md:w-full flex-col gap-5 ">
        <div>
          <div>
            <Icons.paper className="bg-cover h-full max-sm:h-[10rem] " />
            <div className="absolute  px-5  -mt-28   ">
              <div className="text-neutral-50 text-[1rem] font-semibold font-['Poppins'] leading-normal tracking-wide">
                Stationary & Merch
              </div>
              <div className="w-64 max-sm:w-56 text-neutral-50 text-[0.9rem] font-normal font-['Poppins'] leading-tight">
                Featured woman collections that give you another vibe.
              </div>
              <Link
                href={"/featurefilter"}
                className="text-white  flex justify-start w-40  cursor-pointer underline font-medium font-['Poppins'] leading-normal"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        <div className="flex max-sm:flex-col gap-5">
          <div>
            <Icons.coat className="bg-cover h-full w-[30.5rem] max-sm:w-full" />
            <div className=" -mt-24 pl-5">
              <div className="text-neutral-50 text-[1rem]  font-semibold font-['Poppins'] ">
                Cloths
              </div>
              <div className="w-48 text-neutral-50 text-sm font-normal font-['Poppins'] ">
                Amazon wireless speakers
              </div>
              <Link
                href={"/featurefilter"}
                className="text-white  flex justify-start w-40 cursor-pointer underline font-medium font-['Poppins'] leading-normal"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div>
            <Icons.echo className="bg-cover w-[22rem] max-sm:w-full h-full max-md:h-[14rem] max-sm:mt-10" />
            <div className=" -mt-24 pl-5">
              <div className="text-neutral-50 text-[1rem]  font-semibold font-['Poppins'] ">
                Graduation Gift
              </div>
              <div className="w-48 text-neutral-50 text-[0.9rem] font-normal font-['Poppins'] ">
                Amazon wireless speakers
              </div>
              <Link
                href={"/featurefilter"}
                className="text-white  flex justify-start w-40 cursor-pointer underline font-medium font-['Poppins'] leading-normal"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feature
