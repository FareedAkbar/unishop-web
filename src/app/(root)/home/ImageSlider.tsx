import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PiBooksBold } from "react-icons/pi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaGraduationCap, FaBook, FaTshirt, FaGift } from "react-icons/fa";

const ImageSlider: React.FC = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const slides = [
    {
      image: "/assets/images/home/UniShop_Banner_Books.png",
      name: "Books",
      heading: "Up to 20% off Books",
      subheading: "Wide Range of Titles",
      button: "Shop Books",
      route: "/books",
      icon: (
        <PiBooksBold className="sm:2xl mr-2 text-xl text-white lg:text-4xl" />
      ),
    },
    {
      image: "/assets/images/home/stationary.png",
      name: "Graduation",
      heading: "Celebrate Graduation",
      subheading: "Exclusive Offers",
      button: "Shop Graduation",
      route: "/graduation",
      icon: (
        <FaGraduationCap className="sm:2xl mr-2 text-xl text-white lg:text-4xl" />
      ),
    },
    {
      image: "/assets/images/home/text-books.png",
      name: "Textbooks",
      heading: "Textbooks Discount",
      subheading: "Up to 15% off",
      button: "Shop Textbooks",
      route: "/textbooks",
      icon: <FaBook className="sm:2xl mr-2 text-xl text-white lg:text-4xl" />, // Book icon
    },
    {
      image: "/assets/images/home/hoodies-home.jpg",
      name: "Hoodies",
      heading: "Cozy Hoodies",
      subheading: "Comfortable Styles",
      button: "Shop Hoodies",
      route: "/hoodies",
      icon: <FaTshirt className="sm:2xl mr-2 text-xl text-white lg:text-4xl" />, // T-shirt icon
    },
    {
      image: "/assets/images/home/UniShop_Website_06.png",
      name: "Gifts",
      heading: "MERCH, BOOKS AND BEYOND",
      subheading: "",
      button: "Shop Gifts",
      route: "/gifts",
      icon: <FaGift className="sm:2xl mr-2 text-xl text-white lg:text-4xl" />, // Gift icon
    },
    {
      image: "/assets/images/home/UniShop_Banner_SHOP_LOCAL_1.png",
      name: "Local",
      heading: "SHOP LOCAL",
      subheading: "Perfect for Any Occasion",
      button: "Shop Gifts",
      route: "/gifts",
      icon: <FaGift className="sm:2xl mr-2 text-xl text-white lg:text-4xl" />, // Gift icon
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        setIsFlipping(false);
      }, 700);
    }, 5500);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className={`flex w-full flex-col px-4 pb-4 pt-2`}>
      <div className={`${isFlipping ? "animate-fade-in-left" : ""}`}>
        <div className="absolute z-10 w-2/5 p-1 lg:block lg:pl-10 lg:pt-10">
          <div className="flex h-10 flex-col justify-between px-2 py-2 sm:h-52 md:h-60 md:px-6 lg:h-80 lg:px-10">
            <div className="flex items-center lg:mb-4">
              {slides[currentIndex]!.icon}
              <span className="text-xs text-white sm:text-xl lg:text-lg">
                {slides[currentIndex]!.name}
              </span>
            </div>

            {/* <button
              className="flex w-fit flex-row items-center rounded border-none bg-red-600 px-1 text-[10px] text-white md:px-3 md:py-1.5 lg:px-4 lg:py-2 lg:text-base lg:font-bold"
              onClick={() => router.push(slides[currentIndex]!.route)} // Navigate to respective route
            >
              <span>{slides[currentIndex]!.button}</span>
              <IoIosArrowRoundForward className="ml-1 text-lg text-white lg:text-xl" />
            </button> */}
          </div>

          <div className="text-xl font-bold  sm:text-2xl lg:text-4xl text-white">{slides[currentIndex]!.heading}</div>

          <div className="text-md font-bold text-white sm:text-1xl lg:mb-4 lg:text-2xl">
            {slides[currentIndex]!.subheading}
          </div>
        </div>
        <div className="relative">
          <Image
            src={slides[currentIndex]!.image}
            alt={slides[currentIndex]!.name}
            width={3000}
            height={3000}
            objectFit="cover"
            className={`relative h-36 w-full rounded-lg transition-transform duration-700 ease-in-out sm:h-72 lg:h-[400px] xl:h-[470px]`}
          />
        </div>
      </div>
      {/* Dots Indicator */}
      <div className="mt-4 flex items-center justify-center space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`rounded-full ${currentIndex === index
                ? "h-3.5 w-3.5 border-2 border-black bg-red-500"
                : "h-3 w-3 bg-gray-400"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
