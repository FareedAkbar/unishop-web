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
import type DataCart from "~/types/book";

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

interface CustomCategoryItem {
  id: string;
  label: string;
  isDynamic: boolean;
  category_type_id?: number;
  type?: string;
  children?: CAT[] | null;
  href?: string;
}

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
    totalAfterCalculation,
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

  const [hoveredAllCategories, setHoveredAllCategories] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<Array<string | number>>([]);

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
    const isCategoryActive = (catId: number): boolean => {
      const cat = categories.find((c) => c.id === catId);
      if (!cat) return false;
      if (cat.web_visibility !== 1) return false;
      if (cat.parent === 0) return true;
      return isCategoryActive(cat.parent);
    };

    const activeCategories = categories.filter((cat) => isCategoryActive(cat.id));
    const categoriesMap: Record<string, CategoryTreeNode2> = {};

    activeCategories.forEach((cat) => {
      const key = `${cat.id}-${cat.category_type_id}`;
      categoriesMap[key] = { ...cat, children: [] };
    });

    const categoryTree: CategoryTreeNode2[] = [];

    activeCategories.forEach((cat) => {
      const key = `${cat.id}-${cat.category_type_id}`;
      if (cat.parent === 0) {
        const rootCategory = categoriesMap[key];
        if (rootCategory) categoryTree.push(rootCategory);
      } else {
        const parentEntry = activeCategories.find((c) => c.id === cat.parent);
        const parentKey = parentEntry ? `${parentEntry.id}-${parentEntry.category_type_id}` : null;
        const parentCategory = parentKey ? categoriesMap[parentKey] : null;

        if (parentCategory) {
          const categoryToAdd = categoriesMap[key];
          if (categoryToAdd) {
            parentCategory.children.push(categoryToAdd);
          }
        }
      }
    });

    return categoryTree;
  };

  useEffect(() => {
    if (!category || !subCategory) return;

    const isCategoryActive = (catId: number): boolean => {
      const cat = subCategory.find((c) => c.id === catId);
      if (!cat) return false;
      if (cat.web_visibility !== 1) return false;
      if (cat.parent === 0) return true;
      return isCategoryActive(cat.parent);
    };
    const activeSubCategory = subCategory.filter((cat) => isCategoryActive(cat.id));

    const x = buildCategoryTree(activeSubCategory);
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
      activeSubCategory.forEach((item: CAT) => {
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
  const mobileUserDropdownRef = useRef<HTMLDivElement>(null);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedOutsideDesktop =
        !userDropdownRef.current?.contains(target);
      const clickedOutsideMobile =
        !mobileUserDropdownRef.current?.contains(target);

      if (clickedOutsideDesktop && clickedOutsideMobile) {
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
      const html = document.documentElement;
      if (isMobileMenuOpen) {
        document.body.classList.add("overflow-hidden");
        html.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
        html.classList.remove("overflow-hidden");
      }
      return () => {
        document.body.classList.remove("overflow-hidden");
        html.classList.remove("overflow-hidden");
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

  // Calculate parsed cart items & values for display
  const [parsedCartItems, setParsedCartItems] = useState<DataCart[]>([]);
  useEffect(() => {
    let itemsCart: DataCart[] = [];
    if (typeof cartItems === "string") {
      try {
        itemsCart = JSON.parse(cartItems) as DataCart[];
      } catch {
        itemsCart = [];
      }
    } else if (cartItems) {
      itemsCart = cartItems;
    }
    setParsedCartItems(itemsCart);
  }, [cartItems]);

  const cartCount = parsedCartItems.length;
  const cartSubTotal = parsedCartItems.reduce(
    (acc, item) => acc + ((item.item_sale_price ?? 0) * (item.quantity ?? 0)),
    0
  );
  const cartTotal = totalAfterCalculation
    ? (totalAfterCalculation as { final_price_including_tax: number }).final_price_including_tax
    : cartSubTotal;

  const allCategoriesList = React.useMemo<CustomCategoryItem[]>(() => {
    const list: CustomCategoryItem[] = [];

    const textbooks = headerCategory?.find(c => c.type.toLowerCase() === "textbooks");
    if (textbooks) {
      list.push({
        id: `dynamic-${textbooks.category_type_id}`,
        label: "TEXTBOOKS",
        isDynamic: true,
        category_type_id: textbooks.category_type_id,
        type: textbooks.type,
        children: textbooks.children
      });
    }

    const vitalSourceItem = categories.find(c => c.label === "E-Text Book");
    list.push({
      id: "custom-vitalsource",
      label: "E-TEXTBOOKS",
      isDynamic: false,
      href: vitalSourceItem?.href ?? "https://unishopuow.vitalsource.com/",
      type: "E-TEXTBOOKS",
      children: []
    });

    const books = headerCategory?.find(c => c.type.toLowerCase() === "books");
    if (books) {
      list.push({
        id: `dynamic-${books.category_type_id}`,
        label: "BOOKS",
        isDynamic: true,
        category_type_id: books.category_type_id,
        type: books.type,
        children: books.children
      });
    }

    const clothing = headerCategory?.find(c => c.type.toLowerCase().includes("merch") || c.type.toLowerCase().includes("clothing"));
    if (clothing) {
      list.push({
        id: `dynamic-${clothing.category_type_id}`,
        label: "UOW Merch & Clothing",
        isDynamic: true,
        category_type_id: clothing.category_type_id,
        type: clothing.type,
        children: clothing.children
      });
    }

    const art = headerCategory?.find(c => c.type.toLowerCase().includes("indigenous") || c.type.toLowerCase().includes("art"));
    if (art) {
      list.push({
        id: `dynamic-${art.category_type_id}`,
        label: "INDIGENOUS ART MERCH",
        isDynamic: true,
        category_type_id: art.category_type_id,
        type: art.type,
        children: art.children
      });
    }

    const stationery = headerCategory?.find(c => c.type.toLowerCase().includes("stationery") || c.type.toLowerCase().includes("tech"));
    if (stationery) {
      list.push({
        id: `dynamic-${stationery.category_type_id}`,
        label: "STATIONERY + TECH",
        isDynamic: true,
        category_type_id: stationery.category_type_id,
        type: stationery.type,
        children: stationery.children
      });
    }

    const gifts = headerCategory?.find(c => c.type.toLowerCase() === "gifts");
    if (gifts) {
      list.push({
        id: `dynamic-${gifts.category_type_id}`,
        label: "GIFTS",
        isDynamic: true,
        category_type_id: gifts.category_type_id,
        type: gifts.type,
        children: gifts.children
      });
    }

    const graduation = headerCategory?.find(c => c.type.toLowerCase() === "graduation");
    if (graduation) {
      list.push({
        id: `dynamic-${graduation.category_type_id}`,
        label: "GRADUATION",
        isDynamic: true,
        category_type_id: graduation.category_type_id,
        type: graduation.type,
        children: graduation.children
      });
    }

    headerCategory?.forEach((c) => {
      const alreadyAdded = list.some(item => item.category_type_id === c.category_type_id);
      if (!alreadyAdded) {
        list.push({
          id: `dynamic-${c.category_type_id}`,
          label: c.type,
          isDynamic: true,
          category_type_id: c.category_type_id,
          type: c.type,
          children: c.children
        });
      }
    });

    return list;
  }, [headerCategory, categories]);

  const navCategories = React.useMemo<CustomCategoryItem[]>(() => {
    const targets = ["TEXTBOOKS", "E-TEXTBOOKS", "BOOKS", "UOW Merch & Clothing", "GIFTS"];
    const result: CustomCategoryItem[] = [];
    targets.forEach(target => {
      const found = allCategoriesList.find(c => c.label === target);
      if (found) {
        result.push(found);
      }
    });
    return result;
  }, [allCategoriesList]);

  const getChildren = (item: CustomCategoryItem): CAT[] => {
    if (item.type === "GIFTS" || item.type === "Gifts") {
      return StaticGiftsRoutes.map((gift, idx) => ({
        id: idx + 9999,
        outlet: 0,
        category_name: gift.label,
        category_description: "",
        category_type_id: item.category_type_id ?? 0,
        deleted: 0,
        parent: 0,
        media_id: 0,
        booknet: 0,
        gifts: 1,
        arts: 0,
        object_path: "",
        clothings: null,
        children: [] as CAT[],
        till_visibility: 0,
        web_visibility: 1,
        app_visibility: 0,
        type: "Gifts"
      } as CAT));
    }
    return item.children ?? [];
  };

  const renderNestedPanes = () => {
    const columns: React.ReactNode[] = [];

    // Column 1: Main Categories
    columns.push(
      <div key="col-0" className="w-64 max-h-[500px] overflow-y-auto custom-scrollbar border-r border-gray-200 bg-white py-2 dark:border-gray-700 dark:bg-slate-800">
        {allCategoriesList.map((item) => {
          const hasChildren = ((item.children?.length ?? 0) > 0) || ["Gifts", "GIFTS"].includes(item.type ?? "");
          const isHovered = hoveredPath[0] === item.id;
          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredPath([item.id])}
              className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors ${isHovered
                ? "bg-red-50 text-red-500 dark:bg-slate-700 "
                : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-slate-700"
                }`}
            >
              {item.isDynamic ? (
                <Link
                  href={`/products?category=${item.category_type_id ?? 0}&name=${item.type ?? ""}&page=1`}
                  className="flex-grow block uppercase"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href ?? "#"}
                  target={item.href?.startsWith("http") ? "_blank" : undefined}
                  rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex-grow block uppercase"
                >
                  {item.label}
                </a>
              )}
              {hasChildren && <FaChevronRight className="text-xs opacity-75" />}
            </div>
          );
        })}
      </div>
    );

    // Column 2: Subcategories
    if (hoveredPath[0]) {
      const parentItem = allCategoriesList.find((item) => item.id === hoveredPath[0]);
      let subItems: CAT[] = [];
      if (parentItem) {
        if (parentItem.isDynamic) {
          subItems = parentItem.children ?? [];
        } else if (parentItem.type === "Gifts" || parentItem.type === "GIFTS") {
          subItems = StaticGiftsRoutes.map((gift, idx) => ({
            id: idx + 9999,
            outlet: 0,
            category_name: gift.label,
            category_description: "",
            category_type_id: parentItem.category_type_id ?? 0,
            deleted: 0,
            parent: 0,
            media_id: 0,
            booknet: 0,
            gifts: 1,
            arts: 0,
            object_path: "",
            clothings: null,
            children: [] as CAT[],
            till_visibility: 0,
            web_visibility: 1,
            app_visibility: 0,
            type: "Gifts"
          } as CAT));
        }
      }

      if (subItems.length > 0) {
        columns.push(
          <div key="col-1" className="w-64 max-h-[500px] overflow-y-auto custom-scrollbar border-r border-gray-200 bg-white py-2 dark:border-gray-700 dark:bg-slate-800">
            {subItems.map((subItem) => {
              const hasChildren = (subItem.children?.length ?? 0) > 0;
              const isHovered = hoveredPath[1] === subItem.id;
              const isGift = subItem.gifts === 1;
              return (
                <div
                  key={subItem.id}
                  onMouseEnter={() => setHoveredPath([hoveredPath[0]!, subItem.id])}
                  className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors ${isHovered
                    ? "bg-red-50 text-red-500 dark:bg-slate-700 "
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-slate-700"
                    }`}
                >
                  {isGift ? (
                    <Link
                      href={StaticGiftsRoutes.find(g => g.label === subItem.category_name)?.href ?? "#"}
                      className="flex-grow block uppercase"
                    >
                      {subItem.category_name}
                    </Link>
                  ) : (
                    <Link
                      href={`/products?category=${subItem.category_type_id ?? parentItem?.category_type_id ?? 0}&name=${subItem.category_name}&detail=${subItem.id}&page=1`}
                      className="flex-grow block uppercase"
                    >
                      {subItem.category_name}
                    </Link>
                  )}
                  {hasChildren && <FaChevronRight className="text-xs opacity-75" />}
                </div>
              );
            })}
          </div>
        );
      }
    }

    // Column 3: Sub-subcategories
    if (hoveredPath[0] && hoveredPath[1]) {
      const parentItem = allCategoriesList.find((item) => item.id === hoveredPath[0]);
      let subItems: CAT[] = [];
      if (parentItem) {
        if (parentItem.isDynamic) {
          subItems = parentItem.children ?? [];
        } else if (parentItem.type === "Gifts" || parentItem.type === "GIFTS") {
          subItems = StaticGiftsRoutes.map((gift, idx) => ({
            id: idx + 9999,
            outlet: 0,
            category_name: gift.label,
            category_description: "",
            category_type_id: parentItem.category_type_id ?? 0,
            deleted: 0,
            parent: 0,
            media_id: 0,
            booknet: 0,
            gifts: 1,
            arts: 0,
            object_path: "",
            clothings: null,
            children: [] as CAT[],
            till_visibility: 0,
            web_visibility: 1,
            app_visibility: 0,
            type: "Gifts"
          } as CAT));
        }
      }
      const subItem = subItems.find((item) => String(item.id) === String(hoveredPath[1]));
      const subSubItems = subItem?.children ?? [];

      if (subSubItems.length > 0) {
        columns.push(
          <div key="col-2" className="w-64 max-h-[500px] overflow-y-auto custom-scrollbar border-r border-gray-200 bg-white py-2 dark:border-gray-700 dark:bg-slate-800">
            {subSubItems.map((subSubItem) => {
              const hasChildren = (subSubItem.children?.length ?? 0) > 0;
              const isHovered = hoveredPath[2] === subSubItem.id;
              return (
                <div
                  key={subSubItem.id}
                  onMouseEnter={() => setHoveredPath([hoveredPath[0]!, hoveredPath[1]!, subSubItem.id])}
                  className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors ${isHovered
                    ? "bg-red-50 text-red-500 dark:bg-slate-700 "
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-slate-700"
                    }`}
                >
                  <Link
                    href={`/products?category=${subSubItem.category_type_id ?? parentItem?.category_type_id ?? 0}&name=${subSubItem.category_name}&detail=${subSubItem.id}&page=1`}
                    className="flex-grow block capitalize"
                  >
                    {subSubItem.category_name}
                  </Link>
                  {hasChildren && <FaChevronRight className="text-xs opacity-75" />}
                </div>
              );
            })}
          </div>
        );
      }
    }

    // Column 4: Sub-sub-subcategories
    if (hoveredPath[0] && hoveredPath[1] && hoveredPath[2]) {
      const parentItem = allCategoriesList.find((item) => item.id === hoveredPath[0]);
      let subItems: CAT[] = [];
      if (parentItem) {
        if (parentItem.isDynamic) {
          subItems = parentItem.children ?? [];
        } else if (parentItem.type === "Gifts" || parentItem.type === "GIFTS") {
          subItems = StaticGiftsRoutes.map((gift, idx) => ({
            id: idx + 9999,
            outlet: 0,
            category_name: gift.label,
            category_description: "",
            category_type_id: parentItem.category_type_id ?? 0,
            deleted: 0,
            parent: 0,
            media_id: 0,
            booknet: 0,
            gifts: 1,
            arts: 0,
            object_path: "",
            clothings: null,
            children: [] as CAT[],
            till_visibility: 0,
            web_visibility: 1,
            app_visibility: 0,
            type: "Gifts"
          } as CAT));
        }
      }
      const subItem = subItems.find((item) => String(item.id) === String(hoveredPath[1]));
      const subSubItems = subItem?.children ?? [];
      const subSubSubItem = subSubItems.find((item) => String(item.id) === String(hoveredPath[2]));
      const subSubSubItems = subSubSubItem?.children ?? [];

      if (subSubSubItems.length > 0) {
        columns.push(
          <div key="col-3" className="w-64 max-h-[500px] overflow-y-auto custom-scrollbar bg-white py-2 dark:bg-slate-800">
            {subSubSubItems.map((item) => (
              <div
                key={item.id}
                className="flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                <Link
                  href={`/products?category=${item.category_type_id ?? parentItem?.category_type_id ?? 0}&name=${item.category_name}&detail=${item.id}&page=1`}
                  className="flex-grow block capitalize"
                >
                  {item.category_name}
                </Link>
              </div>
            ))}
          </div>
        );
      }
    }

    return columns;
  };

  return (
    <nav className="left-0 top-0 z-10 h-fit w-full">
      <div className="hidden lg:flex w-full bg-[#f8f9fa] border-b border-gray-200 px-8 py-2 text-xs text-gray-500 dark:bg-slate-950 dark:border-gray-800">
        <div className="max-w-7xl mx-auto text-red-500 flex w-full justify-between items-center">
          <div>Call us: (02) 4221 8050</div>
          <div className="flex space-x-4">
            <Link href="/favorites" className="   font-medium 0">
              <GoHeart className="inline-block mr-1 " />
              Wishlist
            </Link>
            <Link href="/contact-us" className="   font-medium 0">
              <BsTelephone className="inline-block mr-1 " />
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <header className="flex flex-col bg-white px-4 mb-2 pt-4 backdrop-blur dark:bg-slate-900 lg:flex-col lg:items-center lg:pb-0">
        <div className="flex items-center justify-between border-b border-gray-500 pb-4 lg:hidden">
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
              {cartCount > 0 && (
                <span className="absolute -bottom-0 -left-0 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[8px] text-white">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="relative" ref={mobileUserDropdownRef}>
              <IoPersonOutline
                className="cursor-pointer text-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  setUserDropdownOpen((prev) => !prev);
                }}
              />

              {isUserDropdownOpen && (
                <div className="absolute right-0 top-10 z-50 w-40 rounded-lg border bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                  {userInfo ? (
                    <>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
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
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Button
                        title="Login"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          router.push("/login");
                        }}
                        className="w-full"
                      />
                      <Button
                        title="Sign Up"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          router.push("/signup");
                        }}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

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

        {isMobileMenuOpen && (
          <>
            {isMobileMenuOpen && (
              <div
                className="fixed inset-0 z-20 h-screen bg-black bg-opacity-50 touch-none"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}
            <button
              className={`fixed right-7 top-7 z-40 sm:block rounded-full lg:hidden ${isMobileMenuOpen ? "bg-white dark:bg-slate-700 " : ""}`}
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
                {userInfo?.customer_id && (
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
                  </Link>)}
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

        <div className="hidden w-full max-w-7xl mx-auto items-center justify-center py-5 lg:flex border-b border-gray-100 dark:border-gray-800">
          <div
            className="cursor-pointer flex-shrink-0"
            onClick={() => router.push("/")}
          >
            <Image
              src={Logo}
              width={220}
              height={65}
              alt="Logo"
              className="h-16 w-52 object-contain"
            />
          </div>

          <div className="flex h-11 w-[500px] items-center rounded-full border border-gray-300 bg-[#f8f9fa] px-4 py-1 dark:border-gray-700 dark:bg-slate-800">
            <div className="flex-shrink-0">
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
                <SelectTrigger className="h-full border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 capitalize text-sm text-gray-700 dark:text-gray-200">
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
            <div className="mx-2 h-5 w-[1px] bg-gray-300 dark:bg-gray-600"></div>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Enter keywords to search..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") void handleSearchApi();
              }}
              className="h-full flex-grow bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-gray-200"
            />
            <button onClick={() => void handleSearchApi()} className="text-gray-500 hover:text-red-500 p-1">
              <FiSearch className="text-xl" />
            </button>
          </div>

          <div className="flex items-center space-x-6 px-2">
            <div className="flex items-center gap-3">
              <div
                onClick={() => void router.push(userInfo ? "/my-orders" : "/login")}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-slate-800"
              >
                <IoPersonOutline className="text-xl" />
              </div>
              <div className="flex flex-col text-left text-xs text-gray-500 dark:text-gray-400">
                {userInfo ? (
                  <>
                    <span className="font-semibold text-gray-800 dark:text-gray-200 capitalize">
                      Hi, {userInfo.first_name}
                    </span>
                    <button onClick={() => void handleLogout()} className="hover:text-red-500 text-left">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="font-semibold text-gray-800 hover:text-red-500 dark:text-gray-200">
                      Sign In
                    </Link>
                    <Link href="/signup" className="hover:text-red-500">
                      Create An Account
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col items-start gap-1">
              <div onClick={toggleSidebar} className="flex cursor-pointer items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-slate-800">
                  <IoCartOutline className="text-xl" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    My Cart - {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </span>
                  <span className="text-sm font-bold text-red-500">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>
              {userInfo?.customer_id && (
                <Link
                  href="/my-orders"
                  className="text-xs text-red-500 underline hover:text-red-600 ml-14 font-medium"
                >
                  View Orders
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="hidden w-full max-w-7xl mx-auto py-2 lg:flex items-center justify-center relative">
          <div className="flex items-center gap-8">
            <div
              className="relative py-2"
              onMouseEnter={() => {
                setHoveredAllCategories(true);
                if (allCategoriesList[0]) {
                  setHoveredPath([allCategoriesList[0].id]);
                }
              }}
              onMouseLeave={() => {
                setHoveredAllCategories(false);
                setHoveredPath([]);
              }}
            >
              <button className="flex items-center gap-2 bg-red-500 hover:brightness-110 text-white px-5 py-2.5 rounded font-bold text-sm tracking-wide transition-colors">
                <span>ALL CATEGORIES</span>
                <FaChevronDown className="text-xs" />
              </button>

              {hoveredAllCategories && (
                <div className="absolute top-full left-0 z-50 flex shadow-2xl border border-gray-200 rounded-b bg-white dark:border-gray-700 dark:bg-slate-800">
                  {renderNestedPanes()}
                </div>
              )}
            </div>

            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm  uppercase text-gray-700 hover:text-red-500 dark:text-gray-200"
              >
                HOME
              </Link>

              {navCategories.map((item) => {
                const hasChildren = ((item.children?.length ?? 0) > 0) || item.type === "Gifts" || item.type === "GIFTS";
                const childrenItems = getChildren(item);

                return (
                  <div key={item.id} className="relative group py-2">
                    <div className="flex items-center gap-1 cursor-pointer">
                      {item.isDynamic ? (
                        <Link
                          href={`/products?category=${item.category_type_id ?? 0}&name=${item.type ?? ""}&page=1`}
                          className="text-sm  uppercase text-gray-700 group-hover:text-red-500 dark:text-gray-200"
                        >
                          {item.label ?? item.type ?? ""}
                        </Link>
                      ) : (
                        <a
                          href={item.href ?? "#"}
                          target={item.href?.startsWith("http") ? "_blank" : undefined}
                          rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm  uppercase text-gray-700 group-hover:text-red-500 dark:text-gray-200"
                        >
                          {item.label}
                        </a>
                      )}
                      {hasChildren && <FaChevronDown className="text-xs text-gray-400 group-hover:text-red-500" />}
                    </div>

                    {hasChildren && childrenItems.length > 0 && (
                      <div className="absolute top-full left-0 z-50 hidden group-hover:block min-w-[220px] bg-white border border-gray-200 shadow-xl rounded py-2 dark:bg-slate-800 dark:border-gray-700">
                        {childrenItems.map((child: CAT) => {
                          const hasSubChildren = (child.children?.length ?? 0) > 0;
                          const isGift = child.gifts === 1;
                          return (
                            <div key={child.id} className="relative group/sub px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-700">
                              <div className="flex items-center justify-between">
                                {isGift ? (
                                  <Link
                                    href={StaticGiftsRoutes.find(g => g.label === child.category_name)?.href ?? "#"}
                                    className="text-xs  text-gray-700 hover:text-red-500 dark:text-gray-200 block uppercase w-full"
                                  >
                                    {child.category_name}
                                  </Link>
                                ) : (
                                  <Link
                                    href={`/products?category=${child.category_type_id ?? item.category_type_id ?? 0}&name=${child.category_name}&detail=${child.id}&page=1`}
                                    className="text-xs  text-gray-700 uppercase hover:text-red-500 dark:text-gray-200 block  w-full"
                                  >
                                    {child.category_name}
                                  </Link>
                                )}
                                {hasSubChildren && <FaChevronRight className="text-[10px] text-gray-400" />}
                              </div>

                              {hasSubChildren && (
                                <div className="absolute top-0 left-full z-50 hidden group-hover/sub:block min-w-[200px] bg-white border border-gray-200 shadow-xl rounded py-2 dark:bg-slate-800 dark:border-gray-700">
                                  {child.children.map((subChild: CAT) => (
                                    <Link
                                      key={subChild.id}
                                      href={`/products?category=${subChild.category_type_id ?? item.category_type_id ?? 0}&name=${subChild.category_name}&detail=${subChild.id}&page=1`}
                                      className="text-xs  text-gray-700 hover:text-red-500 dark:text-gray-200 block capitalize px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-700"
                                    >
                                      {subChild.category_name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          <div></div>
        </div>
      </header>
      {/* Floating Cart Button (visible on both large and small screens when cart is closed) */}
      {!isSidebarOpen && !path.includes("/checkout") && !path.includes("/placeorder") && (
        <button
          onClick={toggleSidebar}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-red-500 hover:brightness-110 text-white shadow-2xl transition-all hover:scale-110 active:scale-95 animate-pulse-subtle group"
          title="Open Cart"
        >
          <IoCartOutline className="text-2xl group-hover:animate-wiggle" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow animate-bounce">
              {cartCount}
            </span>
          )}
        </button>
      )}

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
