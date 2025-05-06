import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PiBooksBold } from "react-icons/pi";
import {
  IoIosArrowRoundForward,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";
import { FaGraduationCap, FaBook, FaTshirt, FaGift } from "react-icons/fa";

const ImageSlider: React.FC = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

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
      icon: <FaBook className="sm:2xl mr-2 text-xl text-white lg:text-4xl" />,
    },
    {
      image: "/assets/images/home/hoodies-home.jpg",
      name: "Hoodies",
      heading: "Cozy Hoodies",
      subheading: "Comfortable Styles",
      button: "Shop Hoodies",
      route: "/hoodies",
      icon: <FaTshirt className="sm:2xl mr-2 text-xl text-white lg:text-4xl" />,
    },
    {
      image: "/assets/images/home/UniShop_Website_06.png",
      name: "Gifts",
      heading: "MERCH, BOOKS AND BEYOND",
      subheading: "",
      button: "Shop Gifts",
      route: "/gifts",
      icon: <FaGift className="sm:2xl mr-2 text-xl text-white lg:text-4xl" />,
    },
    {
      image: "/assets/images/home/UniShop_Banner_SHOP_LOCAL_1.png",
      name: "Local",
      heading: "SHOP LOCAL",
      subheading: "Perfect for Any Occasion",
      button: "Shop Gifts",
      route: "/gifts",
      icon: <FaGift className="sm:2xl mr-2 text-xl text-white lg:text-4xl" />,
    },
  ];

  const goToSlide = (index: number) => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsFlipping(false);
    }, 300);
  };

  const goToNext = () => {
    goToSlide((currentIndex + 1) % slides.length);
  };

  const goToPrev = () => {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  };

  // Auto-slide with pause on manual control
  useEffect(() => {
    autoSlideRef.current = setInterval(() => {
      goToNext();
    }, 5500);

    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [currentIndex]);

  return (
    <div className="relative w-full px-4 pb-4 pt-2">
      <div className={`${isFlipping ? "animate-fade-in-left" : ""}`}>
        {/* Banner Content */}
        <div className="absolute z-10 w-2/5 p-1 lg:block lg:pl-10 lg:pt-10">
          <div className="flex h-10 flex-col justify-between px-2 py-2 sm:h-52 md:h-60 md:px-6 lg:h-80 lg:px-10">
            <div className="flex items-center lg:mb-4">
              {slides[currentIndex]!.icon}
              <span className="text-xs text-white sm:text-xl lg:text-lg">
                {slides[currentIndex]!.name}
              </span>
            </div>
          </div>
          <div className="text-lg font-bold text-white sm:text-2xl lg:text-4xl">
            {slides[currentIndex]!.heading}
          </div>
          <div className="text-md sm:text-1xl font-bold text-white lg:mb-4 lg:text-2xl">
            {slides[currentIndex]!.subheading}
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <Image
            src={slides[currentIndex]!.image}
            alt={slides[currentIndex]!.name}
            width={3000}
            height={3000}
            objectFit="cover"
            className={`relative h-36 w-full rounded-lg transition-transform duration-700 ease-in-out sm:h-72 lg:h-[400px] xl:h-[470px]`}
          />

          {/* Left Button */}
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70 md:p-2"
          >
            <IoIosArrowBack size={24} />
          </button>

          {/* Right Button */}
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70 md:p-2"
          >
            <IoIosArrowForward size={24} />
          </button>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="mt-4 flex items-center justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              currentIndex === index
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
