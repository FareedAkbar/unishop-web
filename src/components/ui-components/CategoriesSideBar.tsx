import { useState } from 'react';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { categories } from '~/constants/categories';
import { useAuthContext } from '~/Context/AuthContext';

const CategoriesSidebar = () => {
  

  // State to keep track of open dropdowns
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { genre } = useAuthContext();

  // Toggle dropdown function
  const toggleDropdown = (label: string) => {
    if (openDropdown === label) {
      setOpenDropdown(null); // Close if already open
    } else {
      setOpenDropdown(label); // Open the selected one
    }
  };

  return (
    <aside className="w-64 static left-0 p-4 border-r ">
      <h2 className="text-lg font-bold ">Categories</h2>
      <nav className="mt-4 ">
        {categories.map((item) => (
          <div key={item.label} className="mb-2">
            <button
              onClick={() => item.subItems ? toggleDropdown(item.label) : null}
              className="flex items-center justify-between w-full text-black font-poppins text-lg focus:outline-none"
            >
              <span>{item.label}</span>
              {item.subItems ? (
                openDropdown === item.label ? (
                  <FaChevronDown  />
                ) : (
                  <FaChevronRight  />
                )
              ) : null}
            </button>
            <div className="mt-1 ml-4">
            {item.label == 'Books' && openDropdown === item.label && (
              genre?.map((subItem)=>(
                <a
                    key={subItem.genre}
                    href={`books?detail=${subItem.genre}`}
                    className="block text-sm  py-1 hover:underline"
                  >
                    {subItem.genre}
                  </a>
              ))
            )}
            </div>
            {item.label != 'Books' && item.subItems && openDropdown === item.label && (
              <div className="mt-1 ml-4">
                {item.subItems.map((subItem) => (
                  <a
                    key={subItem.label}
                    href={subItem.href}
                    className="block text-sm  py-1 hover:underline"
                  >
                    {subItem.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default CategoriesSidebar;
