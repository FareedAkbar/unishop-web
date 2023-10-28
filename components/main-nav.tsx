"use client"

import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const [Menu, setMenu] = React.useState(false)

  return (
    <div className="flex gap-6 md:gap-10   ">
      <div className="flex items-center gap-5">
        <Icons.menu
          onClick={() => setMenu(true)}
          className="max-sm:w-5 max-sm:h-5 cursor-pointer hidden max-md:block text-[#ED1C29]"
        />
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo className="w-[10.25rem] h-[3.25rem] max-sm:w-[4rem] max-sm:h-[1rem] max-md:w-[5rem] max-md:h-[2rem] " />
        </Link>
      </div>
      <nav
        className={`flex gap-6   ${
          Menu
            ? "block flex-col top-0 bg-white dark:bg-black border max-md:block left-0 absolute h-screen  w-2/3 p-5"
            : "max-md:hidden"
        }`}
      >
        {Menu ? (
          <div className="flex justify-between items-center">
            <p className="font-bold w-full  dark:text-white text-lg font-['Poppins'] border-b pb-2">
              Catogery
            </p>
            <div>
              <Icons.x onClick={() => setMenu(false)} />
            </div>
          </div>
        ) : (
          ""
        )}
        {items?.map(
          (item, index) =>
            item.href && (
              <>
                {!item.subMenu && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center top-0 max-md:mt-4 hover:underline  p-1 text-[1rem]  font-normal",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    <p
                      onClick={() => setMenu(false)}
                      className="font-['Poppins'] "
                    >
                      {item.title}{" "}
                    </p>
                  </Link>
                )}

                {item.subMenu && (
                  <NavigationMenu className="   ">
                    <NavigationMenuList className="w-full black   max-md:-ml-3 max-md:mt-5 flex justify-start">
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className=" ">
                          <Link
                            key={index}
                            href={item.href}
                            className={cn(
                              "flex items-center  hover:underline  text-[1rem] font-normal",
                              item.disabled && "cursor-not-allowed opacity-80"
                            )}
                          >
                            <p className="font-['Poppins'] ">{item.title} </p>
                          </Link>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className=" p-2 dark:bg-white">
                          {item.subMenu?.map((item, index) => (
                            <Link
                              key={index}
                              href={item?.href}
                              className={cn(
                                "flex items-center hover:font-bold hover:bg-[#F5F5F5] mt-2  w-[10rem]  text-[1rem] font-normal",
                                item.disabled && "cursor-not-allowed opacity-80"
                              )}
                            >
                              <p
                                onClick={() => setMenu(false)}
                                className="font-['Poppins'] dark:text-black  "
                              >
                                {item.title}{" "}
                              </p>
                            </Link>
                          ))}
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                )}
              </>
            )
        )}
        <div className="h-3"> </div>
        {Menu && (
          <Link className="ml-1 text-lg mt-5 font-['Poppins']" href={" /login"}>
            Login
          </Link>
        )}
      </nav>
    </div>
  )
}
