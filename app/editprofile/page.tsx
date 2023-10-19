import React from "react"

import { Icons } from "@/components/icons"

const EditProfile = () => {
  const count = 5 // Set the count dynamically

  return (
    <div className="container p-5">
      <div>
        <div className="flex items-center">
          <div className="text-black dark:text-white  text-opacity-60 text-base font-semibold font-['Poppins']">
            Home
          </div>
          <Icons.chevronRight className="w-4 h-4  origin-top-left " />
          <div className="text-black dark:text-white text-base font-medium font-['Poppins'] leading-normal">
            Profile
          </div>
        </div>
        <div className="text-black dark:text-white text-2xl mt-10 font-semibold font-['Poppins']">
          Edit Your Profile
        </div>
      </div>
      <div className="flex w-full mt-10 justify-center items-center">
        <div className=" border flex flex-col justify-center items-center  rounded-lg p-5 ">
          <div className="flex max-sm:flex-col max-sm:gap-3 gap-20">
            <div className="">
              <div className="text-black dark:text-white text-md font-normal font-['Poppins'] leading-normal">
                First Name
              </div>
              <input
                placeholder="First Name"
                className="w-full px-2  h-10 border outline-none  bg-neutral-100 rounded"
              />
            </div>
            <div className="">
              <div className="text-black dark:text-white text-md font-normal font-['Poppins'] leading-normal">
                Last Name
              </div>
              <input
                placeholder="Last Name"
                className="w-full px-2  h-10 border outline-none  bg-neutral-100 rounded"
              />
            </div>
          </div>
          <div className="flex max-sm:gap-2   max-sm:flex-col gap-20 mt-5">
            <div className="">
              <div className="text-black dark:text-white text-md font-normal font-['Poppins'] leading-normal">
                Email
              </div>
              <input
                placeholder="Email"
                className="w-full px-2  h-10 border outline-none  bg-neutral-100 rounded"
              />
            </div>
            <div className="">
              <div className="text-black dark:text-white text-md font-normal font-['Poppins'] leading-normal">
                Addrss
              </div>
              <input
                placeholder="Address"
                className="w-full px-2  h-10 border outline-none  bg-neutral-100 rounded"
              />
            </div>
          </div>
          <div className="w-full  mt-5">
            <div className="text-black dark:text-white text-md font-normal font-['Poppins'] leading-normal">
              Password Changes
            </div>
            <input
              placeholder="Password Changes"
              className="w-full px-2  h-10 border outline-none  bg-neutral-100 rounded"
            />
          </div>
          <div className="flex max-sm:gap-2 max-sm:flex-col gap-20 mt-5">
            <div className="">
              <div className="text-black dark:text-white text-md font-normal font-['Poppins'] leading-normal">
                New Password
              </div>
              <input
                placeholder="New Password"
                className="w-full px-2  h-10 border outline-none  bg-neutral-100 rounded"
              />
            </div>
            <div className="">
              <div className="text-black dark:text-white text-md font-normal font-['Poppins'] leading-normal">
                Confirm Password
              </div>
              <input
                placeholder="Confirm Password"
                className="w-full px-2  h-10 border outline-none  bg-neutral-100 rounded"
              />
            </div>
          </div>
          <div className="mt-10 flex max-sm:flex-col-reverse max-sm:justify-center sm:justify-end gap-5">
            <div className="w-28 dark:text-black h-12 flex justify-center items-center  bg-neutral-100 rounded">
              Cancle
            </div>
            <div className="w-52 h-12 px-5 py-4 bg-red-600 rounded justify-center items-center gap-2.5 inline-flex">
              <div className="text-neutral-50 text-base font-medium font-['Poppins'] leading-normal">
                Save Changes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
