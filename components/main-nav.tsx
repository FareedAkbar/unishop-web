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
  return (
    <div className="flex gap-6 md:gap-10 ">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="w-[10.25rem] h-[3.25rem] max-md:w-[5rem] max-md:h-[2rem] " />
      </Link>
      {items?.length ? (
        <nav className="flex max-md:hidden gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <>
                  {!item.subMenu && (
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
                  )}
                  {item.subMenu && (
                    <NavigationMenu>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger>
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
                            {item.subMenu?.map((item) => (
                              <Link
                                key={index}
                                href={item?.href}
                                className={cn(
                                  "flex items-center hover:font-bold hover:bg-[#F5F5F5] mt-2  w-[10rem]  text-[1rem] font-normal",
                                  item.disabled &&
                                    "cursor-not-allowed opacity-80"
                                )}
                              >
                                <p className="font-['Poppins'] dark:text-black  ">
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
        </nav>
      ) : null}
    </div>
  )
}
