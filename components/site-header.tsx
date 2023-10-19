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
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <div className="flex flex-1 max-sm:hidden items-center justify-end space-x-4 dark:text-black">
              <div className="w-[21.6875rem] flex justify-evenly items-center h-[2.875rem] bg-[#F0EEED]">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-[14.875rem] h-[1.8rem] outline-none  bg-[#F0EEED]"
                />
                <Icons.search className="h-[1.5rem] w-[1.5rem]" />
              </div>
              <Link href={"/wishlist"}>
                <Icons.heart className="dark:text-white cursor-pointer hover:text-[#ED1C29]" />
              </Link>

              <CartProductAdd />
              <Link
                href={"/editprofile"}
                className="w-8  h-8   bg-[#ED1C29] flex justify-center items-center rounded-full"
              >
                <Icons.profile className="text-white" />
              </Link>
            </div>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
