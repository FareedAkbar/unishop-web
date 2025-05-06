import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ImageSlider: React.FC = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    { image: "/assets/images/home/banner1.png", route: "/books" },
    { image: "/assets/images/home/banner2.jpg", route: "/graduation" },
    { image: "/assets/images/home/banner3.jpg", route: "/textbooks" },
    { image: "/assets/images/home/banner4.jpg", route: "/hoodies" },
    { image: "/assets/images/home/banner5.jpg", route: "/gifts" },
    { image: "/assets/images/home/banner6.jpg", route: "/local" },
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

  useEffect(() => {
    autoSlideRef.current = setInterval(goToNext, 5500);
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [currentIndex]);

  return (
    <div className="relative w-full px-4 pb-4 pt-2">
      <div className={`${isFlipping ? "animate-fade-in-right" : ""}`}>
        {/* Image */}
        <div className="relative">
          <Image
            src={slides[currentIndex]!.image}
            alt={`Slide ${currentIndex + 1}`}
            width={3000}
            height={3000}
            onClick={() => router.push(slides[currentIndex]!.route)}
            className="relative h-36 w-full cursor-pointer rounded-lg transition-transform duration-700 ease-in-out sm:h-72 lg:h-[400px] xl:h-[470px]"
            style={{ objectFit: "cover" }}
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
