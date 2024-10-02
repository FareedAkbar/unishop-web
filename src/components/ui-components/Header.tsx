"use client";
import React, { useEffect, useRef, useState } from 'react';
import { FaUserCircle, FaChevronDown, FaChevronUp, FaBars, FaChevronRight, FaTimes } from 'react-icons/fa';
import Input from './Input'; // Assuming you have an Input component
import Image from 'next/image';
import Logo from "../../../public/unishop_logo_new.png";
import { GoHeart } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlinePersonOutline } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { TbSettings } from "react-icons/tb";
import { HiLogin } from "react-icons/hi";
import { categories } from '~/constants/categories';
import { useAuthContext } from '~/Context/AuthContext';
import { useRouter } from 'next/navigation';
import SidebarCart from '../ui/sideCart/cartSidebar';

const Header = () => {
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const { logout,getGenre,cartItems } = useAuthContext();
  const router = useRouter()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State for hamburger menu
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const isFirstRender = useRef(true);

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
    if(section == 'home'){
      router.push('/')
    }
    if (isDropdown) {
      setOpenDropdown(null); // Close dropdown when clicking a section
    }
    // Implement any other logic, e.g., scrolling to the section
  };

  // Navigation items array with nested structure for Shop
  const navItems = [
    { label: 'Home', href: '/' },
    {
      label: 'Shop',
      subItems: [
        { label: 'Product 1', href: '#product1', onClick: () => handleSectionClick('product1', true) },
        { label: 'Product 2', href: '#product2', onClick: () => handleSectionClick('product2', true) },
      ],
    },
    { label: 'Contact', href: '#contact', onClick: () => handleSectionClick('contact') },
    { label: 'Signup', href: '#signup', onClick: () => handleSectionClick('signup') },
  ];

  const handleLogout = async () => {
    try {
      await logout(); // Await the logout promise
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error); // Handle the error as needed
    }
  };
  useEffect(()=>{
    if (isFirstRender.current) {
      isFirstRender.current = false; // Prevents further API calls on first render
    } else {
      getGenre().then((res) => {
        console.log(res);
        
      }).catch((err) => {
        console.log(err);
      });
    }
   
  },[])

  const toggleSidebar = () => {
    console.log("hit")
    setIsSidebarOpen((prev) => !prev);
  };


  return (
    <>
    <header className="bg-white  p-4 flex flex-col md:flex-row md:items-center">
      {/* Top Row: Hamburger, Logo, and Icons (Mobile View) */}
      <div className="flex justify-between items-center border-b pb-4 md:hidden">
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
            <span className="absolute -top-0 -right-0 bg-red-500 text-white text-[6px] rounded-full w-2 h-2 flex items-center justify-center">3</span>
          </div>

          <div className="relative">
            <IoCartOutline className="cursor-pointer text-xl" />
            <span className="absolute -top-0 -right-0 bg-red-500 text-white text-[6px] rounded-full w-2 h-2 flex items-center justify-center">5</span>
          </div>

          <div className="relative">
            <div className="bg-red-500 rounded-full cursor-pointer" onClick={toggleUserDropdown}>
              <MdOutlinePersonOutline className="text-white text-xl" />
            </div>
            {isUserDropdownOpen && (
              <div className="absolute right-0 bg-white shadow-md mt-1 w-24 z-10 py-2 px-1 rounded-md">
                <a href="#account-settings" className="flex items-center font-medium p-1 hover:bg-gray-100 text-[9px]">
                  <TbSettings className="mr-2" />
                  Account Setting
                </a>
                <a href="#signup" className="flex items-center p-1 font-medium hover:bg-gray-100 text-[9px]">
                  <HiLogin className="mr-2" />
                  Sign Up
                </a>
                <a href="#logout" className="flex items-center p-1 font-medium hover:bg-gray-100 text-[9px]">
                  <HiLogin className="mr-2" />
                  Logout
                </a>
              </div>
            )}
          </div>
          <button
            className={`p-3 z-30 ${isMobileMenuOpen ? 'bg-white' : ''}`} // You can adjust the background color if needed
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {/* {isMobileMenuOpen ? (
                <FaTimes className="text-xl text-red-500" />
            ) : ( */}
            <FaBars className="text-xl text-red-500" />
            {/* )} */}
          </button>

        </div>
      </div>

      {/* Search Bar (Visible on Small Screens) */}
      <div className="mt-2  md:hidden mx-2">
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
            className="fixed inset-0 bg-black bg-opacity-50 z-20 " // Dark overlay
            onClick={() => setMobileMenuOpen(false)} // Close the menu on overlay click
          />

          <button
            className={`fixed right-5 top-5  md:hidden sm:block z-40 ${isMobileMenuOpen ? 'bg-white' : ''}`} // Ensure z-30 is applied
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FaTimes className="text-xl text-red-500" />
          </button>

          <nav className="flex flex-col md:w-1/2 w-full bg-white p-4 overflow-scroll md:hidden fixed top-0 right-0 z-30 h-[80%]">
            <button
              onClick={() => {
                router.push('/')
              }}
              className="flex items-center justify-between mb-4 w-full text-black  text-lg focus:outline-none"
            >
              <span>Home</span>
            </button>
            {categories.map((item) => (
              <div key={item.label} className="mb-4">
                <button
                  onClick={() => item.subItems ? toggleDropdown(item.label) : null}
                  className="flex items-center justify-between w-full text-black  text-lg focus:outline-none"
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
                  <div className="mt-1 ml-4">
                    {item.subItems.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        className="block text-sm text-gray-700 py-1 hover:underline"
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
              className="flex items-center justify-between mb-4 w-full text-black  text-lg focus:outline-none"
            >
              <span>Logout</span>
            </button>
          </nav>
        </>
      )}

      {/* Desktop Layout */}
      <div className="hidden md:flex md:items-center md:justify-between w-full mt-4 pb-4 border-b">
        {/* Logo on the Left */}
        <div className="flex items-center">
          <Image
            src={Logo}
            width={140}
            height={50}
            alt="Logo"
            className="flex-shrink-0 rounded-md shadow-2xl"
          />
        </div>

        {/* Navigation Items in the Center */}
        <nav className="flex-grow flex justify-center space-x-6">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <button
                onClick={() => item.subItems ? toggleDropdown(item.label) : handleSectionClick(item.label.toLowerCase())}
                className={`flex items-center relative ${item.subItems ? 'cursor-pointer' : ''}`}
              >
                <span className={` activeSection === item.label.toLowerCase() ? 'underline text-black' : ''`}>
                  {item.label}
                </span>
                {item.subItems && (
                  <span className="ml-1">{openDropdown === item.label ? <FaChevronUp /> : <FaChevronDown />}</span>
                )}
              </button>
              {/* Render dropdown menu if subItems exist */}
              {item.subItems && openDropdown === item.label && (
                <div className="absolute bg-white shadow-md mt-1 w-40 z-10">
                  {item.subItems.map((subItem) => (
                    <a
                      key={subItem.label}
                      href={subItem.href}
                      onClick={subItem.onClick} // Call the onClick for subItems
                      className="block  px-4 py-2 hover:bg-gray-100"
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Section: Search Bar and Icons */}
        <div className="flex items-center space-x-4">
          <Input
            placeholder="What are you looking for?"
            value={searchTerm}
            onChange={handleSearchChange}
            icon={<FiSearch />}
            width="w-64"
          />
          <div className="relative" >
            <GoHeart className="cursor-pointer text-3xl" />
            <span className="absolute -top-0 -right-0 bg-red-500 text-white text-[6px] text-sm rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </div>
          <div className="relative" onClick={()=>toggleSidebar()}>
            <IoCartOutline className="cursor-pointer text-3xl" />
            <span className="absolute -top-0 -right-0 bg-red-500 text-white text-[6px] text-sm rounded-full w-4 h-4 flex items-center justify-center"> {cartItems?.length}</span>
          </div>
          <div className="relative">
            <div className="bg-red-500 rounded-full cursor-pointer" onClick={toggleUserDropdown}>
              <MdOutlinePersonOutline className="text-white text-xl" />
            </div>
            {isUserDropdownOpen && (
              <div className="absolute right-0 bg-white shadow-md mt-1 w-24 z-10 py-2 px-1 rounded-md">
                <a href="#account-settings" className="flex items-center font-medium p-1 hover:bg-gray-100 text-[9px]">
                  <TbSettings className="mr-2" />
                  Account Setting
                </a>
                <a onClick={()=>handleLogout()} href="#logout" className="flex items-center p-1 font-medium hover:bg-gray-100 text-[9px]">
                  <HiLogin className="mr-2" />
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </header>
    <SidebarCart
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
};

export default Header;
