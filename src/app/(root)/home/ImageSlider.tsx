import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter for routing
import { PiBooksBold } from "react-icons/pi";
import { IoIosArrowRoundForward } from "react-icons/io";
  import { FaGraduationCap, FaBook, FaTshirt, FaGift } from "react-icons/fa";
  
const ImageSlider: React.FC = () => {
  const router = useRouter(); // Initialize router for navigation
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  
  const slides = [
    {
      image: "/assets/images/home/home1.png",
      name: "Books",
      heading: "Up to 20% off Books",
      subheading: "Wide Range of Titles",
      button: "Shop Books",
      route: "/books",
      icon: <PiBooksBold className="sm:2xl mr-2 text-xl text-white lg:text-4xl" />, // Books icon
    },
    {
      image: "/assets/images/home/stationary.png",
      name: "Graduation",
      heading: "Celebrate Graduation",
      subheading: "Exclusive Offers",
      button: "Shop Graduation",
      route: "/graduation",
      icon: <FaGraduationCap className="sm:2xl mr-2 text-xl text-white lg:text-4xl" />, // Graduation Cap icon
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
      image: "/assets/images/home/hoodies.jpg",
      name: "Hoodies",
      heading: "Cozy Hoodies",
      subheading: "Comfortable Styles",
      button: "Shop Hoodies",
      route: "/hoodies",
      icon: <FaTshirt className="sm:2xl mr-2 text-xl text-white lg:text-4xl" />, // T-shirt icon
    },
    {
      image: "/assets/images/home/gifts.png",
      name: "Gifts",
      heading: "Unique Gifts",
      subheading: "Perfect for Any Occasion",
      button: "Shop Gifts",
      route: "/gifts",
      icon: <FaGift className="sm:2xl mr-2 text-xl text-white lg:text-4xl" />, // Gift icon
    },
  ];
  

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true); // Start flipping out before changing the image
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        setIsFlipping(false); // Reset flip state after changing the image
      }, 500); // Duration matching the flip-out animation
    }, 3500); // Adjusted timing to account for flip effect

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="container flex w-full flex-col pb-4 lg:px-4">
      <div className="absolute z-10 w-2/5 p-1 lg:block lg:pl-10 lg:pt-10">
        <div className="flex h-24 flex-col justify-between px-2 py-2 sm:h-52 md:h-60 md:px-6 lg:h-80 lg:px-10">
          <div className="flex items-center lg:mb-4">
            {slides[currentIndex]!.icon}
            <span className="text-[8px] text-white sm:text-xl lg:text-lg">
              {slides[currentIndex]!.name}
            </span>
          </div>
          <div className="text-xl font-bold text-white sm:text-3xl lg:mb-4 lg:text-4xl">
            {slides[currentIndex]!.heading}
          </div>
          <button
            className="flex w-fit flex-row items-center rounded-lg border-none bg-red-600 px-1 text-[10px] lg:text-base text-white md:px-3 md:py-1.5 lg:px-4 lg:py-2 lg:font-bold"
            onClick={() => router.push(slides[currentIndex]!.route)} // Navigate to respective route
          >
            <span>{slides[currentIndex]!.button}</span>
            <IoIosArrowRoundForward className="ml-1 text-lg text-white lg:text-xl" />
          </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src={slides[currentIndex]!.image}
          alt={slides[currentIndex]!.name}
          width={1000}
          height={1000}
          objectFit="cover"
          className={`relative h-28 w-full rounded-lg opacity-80 transition-transform duration-700 ease-in-out sm:h-72 lg:h-[400px] ${
            isFlipping ? "animate-flip-out" : ""
          }`}
        />
      </div>
      {/* Dots Indicator */}
      <div className="mt-4 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full ${
              currentIndex === index
                ? "border-2 border-black bg-red-500"
                : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
