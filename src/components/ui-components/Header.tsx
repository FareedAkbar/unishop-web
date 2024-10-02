"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  FaUserCircle,
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import Input from "./Input"; // Assuming you have an Input component
import Image from "next/image";
import Logo from "../../../public/unishop_logo_new.png";
import { GoHeart } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlinePersonOutline } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { TbSettings } from "react-icons/tb";
import { HiLogin } from "react-icons/hi";
import { categories } from "~/constants/categories";

const Header = () => {
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State for hamburger menu
  const userDropdownRef = useRef<HTMLDivElement | null>(null); // Reference for user dropdown

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleDropdown = (section: string) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSectionClick = (section: string, isDropdown = false) => {
    setActiveSection(section);
    if (isDropdown) {
      setOpenDropdown(null); // Close dropdown when clicking a section
    }
    // Implement any other logic, e.g., scrolling to the section
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Navigation items array with nested structure for Shop
  const navItems = [
    { label: "Home", href: "#home" },
    {
      label: "Shop",
      subItems: [
        {
          label: "Product 1",
          href: "#product1",
          onClick: () => handleSectionClick("product1", true),
        },
        {
          label: "Product 2",
          href: "#product2",
          onClick: () => handleSectionClick("product2", true),
        },
      ],
    },
    {
      label: "Contact",
      href: "#contact",
      onClick: () => handleSectionClick("contact"),
    },
    {
      label: "Signup",
      href: "#signup",
      onClick: () => handleSectionClick("signup"),
    },
  ];

  return (
    <header className="flex flex-col bg-white p-4 md:flex-row md:items-center">
      {/* Top Row: Hamburger, Logo, and Icons (Mobile View) */}
      <div className="flex items-center justify-between border-b pb-4 md:hidden">
        {/* Hamburger Icon */}


        {/* Logo in the Center */}
        <div className="flex-grow text-center">
          <Image
            src={Logo}
            width={140}
            height={50}
            alt="Logo"
            className="flex-shrink-0 rounded-md shadow-2xl"
          />
        </div>

        {/* Right Section: Heart, Cart, and User Dropdown Icons */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <GoHeart className="cursor-pointer text-xl" />
            <span className="absolute -right-0 -top-0 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 text-[6px] text-white">
              3
            </span>
          </div>

          <div className="relative">
            <IoCartOutline className="cursor-pointer text-xl" />
            <span className="absolute -right-0 -top-0 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 text-[6px] text-white">
              5
            </span>
          </div>

          <div className="relative" ref={userDropdownRef}>
            {" "}
            {/* Attach the ref here */}
            <div
              className="cursor-pointer rounded-full bg-red-500"
              onClick={toggleUserDropdown}
            >
              <MdOutlinePersonOutline className="text-xl text-white" />
            </div>
            {isUserDropdownOpen && (
              <div className="absolute right-0 z-10 mt-1 w-24 rounded-md bg-white px-1 py-2 shadow-md">
                <a
                  href="#account-settings"
                  className="flex items-center p-1 text-[9px] font-medium hover:bg-gray-100"
                >
                  <TbSettings className="mr-2" />
                  Account Setting
                </a>
                <a
                  href="#signup"
                  className="flex items-center p-1 text-[9px] font-medium hover:bg-gray-100"
                >
                  <HiLogin className="mr-2" />
                  Sign Up
                </a>
                <a
                  href="#logout"
                  className="flex items-center p-1 text-[9px] font-medium hover:bg-gray-100"
                >
                  <HiLogin className="mr-2" />
                  Logout
                </a>
              </div>
            )}
          </div>
          <button
            className={`z-30 p-3 ${isMobileMenuOpen ? "bg-white" : ""}`} // You can adjust the background color if needed
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FaBars className="text-xl text-red-500" />
          </button>
        </div>
      </div>

      {/* Search Bar (Visible on Small Screens) */}
      <div className="mx-2 mt-2 md:hidden">
        <Input
          placeholder="What are you looking for?"
          value={searchTerm}
          onChange={handleSearchChange}
          icon={<FiSearch />}
          width="w-full"
        />
      </div>

      {/* Mobile Menu for Navigation Items */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay to reduce opacity */}
          <div
            className="fixed inset-0 z-20 bg-black bg-opacity-50" // Dark overlay
            onClick={() => setMobileMenuOpen(false)} // Close the menu on overlay click
          />

          <button
            className={`fixed right-5 top-5 z-40 sm:block md:hidden ${isMobileMenuOpen ? "bg-white" : ""}`} // Ensure z-30 is applied
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FaTimes className="text-xl text-red-500" />
          </button>

          <nav className="fixed right-0 top-0 z-30 flex h-[80%] w-full flex-col overflow-scroll bg-white p-4 md:hidden md:w-1/2">
            <button
              onClick={() => {
                //
              }}
              className="mb-4 flex w-full items-center justify-between text-lg text-black focus:outline-none"
            >
              <span>Home</span>
            </button>
            {categories.map((item) => (
              <div key={item.label} className="mb-4">
                <button
                  onClick={() =>
                    item.subItems ? toggleDropdown(item.label) : null
                  }
                  className="flex w-full items-center justify-between text-lg text-black focus:outline-none"
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
                {item.subItems && openDropdown === item.label && (
                  <div className="ml-4 mt-1">
                    {item.subItems.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        className="block py-1 text-sm text-gray-700 hover:underline"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => {
                //
              }}
              className="mb-4 flex w-full items-center justify-between text-lg text-black focus:outline-none"
            >
              <span>Logout</span>
            </button>
          </nav>
        </>
      )}

      {/* Desktop Layout */}
      <div className="mt-4 hidden w-full border-b pb-4 md:flex md:items-center md:justify-between">
        <div className="flex w-full items-center justify-between">
          <div className="flex-grow text-left">
            <Image
              src={Logo}
              width={140}
              height={50}
              alt="Logo"
              className="flex-shrink-0 rounded-md shadow-2xl"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Input
              placeholder="What are you looking for?"
              value={searchTerm}
              onChange={handleSearchChange}
              icon={<FiSearch />}
              width="w-64"
            />
            <div className="relative">
              <GoHeart className="cursor-pointer text-xl" />
              <span className="absolute -right-0 -top-0 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 text-[6px] text-white">
                3
              </span>
            </div>

            <div className="relative">
              <IoCartOutline className="cursor-pointer text-xl" />
              <span className="absolute -right-0 -top-0 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 text-[6px] text-white">
                5
              </span>
            </div>

            <div className="relative" ref={userDropdownRef}>
              <div
                className="cursor-pointer rounded-full bg-red-500"
                onClick={toggleUserDropdown}
              >
                <MdOutlinePersonOutline className="text-xl text-white" />
              </div>
              {isUserDropdownOpen && (
                <div className="absolute right-0 z-10 mt-1 w-24 rounded-md bg-white px-1 py-2 shadow-md">
                  <a
                    href="#account-settings"
                    className="flex items-center p-1 text-[9px] font-medium hover:bg-gray-100"
                  >
                    <TbSettings className="mr-2" />
                    Account Setting
                  </a>
                  <a
                    href="#signup"
                    className="flex items-center p-1 text-[9px] font-medium hover:bg-gray-100"
                  >
                    <HiLogin className="mr-2" />
                    Sign Up
                  </a>
                  <a
                    href="#logout"
                    className="flex items-center p-1 text-[9px] font-medium hover:bg-gray-100"
                  >
                    <HiLogin className="mr-2" />
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
