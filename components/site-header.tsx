import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import CartProductAdd from "./cartnav/CartProductAdd"

export function SiteHeader() {
  return (
    <header className="bg-background sticky py-1 top-0 z-40 w-full border-b">
      <div className="container flex h-16 max-md:gap-5 max-sm:h-12 items-center space-x-4 max-sm:space-x-0 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1   items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <div className="flex flex-1  items-center justify-end space-x-4 max-sm:space-x-2 dark:text-black">
              <div className="w-[21.6875rem] max-md:w-full gap-1 px-2  max-sm:w-full flex justify-evenly items-center h-[2.875rem] max-sm:h-8 bg-[#F0EEED]">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-[14.875rem] max-md:w-full  max-sm:w-[5rem] h-[1.8rem] max-sm:text-[12px] max-sm:h-8 outline-none  bg-[#F0EEED]"
                />
                <Icons.search className="h-[1.5rem] max-sm:w-4 max-sm:h-4 w-[1.5rem]" />
              </div>
              <Link href={"/wishlist"}>
                <Icons.heart className="dark:text-white max-sm:w-4 max-sm:h-4  cursor-pointer hover:text-[#ED1C29]" />
              </Link>

              <CartProductAdd />
              <Link
                href={"/editprofile"}
                className="w-8 max-sm:w-4 max-sm:h-4  h-8   hover:bg-[#ED1C29] flex justify-center items-center rounded-full"
              >
                <Icons.profile className="text-black dark:text-white hover:text-white " />
              </Link>
            </div>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
