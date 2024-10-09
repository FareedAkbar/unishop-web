import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
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

// Create a mapping of icon names to their corresponding components
const iconMap: { [key: string]: JSX.Element } = {
  FaBook: <FaBook className="text-blue-700" />,
  FaGraduationCap: <FaGraduationCap className="text-red-600" />,
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
  isOpen: boolean; // Track if this subcategory is open
}

const SubcategoryList = ({
  subItems,
  openCategory,
  toggleCategory,
  isOpen,
}: SubcategoryListProps) => {
  return (
    <div className="ml-4">
      {subItems.map((subItem) => (
        <div key={subItem.label} className="relative">
          <button
            onClick={() =>
              subItem.subItems ? toggleCategory(subItem.label) : null
            }
            className="flex w-full items-center justify-between font-poppins text-sm text-black focus:outline-none"
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

const CategoriesSidebar = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const { genre, checkoutData, category } = useAuthContext();
  const router = useRouter();
  const [headerCategory, setHeaderCategory] = useState<
    CategoryTreeNode[] | null
  >(null);
  // Toggle category function
  const subcategoryRefs = useRef<Record<string, HTMLDivElement | null>>({}); // Create a ref for subcategories

  const toggleCategory = (label: string) => {
    setOpenCategory((prev) => (prev === label ? null : label));
  };

  function buildCategoryTree(categories: CAT[]): CategoryTreeNode[] {
    const categoryMap: Record<number, CategoryTreeNode> = {};
    const tree: CategoryTreeNode[] = [];

    // Initialize the map
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

    // Build the tree structure
    categories.forEach((category) => {
      if (category.parent == 0 && category.outlet == 223) {
        // Root category
        const rootCategory = categoryMap[category.id];
        if (rootCategory) {
          tree.push(rootCategory);
        }
      } else {
        // Find parent and add this category to its children
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

  // Usage Example
  useEffect(() => {
    if (!category) return;
    const categoryTree = buildCategoryTree(category ? category : []);
    setHeaderCategory(categoryTree ? categoryTree : null);
  }, [category]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isSubcategoryOpen = Object.keys(subcategoryRefs.current).some(
        (key) =>
          subcategoryRefs.current[key]?.contains(event.target as Node) &&
          openCategory === key,
      );

      if (!isSubcategoryOpen) {
        setOpenCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up the event listener
    };
  }, [openCategory]);


  return (
    <aside className="static left-0 w-64 border-r bg-red-50 rounded-r-xl p-4">
      <h2 className="text-lg font-bold">Categories</h2>
      <nav className="relative mt-4">
        {categories.map((item) => (
          <div key={item.label} className="relative mb-2">
            <button
              onClick={() =>
                item.subItems ||
                item.label === "Books" ||
                item.label === "Text Book"
                  ? toggleCategory(item.label)
                  : null
              }
              className="flex w-full items-center justify-between font-poppins text-lg text-black transition-transform duration-300 hover:scale-110 focus:outline-none"
            >
              <div className="flex items-center">
                {item.icon && (
                  <span className="mr-3">{iconMap[item.icon]}</span>
                )}
                <span>{item.label}</span>
              </div>
              {item.subItems ||
              item.label === "Books" ||
              item.label === "Text Book" ? (
                openCategory === item.label ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )
              ) : null}
            </button>

            {openCategory === item.label && (
              <div
                ref={(el) => {
                  if (el) subcategoryRefs.current[item.label] = el; // Assign ref without returning
                }}
                className="absolute left-10 top-8 z-50 w-60 rounded-xl border border-black bg-red-100 p-4 shadow-lg"
              >
                {item.label === "Books" &&
                  genre?.map((subItem) => (
                    <a
                      key={subItem.genre}
                      href={`books?detail=${subItem.genre}`}
                      className="block py-1 text-sm hover:underline"
                    >
                      {subItem.genre}
                    </a>
                  ))}
                {item.label === "Text Book" &&
                  headerCategory?.[0]?.children?.map((subItem) => (
                    <a
                      key={subItem.id}
                      href={`textbooks?detail=${subItem.id}`}
                      className="block py-1 text-sm hover:underline"
                    >
                      {subItem.category_name}
                    </a>
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

        {checkoutData?.booknet_customer_id && (
          <button
            onClick={() => router.push("/my-orders")}
            className="mb-2 flex w-full items-center justify-between font-poppins text-lg text-black focus:outline-none"
          >
            <span>My Orders</span>
          </button>
        )}

        {/* {checkoutData?.booknet_customer_id && (
          <button
            onClick={() => router.push("/special-order")}
            className="flex w-full items-center justify-between font-poppins text-lg text-black focus:outline-none"
          >
            <span>Special Order</span>
          </button>
        )} */}
        
      </nav>
    </aside>
  );
};

export default CategoriesSidebar;
