"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdOutlineMenu } from "react-icons/md";

const VerticalDropdownNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
    if (isOpen) {
      setIsProductsOpen(false);
      setIsServicesOpen(false);
    }
  };

  const toggleProductsMenu = () => {
    setIsProductsOpen(prev => !prev);
    if (!isProductsOpen) {
      setIsServicesOpen(false);
    }
  };

  const toggleServicesMenu = () => {
    setIsServicesOpen(prev => !prev);
    if (!isServicesOpen) {
      setIsProductsOpen(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement; // Cast to HTMLElement
    if (
      target &&
      !target.closest('.dropdown-menu') &&
      !target.closest('button')
    ) {
      setIsOpen(false);
      setIsProductsOpen(false);
      setIsServicesOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="p-1 h-1 text-gray-600 dark:text-gray-300 focus:outline-none"
      >
        <MdOutlineMenu size={30} />
      </button>

      <div
        className={`absolute animate-fade-down animate-once w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg transition-opacity duration-300 dropdown-menu ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ left: '0', marginTop: "30px" }} // Adjust based on your layout
      >
        <div className="flex flex-col p-2">
          <Link href="/">
            <div
              className="py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Home
            </div>
          </Link>
          <div
            className="py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
            onClick={toggleProductsMenu}
          >
            Products
          </div>
          <div
            className="py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
            onClick={toggleServicesMenu}
          >
            Services
          </div>
          <Link href="/contact">
            <div
              className="py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </div>
          </Link>

          {/* Sub-dropdown menu for Products */}
          <div
            className={`absolute animate-fade-down animate-once mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg transition-opacity duration-300 dropdown-menu ${
              isProductsOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ left: '100%', top: '0' }}
          >
            <div className="flex flex-col p-2">
              <Link href="/products/product1">
                <div
                  className="py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  onClick={() => setIsProductsOpen(false)}
                >
                  Product 1
                </div>
              </Link>
              <Link href="/products/product2">
                <div
                  className="py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  onClick={() => setIsProductsOpen(false)}
                >
                  Product 2
                </div>
              </Link>
              <Link href="/products/product3">
                <div
                  className="py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  onClick={() => setIsProductsOpen(false)}
                >
                  Product 3
                </div>
              </Link>
            </div>
          </div>

          {/* Sub-dropdown menu for Services */}
          <div
            className={`absolute animate-fade-down animate-once mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg transition-opacity duration-300 dropdown-menu ${
              isServicesOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ left: '100%', top: '0' }}
          >
            <div className="flex flex-col p-2">
              <Link href="/services/service1">
                <div
                  className="py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  onClick={() => setIsServicesOpen(false)}
                >
                  Service 1
                </div>
              </Link>
              <Link href="/services/service2">
                <div
                  className="py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  onClick={() => setIsServicesOpen(false)}
                >
                  Service 2
                </div>
              </Link>
              <Link href="/services/service3">
                <div
                  className="py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  onClick={() => setIsServicesOpen(false)}
                >
                  Service 3
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalDropdownNav;
