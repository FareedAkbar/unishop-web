import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { categories } from "~/constants/categories";
import { useAuthContext } from "~/Context/AuthContext";

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
  const subcategoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({}); // Create a ref for subcategories

  const toggleCategory = (label: string) => {
    setOpenCategory((prev) => (prev === label ? null : label));
  };

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
    <aside className="static left-0 w-64 border-r p-4">
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
              className="flex w-full items-center justify-between font-poppins text-lg text-black focus:outline-none"
            >
              <span>{item.label}</span>
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
                className="absolute left-10 top-8 z-50 w-60 rounded-xl border border-gray-200 bg-white p-4 shadow-lg"
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
                  category?.map(
                    (subItem) =>
                      subItem.parent === 0 && (
                        <a
                          key={subItem.id}
                          href={`textbooks?detail=${subItem.id}`}
                          className="block py-1 text-sm hover:underline"
                        >
                          {subItem.category_name}
                        </a>
                      ),
                  )}
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

        {checkoutData?.booknet_customer_id && (
          <button
            onClick={() => router.push("/special-order")}
            className="flex w-full items-center justify-between font-poppins text-lg text-black focus:outline-none"
          >
            <span>Special Order</span>
          </button>
        )}
      </nav>
    </aside>
  );
};

export default CategoriesSidebar;
