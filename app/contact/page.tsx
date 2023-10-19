import React from "react"

import ContactForm from "@/components/contact/ContactForm"
import GeneralInquiries from "@/components/contact/GeneralInquiries"
import { Icons } from "@/components/icons"

const Contact = () => {
  return (
    <div className="container py-5 ">
      <div className="text-black text-2xl  max-sm:text-lg max-sm:text-center font-semibold font-['Poppins']">
        Contact Information
      </div>
      <div className="flex border max-md:flex-col rounded-lg p-5 mt-5">
        <div className="w-1/2 max-md:w-full">
          <GeneralInquiries />
        </div>
        <div className="w-1/2 max-md:w-full">
          <ContactForm />
        </div>
      </div>

      <div className="text-black text-2xl py-5 font-semibold font-['Poppins']">
        Where To Find Us
      </div>
      <Icons.goolgeMap />
    </div>
  )
}

export default Contact
