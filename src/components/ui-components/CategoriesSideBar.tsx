import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { categories } from "~/constants/categories";
import { useAuthContext } from "~/Context/AuthContext";
import type { CategoryTreeNode, Category as CAT } from "~/types/category";

interface Category {
  label: string;
  subItems?: Category[];
  href?: string;
}

interface SubcategoryListProps {
  subItems: Category[];
  openCategory: string | null;
  toggleCategory: (label: string) => void;
}

const SubcategoryList = ({
  subItems,
  openCategory,
  toggleCategory,
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
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const CategoriesSidebar = () => {
  // State to keep track of open category for subcategories
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const { genre, checkoutData, category } = useAuthContext();
  const router = useRouter();
  const [headerCategory, setHeaderCategory] = useState<CategoryTreeNode[] | null>(null);
  // Toggle category function
  const toggleCategory = (label: string) => {
    if (openCategory === label) {
      setOpenCategory(null); // Close if already open
    } else {
      setOpenCategory(label); // Open the selected category
    }
  };
 
  
  
  
  function buildCategoryTree(categories: CAT[]): CategoryTreeNode[] {
    const categoryMap: { [key: number]: CategoryTreeNode } = {};
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
      if (category.category_name === 'Impact Pulse' && category.parent == 0) {
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
  useEffect(()=>{
    if(!category) return
    const categoryTree = buildCategoryTree(category ? category : []);
    setHeaderCategory(categoryTree ? categoryTree : null);
    console.log(categoryTree)
  },[category])
 
  

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
              <div className="absolute left-10 top-8 z-50 w-60 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
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
                  headerCategory && headerCategory[0]?.children?.map(
                    (subItem) =>
                      (
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
