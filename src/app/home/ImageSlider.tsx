import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PiBooksBold } from "react-icons/pi";
import { IoIosArrowRoundForward } from "react-icons/io";

interface ImageSliderProps {
  images: any[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full flex-col pb-4 lg:px-4">
      <div className="absolute z-10 w-2/5 p-1 lg:block lg:pl-10 lg:pt-10">
        <div className="flex h-24 flex-col justify-between px-2 py-2 sm:h-52 md:h-60 md:px-6 lg:h-80 lg:px-10">
          <div className="flex items-center lg:mb-4">
            <PiBooksBold className="sm:2xl mr-2 text-xl text-white lg:text-4xl" />
            {/* Book icon */}
            <span className="text-[8px] text-white sm:text-xl lg:text-lg">
              E-Text-books
            </span>
          </div>
          <div className="text-xl text-white sm:text-3xl lg:mb-4 lg:text-4xl">
            Up to 10% off Voucher
          </div>
          <button className="flex flex-row rounded-lg border-none bg-transparent text-[10px] text-white underline md:px-3 md:py-1.5 lg:px-4 lg:py-2">
            <span>Shop Now</span>
            <IoIosArrowRoundForward className="ml-1 text-sm text-white lg:mb-1 lg:text-base" />
          </button>
        </div>
      </div>
      <div className="relative h-28 w-full sm:h-72 lg:h-[400px]">
        <Image
          src={"/images/home/home1.png"}
          alt={`Image ${currentImageIndex + 1}`}
          width={100}
          height={100}
          objectFit="cover"
        />
      </div>
      {/* Dots Indicator */}
      <div className="mt-4 flex justify-center space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full ${currentImageIndex === index ? "border-2 border-black bg-red-500" : "bg-gray-400"}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
