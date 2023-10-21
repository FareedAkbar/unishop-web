import React from "react"
import Link from "next/link"

import { Icons } from "../icons"

const Feature = () => {
  return (
    <div className="flex gap-5 max-md:flex-col pt-16">
      <div className="w-1/3 max-md:w-full justify-start items-start  gap-7 inline-flex">
        <Icons.book className="bg-cover h-[41.8rem] max-xl:h-[30rem] max-sm:h-[20rem]" />
        <div className="absolute flex flex-col justify-end h-[43rem] max-xl:h-[30rem]  max-sm:h-[22rem] p-5 pb-10">
          <p className="text-neutral-50 text-[1rem] max-sm:text-lg   font-semibold font-['Poppins'] leading-normal ">
            Text Books
          </p>
          <p className=" w-96 max-xl:w-64  pr-4  text-neutral-50 text-base text-[0.9rem] font-normal  max-md:w-full font-['Poppins'] ">
            Discover a world of knowledge with our extensive collection of
            textbooks at Unibar.
          </p>
          <Link
            href={"/featurefilter"}
            className="text-white  flex justify-start w-40 cursor-pointer underline text-base font-medium font-['Poppins'] leading-normal"
          >
            Shop Now
          </Link>
        </div>
      </div>
      <div className="w-2/3 max-sm:flex-col flex max-md:w-full flex-col gap-5 ">
        <div>
          <div>
            <Icons.paper className="bg-cover max-sm:h-[10rem] " />
            <div className="absolute  px-5  -mt-28   ">
              <div className="text-neutral-50 text-[1rem] font-semibold font-['Poppins'] leading-normal tracking-wide">
                Stationary & Merch
              </div>
              <div className="w-64 max-sm:w-56 text-neutral-50 text-[0.9rem] font-normal font-['Poppins'] leading-tight">
                Featured woman collections that give you another vibe.
              </div>
              <Link
                href={"/featurefilter"}
                className="text-white  flex justify-start w-40  cursor-pointer underline text-base font-medium font-['Poppins'] leading-normal"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        <div className="flex max-sm:flex-col gap-5">
          <div>
            <Icons.coat className="bg-cover w-[30.5rem] max-sm:w-full" />
            <div className=" -mt-24 pl-5">
              <div className="text-neutral-50 text-[1rem]  font-semibold font-['Poppins'] ">
                Cloths
              </div>
              <div className="w-48 text-neutral-50 text-sm font-normal font-['Poppins'] ">
                Amazon wireless speakers
              </div>
              <Link
                href={"/featurefilter"}
                className="text-white  flex justify-start w-40 cursor-pointer underline text-base font-medium font-['Poppins'] leading-normal"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div>
            <Icons.echo className="bg-cover w-[22rem] h-[21.11rem] max-md:h-[16rem] max-sm:mt-10" />
            <div className=" -mt-24 pl-5">
              <div className="text-neutral-50 text-[1rem]  font-semibold font-['Poppins'] ">
                Graduation Gift
              </div>
              <div className="w-48 text-neutral-50 text-[0.9rem] font-normal font-['Poppins'] ">
                Amazon wireless speakers
              </div>
              <Link
                href={"/featurefilter"}
                className="text-white  flex justify-start w-40 cursor-pointer underline text-base font-medium font-['Poppins'] leading-normal"
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
