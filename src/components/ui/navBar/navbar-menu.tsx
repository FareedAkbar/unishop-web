"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { LinkProps } from "next/link";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import Logo from "../../../../public/unishop_logo_new.png";
import VerticalDropdownNav from "./mobileNav";
import SidebarCart from "../sideCart/cartSidebar";
import { Button } from "../button";
import { useAuthContext } from "~/Context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import type DataCart from "~/types/book";
import { Avatar, AvatarImage } from "../avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      onMouseEnter={() => setActive(item)}
      className="relative hidden lg:block"
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer font-sans text-black hover:opacity-[0.9] dark:text-white md:text-xs"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute left-16 top-[calc(100%_+_1.2rem)] -translate-x-1/2 transform pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="overflow-hidden rounded-2xl border border-black/[0.2] bg-white shadow-xl backdrop-blur-sm dark:border-white/[0.2] dark:bg-black"
              >
                <motion.div layout className="h-full w-max p-4 font-sans">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  const { cartItems, logout, isLoggedIn, userInfo } = useAuthContext();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [items, setItems] = useState<DataCart[]>([]);
  const path = usePathname();

  useEffect(() => {
    const itemsCart: DataCart[] =
      typeof cartItems === "string"
        ? (JSON.parse(cartItems) as DataCart[])
        : cartItems!;
    setItems(itemsCart);
  }, [cartItems]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleLogOut = async () => {
    try {
      await logout(); // Await the logout promise
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error); // Handle the error as needed
    }
  };

  return (
    <>
      <div className="relative flex justify-between rounded-full border bg-white shadow-input dark:border-white/[0.2] dark:bg-black">
        <div className="flex justify-between">
          <div className="justify-end px-8 lg:hidden">
            <VerticalDropdownNav />
          </div>
          <div className="flex justify-end p-3">
            <Image
              src={Logo}
              width={140}
              height={50}
              alt=""
              className="flex-shrink-0 rounded-md shadow-2xl"
            />
          </div>
        </div>
        <div className="hidden lg:block">
          <nav
            onMouseLeave={() => setActive(null)}
            className="flex justify-center space-x-8 py-6"
          >
            {children}
          </nav>
        </div>

        <div className="flex flex-row">
          <div className="hidden justify-end px-8 pt-0 lg:block">
            <div className="flex flex-row">
              {isLoggedIn && userInfo?.object_path ? (
                <div className="mt-3 pr-2">
                  <Avatar>
                    <AvatarImage
                      src={`https://ipos-storage.s3.amazonaws.com/${userInfo?.object_path}`}
                      alt=""
                    />
                  </Avatar>
                </div>
              ) : (
                <>
                  <div className="mt-3 pr-2">
                    <CgProfile size={30} color="#D2A3A3" />
                  </div>
                </>
              )}

              <div className="mt-3 flex flex-col">
                {isLoggedIn ? (
                  <>
                  {userInfo?.first_name && (
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="cursor-pointer hover:bg-zinc-200 p-2 rounded">
                    {userInfo.first_name} {userInfo.last_name}
                    </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          Profile
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Billing
                          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Settings
                          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                       
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem>Email</DropdownMenuItem>
                              <DropdownMenuItem>Message</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>More...</DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem>
                          New Team
                          <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>GitHub</DropdownMenuItem>
                      <DropdownMenuItem>Support</DropdownMenuItem>
                      <DropdownMenuItem disabled>API</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={()=>handleLogOut()}>
                        Log out
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                    
                  )}
                   {/* <div
                    onClick={handleLogOut}
                    className="cursor-pointer font-sans text-sm font-semibold hover:text-red-400"
                  >
                    Logout
                  </div> */}
                  </>
                  
                 
                ) : (
                  <>
                    <Link
                      href="login"
                      className="font-sans text-sm hover:text-red-400"
                    >
                      Login
                    </Link>
                    <Link
                      href="signup"
                      className="font-sans text-sm hover:text-red-400"
                    >
                      Signup
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="mt-3 hidden justify-end px-8 lg:block">
            <div className="relative flex flex-row items-center">
              <div className="relative m-auto mt-0 pr-2">
                <PiShoppingCartSimpleDuotone size={30} color="#D2A3A3" />
                {items.length > 0 && (
                  <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-900 text-xs font-bold text-white">
                    {items.length}
                  </span>
                )}
              </div>

              <div className="mt-0 flex flex-col">
                <Button
                  disabled={
                    path.includes("/checkout") || path.includes("/placeorder")
                  }
                  onClick={toggleSidebar}
                  className="hover:bg-tr bg-transparent p-0 font-sans text-sm text-black hover:text-red-400"
                >
                  My Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SidebarCart
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
  setActive,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
  setActive: (item: string | null) => void;
}) => {
  return (
    <div onClick={() => setActive(null)}>
      <Link href={href} className="flex space-x-2">
        <Image
          src={src}
          width={140}
          height={70}
          alt={title}
          className="flex-shrink-0 rounded-md shadow-2xl"
        />
        <div>
          <h4 className="mb-1 font-sans text-xl font-bold text-black dark:text-white">
            {title}
          </h4>
          <p className="max-w-[10rem] text-sm text-neutral-700 dark:text-neutral-300">
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
};

interface HoveredLinkProps extends Omit<LinkProps, "ref"> {
  children: React.ReactNode;
}
export const HoveredLink = ({ children, ...rest }: HoveredLinkProps) => {
  // Ensure `href` is provided
  if (!rest.href) {
    throw new Error("The 'href' prop is required for HoveredLink.");
  }

  return (
    <Link
      {...rest}
      className="font-sans text-neutral-700 hover:text-black dark:text-neutral-200 md:text-xs"
    >
      {children}
    </Link>
  );
};
