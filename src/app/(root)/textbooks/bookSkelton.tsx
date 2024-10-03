"use client";
import React from "react";
import { BackgroundGradient } from "../../../components/ui/background-gradient";

export default function BookSkelton() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <BackgroundGradient className="flex h-[500px] w-full flex-col justify-between rounded-lg p-4 dark:bg-zinc-900 sm:p-6">
        <div className="relative h-2/3 w-full animate-pulse">
          <div className="mb-2 h-64 w-64 rounded bg-gray-300"></div>
        </div>
        <div className="flex flex-col items-center justify-between">
          <div className="mb-2 h-8 w-full animate-pulse rounded bg-gray-300"></div>
          <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-300"></div>
          <div className="mb-2 h-4 w-32 animate-pulse rounded bg-gray-300"></div>
          <div className="mb-2 h-8 w-full animate-pulse rounded bg-gray-300"></div>
        </div>
      </BackgroundGradient>
    </div>
  );
}
