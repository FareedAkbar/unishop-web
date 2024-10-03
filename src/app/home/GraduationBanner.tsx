'use client';

import React from "react";
import Image from "next/image";
import graduationImage from "../../../public/images/home/graduation.png";
import CountdownTimer from "~/components/countdownTimer";



const GraduationBanner: React.FC = () => {
  return (
    <div className="flex flex-row w-full items-center justify-between bg-gradient-to-r from-red-900 to-red-400 p-4 sm:p-8 ">
      <div className="flex max-w-xl flex-col justify-center text-left">
        <h3 className="text-xs font-semibold text-red-500 sm:text-sm">
          Categories
        </h3>
        <h1 className="font-sem my-2 text-md text-white sm:text-3xl lg:text-4xl">
          Celebrate Success with Memorable Graduation Gifts
        </h1>
        {/* <CountdownTimer targetDate={new Date("2024-10-25T10:00:00")} />  */}
        <button className="mt-4 lg:w-28 w-16 lg:text-base text-[10px] inline-block rounded bg-red-600 lg:px-4 py-2 text-white hover:bg-red-500">
          Buy Now
        </button>
      </div>

      <div className="mt-8 lg:mt-0 flex w-1/3 lg:justify-end">
        <Image
          src={graduationImage}
          alt="Graduation"
          width={1000}
          height={1000}
          className="object-cover h-28 w-full sm:h-72 lg:h-[400px]"
        />
      </div>
    </div>
  );
};

export default GraduationBanner;
