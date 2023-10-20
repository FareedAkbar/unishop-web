import Link from "next/link"

import { Icons } from "@/components/icons"
import ProductCardPaginate from "@/components/resauble/ProductCardPaginate"

const Category = () => {
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
        </div>
        <Link
          href={"/filter"}
          className="w-40 h-10 mt-5  bg-red-600 rounded-sm flex jus  text-white justify-center text-sm font-medium font-['Poppins'] items-center "
        >
          Apply Filter
        </Link>
        <div className="w-full">
          <ProductCardPaginate />
        </div>
      </div>
    </div>
  )
}

export default Category
