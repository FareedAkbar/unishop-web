"use client";
import React from "react";
import { BackgroundGradient } from "../../components/ui/background-gradient";


export default function BookSkelton() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <BackgroundGradient className="rounded-lg w-full h-[500px] p-4 sm:p-6 dark:bg-zinc-900 flex flex-col justify-between">
        <div className="animate-pulse w-full h-2/3 relative">
        <div className="mb-2 h-64 w-64 rounded bg-gray-300"></div>
        </div>
        <div className="flex flex-col items-center justify-between">
        <div className="animate-pulse mb-2 h-8 w-full rounded bg-gray-300"></div>
        <div className="animate-pulse mb-2 h-4 w-full rounded bg-gray-300"></div>
        <div className="animate-pulse mb-2 h-4 w-32 rounded bg-gray-300"></div>
        <div className="animate-pulse mb-2 h-8 w-full rounded bg-gray-300"></div>

         
        </div>
      </BackgroundGradient>
    </div>
  );
}
