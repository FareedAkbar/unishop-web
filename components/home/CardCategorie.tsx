import React from "react"

import { catogaryList } from "@/types/nav"

import { Icons } from "../icons"

const CardCategorie = ({ name }: catogaryList) => {
  return (
    <div
      key={name}
      className="flex pt-2 cursor-pointer hover:text-[#ED1C29 ] justify-between items-center"
    >
      <p className="text-[1.375] ">{name}</p>
      <Icons.chevronRight />
    </div>
  )
}

export default CardCategorie
