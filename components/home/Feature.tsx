import React from "react"

import { Icons } from "../icons"

const Feature = () => {
  return (
    <div className="flex gap-5 max-md:flex-col pt-16">
      <div className="w-1/3 max-md:w-full justify-start items-start border gap-7 inline-flex">
        <Icons.book className="bg-cover h-[41.8rem] max-xl:h-[30rem] max-sm:h-[20rem]" />
        <div className="absolute flex flex-col justify-end h-[43rem] max-xl:h-[30rem]  max-sm:h-[22rem] p-5 pb-10">
          <p className="text-neutral-50 text-5xl max-sm:text-lg max-lg:text-3xl  font-semibold font-['Inter'] leading-normal tracking-wider">
            Text Books
          </p>
          <p className="w-72 text-neutral-50 max-lg:p-0 text-base max-sm:text-sm font-normal max-lg:w-[12rem] max-md:w-full font-['Poppins'] leading-tight">
            Discover a world of knowledge with our extensive collection of
            textbooks at Unibar.
          </p>
          <button className="text-white  flex justify-start w-40 cursor-pointer underline text-base font-medium font-['Poppins'] leading-normal">
            Shop Now
          </button>
        </div>
      </div>
      <div className="w-2/3 max-sm:flex-col flex max-md:w-full flex-col gap-5 ">
        <div>
          <div>
            <Icons.paper className="bg-cover " />
            <div className="absolute  pl-5 -mt-36  max-sm:-mt-20 ">
              <div className="text-neutral-50 text-4xl max-sm:text-lg font-semibold font-['Inter'] leading-normal tracking-wide">
                Stationary & Merch
              </div>
              <div className="w-64 text-neutral-50 text-sm font-normal font-['Poppins'] leading-tight">
                Featured woman collections that give you another vibe.
              </div>
              <div className="text-white text-base  max-sm:text-sm font-medium font-['Poppins'] leading-normal underline">
                Shop Now
              </div>
            </div>
          </div>
        </div>
        <div className="flex max-sm:flex-col gap-5">
          <div>
            <Icons.coat className="bg-cover w-[30.5rem] max-sm:w-full" />
            <div className=" -mt-28 pl-5">
              <div className="text-neutral-50 text-4xl max-sm:text-lg font-semibold font-['Inter'] leading-normal tracking-wide">
                Cloths
              </div>
              <div className="w-48 text-neutral-50 text-sm font-normal font-['Poppins'] leading-tight">
                Amazon wireless speakers
              </div>
              <div className="text-white text-base font-medium font-['Poppins'] leading-normal underline">
                Shop Now
              </div>
            </div>
          </div>
          <div>
            <Icons.echo className="bg-cover w-[22rem] max-sm:mt-10" />
            <div className=" -mt-28 pl-5">
              <div className="text-neutral-50 text-4xl max-sm:text-lg font-semibold font-['Inter'] leading-normal tracking-wide">
                Graduation Gift
              </div>
              <div className="w-48 text-neutral-50 text-sm font-normal font-['Poppins'] leading-tight">
                Amazon wireless speakers
              </div>
              <div className="text-white text-base font-medium font-['Poppins'] leading-normal underline">
                Shop Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feature
