"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  FaChevronDown,
  FaBars,
  FaChevronRight,
  FaTimes,
  FaHome,
  FaPhoneAlt,
} from "react-icons/fa";
import Input from "./Input";
import Image from "next/image";
import Logo from "../../../public/unishop_logo_new.png";
import { GoHeart } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlinePersonOutline } from "react-icons/md";
import { FiMoon, FiSearch, FiSun } from "react-icons/fi";
import { TbSettings } from "react-icons/tb";
import { HiLogin, HiLogout, HiOutlineMoon } from "react-icons/hi";
import { categories } from "~/constants/categories";
import { useAuthContext } from "~/Context/AuthContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SidebarCart from "../ui/sideCart/cartSidebar";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";

import { ScrollArea } from "../ui/scroll-area";
import type {
  CategoryTreeNode,
  Category as CAT,
  SuperCategory,
  SideBarCategory,
} from "~/types/category";
import {
  FaBook,
  FaGraduationCap,
  FaTshirt,
  FaPen,
  FaGift,
  FaClipboardList,
} from "react-icons/fa";
import { AiOutlineFileText, AiOutlineContacts } from "react-icons/ai";
import { PiMoon, PiMoonLight } from "react-icons/pi";
import Select from "../Fields/select";

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
    getProductTagStatus,
    productTags,
    getSubCategory,
    subCategory,
    getCheckoutFormData,
    getTextBookType,
  } = useAuthContext();
  const router = useRouter();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const path = usePathname();
  type newCAt = {
    label: string;
    value: string;
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<newCAt | null>(null);

  const [searchError, setSearchError] = useState("");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownToggleRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLButtonElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

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
    SideBarCategory[] | null
  >(null);

  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const params = useSearchParams();

  // function buildCategoryTree(categories: CAT[]): CategoryTreeNode[] {
  //   const categoryMap: Record<number, CategoryTreeNode> = {};
  //   const tree: CategoryTreeNode[] = [];

  //   categories.forEach((category) => {
  //     categoryMap[category.id] = {
  //       id: category.id,
  //       outlet: category.outlet,
  //       category_name: category.category_name,
  //       category_description: category.category_description,
  //       deleted: category.deleted,
  //       object_path: category.object_path ? category.object_path : '',
  //       media_id: category.media_id,
  //       booknet: category.booknet,
  //       children: [],
  //     };
  //   });

  //   categories.forEach((category) => {
  //     if (
  //       category.parent === 0 &&
  //       category.booknet == 1 &&
  //       category.outlet === process.env.NEXT_PUBLIC_PASSKEY_OUTLET
  //     ) {
  //       const rootCategory = categoryMap[category.id];
  //       if (rootCategory) {
  //         tree.push(rootCategory);
  //       }
  //     } else {
  //       const parent = categoryMap[category.parent];
  //       if (parent) {
  //         const childCategory = categoryMap[category.id];
  //         if (childCategory) {
  //           parent.children!.push(childCategory);
  //         }
  //       }
  //     }
  //   });

  //   return tree;
  // }

  type CategoriesMap = Record<number, SuperCategory & { children: CAT[] }>;

  const categoriesMap: CategoriesMap = (category ?? []).reduce((acc, cat) => {
    if (cat.category_type_id) {
      acc[cat.category_type_id] = { ...cat, children: [] };
    }
    return acc;
  }, {} as CategoriesMap);

  // Link each item in subCategory to its respective category in categoriesMap
  subCategory?.forEach((item) => {
    const { category_type_id, outlet } = item;
    const targetCategory = categoriesMap[category_type_id];
    if (targetCategory && targetCategory.outlet_id === outlet) {
      targetCategory.children.push(item);
    }
  });

  // const handleSectionClick = (section: string, isDropdown = false) => {
  //   setActiveSection(section);
  //   console.log("ss", activeSection);

  //   router.push(section);

  //   if (isDropdown) {
  //     setOpenDropdown(null);
  //   }
  // };

  // Extend Category1 to include children
  interface CategoryTreeNode2 extends CAT {
    children: CategoryTreeNode2[];
  }

  const buildCategoryTree = (categories: CAT[]): CategoryTreeNode2[] => {
    const categoriesMap: Record<number, CategoryTreeNode2> = {};

    // Step 1: Organize categories by ID
    categories.forEach((cat) => {
      categoriesMap[cat.id] = { ...cat, children: [] };
    });

    const categoryTree: CategoryTreeNode2[] = [];

    // Step 2: Build the tree structure
    categories.forEach((cat) => {
      if (cat.parent === 0) {
        // Root category
        const rootCategory = categoriesMap[cat.id];
        if (rootCategory) {
          categoryTree.push(rootCategory);
        }
      } else {
        const parentCategory = categoriesMap[cat.parent];
        if (parentCategory) {
          const categoryToAdd = categoriesMap[cat.id];
          if (categoryToAdd) {
            parentCategory.children.push(categoryToAdd);
          } else {
            console.error(`Category ID ${cat.id} not found in map.`);
          }
        } else {
          console.error(`Parent Category ID ${cat.parent} not found in map.`);
        }
      }
    });

    return categoryTree;
  };

  useEffect(() => {
    if (!category || !subCategory) return;

    const x = buildCategoryTree(subCategory); // This should return CategoryTreeNode2[]
    const categoriesMap: CategoriesMap = (category ?? []).reduce((acc, cat) => {
      if (cat.category_type_id) {
        acc[cat.category_type_id] = { ...cat, children: [] };
      }
      return acc;
    }, {} as CategoriesMap);

    if (Array.isArray(x) && x.length > 0) {
      // Get all children from the built category tree
      const allChildren: CAT[] = x.flatMap((node) => node.children);
      allChildren.forEach((item: CAT) => {
        const { category_type_id, outlet } = item;
        const targetCategory = categoriesMap[category_type_id];
        if (targetCategory && targetCategory.outlet_id === outlet) {
          targetCategory.children.push(item);
        }
      });

      const result = Object.values(categoriesMap);
      setHeaderCategory(result);
    } else {
      subCategory.forEach((item: CAT) => {
        const { category_type_id, outlet } = item;
        const targetCategory = categoriesMap[category_type_id];
        if (targetCategory && targetCategory.outlet_id === outlet) {
          targetCategory.children.push(item);
        }
      });
      const result = Object.values(categoriesMap);
      setHeaderCategory(result);
    }
  }, [category, subCategory]);

  // Close the dropdown if clicked outside
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleClickOutside = (event: MouseEvent) => {
        // Don't close if clicking on a link or button
        const target = event.target as HTMLElement;
        if (target.tagName === "A" || target.tagName === "BUTTON") {
          return;
        }

        if (
          userDropdownRef.current &&
          !userDropdownRef.current.contains(target) &&
          dropdownToggleRef.current &&
          !dropdownToggleRef.current.contains(target)
        ) {
          setUserDropdownOpen(false);
        }
        if (dropdownRef.current && !dropdownRef.current.contains(target)) {
          setOpenDropdown(null);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  const handleLogout = async () => {
    console.log("logout clicked");

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
    if (typeof window !== "undefined") {
      if (themeMode == "dark") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }
  }, [themeMode]);


  useEffect(() => {
    // if(category) return;
    void getGenre();
    void getCheckoutFormData();
    void getCategory();
    void getSubCategory(-1);
    void getTextBookType();
    
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (checkoutData?.customer_id) {
        await getFavourite(checkoutData?.customer_id);
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

  interface SubcategoryListProps1 {
    subItems: CategoryTreeNode[];
    openCategories: string[];
    toggleCategory: (label: string) => void;
    setOpenCategories: React.Dispatch<React.SetStateAction<string[]>>;
    item: string;
  }
  const StaticGiftsRoutes = [
    {
      label: "Danielle Hulls Photography",
      icon: FaGift,
      href: "/gifts?desc=Photography",
    },
    { label: "Marini Ferlazzo", icon: FaGift, href: "/gifts?desc=Ferlazzo" },
    {
      label: "White Clay Mountain",
      icon: FaGift,
      href: "/gifts?desc=Mountain",
    },
    { label: "Eliza Jade Candles", icon: FaGift, href: "/gifts?desc=Candles" },
  ];

  const handleLoginPage = () => {
    console.log("logout clicked");
    void logout();
  };

  const SubcategoryList1 = ({
    subItems,
    openCategories,
    toggleCategory,
    item,
    setOpenCategories,
  }: SubcategoryListProps1) => {
    return (
      <div className="">
        {subItems.map((subItem) => (
          <div key={subItem.category_name} className="relative">
            <div className="flex w-full items-center justify-between">
              <button
                onClick={() => {
                  router.push(
                    `/products?category=${subItem.category_type_id}&name=${subItem.category_name}&detail=${subItem.id}`,
                  );
                  setTimeout(() => {
                    setOpenCategories([]);
                    setMobileMenuOpen(false);
                  }, 1000);
                }}
                className="flex w-full items-center justify-between py-1 text-sm hover:underline focus:outline-none"
              >
                <span className="mr-2 text-left capitalize">
                  {subItem.category_name}
                </span>
              </button>
              {subItem.children?.[0] &&
                (openCategories.includes(`${item}/${subItem.category_name}`) ? (
                  <FaChevronDown
                    onClick={() => toggleCategory(`${subItem.category_name}`)}
                  />
                ) : (
                  <FaChevronRight
                    onClick={() => toggleCategory(`${subItem.category_name}`)}
                  />
                ))}
            </div>

            {/* Render children if open */}
            {openCategories.some((cat) =>
              cat.endsWith(`${item}/${subItem.category_name}`),
            ) &&
              subItem.children?.[0] && (
                <div className="ml-4 mt-2">
                  <SubcategoryList1
                    subItems={subItem.children}
                    item={subItem.category_name}
                    openCategories={openCategories} // Pass down multiple open categories
                    toggleCategory={(val) =>
                      toggleCategory(`${subItem.category_name}/${val}`)
                    }
                    setOpenCategories={setOpenCategories}
                  />
                </div>
              )}
          </div>
        ))}
        {item == "Gifts" &&
          StaticGiftsRoutes.map((subItem) => (
            <div key={subItem.label} className="relative">
              <button
                onClick={() => {
                  router.push(subItem.href);
                  setTimeout(() => {
                    setOpenCategories([]);
                    setMobileMenuOpen(false);
                  }, 500);
                }}
                className="flex w-full items-center justify-between py-1 text-sm hover:underline focus:outline-none"
              >
                <span
                  className="mr-2 truncate text-left capitalize"
                  title={subItem.label}
                >
                  {subItem.label}
                </span>
              </button>
            </div>
          ))}
      </div>
    );
  };

  const toggleCategory = async (label: string) => {
    setOpenCategories((prev) => {
      setOpenDropdown(null);
      if (prev.includes(label)) {
        return prev.filter((cat) => cat !== label);
      } else {
        const newOpenCategories = prev.filter(
          (cat) => label.startsWith(cat) || cat.startsWith(label),
        );
        return [...newOpenCategories, label];
      }
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isMobileMenuOpen) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
      return () => {
        document.body.classList.remove("overflow-hidden");
      };
    }
  }, [isMobileMenuOpen]);

  const handleSearchApi = async () => {
    if (!searchTerm) {
      setSearchError("Please enter title or description");
      return;
    } else {
      if (selectedCategory && selectedCategory.value != "0") {
        router.push(
          `/result?type=${selectedCategory?.label}&id=${selectedCategory?.value}&searchTerm=${searchTerm}`,
        );
      } else {
        router.push(`/result?searchTerm=${searchTerm}`);
      }

      setSearchError("");
    }
  };

  useEffect(() => {
    const d = params.get("type");
    const id = params.get("id");
    const parentCat = params.get("searchTerm");

    if (d && id && path.includes("/result")) {
      setSelectedCategory({ label: d, value: id });
    } else {
      setSelectedCategory(null);
    }
    if (parentCat && path.includes("/result")) {
      setSearchTerm(parentCat);
    } else {
      setSearchTerm("");
    }
  }, [path]);

  const newCat = [{ label: "All Categories", value: "0" }, ...(category ?? [])];

  return (
    <nav className="sticky left-0 top-0 z-10 h-fit w-full">
      <header className="flex flex-col bg-white px-4 pb-2 pt-4 backdrop-blur dark:bg-slate-900 lg:flex-row lg:items-center lg:pb-0">
        {/* Top Row: Hamburger, Logo, and Icons (Mobile View) */}
        <div className="flex items-center justify-between border-b pb-4 lg:hidden">
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
              className="flex-shrink-0 shadow-2xl"
            />
          </div>

          {/* Right Section: Heart, Cart, and User Dropdown Icons */}
          <div className="flex items-center space-x-2 lg:space-x-4">
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
                  {userInfo?.first_name ? (
                    <span className="bg-white p-1 text-xs font-medium capitalize">
                      {userInfo?.first_name} {userInfo?.last_name}
                    </span>
                  ) : checkoutData?.customer_id ? (
                    <span className="bg-white p-1 text-xs font-medium capitalize">
                      {checkoutData?.user_name ? checkoutData?.user_name : ""}
                    </span>
                  ) : (
                    ""
                  )}

                  {/* <a
                    href="#account-settings"
                    className="flex items-center p-1 text-[9px] font-medium hover:bg-gray-100 dark:hover:bg-slate-600"
                  >
                    <TbSettings className="mr-2" />
                    Account Settings
                  </a> */}
                  {/* <a
                    href="/signup"
                    className="flex items-center p-1 text-[9px] font-medium hover:bg-gray-100 dark:hover:bg-slate-600"
                  >
                    <HiLogin className="mr-2" />
                    Sign Up
                  </a> */}

                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault(); // ⬅️ prevent navigation
                      void handleLogout();
                    }}
                    className="flex items-center p-1 text-[9px] font-medium hover:bg-gray-100 dark:hover:bg-slate-600"
                  >
                    {isLoggedIn ? (
                      <HiLogout className="mr-2" />
                    ) : (
                      <HiLogin className="mr-2" />
                    )}
                    {isLoggedIn ? "Logout" : "Login"}
                  </Link>

                  {/* <a
                    href="#logout"
                    className="flex items-center p-1 text-[9px] font-medium hover:bg-gray-100 dark:hover:bg-slate-600"
                  >
                    <HiLogin className="mr-2" />
                    Logout
                  </a> */}
                </div>
              )}
            </div>
            <button
              className={`z-30 lg:p-3 ${isMobileMenuOpen ? "bg-white" : ""}`} // You can adjust the background color if needed
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FaBars className="text-xl text-red-500" />
            </button>
          </div>
        </div>

        {/* Search Bar (Visible on Small Screens) */}
        {!path.includes("/products") && (
          <div className="mx-2 mt-2 w-full lg:hidden">
            {/* <div className=""> */}
            <Select
              id="category"
              name="category"
              options={
                newCat?.map((cat) => ({
                  value:
                    "category_type_id" in cat
                      ? cat.category_type_id.toString()
                      : cat.value, // Ensure value is a string
                  label: "type" in cat ? cat.type.toString() : cat.label,
                })) ?? []
              }
              // loader={loader}
              value={selectedCategory?.value ?? ""}
              // placeholder="All Categories"
              onChange={(val) => {
                setSelectedCategory(val);
                setSearchTerm("");
                setTimeout(() => searchInputRef.current?.focus(), 0);
              }}
            />
            {/* </div> */}
            <div className="mt-2">
              <Input
                ref={searchInputRef}
                placeholder="What are you looking for?"
                value={searchTerm}
                onChange={handleSearchChange}
                icon={<FiSearch size={26} />}
                // width="w-56"
                animateOnClick={false}
                onIconClick={() => handleSearchApi()}
                error={searchError}
              />
            </div>
          </div>
        )}

        {/* Mobile Menu for Navigation Items */}
        {isMobileMenuOpen && (
          <>
            {/* Overlay to reduce opacity */}
            {isMobileMenuOpen && (
              <div
                className="fixed inset-0 z-20 h-screen bg-black bg-opacity-50"
                onClick={() => setMobileMenuOpen(false)} // Close the menu on overlay click
              />
            )}
            <button
              className={`fixed right-7 top-7 z-40 sm:block lg:hidden ${isMobileMenuOpen ? "bg-white dark:bg-slate-700" : ""}`}
              onClick={() => {
                setOpenDropdown(null);
                setMobileMenuOpen(false);
              }}
            >
              <RxCross2 className="text-xl text-red-500" />
            </button>
            <div className="fixed right-0 top-0 z-30 flex h-[80vh] w-full flex-col bg-white p-6 dark:bg-slate-700 lg:hidden lg:w-1/2">
              <div className="z-40 flex w-[90%] justify-around gap-1 pb-4">
                <Link
                  href="/"
                  className="flex min-w-28 flex-row items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-red-500 p-2 text-white transition-transform hover:scale-105"
                >
                  <FaHome size={16} />
                  <span className="text-xs">Home</span>
                </Link>

                <Link
                  href="/contact-us"
                  className="flex min-w-28 flex-row items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-red-500 p-2 text-white transition-transform hover:scale-105"
                >
                  <FaPhoneAlt size={16} />
                  <span className="text-xs">Contact Us</span>
                </Link>
              </div>
              <nav className="custom-scrollbar overflow-auto">
                {headerCategory?.map((item) => (
                  <div key={item.type} className="mb-4">
                    <button className="flex w-full items-center justify-between text-lg focus:outline-none">
                      <div
                        className="flex items-center"
                        onClick={() => {
                          router.push(
                            `/products?category=${item.category_type_id}&name=${item.type}`,
                          );
                          setMobileMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                      >
                        <AiOutlineFileText className="mr-2.5 h-5 w-5 text-orange-600" />

                        {/* {item.icon && (
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        <span className="mr-3">{iconMap[item.icon]}</span>
                      )} */}
                        {/* <Link href={item.href ?? ""} scroll={false}> */}
                        {item.type}
                        {/* </Link> */}
                      </div>{" "}
                      {item.children?.[0] ? (
                        <div onClick={() => toggleCategory(item.type)}>
                          {openCategories.includes(item.type) ? (
                            <FaChevronDown />
                          ) : (
                            <FaChevronRight />
                          )}
                        </div>
                      ) : null}
                    </button>
                    {openCategories.includes(item.type) &&
                      item.children?.[0] && (
                        <SubcategoryList1
                          subItems={item.children}
                          openCategories={openCategories}
                          item={item.type}
                          toggleCategory={(val) =>
                            toggleCategory(`${item.type}/${val}`)
                          }
                          setOpenCategories={setOpenCategories}
                        />
                      )}
                  </div>
                ))}
                {categories.map((item) => (
                  <div key={item.label} className="mb-4">
                    <button
                      onClick={() =>
                        item.subItems || item.label == "Pulse"
                          ? toggleDropdown(item.label)
                          : null
                      }
                      className="flex w-full items-center justify-between text-lg focus:outline-none"
                    >
                      <div className="flex items-center">
                        {(item.icon || item.label === "Pulse") && (
                          <span className="mr-2">
                            {item.label === "Pulse" ? (
                              <Image
                                src="/assets/images/home/pulse-icon.webp"
                                className="h-5 w-5 p-0.5"
                                width={1000}
                                height={1000}
                                alt={item.label || "Icon"}
                              />
                            ) : (
                              item.icon && iconMap[item.icon]
                            )}
                          </span>
                        )}
                        <Link href={item.href ?? ""} scroll={false}>
                          {item.label}
                        </Link>
                      </div>{" "}
                      {item.subItems || item.label == "Pulse" ? (
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
                                onClick={() => {
                                  setOpenDropdown(null);
                                  setMobileMenuOpen(false);
                                }}
                                passHref
                              >
                                {subItem.genre}
                              </Link>
                            ))}
                          </ScrollArea>
                        )}
                      </div>
                    )}
                    {item.label === "Pulse" && openDropdown === item.label && (
                      <div className="ml-4 mt-1">
                        <a
                          href="https://apps.apple.com/ie/app/uow-pulse-ltd/id6476544403"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-1 text-sm hover:underline"
                        >
                          Download from the App Store
                        </a>

                        <a
                          href="https://play.google.com/store/apps/details?id=com.iitsols.pulseuowltd"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-1 text-sm hover:underline"
                        >
                          Download from the Play Store
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </>
        )}

        {/* Desktop Layout */}
        <div className="mt-4 hidden w-full border-b pb-4 lg:flex lg:items-center lg:justify-between">
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
                className="flex-shrink-0 shadow-2xl"
              />
            </div>

            {/* Right Section: Search Bar and Icons */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:block">
                <Select
                  id="category"
                  name="category"
                  options={
                    newCat?.map((cat) => ({
                      value:
                        "category_type_id" in cat
                          ? cat.category_type_id.toString()
                          : cat.value, // Ensure value is a string
                      label: "type" in cat ? cat.type.toString() : cat.label,
                    })) ?? []
                  }
                  // loader={loader}
                  value={selectedCategory?.value ?? ""}
                  // placeholder="All Categories"
                  onChange={(val) => {
                    setSelectedCategory(val);
                    setSearchTerm("");
                    searchInputRef.current?.focus();
                  }}
                />
              </div>
              <Input
                ref={searchInputRef}
                placeholder="What are you looking for?"
                value={searchTerm}
                onChange={handleSearchChange}
                icon={<FiSearch size={26} />}
                width="w-56"
                animateOnClick={false}
                onIconClick={() => handleSearchApi()}
                error={searchError}
              />
              <div
                className="relative"
                onClick={() => router.push("/favorites")}
              >
                <GoHeart className="cursor-pointer text-xl" />
                {favItems?.length && favItems?.length > 0 ? (
                  <span className="absolute right-3 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {favItems?.length}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="relative" onClick={() => toggleSidebar()}>
                <IoCartOutline className="cursor-pointer text-xl" />
                {cartItems?.length && cartItems?.length > 0 ? (
                  <span className="absolute right-3 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {cartItems?.length}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <button onClick={() => toggleTheme(themeMode)}>
                {themeMode == "dark" ? (
                  <FiSun className="p-0.5 text-xl text-gray-200" />
                ) : (
                  <PiMoon className="text-xl" />
                )}
              </button>

              <div className="relative">
                <button
                  className="mt-1 cursor-pointer rounded-full bg-red-500"
                  onClick={toggleUserDropdown}
                  ref={dropdownToggleRef}
                >
                  <MdOutlinePersonOutline className="p-1 text-3xl text-white" />
                </button>
                {isUserDropdownOpen && (
                  <div
                    ref={userDropdownRef}
                    className="absolute right-0 z-10 mt-1 w-40 rounded-md bg-white px-1 py-2 shadow-md dark:bg-slate-700"
                  >
                    {userInfo?.first_name ? (
                      <span className="text-md p-1 font-medium capitalize">
                        {userInfo?.first_name} {userInfo?.last_name}
                      </span>
                    ) : checkoutData?.customer_id ? (
                      <span className="text-md p-1 font-medium capitalize">
                        {checkoutData?.user_name ? checkoutData?.user_name : ""}
                      </span>
                    ) : (
                      ""
                    )}

                    {/* <a
                      href="#account-settings"
                      className="flex items-center p-1 text-sm font-medium hover:bg-gray-100 dark:hover:bg-slate-600"
                    >
                      <TbSettings className="mr-2" />
                      Account Setting
                    </a> */}
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault(); // ⬅️ prevent navigation
                        void handleLogout();
                      }}
                      className="flex items-center p-1 text-sm font-medium hover:bg-gray-100 dark:hover:bg-slate-600"
                    >
                      {isLoggedIn ? (
                        <HiLogout className="mr-2" />
                      ) : (
                        <HiLogin className="mr-2" />
                      )}
                      {isLoggedIn ? "Logout" : "Login"}
                    </Link>

                    {/* <Link
                      href="/signup"
                      className="flex items-center p-1 text-sm font-medium hover:bg-gray-100 dark:hover:bg-slate-600"
                    >
                      <HiLogin className="mr-2" />
                      Signup
                    </Link> */}
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

const Page = () => {
  return (
    <Suspense fallback={<> </>}>
      <Header />
    </Suspense>
  );
};

export default Page;
