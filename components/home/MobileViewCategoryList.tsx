"use client"

import React, { useContext } from "react"
import { ContextApiData } from "@/context/ContextGlobal"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import { Icons } from "../icons"

const MobileViewCategoryList = () => {
  const { CatogaryList } = useContext(ContextApiData)

  return (
    <div className="container flex gap-4">
      <div className="overflow-x-auto overflow-y-auto relative z-10">
        <div className="min-w-full min-h-full flex whitespace-no-wrap">
          {CatogaryList?.data?.map((item: any, index: any) => (
            <NavigationMenu key={index}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    {item.menu_name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="">
                    <NavigationMenuLink>{item.menu_name}</NavigationMenuLink>
                    <NavigationMenuLink>{item.menu_name}</NavigationMenuLink>
                    <NavigationMenuLink>{item.menu_name}</NavigationMenuLink>
                    <NavigationMenuLink>{item.menu_name}</NavigationMenuLink>
                    <NavigationMenuLink>{item.menu_name}</NavigationMenuLink>
                    <NavigationMenuLink>{item.menu_name}</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MobileViewCategoryList
