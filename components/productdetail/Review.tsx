import React, { useState } from "react"
import { Icon } from "@radix-ui/react-select"

import { Icons } from "../icons"

const Review = () => {
  const [reviewsToShow, setReviewsToShow] = useState(4) // Number of reviews to initially show
  const totalReviews = 8 // Total number of reviews available

  const loadMoreReviews = () => {
    // Increase the number of reviews to show when the button is clicked
    setReviewsToShow(reviewsToShow + 4) // You can change the number as per your preference
  }

  return (
    <div className="pt-10">
      <div className="flex justify-between max-md:flex-col">
        <div className="flex items-center gap-3">
          <div className="text-black text-[1rem] dark:text-white font-bold font-['Poppins']">
            All Reviews
          </div>
          <div className="text-black text-opacity-60 dark:text-white text-[0.9rem] font-normal font-['Poppins'] leading-snug">
            {`(451)`}
          </div>
        </div>
        <div className="flex gap-5 max-md:mt-5 max-sm:flex-col ">
          <div className="flex gap-5">
            <div className="w-12 h-12 flex justify-center items-center bg-zinc-100 rounded-3xl  ">
              <Icons.slidersHorizontal className="dark:text-black " />
            </div>
            <div className="w-28 h-12 py-4 bg-zinc-100 rounded-sm justify-center items-center gap-0.5 inline-flex">
              <div className="text-black dark:text-black font-medium font-['Poppins']">
                Latest
              </div>
              <Icons.chevronRight className="w-4 h-4 rotate-90 dark:text-black relative cursor-pointer" />
            </div>
          </div>
          <button className="w-44 h-12 py-4 bg-red-600 rounded-sm justify-center items-center gap-3 inline-flex">
            <div className="text-white dark:text-white text-[1rem]  font-['Poppins']">
              Write a Review
            </div>
          </button>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap justify-evenly">
        {[1, 2, 3, 4, 5, 6, 7, 8].slice(0, reviewsToShow).map((item) => (
          <div className="w-[40rem] max-sm:w-[15rem] p-10" key={item}>
            <div className="flex justify-between">
              <div className="flex gap-1 border-">
                <Icons.star className="w-[1.25rem] h-[1.25rem] text-transparent fill-[#FFAD33]" />
                <Icons.star className="w-[1.25rem] h-[1.25rem] text-transparent fill-[#FFAD33]" />
                <Icons.star className="w-[1.25rem] h-[1.25rem] text-transparent fill-[#FFAD33]" />
                <Icons.star className="w-[1.25rem] h-[1.25rem] text-transparent fill-[#FFAD33]" />
              </div>
              <Icons.more className="text-slate-400 cursor-pointer  hover:text-red-600" />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <div className="text-black dark:text-white text-[1rem] font-bold font-['Poppins'] ">
                Alex M.
              </div>
              <div className="w-5 h-5 relative bg-green-600 flex justify-center items-center rounded-full">
                <Icons.check className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-black dark:text-white pt-2 text-opacity-60 text-[0.9rem] font-normal font-['Poppins'] leading-relaxed">
              {`"The t-shirt exceeded my expectations! The colors are vibrant and
              the print quality is top-notch. Being a UI/UX designer myself, I'm
              quite picky about aesthetics, and this t-shirt definitely gets a
              thumbs up from me."`}
            </div>
            <div className="w-96 text-black dark:text-white text-opacity-60 mt-10 max-sm:mt-3 text-[0.9rem] font-medium font-['Poppins'] leading-snug">
              {`  Posted on August 15, 2023`}
            </div>
          </div>
        ))}
        {reviewsToShow < totalReviews && (
          <div
            className="text-black font-medium font-['Poppins'] hover:text-red-700 cursor-pointer"
            onClick={loadMoreReviews}
          >
            Load More Reviews
          </div>
        )}
      </div>
    </div>
  )
}

export default Review
