"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  FaChevronDown,
  FaBars,
  FaChevronRight,
  FaHome,
  FaPhoneAlt,
  FaRegTimesCircle,
  FaShoppingBag,
} from "react-icons/fa";
import Input from "./Input";
import Image from "next/image";
import Logo from "../../../public/unishop_logo_new.png";
import { GoHeart } from "react-icons/go";
import { IoCartOutline, IoPerson, IoPersonOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { categories } from "~/constants/categories";
import { useAuthContext } from "~/Context/AuthContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SidebarCart from "../ui/sideCart/cartSidebar";
import Link from "next/link";

import { ScrollArea } from "../ui/scroll-area";
import type {
  CategoryTreeNode,
  Category as CAT,
  SuperCategory,
  SideBarCategory,
} from "~/types/category";
import { FaGift } from "react-icons/fa";

import {
  Select as RadixSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { BsTelephone } from "react-icons/bs";
import Button from "./Button";

const Header = () => {
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

  const dropdownToggleRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLButtonElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

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

    const x = buildCategoryTree(subCategory);
    const categoriesMap: CategoriesMap = (category ?? []).reduce((acc, cat) => {
      if (cat.category_type_id) {
        acc[cat.category_type_id] = { ...cat, children: [] };
      }
      return acc;
    }, {} as CategoriesMap);

    if (Array.isArray(x) && x.length > 0) {
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

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(target)
      ) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      void logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
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
    // console.log("textBookType in Header:", textBookType);
  }, [checkoutData]);


  const toggleSidebar = () => {
    if (path.includes("/checkout") || path.includes("/placeorder")) return;
    setIsSidebarOpen((prev) => !prev);
  };

  interface SubcategoryListProps1 {
    subItems: CategoryTreeNode[] | null;
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

  const SubcategoryList1 = ({
    subItems,
    openCategories,
    toggleCategory,
    item,
    setOpenCategories,
  }: SubcategoryListProps1) => {
    return (
      <div className="">
        {subItems?.map((subItem) => (
          <div key={subItem.category_name} className="relative">
            <div className="flex w-full items-center justify-between pl-2">
              <button
                onClick={() => {
                  router.push(
                    `/products?category=${subItem.category_type_id}&name=${subItem.category_name}&detail=${subItem.id}&page=1`,
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
                    openCategories={openCategories}
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
            <div key={subItem.label} className="relative pl-2">
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
        {/* {item == "Books" &&
          genre?.map((subItem) => (
            <div key={subItem.genre} className="relative pl-2">
              <button
                onClick={() => {
                  router.push(`books?detail=${subItem.genre}`);
                  toggleCategory(`books?detail=${subItem.genre}`);
                }}
                className="flex w-full items-center justify-between py-1 text-sm hover:underline focus:outline-none"
              >
                <span
                  className="mr-2 truncate text-left capitalize"
                  title={subItem.genre}
                >
                  {subItem.genre}
                </span>
              </button>
            </div>
          ))} */}
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

  interface SliderCategoryChild {
    id: number;
    category_name: string;
    category_type_id: number;
    children?: SliderCategoryChild[] | null;
  }

  // Modified USBCategoryList1 component
  const USBCategoryList1 = () => {
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
      new Set(),
    );
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = (label: string, rect: DOMRect) => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      setHoveredCategory(label);
      setHoveredRect(rect);
    };

    const handleMouseLeave = () => {
      closeTimeoutRef.current = setTimeout(() => {
        setHoveredCategory(null);
        setHoveredRect(null);
      }, 150);
    };

    useEffect(() => {
      return () => {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
        }
      };
    }, []);

    const combinedCategories = React.useMemo(() => {
      const list: Array<{
        id: string;
        label: string;
        isDynamic: boolean;
        category_type_id?: number;
        type?: string;
        children?: SliderCategoryChild[] | null;
        href?: string;
        subItems?: { label: string; href: string }[];
      }> = [];

      headerCategory?.forEach((item) => {
        list.push({
          id: `dynamic-${item.category_type_id}`,
          label: item.type,
          isDynamic: true,
          category_type_id: item.category_type_id,
          type: item.type,
          children: (item.children as SliderCategoryChild[] | null) ?? undefined,
        });
      });

      categories.forEach((item, idx) => {
        list.push({
          id: `custom-${idx}`,
          label: item.label,
          isDynamic: false,
          href: item.href,
          subItems: item.subItems,
        });
      });

      return list;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headerCategory]);



    const toggleCategory = (id: string | number) => {
      const newSet = new Set(expandedCategories);
      const key = String(id);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      setExpandedCategories(newSet);
    };

    const renderSubcategories = (
      subItems: SliderCategoryChild[] | null | undefined,
      level = 1,
      type?: string,
    ) => {
      if (!subItems) return null;
      return (
        <div
          className={`ml-${level * 2} mt-1`}
          style={{ marginLeft: `${level / 2}rem` }}
        >
          {subItems.map((subItem) => {
            const hasChildren = subItem.children && subItem.children.length > 0;
            const isExpanded = expandedCategories.has(String(subItem.id));
            return (
              <div key={subItem.id} className="group py-1">
                <div className="flex cursor-pointer items-center justify-between gap-2 text-sm capitalize text-gray-700 group-hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500">
                  <Link
                    href={`/products?category=${subItem.category_type_id}&name=${subItem.category_name}&detail=${subItem.id}&page=1`}
                    className="block"
                  >
                    {subItem.category_name}
                  </Link>
                  {hasChildren && (
                    <span
                      className={`mr-1 ${isExpanded ? "rotate-180" : ""}`}
                      onClick={() => toggleCategory(subItem.id)}
                    >
                      <FaChevronDown className="text-xs" />
                    </span>
                  )}
                </div>
                {hasChildren &&
                  isExpanded &&
                  renderSubcategories(subItem.children, level + 1)}
              </div>
            );
          })}
          {type == "Gifts" &&
            StaticGiftsRoutes.map((subItem) => (
              <div key={subItem.label} className="relative py-1">
                <button
                  onClick={() => {
                    router.push(subItem.href);
                    toggleCategory(subItem.href);
                  }}
                  className="flex cursor-pointer items-center justify-between gap-2 text-sm capitalize text-gray-700 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
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

    const hoveredItem = combinedCategories.find((item) => item.label === hoveredCategory);

    if (combinedCategories.length <= 5) {
      return (
        <div className="hidden lg:block w-full">
          <div className="flex w-full items-center justify-between pt-4 pb-2 px-4 max-w-6xl mx-auto">
            {/* Left Spacer to align center */}
            <div className="w-28 flex-shrink-0"></div>

            {/* Centered list of categories */}
            <nav className="flex gap-8 whitespace-nowrap justify-center items-center flex-grow">
              {combinedCategories.map((item) => {
                if (item.isDynamic) {
                  const hasChildren = item.children && item.children.length > 0;
                  return (
                    <div
                      key={item.id}
                      className="relative inline-block px-1 min-w-0"
                      onMouseEnter={(e) => handleMouseEnter(item.label, e.currentTarget.getBoundingClientRect())}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="group flex cursor-pointer items-center py-1 max-w-full min-w-0 justify-center gap-1">
                        <Link
                          href={`/products?category=${item.category_type_id}&name=${item.type}&page=1`}
                          className="text-base font-medium capitalize text-gray-700 hover:text-red-500 dark:text-gray-200 truncate block max-w-[calc(100%-16px)]"
                        >
                          {item.type}
                        </Link>

                        {hasChildren ? (
                          <FaChevronDown className="text-xs text-gray-500 transition-transform duration-200 group-hover:rotate-180 flex-shrink-0" />
                        ) : item.type == "Gifts" ? (
                          <FaChevronDown className="text-xs text-gray-500 transition-transform duration-200 group-hover:rotate-180 flex-shrink-0" />
                        ) : null}
                      </div>
                    </div>
                  );
                } else {
                  const hasChildren = item.subItems && item.subItems.length > 0;
                  return (
                    <div
                      key={item.id}
                      className="relative inline-block px-1 min-w-0"
                      onMouseEnter={(e) => handleMouseEnter(item.label, e.currentTarget.getBoundingClientRect())}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="group flex cursor-pointer items-center py-1 max-w-full min-w-0 justify-center gap-1">
                        {item.href ? (
                          <Link
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base font-medium capitalize text-gray-700 hover:text-red-500 dark:text-gray-200 truncate block max-w-[calc(100%-16px)]"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <span className="text-base font-medium capitalize text-gray-700 hover:text-red-500 dark:text-gray-200 truncate block max-w-[calc(100%-16px)]">
                            {item.label}
                          </span>
                        )}
                        {hasChildren ? (
                          <FaChevronDown className="text-xs text-gray-500 transition-transform duration-200 group-hover:rotate-180 flex-shrink-0" />
                        ) : null}
                      </div>
                    </div>
                  );
                }
              })}
            </nav>

            {/* Right Orders Button */}
            <div className="w-28 flex-shrink-0 flex justify-end">
              {userInfo?.customer_id ? (
                <Button
                  onClick={() => router.push("/my-orders")}
                  title="My Orders"
                  className="whitespace-nowrap"
                />
              ) : null}
            </div>
          </div>

          {/* Floating Category Dropdown */}
          {hoveredItem && hoveredRect && (
            hoveredItem.isDynamic && hoveredItem.children && hoveredItem.children.length > 0 ? (
              <div
                style={{
                  position: "fixed",
                  top: `${hoveredRect.bottom}px`,
                  left: `${hoveredRect.left}px`,
                }}
                className="z-50 max-h-[60vh] min-w-[200px] overflow-y-auto rounded-md border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-slate-800"
                onMouseEnter={() => {
                  if (closeTimeoutRef.current) {
                    clearTimeout(closeTimeoutRef.current);
                    closeTimeoutRef.current = null;
                  }
                }}
                onMouseLeave={handleMouseLeave}
              >
                {renderSubcategories(hoveredItem.children, 1, hoveredItem.type)}
              </div>
            ) : hoveredItem.isDynamic && hoveredItem.type === "Gifts" ? (
              <div
                style={{
                  position: "fixed",
                  top: `${hoveredRect.bottom}px`,
                  left: `${hoveredRect.left}px`,
                }}
                className="z-50 min-w-[200px] rounded-md border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-slate-800"
                onMouseEnter={() => {
                  if (closeTimeoutRef.current) {
                    clearTimeout(closeTimeoutRef.current);
                    closeTimeoutRef.current = null;
                  }
                }}
                onMouseLeave={handleMouseLeave}
              >
                {renderSubcategories([], 1, "Gifts")}
              </div>
            ) : !hoveredItem.isDynamic && hoveredItem.subItems && hoveredItem.subItems.length > 0 ? (
              <div
                style={{
                  position: "fixed",
                  top: `${hoveredRect.bottom}px`,
                  left: `${hoveredRect.left}px`,
                }}
                className="z-50 max-h-[60vh] min-w-[200px] overflow-y-auto rounded-md border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-slate-800"
                onMouseEnter={() => {
                  if (closeTimeoutRef.current) {
                    clearTimeout(closeTimeoutRef.current);
                    closeTimeoutRef.current = null;
                  }
                }}
                onMouseLeave={handleMouseLeave}
              >
                {hoveredItem.subItems.map((sub, subIdx) => (
                  <Link
                    key={subIdx}
                    href={sub.href}
                    className="block px-3 py-1 text-sm text-gray-700 hover:text-red-500 dark:text-gray-200 dark:hover:text-red-500"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            ) : null
          )}
        </div>
      );
    }

    return (
      <div className="hidden lg:block w-full">
        <div className="flex w-full items-start justify-between  pb-2 px-4 max-w-6xl mx-auto">
          {/* Left Spacer to align center */}
          <div className="w-28 flex-shrink-0"></div>

          {/* Categories Grid (replaces slider) */}
          <div className="grid grid-cols-6 gap-y-2 gap-x-2 flex-grow justify-center max-w-[900px] px-6">
            {combinedCategories.map((item) => {
              if (item.isDynamic) {
                const hasChildren = item.children && item.children.length > 0;
                return (
                  <div
                    key={item.id}
                    className="relative flex justify-center items-center px-2 min-w-0"
                    onMouseEnter={(e) => handleMouseEnter(item.label, e.currentTarget.getBoundingClientRect())}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="group flex cursor-pointer items-center py-1 max-w-full min-w-0 justify-center w-full gap-1">
                      <Link
                        href={`/products?category=${item.category_type_id}&name=${item.type}&page=1`}
                        className="text-base font-medium capitalize text-gray-700 hover:text-red-500 dark:text-gray-200 truncate block max-w-[calc(100%-16px)]"
                      >
                        {item.type}
                      </Link>

                      {hasChildren ? (
                        <FaChevronDown className="text-xs text-gray-500 transition-transform duration-200 group-hover:rotate-180 flex-shrink-0" />
                      ) : item.type == "Gifts" ? (
                        <FaChevronDown className="text-xs text-gray-500 transition-transform duration-200 group-hover:rotate-180 flex-shrink-0" />
                      ) : null}
                    </div>
                  </div>
                );
              } else {
                const hasChildren = item.subItems && item.subItems.length > 0;
                return (
                  <div
                    key={item.id}
                    className="relative flex justify-center items-center px-2 min-w-0"
                    onMouseEnter={(e) => handleMouseEnter(item.label, e.currentTarget.getBoundingClientRect())}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="group flex cursor-pointer items-center py-1 max-w-full min-w-0 justify-center w-full gap-1">
                      {item.href ? (
                        <Link
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-medium capitalize text-gray-700 hover:text-red-500 dark:text-gray-200 truncate block max-w-[calc(100%-16px)]"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-base font-medium capitalize text-gray-700 hover:text-red-500 dark:text-gray-200 truncate block max-w-[calc(100%-16px)]">
                          {item.label}
                        </span>
                      )}
                      {hasChildren ? (
                        <FaChevronDown className="text-xs text-gray-500 transition-transform duration-200 group-hover:rotate-180 flex-shrink-0" />
                      ) : null}
                    </div>
                  </div>
                );
              }
            })}
          </div>

          {/* Right Orders Button */}
          <div className="w-28 flex-shrink-0 flex justify-end">
            {userInfo?.customer_id ? (
              <Button
                onClick={() => router.push("/my-orders")}
                title="My Orders"
                className="whitespace-nowrap"
              />
            ) : null}
          </div>
        </div>

        {/* Floating Category Dropdown */}
        {hoveredItem && hoveredRect && (
          hoveredItem.isDynamic && hoveredItem.children && hoveredItem.children.length > 0 ? (
            <div
              style={{
                position: "fixed",
                top: `${hoveredRect.bottom}px`,
                left: `${hoveredRect.left}px`,
              }}
              className="z-50 max-h-[60vh] min-w-[200px] overflow-y-auto rounded-md border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-slate-800"
              onMouseEnter={() => {
                if (closeTimeoutRef.current) {
                  clearTimeout(closeTimeoutRef.current);
                  closeTimeoutRef.current = null;
                }
              }}
              onMouseLeave={handleMouseLeave}
            >
              {renderSubcategories(hoveredItem.children, 1, hoveredItem.type)}
            </div>
          ) : hoveredItem.isDynamic && hoveredItem.type === "Gifts" ? (
            <div
              style={{
                position: "fixed",
                top: `${hoveredRect.bottom}px`,
                left: `${hoveredRect.left}px`,
              }}
              className="z-50 min-w-[200px] rounded-md border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-slate-800"
              onMouseEnter={() => {
                if (closeTimeoutRef.current) {
                  clearTimeout(closeTimeoutRef.current);
                  closeTimeoutRef.current = null;
                }
              }}
              onMouseLeave={handleMouseLeave}
            >
              {renderSubcategories([], 1, "Gifts")}
            </div>
          ) : !hoveredItem.isDynamic && hoveredItem.subItems && hoveredItem.subItems.length > 0 ? (
            <div
              style={{
                position: "fixed",
                top: `${hoveredRect.bottom}px`,
                left: `${hoveredRect.left}px`,
              }}
              className="z-50 max-h-[60vh] min-w-[200px] overflow-y-auto rounded-md border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-slate-800"
              onMouseEnter={() => {
                if (closeTimeoutRef.current) {
                  clearTimeout(closeTimeoutRef.current);
                  closeTimeoutRef.current = null;
                }
              }}
              onMouseLeave={handleMouseLeave}
            >
              {hoveredItem.subItems.map((sub, subIdx) => (
                <Link
                  key={subIdx}
                  href={sub.href}
                  className="block px-3 py-1 text-sm text-gray-700 hover:text-red-500 dark:text-gray-200 dark:hover:text-red-500"
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          ) : null
        )}
      </div>
    );
  };

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
            <div className="relative" ref={userDropdownRef}>
              <IoPersonOutline
                className="cursor-pointer text-xl"
                onClick={() => setUserDropdownOpen((prev) => !prev)}
              />

              {isUserDropdownOpen && (
                <div className="absolute right-0 top-10 z-50 w-40 rounded-lg border bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                  {userInfo ? (
                    <>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {userInfo.first_name} {userInfo.last_name}
                      </p>
                      <p className="mb-3 text-xs text-gray-600 dark:text-gray-400">
                        {userInfo.email}
                      </p>
                      <Button
                        title="Logout"
                        onClick={handleLogout}
                        className="w-full"
                      />
                      {/* <button
                        onClick={handleLogout}
                        className="w-full rounded bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600"
                      >
                        Logout
                      </button> */}
                    </>
                  ) : (
                    <Button
                      title="Login"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        router.push("/login");
                      }}
                      className="w-full"
                    />
                    // <button
                    //   onClick={() => {
                    //     setUserDropdownOpen(false);
                    //     router.push("/login");
                    //   }}
                    //   className="w-full rounded bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-600"
                    // >
                    //   Login
                    // </button>
                  )}
                </div>
              )}
            </div>

            {/* <div
              className="relative"
              ref={userDropdownRef}
              onClick={handleLogout}
            >
              <IoPersonOutline className="cursor-pointer text-xl" />
            </div> */}
            <div
              className="relative"
              onClick={() => router.push("/contact-us")}
            >
              <BsTelephone className="cursor-pointer text-xl" />
            </div>
            <button
              className={`z-30 lg:p-3 ${isMobileMenuOpen ? "bg-white" : ""}`}
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FaBars className="text-xl text-red-500" />
            </button>
          </div>
        </div>

        {/* Search Bar (Visible on Small Screens) */}
        {!path.includes("/products") && (
          <div className="mt-2 w-full lg:hidden">
            <RadixSelect
              value={selectedCategory?.value ?? ""}
              onValueChange={(val) => {
                const options = newCat?.map((cat) => ({
                  value:
                    "category_type_id" in cat
                      ? cat.category_type_id.toString()
                      : cat.value,
                  label: "type" in cat ? cat.type.toString() : cat.label,
                })) ?? [];
                const selectedOption = options.find((opt) => opt.value === val);
                if (selectedOption) {
                  setSelectedCategory(selectedOption);
                  setSearchTerm("");
                  setTimeout(() => searchInputRef.current?.focus(), 0);
                }
              }}
            >
              <SelectTrigger className="w-full h-10 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 capitalize rounded-md text-sm">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {newCat?.map((cat) => {
                  const val = "category_type_id" in cat ? cat.category_type_id.toString() : cat.value;
                  const label = "type" in cat ? cat.type.toString() : cat.label;
                  return (
                    <SelectItem key={val} value={val}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </RadixSelect>
            <div className="mt-2">
              <Input
                ref={searchInputRef}
                placeholder="Enter keywords to search..."
                value={searchTerm}
                onChange={handleSearchChange}
                icon={<FiSearch size={26} />}
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
                onClick={() => setMobileMenuOpen(false)}
              />
            )}
            <button
              className={`fixed right-7 top-7 z-40 sm:block lg:hidden ${isMobileMenuOpen ? "bg-white dark:bg-slate-700" : ""}`}
              onClick={() => {
                setOpenDropdown(null);
                setMobileMenuOpen(false);
              }}
            >
              <FaRegTimesCircle className="text-2xl text-red-500" />
            </button>
            <div className="fixed right-0 top-0 z-30 flex max-h-[80vh] w-full flex-col bg-white p-6 dark:bg-slate-700 lg:hidden lg:w-1/2">
              <div className="z-40 flex w-[90%] justify-around gap-1 pb-4">
                <Link
                  href="/"
                  className="flex w-1/3 flex-row items-center justify-center gap-2 whitespace-nowrap rounded bg-red-500 p-2 text-white transition-transform hover:scale-105"
                >
                  <FaHome size={16} />
                  <span className="text-xs">Home</span>
                </Link>

                <Link
                  href="/my-orders"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setOpenDropdown(null);
                  }}
                  className="flex w-1/3 flex-row items-center justify-center gap-2 whitespace-nowrap rounded bg-red-500 p-2 text-white transition-transform hover:scale-105"
                >
                  <FaShoppingBag size={16} />
                  <span className="text-xs">My Orders</span>
                </Link>
                {/* 
                <Link
                  href="/contact-us"
                  className="flex w-1/3 flex-row items-center justify-center gap-2 whitespace-nowrap rounded bg-red-500 p-2 text-white transition-transform hover:scale-105"
                >
                  <FaPhoneAlt size={16} />
                  <span className="text-xs">Contact Us</span>
                </Link> */}
              </div>
              <nav className="custom-scrollbar overflow-auto">
                {headerCategory?.map((item) => (
                  <div key={item.type} className="mb-4 mr-3">
                    <button className="flex w-full items-center justify-between text-lg focus:outline-none">
                      <div
                        className="flex items-center capitalize"
                        onClick={() => {
                          router.push(
                            `/products?category=${item.category_type_id}&name=${item.type}&page=1`,
                          );
                          setMobileMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                      >
                        {item.type}
                      </div>{" "}
                      {(item.children?.[0] ?? item.type == "Gifts") ? (
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
                      (item.children?.[0] ?? item.type == "Gifts") && (
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
                  <div key={item.label} className="mb-4 mr-3">
                    <button
                      onClick={() =>
                        item.subItems || item.label == "Pulse"
                          ? toggleDropdown(item.label)
                          : null
                      }
                      className="flex w-full items-center justify-between text-lg focus:outline-none"
                    >
                      <div className="flex items-center">
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
        <div className="hidden w-full flex-col border-b pb-4 lg:flex lg:items-center lg:justify-between">
          <div className="flex w-full items-center">
            <div
              className="flex-grow cursor-pointer text-left"
              onClick={() => {
                router.push("/");
              }}
            >
              <Image
                src={Logo}
                width={1000}
                height={1000}
                alt="Logo"
                className="h-20 w-56 flex-shrink-0 object-contain"
              />
            </div>

            {/* Right Section: Search Bar and Icons */}
            <div className="flex items-center space-x-2">
              <div className="hidden lg:block">
                <RadixSelect
                  value={selectedCategory?.value ?? ""}
                  onValueChange={(val) => {
                    const options = newCat?.map((cat) => ({
                      value:
                        "category_type_id" in cat
                          ? cat.category_type_id.toString()
                          : cat.value,
                      label: "type" in cat ? cat.type.toString() : cat.label,
                    })) ?? [];
                    const selectedOption = options.find((opt) => opt.value === val);
                    if (selectedOption) {
                      setSelectedCategory(selectedOption);
                      setSearchTerm("");
                      searchInputRef.current?.focus();
                    }
                  }}
                >
                  <SelectTrigger className="w-[180px] h-10 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 capitalize rounded-md text-sm">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {newCat?.map((cat) => {
                      const val = "category_type_id" in cat ? cat.category_type_id.toString() : cat.value;
                      const label = "type" in cat ? cat.type.toString() : cat.label;
                      return (
                        <SelectItem key={val} value={val}>
                          {label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </RadixSelect>
              </div>
              <Input
                ref={searchInputRef}
                placeholder="Enter keywords to search..."
                value={searchTerm}
                onChange={handleSearchChange}
                icon={<FiSearch size={26} />}
                width="w-56"
                animateOnClick={false}
                onIconClick={() => handleSearchApi()}
                error={searchError}
              />
              <div
                className="relative cursor-pointer rounded-full p-1.5 hover:border-transparent hover:bg-red-500 hover:text-white"
                onClick={() => router.push("/favorites")}
                title="Wishlist"
              >
                <GoHeart className="text-xl" />
                {favItems?.length && favItems?.length > 0 ? (
                  <span className="absolute -bottom-0 -left-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {favItems?.length}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div
                onClick={() => toggleSidebar()}
                title={`Cart`}
                className="relative cursor-pointer rounded-full p-1.5 hover:border-transparent hover:bg-red-500 hover:text-white"
              >
                <IoCartOutline className="cursor-pointer text-xl" />
                {cartItems?.length && cartItems?.length > 0 ? (
                  <span className="absolute -bottom-0 -left-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {cartItems?.length}
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div
                onClick={() => router.push("/contact-us")}
                title={"Contact Us"}
                className="relative cursor-pointer rounded-full p-1.5 hover:border-transparent hover:bg-red-500 hover:text-white"
              >
                <BsTelephone className="text-xl" />
              </div>
              <div
                className="relative flex items-center space-x-2"
                ref={userDropdownRef}
              >
                <div
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  title={userInfo ? "Profile" : "Sign in"}
                  className="relative flex cursor-pointer rounded-full p-1.5 hover:border-transparent hover:bg-red-500 hover:text-white"
                >
                  {userInfo ? (
                    <IoPerson className="text-xl" />
                  ) : (
                    <IoPersonOutline className="text-xl" />
                  )}
                </div>

                {userInfo && (
                  <div className="text-sm font-medium capitalize text-gray-800 dark:text-gray-300">
                    Welcome!
                    <p className="font-bold">
                      {userInfo.first_name} {userInfo.last_name}
                    </p>
                  </div>
                )}

                {isUserDropdownOpen && (
                  <div className="absolute right-0 top-12 z-50 w-48 rounded-lg border bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                    {userInfo ? (
                      <>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {userInfo.first_name} {userInfo.last_name}
                        </p>
                        <p className="mb-3 text-xs text-gray-600 dark:text-gray-400">
                          {userInfo.email}
                        </p>
                        <Button
                          title="Logout"
                          onClick={handleLogout}
                          className="w-full"
                        />
                        {/* <button
                          onClick={handleLogout}
                          className="w-full rounded bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600"
                        >
                          Logout
                        </button> */}
                      </>
                    ) : (
                      <Button
                        title="Login"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          router.push("/login");
                        }}
                        className="w-full"
                      />
                      // <button
                      //   onClick={() => {
                      //     setUserDropdownOpen(false);
                      //     router.push("/login");
                      //   }}
                      //   className="w-full rounded bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-600"
                      // >
                      //   Login
                      // </button>
                    )}
                  </div>
                )}
              </div>

              {/* <div className="flex items-center space-x-2">
                <div
                  onClick={handleLogout}
                  title={userInfo ? "Logout" : "Signin"}
                  className="relative flex cursor-pointer rounded-full p-1.5 hover:border-transparent hover:bg-red-500 hover:text-white"
                >
                  {userInfo ? (
                    <IoPerson className="text-xl" />
                  ) : (
                    <IoPersonOutline className="text-xl" />
                  )}
                </div>

                {userInfo && (
                  <div className="text-sm font-medium capitalize text-gray-800 dark:text-gray-300">
                    Welcome!
                    <p className="font-bold">
                      {userInfo.first_name} {userInfo.last_name}
                    </p>
                  </div>
                )}
              </div> */}
            </div>
          </div>
          <USBCategoryList1 />
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
