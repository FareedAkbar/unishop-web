"use Client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FaChevronRight,
  FaChevronDown,
  FaReceipt,
  FaHome,
  FaPhoneAlt,
} from "react-icons/fa";
import { categories } from "~/constants/categories";
import { useAuthContext } from "~/Context/AuthContext";
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
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
const iconMap: { [key: string]: JSX.Element } = {
  FaBook: <FaBook className="text-blue-700" />,
  FaGraduationCap: <FaGraduationCap />,
  FaTshirt: <FaTshirt className="text-green-600" />,
  FaPen: <FaPen className="text-yellow-600" />,
  FaGift: <FaGift className="text-purple-600" />,
  FaClipboardList: <FaClipboardList className="text-orange-600" />,
  AiOutlineFileText: <AiOutlineFileText className="text-teal-600" />,
  AiOutlineContacts: <AiOutlineContacts className="text-amber-600" />,
};

interface Category {
  label: string;
  subItems?: Category[];
  href?: string;
}

interface SubcategoryListProps1 {
  subItems: CategoryTreeNode[];
  openCategories: string[];
  toggleCategory: (label: string) => void;
  setOpenCategories: React.Dispatch<React.SetStateAction<string[]>>;
  item: string;
}

interface SubcategoryListProps {
  subItems: Category[];
  openCategory: string | null;
  toggleCategory: (label: string) => void;
  isOpen: boolean;
}

const StaticGiftsRoutes = [
  {
    label: "Danielle Hulls Photography",
    icon: FaGift,
    href: "/gifts?desc=Photography",
  },
  { label: "Marini Ferlazzo", icon: FaGift, href: "/gifts?desc=Ferlazzo" },
  { label: "White Clay Mountain", icon: FaGift, href: "/gifts?desc=Mountain" },
  { label: "Eliza Jade Candles", icon: FaGift, href: "/gifts?desc=Candles" },
];

const SubcategoryList1 = ({
  subItems,
  openCategories,
  toggleCategory,
  item,
  setOpenCategories,
}: SubcategoryListProps1) => {
  const router = useRouter();
  return (
    <div className="absolute left-10 top-8 z-50 rounded-xl border bg-white p-4 shadow-lg dark:bg-slate-700 dark:text-white">
      {subItems.map((subItem) => (
        <div key={subItem.category_name} className="relative">
          <button
            onClick={() => {
              if (subItem.children?.[0]) {
                toggleCategory(`${subItem.category_name}`);
              } else {
                router.push(
                  `/products?category=${subItem.category_type_id}&name=${subItem.category_name}&detail=${subItem.id}`,
                );
                setTimeout(() => {
                  setOpenCategories([]);
                }, 1000);
              }
            }}
            className="flex w-full items-center justify-between py-1 text-sm hover:underline focus:outline-none"
          >
            <span className="mr-2 text-left capitalize">
              {subItem.category_name}
            </span>
            {subItem.children?.[0] &&
              (openCategories.includes(`${item}/${subItem.category_name}`) ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              ))}
          </button>

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
          <div key={subItem.label} className="relative">
            <button
              onClick={() => {
                router.push(subItem.href);
                setTimeout(() => {
                  setOpenCategories([]);
                }, 500);
              }}
              className="flex w-full items-center justify-between py-1 text-sm hover:underline focus:outline-none"
            >
              <span className="mr-2 text-left capitalize" title={subItem.label}>
                {subItem.label}
              </span>
            </button>
          </div>
        ))}
    </div>
  );
};

const SubcategoryList = ({
  subItems,
  openCategory,
  toggleCategory,
  isOpen,
}: SubcategoryListProps) => {
  const router = useRouter();
  return (
    <div className="">
      {subItems.map((subItem) => (
        <div key={subItem.label} className="relative">
          <button
            onClick={() =>
              subItem.subItems
                ? toggleCategory(subItem.label)
                : router.push(subItem?.href ?? "")
            }
            className="flex w-full items-center justify-between py-1 text-sm hover:underline focus:outline-none"
          >
            <span>{subItem.label}</span>
            {subItem.subItems &&
              (openCategory === subItem.label ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              ))}
          </button>

          {openCategory === subItem.label && subItem.subItems && (
            <div className="ml-4 mt-2">
              <SubcategoryList
                subItems={subItem.subItems}
                openCategory={openCategory}
                toggleCategory={toggleCategory}
                isOpen={openCategory === subItem.label}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

interface CategoriesSidebarProps {
  className?: string;
}

const CategoriesSidebar = ({ className }: CategoriesSidebarProps) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const { genre, checkoutData, category, subCategory } = useAuthContext();
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [headerCategory, setHeaderCategory] = useState<
    SideBarCategory[] | null
  >(null);

  const toggleCategory = async (label: string) => {
    setOpenCategories((prev) => {
      setOpenCategory(null);
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

  const toggleCategory2 = (label: string) => {
    setOpenCategories([]);
    setOpenCategory((pre) => (pre == label ? "" : label));
  };

  type CategoriesMap = Record<number, SuperCategory & { children: CAT[] }>;

  // Extend Category1 to include children
  interface CategoryTreeNode2 extends CAT {
    children: CategoryTreeNode2[];
  }

  const buildCategoryTree = (categories: CAT[]): CategoryTreeNode2[] => {
    const categoriesMap: Record<number, CategoryTreeNode2> = {};

    // Step 1: Organize categories by ID and initialize children
    categories.forEach((cat) => {
      categoriesMap[cat.id] = { ...cat, children: [] };
    });

    const categoryTree: CategoryTreeNode2[] = [];

    // Step 2: Build the tree structure
    categories.forEach((cat) => {
      if (cat.parent === 0) {
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setOpenCategory(null);
        setOpenCategories([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className={`absolute left-0 w-72 rounded-r-xl border-y border-r bg-white py-2 pl-4 pr-2 shadow-lg dark:bg-slate-700 ${className}`}
    >
      <h2 className="text-lg font-bold">CATEGORIES</h2>
      <nav className="relative py-3">
        {headerCategory?.map((item) => (
          // item.id != 472 && (
          <div key={item.type} className="relative">
            <button
              type="button"
              className="flex w-full items-center justify-between pl-1 pr-2 transition-transform hover:scale-105"
            >
              <div className="flex items-center justify-start">
                <AiOutlineFileText className="mr-1.5 h-6 w-6 p-0.5 text-orange-600" />
                {/* {item.object_path && (
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    <Image
                      src={
                        item?.object_path
                          ? `https://ipos-storage.s3.amazonaws.com/${item.object_path}`
                          : "/assets/images/products/product.png"
                      }
                      alt={item?.object_path ?? ""}
                      width={20}
                      height={20}
                      className="flex-shrink-0 rounded-md object-cover mr-3"
                    />
                  )} */}
                <span
                  className="text-left text-sm"
                  onClick={() => {
                    router.push(
                      `/products?category=${item.category_type_id}&name=${item.type}`,
                    );
                    setOpenCategories([]);
                  }}
                >
                  {item.type}
                </span>
              </div>
              {item.children?.[0] && (
                <div onClick={() => toggleCategory(item.type)}>
                  {openCategories.includes(item.type) ? (
                    <FaChevronDown size={12} />
                  ) : (
                    <FaChevronRight size={12} />
                  )}
                </div>
              )}
            </button>
            <div className="my-1 ml-2 h-px w-[50%] border-t border-gray-400" />

            {openCategories.includes(item.type) && item.children?.[0] && (
              <SubcategoryList1
                subItems={item.children}
                openCategories={openCategories}
                item={item.type}
                toggleCategory={(val) => toggleCategory(`${item.type}/${val}`)}
                setOpenCategories={setOpenCategories}
              />
            )}
          </div>
          // )
        ))}
        {categories.map((item) => (
          <div key={item.label} className="relative">
            <button
              type="button"
              onClick={() =>
                item.subItems ||
                item.label === "Books" ||
                item.label === "Pulse"
                  ? toggleCategory2(item.label)
                  : null
              }
              className="duration-240 flex w-full items-center justify-between px-2 text-lg transition-transform hover:scale-105 focus:outline-none"
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

                <Link href={item.href ?? ""} className="text-sm" scroll={false}>
                  {item.label}
                </Link>
              </div>
              {item.subItems || item.label == "Pulse" ? (
                openCategory == item.label ? (
                  <FaChevronDown size={12} />
                ) : (
                  <FaChevronRight size={12} />
                )
              ) : null}
            </button>
            <div className="my-1.5 ml-2 h-px w-[50%] border-t border-gray-400" />
            {openCategory == item.label && (
              <div className="absolute left-10 top-8 z-50 w-60 rounded-xl border bg-white p-4 shadow-lg dark:bg-slate-700 dark:text-white">
                {item.label === "Books" && genre && (
                  <ScrollArea className="h-[25vh]">
                    {genre?.map((subItem) => (
                      <Link
                        key={subItem.genre}
                        href={`books?detail=${subItem.genre}`}
                        className="block py-1 text-sm hover:underline"
                        onClick={() => {
                          setOpenCategory(null);
                          setTimeout(() => {
                            setOpenCategories([]);
                          }, 1000);
                        }}
                        passHref
                      >
                        {subItem.genre}
                      </Link>
                    ))}
                  </ScrollArea>
                )}
                {item.label === "Pulse" && (
                  <div className="">
                    <a
                      href="https://apps.apple.com/ie/app/uow-pulse-ltd/id6476544403"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-1 text-sm hover:underline"
                    >
                      Download on the App Store
                    </a>

                    <a
                      href="https://play.google.com/store/apps/details?id=com.iitsols.pulseuowltd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-1 text-sm hover:underline"
                    >
                      Get it on Google Play
                    </a>
                  </div>
                )}

                {item.subItems?.[0] && (
                  <SubcategoryList
                    subItems={item.subItems}
                    openCategory={openCategory}
                    toggleCategory={toggleCategory2}
                    isOpen={openCategory === item.label}
                  />
                )}
              </div>
            )}
          </div>
        ))}

        {checkoutData?.booknet_customer_id ? (
          <button
            onClick={() => router.push("/my-orders")}
            className="mb-2 flex w-full items-center px-2 text-lg transition-transform duration-300 hover:scale-105 focus:outline-none"
          >
            <FaReceipt className="mr-2 text-indigo-600" />
            <span className="text-sm">My Orders</span>
          </button>
        ) : (
          ""
        )}
      </nav>

      <div className="flex justify-evenly gap-1 py-1">
        <Link
          href="/"
          className="flex min-w-28 flex-row items-center justify-center gap-2 whitespace-nowrap rounded bg-red-500 p-2 text-white transition-transform hover:scale-105"
        >
          <FaHome size={16} />
          <span className="text-xs">Home</span>
        </Link>

        <Link
          href="/contact-us"
          className="flex min-w-28 flex-row items-center justify-center gap-2 whitespace-nowrap rounded bg-red-500 p-2 text-white transition-transform hover:scale-105"
        >
          <FaPhoneAlt size={16} />
          <span className="text-xs">Contact Us</span>
        </Link>
      </div>
    </aside>
  );
};

export default CategoriesSidebar;
