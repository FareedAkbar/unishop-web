"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { LinkProps } from 'next/link';
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
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white md:text-xs font-serif"
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
                <motion.div
                  layout
                  className="h-full w-max p-4"
                >
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
  const { cartItems, logout, isLoggedIn } = useAuthContext();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [items, setItems] = useState<DataCart[]>([]);
  const path = usePathname();

  useEffect(() => {
    const itemsCart: DataCart[] = typeof cartItems === "string" ? JSON.parse(cartItems) as DataCart[] : cartItems!;
    setItems(itemsCart);
  }, [cartItems]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
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
      <div className="relative flex justify-between rounded-full border border-transparent bg-white shadow-input dark:border-white/[0.2] dark:bg-black">
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
          <div className="justify-end px-8 pt-0 hidden lg:block">
            <div className="flex flex-row">
              <div className="mt-3 pr-2">
                <CgProfile size={30} color="#D2A3A3" />
              </div>

              <div className="flex flex-col mt-2">
                {isLoggedIn ? (
                  <div
                    onClick={handleLogOut}
                    className="hover:text-red-400 text-sm cursor-pointer mt-3 font-semibold font-serif"
                  >
                    Logout
                  </div>
                ) : (
                  <>
                    <Link href="login" className="hover:text-red-400 text-sm font-serif">
                      Login
                    </Link>
                    <Link href="signup" className="hover:text-red-400 text-sm font-serif">
                      Signup
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="justify-end px-8 mt-3 hidden lg:block">
            <div className="relative flex flex-row items-center">
              <div className="relative m-auto pr-2 mt-0">
                <PiShoppingCartSimpleDuotone size={30} color="#D2A3A3" />
                {items.length > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </div>

              <div className="flex flex-col mt-0">
                <Button
                  disabled={path.includes("/checkout")}
                  onClick={toggleSidebar}
                  className="hover:text-red-400 bg-transparent hover:bg-tr text-black text-sm p-0 font-serif"
                >
                  My Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SidebarCart isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
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
          <h4 className="mb-1 text-xl font-bold text-black dark:text-white">
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

interface HoveredLinkProps extends Omit<LinkProps, 'ref'> {
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
      className="text-neutral-700 hover:text-black dark:text-neutral-200 md:text-xs"
    >
      {children}
    </Link>
  );
};
