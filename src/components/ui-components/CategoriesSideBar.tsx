import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { categories } from "~/constants/categories";
import { useAuthContext } from "~/Context/AuthContext";

const CategoriesSidebar = () => {
  // State to keep track of open dropdowns
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { genre, checkoutData } = useAuthContext();
  const router = useRouter();

  // Toggle dropdown function
  const toggleDropdown = (label: string) => {
    if (openDropdown === label) {
      setOpenDropdown(null); // Close if already open
    } else {
      setOpenDropdown(label); // Open the selected one
    }
  };

  return (
    <aside className="static left-0 w-64 border-r p-4">
      <h2 className="text-lg font-bold">Categories</h2>
      <nav className="mt-4">
        {categories.map((item) => (
          <div key={item.label} className="mb-2">
            <button
              onClick={() =>
                item.subItems ? toggleDropdown(item.label) : null
              }
              className="flex w-full items-center justify-between font-poppins text-lg text-black focus:outline-none"
            >
              <span>{item.label}</span>
              {item.subItems ? (
                openDropdown === item.label ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )
              ) : null}
            </button>
            <div className="ml-4 mt-1">
              {item.label == "Books" &&
                openDropdown === item.label &&
                genre?.map((subItem) => (
                  <a
                    key={subItem.genre}
                    href={`books?detail=${subItem.genre}`}
                    className="block py-1 text-sm hover:underline"
                  >
                    {subItem.genre}
                  </a>
                ))}
            </div>
            {item.label != "Books" &&
              item.subItems &&
              openDropdown === item.label && (
                <div className="ml-4 mt-1">
                  {item.subItems.map((subItem) => (
                    <a
                      key={subItem.label}
                      href={subItem.href}
                      className="block py-1 text-sm hover:underline"
                    >
                      {subItem.label}
                    </a>
                  ))}
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
