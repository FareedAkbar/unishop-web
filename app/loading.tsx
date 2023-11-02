"use client"

import React from "react"
import { Triangle } from "react-loader-spinner"

const loading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Triangle
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  )
}

export default loading
