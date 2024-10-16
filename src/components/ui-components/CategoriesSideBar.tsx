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
import type { CategoryTreeNode, Category as CAT } from "~/types/category";
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
import { outlet221 } from "~/types/tokens";

// Create a mapping of icon names to their corresponding components
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

interface SubcategoryListProps {
  subItems: Category[];
  openCategory: string | null;
  toggleCategory: (label: string) => void;
  isOpen: boolean;
}

const SubcategoryList = ({
  subItems,
  openCategory,
  toggleCategory,
  isOpen,
}: SubcategoryListProps) => {
  return (
    <div className="">
      {subItems.map((subItem) => (
        <div key={subItem.label} className="relative">
          <button
            onClick={() =>
              subItem.subItems ? toggleCategory(subItem.label) : null
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
  className?: string; // Adding the className prop
}

const CategoriesSidebar = ({ className }: CategoriesSidebarProps) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const { genre, checkoutData, category } = useAuthContext();
  const router = useRouter();
  const [headerCategory, setHeaderCategory] = useState<
    CategoryTreeNode[] | null
  >(null);
  const sidebarRef = useRef<HTMLDivElement>(null); // Ref for sidebar

  // Toggle category function
  const toggleCategory = (label: string) => {
    setOpenCategory((prev) => (prev === label ? null : label));
  };

  // Build the category tree
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
      if (category.parent === 0 && category.outlet === outlet221) {
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

  // Initialize category tree on mount
  useEffect(() => {
    if (!category) return;

    const categoryTree = buildCategoryTree(category);
    console.log(categoryTree);
    setHeaderCategory(categoryTree);
  }, [category]);

  // Close subcategories on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setOpenCategory(null);
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
      className={`absolute left-0 w-64 rounded-r-xl border-y border-r bg-white p-4 shadow-lg dark:bg-slate-700 ${className}`}
    >
      <h2 className="text-lg font-bold">CATEGORIES</h2>
      <nav className="relative mt-4">
        {categories.map((item) => (
          <div key={item.label} className="relative">
            <button
              type="button"
              onClick={() =>
                item.subItems ||
                item.label === "Books" ||
                item.label === "Text Book"
                  ? toggleCategory(item.label)
                  : null
              }
              className="duration-240 flex w-full items-center justify-between text-lg transition-transform hover:scale-110 focus:outline-none"
            >
              <div className="flex items-center">
                {item.icon && (
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  <span className="mr-3">{iconMap[item.icon]}</span>
                )}
                <Link href={item.href ?? ""} scroll={false}>
                  {item.label}
                </Link>
              </div>
              {item.subItems ||
              item.label === "Books" ||
              item.label === "Text Book" ? (
                openCategory === item.label ? (
                  <FaChevronDown size={12} />
                ) : (
                  <FaChevronRight size={12} />
                )
              ) : null}
            </button>
            <div className="my-1 h-px w-[50%] border-t border-gray-400" />
            {openCategory === item.label && (
              <div className="absolute left-10 top-8 z-50 w-60 rounded-xl border bg-white p-4 shadow-lg dark:bg-slate-700 dark:text-white">
                {item.label === "Books" &&
                  genre?.map((subItem) => (
                    <Link
                      key={subItem.genre}
                      href={`books?detail=${subItem.genre}`}
                      className="block py-1 text-sm hover:underline"
                      onClick={() => setOpenCategory(null)}
                      passHref
                    >
                      {subItem.genre}
                    </Link>
                  ))}
                {item.label === "Text Book" &&
                  headerCategory?.[0]?.children?.map((subItem) => (
                    <Link
                      key={subItem.id}
                      href={`textbooks?detail=${subItem.id}`}
                      className="block py-1 text-sm hover:underline"
                      onClick={() => setOpenCategory(null)}
                    >
                      {subItem.category_name}
                    </Link>
                  ))}
                {item.subItems && (
                  <SubcategoryList
                    subItems={item.subItems}
                    openCategory={openCategory}
                    toggleCategory={toggleCategory}
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
            className="mb-2 flex w-full items-center text-lg transition-transform duration-300 hover:scale-110 focus:outline-none"
          >
            <FaReceipt className="mr-3 text-indigo-600" />
            <span>My Orders</span>
          </button>
        ) : (
          ""
        )}
        <div className="flex justify-between gap-1 py-1">
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
      </nav>
    </aside>
  );
};

export default CategoriesSidebar;
