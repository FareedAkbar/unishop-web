import React, { useContext } from "react"
import { ContextApiData } from "@/context/ContextGlobal"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import { Icons } from "../icons"

const Outlet = ({ data }: any) => {
  const { setOutletId, OutletGetById } = useContext(ContextApiData)

  const handleByIdOutlet = (id: any) => {
    setOutletId(id)
  }
  //   console.log(OutletGetById)
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border bg-[#F0EEEDB2]">
      <div className="flex w-max  space-x-4 p-4 ">
        {data?.map((item: any, index: any) => (
          <div key={index} className="flex gap-4">
            <div
              onClick={() => handleByIdOutlet(item?.outlet_id)}
              className="text-center hover:underline cursor-pointer  text-neutral-500 text-[1rem] font-medium font-['Poppins'] leading-normal"
            >
              {item?.outlet_name}
            </div>
            <Icons.outletIcon />
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export default Outlet
