"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import Input from "./Input"; // Assuming you have an Input component
import Image from "next/image";
import Logo from "../../../public/unishop_logo_new.png";
import { GoHeart } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlinePersonOutline } from "react-icons/md";
import { FiMoon, FiSearch, FiSun } from "react-icons/fi";
import { TbSettings } from "react-icons/tb";
import { HiLogin, HiLogout } from "react-icons/hi";
import { categories } from "~/constants/categories";
import { useAuthContext } from "~/Context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import SidebarCart from "../ui/sideCart/cartSidebar";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import type { CategoryTreeNode, Category as CAT } from "~/types/category";
import { outlet221, outlet223 } from "~/types/tokens";
import {
  FaBook,
  FaGraduationCap,
  FaTshirt,
  FaPen,
  FaGift,
  FaClipboardList,
} from "react-icons/fa";
import {
  AiOutlineFileText,
  AiOutlineContacts,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai";

const Header = () => {
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const {
    logout,
    getGenre,
    cartItems,
    genre,
    getCategory,
    category,
    userInfo,
    isLoggedIn,
    favItems,
    setTheme,
    themeMode,
    checkoutData,
    getFavourite,
  } = useAuthContext();
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const path = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("home");

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State for hamburger menu
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userDropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownToggleRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLButtonElement | null>(null); // Ref for other dropdowns

  const toggleUserDropdown = () => {
    setUserDropdownOpen((prevState) => !prevState);
  };
  const toggleDropdown = (section: string) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const [headerCategory, setHeaderCategory] = useState<
    CategoryTreeNode[] | null
  >(null);
  const [headerCategoryGifts, setHeaderCategoryGifts] = useState<CAT[]>([]);
  const [headerCategoryClothings, setHeaderCategoryClothings] = useState<
    CAT[] | null
  >(null);
  function buildCategoryTree(categories: CAT[]): CategoryTreeNode[] {
    const categoryMap: Record<number, CategoryTreeNode> = {};
    const tree: CategoryTreeNode[] = [];

    categories.forEach((category) => {
      categoryMap[category.id] = {
        id: category.id,
        outlet: category.outlet,
        category_name: category.category_name,
        category_description: category.category_description,
        deleted: category.deleted,
        media_id: category.media_id,
        booknet: category.booknet,
        children: [],
      };
    });

    categories.forEach((category) => {
      if (
        category.parent === 0 &&
        category.booknet == 1 &&
        category.outlet === outlet223
      ) {
        const rootCategory = categoryMap[category.id];
        if (rootCategory) {
          tree.push(rootCategory);
        }
      } else {
        const parent = categoryMap[category.parent];
        if (parent) {
          const childCategory = categoryMap[category.id];
          if (childCategory) {
            parent.children!.push(childCategory);
          }
        }
      }
    });

    return tree;
  }

  const handleSectionClick = (section: string, isDropdown = false) => {
    setActiveSection(section);
    console.log("ss", activeSection);

    router.push(section);

    if (isDropdown) {
      setOpenDropdown(null); // Close dropdown when clicking a section
    }
  };
  useEffect(() => {
    if (!category) return;

    const categoryTree = buildCategoryTree(category);
    // const categoryTreeGift = buildCategoryGifts(category);
    const categoryTreeGift = category.filter(
      (item) => item.gifts == 1 || item.arts == 1,
    );
    const categoryTreeClothing = category.filter((item) => item.clothings == 1);

    console.log(categoryTree);
    setHeaderCategory(categoryTree);
    setHeaderCategoryGifts(categoryTreeGift);
    setHeaderCategoryClothings(categoryTreeClothing);
  }, [category]);
  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node) &&
        dropdownToggleRef.current &&
        !dropdownToggleRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Navigation items array with nested structure for Shop
  // const navItems = [
  //   { label: "Home", href: "/" },
  //   {
  //     label: "Shop",
  //     subItems: [
  //       {
  //         label: "Product 1",
  //         href: "#product1",
  //         onClick: () => handleSectionClick("product1", true),
  //       },
  //       {
  //         label: "Product 2",
  //         href: "#product2",
  //         onClick: () => handleSectionClick("product2", true),
  //       },
  //     ],
  //   },
  //   {
  //     label: "Contact",
  //     href: "/contact-us",
  //     onClick: () => handleSectionClick("/contact-us"),
  //   },
  // ];

  const handleLogout = async () => {
    try {
      void logout();
    } catch (error) {
      console.error("Logout failed:", error); // Handle the error as needed
    }
  };

  // Handle theme toggle
  const toggleTheme = async (theme: string) => {
    if (theme == "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  // Apply theme based on state
  useEffect(() => {
    if (themeMode == "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [themeMode]);

  useEffect(() => {
    // if(genre) return;
    getGenre()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    // if(category) return;
    getCategory()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (checkoutData?.booknet_customer_id) {
        await getFavourite(checkoutData?.booknet_customer_id);
      }
    };
    loadData().catch((error) => {
      console.error("Failed to load data in useEffect:", error);
    });
  }, [checkoutData]);

  const toggleSidebar = () => {
    if (path.includes("/checkout") || path.includes("/placeorder")) return;

    setIsSidebarOpen((prev) => !prev);
  };
  const iconMap: Record<string, JSX.Element> = {
    FaBook: <FaBook className="text-blue-700" />,
    FaGraduationCap: <FaGraduationCap />,
    FaTshirt: <FaTshirt className="text-green-600" />,
    FaPen: <FaPen className="text-yellow-600" />,
    FaGift: <FaGift className="text-purple-600" />,
    FaClipboardList: <FaClipboardList className="text-orange-600" />,
    AiOutlineFileText: <AiOutlineFileText className="text-teal-600" />,
    AiOutlineContacts: <AiOutlineContacts className="text-amber-600" />,
  };
  return (
    <nav className="fixed left-0 top-0 z-[15] h-fit w-full">
      <header className="flex flex-col bg-white px-4 pt-4 backdrop-blur dark:bg-slate-900 md:flex-row md:items-center">
        {/* Top Row: Hamburger, Logo, and Icons (Mobile View) */}
        <div className="flex items-center justify-between border-b pb-4 md:hidden">
          <div
            className="flex-grow cursor-pointer text-center"
            onClick={() => {
              router.push("/");
            }}
          >
            <Image
              src={Logo}
              width={140}
              height={50}
              alt="Logo"
              className="flex-shrink-0 rounded-md shadow-2xl"
            />
          </div>

          {/* Right Section: Heart, Cart, and User Dropdown Icons */}
          <div className="flex items-center space-x-4">
            <div className="relative" onClick={() => router.push("/favorites")}>
              <GoHeart className="cursor-pointer text-xl" />
              {favItems?.length && favItems?.length > 0 ? (
                <span className="absolute -bottom-0 -left-0 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[8px] text-white">
                  {favItems?.length}
                </span>
              ) : (
                ""
              )}
            </div>

            <div className="relative" onClick={() => toggleSidebar()}>
              <IoCartOutline className="cursor-pointer text-xl" />
              {cartItems?.length && cartItems?.length > 0 ? (
                <span className="absolute -bottom-0 -left-0 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[8px] text-white">
                  {cartItems?.length}
                </span>
              ) : (
                ""
              )}
            </div>
            <button onClick={() => toggleTheme(themeMode)}>
              {themeMode == "dark" ? (
                <FiSun className="text-xl text-gray-200" />
              ) : (
                <FiMoon className="text-xl" />
              )}
            </button>
            <div className="relative" ref={userDropdownRef}>
              <button
                ref={dropdownToggleRef}
                className="cursor-pointer rounded-full bg-red-500 p-0.5"
                onClick={toggleUserDropdown}
              >
                <MdOutlinePersonOutline className="text-xl text-white" />
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 z-10 mt-1 w-24 rounded-md bg-white px-1 py-2 shadow-md dark:bg-slate-700">
                  <a
                    href="#account-settings"
                    className="flex items-center p-1 text-[9px] font-medium hover:bg-gray-100 dark:hover:bg-slate-600"
                  >
                    <TbSettings className="mr-2" />
                    Account Settings
                  </a>
                  <a
                    href="#signup"
                    className="flex items-center p-1 text-[9px] font-medium hover:bg-gray-100 dark:hover:bg-slate-600"
                  >
                    <HiLogin className="mr-2" />
                    Sign Up
                  </a>
                  <a
                    href="#login"
                    className="flex items-center p-1 text-[9px] font-medium hover:bg-gray-100 dark:hover:bg-slate-600"
                  >
                    <HiLogout className="mr-2" />
                    Login
                  </a>
                  <a
                    href="#logout"
                    className="flex items-center p-1 text-[9px] font-medium hover:bg-gray-100 dark:hover:bg-slate-600"
                  >
                    <HiLogin className="mr-2" />
                    Logout
                  </a>
                </div>
              )}
            </div>
            <button
              className={`z-30 p-3 ${isMobileMenuOpen ? "bg-white" : ""}`} // You can adjust the background color if needed
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FaBars className="text-xl text-red-500" />
            </button>
          </div>
        </div>

        {/* Search Bar (Visible on Small Screens) */}
        <div className="mx-2 mt-2 md:hidden">
          <Input
            placeholder="What are you looking for?"
            value={searchTerm}
            onChange={handleSearchChange}
            icon={<FiSearch />}
            width="w-full "
          />
        </div>

        {/* Mobile Menu for Navigation Items */}
        {isMobileMenuOpen && (
          <>
            {/* Overlay to reduce opacity */}
            <div
              className="fixed inset-0 z-20 h-screen bg-black bg-opacity-50" // Dark overlay
              onClick={() => setMobileMenuOpen(false)} // Close the menu on overlay click
            />

            <button
              className={`fixed right-5 top-5 z-40 sm:block md:hidden ${isMobileMenuOpen ? "bg-white dark:bg-slate-700" : ""}`} // Ensure z-30 is applied
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FaTimes className="text-xl text-red-500" />
            </button>

            <nav className="fixed right-0 top-0 z-30 flex h-[80vh] w-full flex-col overflow-scroll bg-white p-6 dark:bg-slate-700 md:hidden md:w-1/2">
              <button
                onClick={() => {
                  router.push("/");
                }}
                className="mb-4 flex w-full items-center justify-between text-lg focus:outline-none"
              >
                <div className="flex items-center space-x-2">
                  <AiOutlineHome className="mr-1 text-red-500" />
                  <span>Home</span>
                </div>
              </button>
              {categories.map((item) => (
                <div key={item.label} className="mb-4">
                  <button
                    onClick={() =>
                      item.subItems ? toggleDropdown(item.label) : null
                    }
                    className="flex w-full items-center justify-between text-lg focus:outline-none"
                  >
                    <div className="flex items-center">
                      {item.icon && (
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        <span className="mr-3">{iconMap[item.icon]}</span>
                      )}
                      <Link href={item.href ?? ""} scroll={false}>
                        {item.label}
                      </Link>
                    </div>{" "}
                    {item.subItems ? (
                      openDropdown === item.label ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )
                    ) : null}
                  </button>
                  {item.subItems && openDropdown === item.label && (
                    <div className="ml-4 mt-1">
                      {item.subItems.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          className="block py-1 text-sm text-gray-700 hover:underline dark:text-gray-300"
                        >
                          {subItem.label}
                        </a>
                      ))}
                      {item.label === "Books" && genre && (
                        <ScrollArea className="h-[25vh]">
                          {genre?.map((subItem) => (
                            <Link
                              key={subItem.genre}
                              href={`books?detail=${subItem.genre}`}
                              className="block py-1 text-sm hover:underline"
                              onClick={() => setOpenDropdown(null)}
                              passHref
                            >
                              {subItem.genre}
                            </Link>
                          ))}
                        </ScrollArea>
                      )}
                      {item.label === "Text Book" && headerCategory?.[0] && (
                        <ScrollArea className="h-[25vh]">
                          {headerCategory?.[0]?.children?.map((subItem) => (
                            <Link
                              key={subItem.id}
                              href={`textbooks?detail=${subItem.id}`}
                              className="block py-1 text-sm hover:underline"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {subItem.category_name}
                            </Link>
                          ))}
                        </ScrollArea>
                      )}
                      {item.label === "Art & Gifts" &&
                        headerCategoryGifts?.[0] &&
                        headerCategoryGifts?.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={`gifts?detail=${subItem.id}`}
                            className="block py-1 text-sm hover:underline"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {subItem.category_name}
                          </Link>
                        ))}
                      {item.label === "Merch & Clothing" &&
                        headerCategoryClothings?.[0] &&
                        headerCategoryClothings.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={`cloths?detail=${subItem.id}`}
                            className="block py-1 text-sm hover:underline"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {subItem.category_name}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={() => {
                  //
                }}
                className="mb-4 flex w-full items-center justify-between text-lg focus:outline-none"
              >
                <div className="flex cursor-pointer items-center space-x-2">
                  <HiLogin className="mr-1 text-gray-600 dark:text-gray-300" />
                  <span>Logout</span>
                </div>
              </button>
            </nav>
          </>
        )}

        {/* Desktop Layout */}
        <div className="mt-4 hidden w-full border-b pb-4 md:flex md:items-center md:justify-between">
          <div className="flex w-full items-center">
            <div
              className="flex-grow cursor-pointer text-left"
              onClick={() => {
                router.push("/");
              }}
            >
              <Image
                src={Logo}
                width={140}
                height={50}
                alt="Logo"
                className="flex-shrink-0 rounded-md shadow-2xl"
              />
            </div>

            {/* <nav className="justify- flex flex-grow space-x-6">
              {navItems.map((item, id) => (
                <div key={id} className="group relative">
                  <button
                    onClick={() =>
                      item.subItems
                        ? toggleDropdown(item.label)
                        : handleSectionClick(item.label.toLowerCase())
                    }
                    className={`relative flex items-center ${item.subItems ? "cursor-pointer" : ""}`}
                    ref={dropdownRef}
                  >
                    <span
                      className={`${activeSection === item.href ? "font-bold text-red-500 underline" : ""}`}
                    >
                      {item.label}
                    </span>
                    {item.subItems && (
                      <span className="ml-1">
                        {openDropdown === item.label ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                    )}
                  </button>
                  {item.subItems && openDropdown === item.label && (
                    <div className="absolute z-10 mt-1 w-40 bg-white shadow-md">
                      {item.subItems.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          onClick={subItem.onClick} // Call the onClick for subItems
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav> */}

            {/* Right Section: Search Bar and Icons */}
            <div className="flex items-center space-x-4">
              <Input
                placeholder="What are you looking for?"
                value={searchTerm}
                onChange={handleSearchChange}
                icon={<FiSearch size={26} />}
                width="w-56"
                animateOnClick={true}
              />
              <div
                className="relative"
                onClick={() => router.push("/favorites")}
              >
                <GoHeart className="cursor-pointer text-3xl" />
                {favItems?.length && favItems?.length > 0 ? (
                  <span className="absolute right-4 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {favItems?.length}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="relative" onClick={() => toggleSidebar()}>
                <IoCartOutline className="cursor-pointer text-3xl" />
                {cartItems?.length && cartItems?.length > 0 ? (
                  <span className="absolute right-4 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {cartItems?.length}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <button onClick={() => toggleTheme(themeMode)}>
                {themeMode == "dark" ? (
                  <FiSun className="p-0.5 text-3xl text-gray-200" />
                ) : (
                  <FiMoon className="text-3xl" />
                )}
              </button>

              <div className="relative">
                <button
                  className="cursor-pointer rounded-full bg-red-500"
                  onClick={toggleUserDropdown}
                  ref={dropdownToggleRef}
                >
                  <MdOutlinePersonOutline className="p-0.5 text-3xl text-white" />
                </button>
                {isUserDropdownOpen && (
                  <div
                    ref={userDropdownRef}
                    className="absolute right-0 z-10 mt-1 w-40 rounded-md bg-white px-1 py-2 shadow-md dark:bg-slate-700"
                  >
                    {userInfo?.first_name && (
                      <span className="text-md p-1 font-medium">
                        {userInfo?.first_name} {userInfo?.last_name}
                      </span>
                    )}

                    <a
                      href="#account-settings"
                      className="flex items-center p-1 text-sm font-medium hover:bg-gray-100 dark:hover:bg-slate-600"
                    >
                      <TbSettings className="mr-2" />
                      Account Setting
                    </a>
                    {isLoggedIn && (
                      <Link
                        onClick={() => handleLogout()}
                        href=""
                        className="flex items-center p-1 text-sm font-medium hover:bg-gray-100 dark:hover:bg-slate-600"
                      >
                        <HiLogin className="mr-2" />
                        Logout
                      </Link>
                    )}

                    {!isLoggedIn && (
                      <Link
                        // onClick={() => handleLogout()}
                        href="/login"
                        className="flex items-center p-1 text-sm font-medium hover:bg-gray-100 dark:hover:bg-slate-600"
                      >
                        <HiLogout className="mr-2" />
                        Login
                      </Link>
                    )}

                    <Link
                      onClick={() => handleLogout()}
                      href="/signup"
                      className="flex items-center p-1 text-sm font-medium hover:bg-gray-100 dark:hover:bg-slate-600"
                    >
                      <HiLogin className="mr-2" />
                      Signup
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <SidebarCart
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </nav>
  );
};

export default Header;
