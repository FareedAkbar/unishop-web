"use client";

import React from "react";
import Image from "next/image";
import CountdownTimer from "~/components/countdownTimer";
import { useRouter } from "next/navigation";

const GraduationBanner: React.FC = () => {
  const router = useRouter();
  return (
    <div className="m-4 flex flex-row items-center justify-between rounded bg-gradient-to-r from-red-900 to-red-400 p-4 sm:p-8">
      <div className="flex max-w-xl flex-col justify-center text-left">
        <h3 className="text-xs font-semibold text-red-400 sm:text-sm">
          Categories
        </h3>
        <h1 className="font-sem text-md my-2 text-white sm:text-3xl lg:text-4xl">
          Celebrate Success with Memorable Graduation Gifts
        </h1>
        <CountdownTimer targetDate={new Date("2024-10-25T10:00:00")} />
        <button
          className="mt-4 inline-block w-16 rounded bg-red-600 py-2 text-[10px] text-white hover:bg-red-500 lg:w-28 lg:px-4 lg:text-base"
          onClick={() => {
            router.push("academic-dress-hire");
          }}
        >
          Buy Now
        </button>
      </div>

      <div className="mt-8 flex w-1/3 lg:mt-0 lg:justify-end">
        <Image
          src={"/assets/images/home/graduation.png"}
          alt="Graduation"
          width={1000}
          height={1000}
          className="h-28 w-full object-contain sm:h-72 lg:h-[350px]"
        />
      </div>
    </div>
  );
};

export default GraduationBanner;
