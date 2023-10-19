"use client"

import React, { useState } from "react"
import Link from "next/link"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "@/components/icons"
import CardProduct from "@/components/resauble/CardProduct"

const Category = () => {
  const itemsPerPage = 8
  const [currentPage, setCurrentPage] = useState(1)

  const products = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
  }))

  const totalPages = Math.ceil(products.length / itemsPerPage)

  const getPageNumbers = () => {
    const pageNumbers = []
    const visiblePages = 5 // Number of page numbers to display

    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else if (currentPage <= visiblePages - 1) {
      for (let i = 1; i <= visiblePages - 1; i++) {
        pageNumbers.push(i)
      }
      pageNumbers.push("...")
      pageNumbers.push(totalPages)
    } else if (currentPage >= totalPages - visiblePages + 2) {
      pageNumbers.push(1)
      pageNumbers.push("...")
      for (let i = totalPages - visiblePages + 2; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)
      pageNumbers.push("...")
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i)
      }
      pageNumbers.push("...")
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const visibleProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="">
      <div className="container py-5 font-['Poppins']">
        <div className="flex justify-between flex-wrap   ">
          <div className="flex items-center max-sm:hidden">
            <div className=" h-4 justify-start items-center gap-1 inline-flex">
              <div className="text-black dark:text-white text-opacity-60 text-base  font-normal text-[1rem] font-['Poppins']">
                Home
              </div>
              <Icons.chevronRight className="w-5 h-5 " />
            </div>
            <div className=" h-4 justify-start items-center gap-1 inline-flex">
              <div className="text-black dark:text-white text-opacity-60 text-base font-normal text-[1rem] font-['Poppins']">
                Text Books
              </div>
              <Icons.chevronRight className="w-5 h-5 " />
            </div>
            <div className="text-black text-base dark:text-white font-normal font-['Poppins']">
              Engineering and Information Sciences EIS
            </div>
          </div>

          <div className="flex justify-end items-center max-sm:flex-col">
            <div className="text-black text-opacity-60 text-base font-normal font-['Poppins']">
              Showing{" "}
              {Math.min((currentPage - 1) * itemsPerPage + 1, products.length)}-
              {Math.min(currentPage * itemsPerPage, products.length)} of{" "}
              {products.length} Products
            </div>

            <div className="flex max-sm:mt-3">
              <span className="text-black text-opacity-60 text-base font-normal font-['Poppins']">
                Sort by:{" "}
              </span>
              <Select>
                <SelectTrigger className="w-[180px] max-sm:w-[100px]  h-[0.3rem] outline-none border-none text-black text-base font-medium">
                  <SelectValue placeholder="Sort" className="outline-none" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Top Sales">Top Sales</SelectItem>
                  <SelectItem value="New Arrivals">New Arrivals</SelectItem>
                  <SelectItem value="Name">Name</SelectItem>
                  <SelectItem value="Price">Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Link
          href={"/filter"}
          className="w-40 h-10 mt-5  bg-red-600 rounded-sm flex jus  text-white justify-center text-sm font-medium font-['Poppins'] items-center "
        >
          Apply Filter
        </Link>
        <div className="flex flex-wrap justify-center overflow-hidden  py-5">
          {visibleProducts.map((product) => (
            <CardProduct />
          ))}
        </div>
        <div className="flex justify-between flex-wrap max-sm:justify-center ">
          <button
            className="w-36 h-12 px-3.5 py-2 bg-white rounded-lg border border-black border-opacity-10 justify-center items-center gap-2 inline-flex"
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
            disabled={currentPage === 1}
          >
            <Icons.arrowLeft className="w-5 h-5 relative dark:text-black" />
            <div className="text-black text-lg font-medium font-['Poppins'] leading-tight">
              Previous
            </div>
          </button>
          <div>
            <div className="flex gap-2 max-sm:py-5">
              {getPageNumbers().map((pageNumber, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 bg-black bg-opacity-5 dark:text-white  rounded-lg justify-center items-center inline-flex ${
                    currentPage === pageNumber
                      ? "bg-blue-500 dark:bg-white dark:text-black text-black font-bold"
                      : "text-black"
                  }`}
                  onClick={() =>
                    typeof pageNumber === "number" && setCurrentPage(pageNumber)
                  }
                >
                  <div className="text-center dark:text-black">
                    {pageNumber}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="w-32 h-12 px-3.5 py-2 bg-white rounded-lg border border-black border-opacity-10 justify-center items-center gap-2 inline-flex"
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            disabled={currentPage === totalPages}
          >
            <div className="text-black text-lg font-medium font-['Poppins'] leading-tight">
              Next
            </div>
            <Icons.arrowLeft className="w-5 h-5 relative rotate-180 dark:text-black" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Category
