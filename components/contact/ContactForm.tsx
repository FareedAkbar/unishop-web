import React from "react"

import { Icons } from "../icons"

const ContactForm = () => {
  return (
    <div className="p-5 px-20 max-sm:px-0 mt-10 w-full">
      <div className="flex justify-between max-sm:flex-col max-md:gap-5">
        <div>
          <div className="h-7 text-lg max-sm:text-sm max-md:text-sm font-medium font-['Poppins'] leading-tight">
            First Name
          </div>
          <input type="text" className="border-b px-2 w-full outline-none" />
        </div>
        <div>
          <div className="h-7 text-lg max-sm:text-sm max-md:text-sm font-medium font-['Poppins'] leading-tight">
            Last Name
          </div>
          <input type="text" className="border-b px-2 w-full outline-none" />
        </div>
      </div>
      <div className="flex max-sm:flex-col justify-between max-md:gap-5 pt-10 max-sm:pt-3">
        <div>
          <div className="h-7 text-lg max-sm:text-sm max-md:text-sm font-medium font-['Poppins'] leading-tight">
            Email
          </div>
          <input type="text" className="border-b px-2 w-full outline-none" />
        </div>
        <div>
          <div className="h-7 text-lg max-sm:text-sm max-md:text-sm font-medium font-['Poppins'] leading-tight">
            Phone Number
          </div>
          <input type="text" className="border-b px-2 w-full outline-none" />
        </div>
      </div>
      <div className="pt-10 max-sm:pt-3">
        <div className="w-w-full h-7 text-lg max-sm:text-sm max-md:text-sm font-medium font-['Poppins'] leading-tight">
          Message
        </div>
        <input
          placeholder="Write your message.."
          type="text"
          className="border-b  px-2 w-full outline-none"
        />
      </div>
      <div className="flex justify-end max-sm:justify-center items-center mt-10">
        <button className="w-40 flex bg-red-600 rounded shadow justify-center h-12 items-center text-center text-white text-lg max-sm:text-sm max-md:text-sm font-medium font-['Poppins']">
          Send Message
        </button>
      </div>
      <div>
        <Icons.letterSend />
      </div>
    </div>
  )
}

export default ContactForm
