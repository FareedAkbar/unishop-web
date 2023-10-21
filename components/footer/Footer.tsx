import React from "react"

import { footerConfig } from "@/config/site"

import { Icons } from "../icons"

const Footer = () => {
  return (
    <>
      <div className="bg-[#EEE] dark:bg-black">
        <div className="container  p-10 ">
          <div className="flex max-sm:flex-col gap-16 max-sm:gap-0">
            <div>
              <Icons.logo className="w-32" />
              <div className="text-black  dark:text-white text-[1rem] pt-3 font-medium font-['Poppins'] leading-7">
                Monday - Friday <br />
                (08:30AM - 05:00PM){" "}
              </div>
              <div className="text-black dark:text-white text-[0.9rem] font-normal font-['Poppins'] leading-normal">
                Delivery and Click & Collect available
              </div>
            </div>
            <div className="flex  justify-between w-full flex-wrap font-['Poppins']  mt-3 ">
              {footerConfig.map((item, index) => (
                <div key={index} className="mb-5">
                  <p className="text-[1rem] font-bold ">{item.header}</p>
                  <ul className="flex flex-col">
                    {item.subItems.map((subitem, subIndex) => (
                      <li key={subIndex} className="  text-[0.9rem] w-44 mt-3 ">
                        {subitem.header}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between max-sm:flex-col mt-5">
            <div className="w-56 h-12   rounded border border-black dark:border-white  items-center  justify-evenly inline-flex">
              <input
                placeholder="Enter your email"
                className="opacity-40 text-black dark:text-white outline-none bg-inherit text-base font-normal w-40 leading-normal"
              />

              <Icons.sendHorizone className="w-8 h-8 dark:bg-white  " />
            </div>
            <div className="flex gap-5 items-center max-sm:pt-5">
              <Icons.fb cl className="cursor-pointer" />
              <Icons.instagram className="cursor-pointer" />
              <Icons.Twitter className="cursor-pointer" />
              <Icons.linkedin className="cursor-pointer" />
              <Icons.registerLogo className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <p className="text-[0.9rem] flex justify-center py-5 font-['Poppins']">
        Copyright unishop 2023. All right reserved
      </p>
    </>
  )
}

export default Footer
