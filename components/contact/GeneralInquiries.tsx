import React from "react"

import { Icons } from "../icons"

const GeneralInquiries = () => {
  return (
    <>
      <div className="bg-[#ED1C29] w-full  ">
        <div className="p-5">
          <div className="text-white text-[1rem]   max-sm:text-sm font-semibold font-['Poppins'] border-b">
            General Inquiries
          </div>
          <div className="flex gap-3 mt-5">
            <Icons.phoneCall className="text-white w-4 h-4" />
            <div className=" text-[0.9rem] max-sm:text-[12px]  text-white text-md font-normal font-['Poppins']">
              4221 8050
            </div>
          </div>
          <div className="flex gap-3 mt-5 sm:items-center">
            <div>
              <Icons.mail className="text-white w-4 h-4" />
            </div>
            <p className="w-auto text-[0.9rem] max-sm:text-[12px] text-white ">
              uow-bookshop@uow.edu.au
            </p>
          </div>
          <div className="flex gap-3 mt-5 sm:items-center">
            <div>
              <Icons.mapPin className="text-white w-4 h-4" />
            </div>

            <div className=" text-[0.9rem] max-sm:text-[12px]  text-white text-md font-normal font-['Poppins']">
              2 Northfields Avenue Gwynneville NSW 2500
            </div>
          </div>
          <div className="flex gap-3 mt-5 sm:items-center">
            <div>
              <Icons.mapPin className="text-white w-4 h-4" />
            </div>

            <div className=" text-[0.9rem] max-sm:text-[12px]  text-white text-md font-normal font-['Poppins']">
              P.O. Box U100 University of Wollongong P.O. NSW 2500
            </div>
          </div>
          <div className="text-white text-[1rem]   max-sm:text-sm font-semibold font-['Poppins'] border-b border-t mt-5 py-2">
            Specialty Inquiries
          </div>
          <p className="text-white text-md text-[0.9rem] max-sm:text-[12px] mt-3">
            UniShop Manager / Retail & Merchandise
          </p>
          <div className="flex gap-3 mt-5 sm:items-center">
            <div>
              <Icons.globe className="text-white w-4 h-4" />
            </div>

            <div className=" text-[0.9rem] max-sm:text-[12px]  text-white text-md font-normal font-['Poppins']">
              jfisher@uow.edu.au
            </div>
          </div>
          <p className="text-white text-md text-[0.9rem] max-sm:text-[12px] mt-3">
            UniShop Supervisor / Merchandise & Branding
          </p>
          <div className="flex gap-3 mt-5 sm:items-center">
            <div>
              <Icons.globe className="text-white w-4 h-4" />
            </div>

            <div className=" text-[0.9rem] max-sm:text-[12px]  text-white text-md font-normal font-['Poppins']">
              ctobia@uow.edu.au
            </div>
          </div>
          <p className="text-white text-md text-[0.9rem] max-sm:text-[12px] mt-3">
            Book Buyer & Events Coordinator / Academic Liaison Officer
          </p>
        </div>
        <div className="flex justify-end -mt-40 max-sm:hidden">
          <div className="w-48 h-48 bg-stone-50 bg-opacity-10 rounded-full -mr-40 mt-10" />

          <div className="w-96 h-96 bg-white bg-opacity-10 rounded-tl-full rounded-bl-3xl " />
        </div>
      </div>
    </>
  )
}

export default GeneralInquiries
