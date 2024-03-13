import React, { useContext, useEffect, useRef } from "react"
import { ContextApiData } from "@/context/ContextGlobal"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import { Icons } from "../icons"

const Outlet = ({ data }: any) => {
  const { setOutletId } = useContext(ContextApiData)

  useEffect(() => {
    if (data && data.length > 0) {
      const initialOutletId = data[0].outlet_id
      setOutletId(initialOutletId)
    }
  }, [])

  const handleByIdOutlet = (id: any) => {
    setOutletId(id)
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="whitespace-nowrap  flex rounded-md border dark:bg-black bg-[#F0EEEDB2] p-1">
        <div className="flex gap-10 justify-between element-to-animate slide  w-full">
          {data?.map((item: any, index: any) => (
            <>
              <div key={index} className="flex gap-10 ">
                <div
                  onClick={() => handleByIdOutlet(item?.outlet_id)}
                  className="text-center text-[#ED1C29] hover:underline cursor-pointer dark:text-white  text-[1rem] font-medium font-['Poppins'] leading-normal"
                >
                  {item?.outlet_name}
                </div>
                <Icons.outletIcon className="animate-slowSpin animate-spin-slow " />
              </div>
            </>
          ))}
          {data?.map((item: any, index: any) => (
            <>
              <div key={index} className="flex gap-10 ">
                <div
                  onClick={() => handleByIdOutlet(item?.outlet_id)}
                  className="text-center text-[#ED1C29] hover:underline cursor-pointer dark:text-white  text-[1rem] font-medium font-['Poppins'] leading-normal"
                >
                  {item?.outlet_name}
                </div>
                <Icons.outletIcon className="animate-slowSpin animate-spin-slow " />
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Outlet
