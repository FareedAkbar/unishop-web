import React from "react"

import ContactForm from "@/components/contact/ContactForm"
import GeneralInquiries from "@/components/contact/GeneralInquiries"
import { Icons } from "@/components/icons"

const Contact = () => {
  return (
    <div className="px-10 max-sm:px-5 py-5 ">
      <div className="text-black dark:text-white text-[1rem]  max-sm:text-lg max-sm:text-center font-semibold font-['Poppins']">
        Contact Information
      </div>
      <div className="flex border max-lg:flex-col rounded-lg p-5 mt-5">
        <div className="w-1/2 max-lg:w-full">
          <GeneralInquiries />
        </div>
        <div className="w-1/2 max-lg:w-full 2xl:px-20">
          <ContactForm />
        </div>
      </div>

      <div className="text-black dark:text-white text-[1rem] py-5 font-semibold font-['Poppins']">
        Where To Find Us
      </div>
      <Icons.goolgeMap className="w-full" />
    </div>
  )
}

export default Contact
