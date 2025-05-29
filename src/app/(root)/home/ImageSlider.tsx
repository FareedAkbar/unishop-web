import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ImageSlider: React.FC = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    { image: "/assets/images/home/banner1.png", route: "/books" },
    { image: "/assets/images/home/banner2.jpg", route: "/academic-dress-hire" },
    { image: "/assets/images/home/banner3.jpg", route: "/books" },
    { image: "/assets/images/home/banner4.jpg", route: "/books" },
    { image: "/assets/images/home/banner5.jpg", route: "/gifts" },
    { image: "/assets/images/home/banner6.jpg", route: "/books" },
  ];

  const goToSlide = (index: number) => {
    setPrevIndex(currentIndex);
    setCurrentIndex(index);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 800); // match animation duration
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
    <div className="relative w-full overflow-hidden pb-4 pt-2 sm:px-4">
      {/* Image wrapper with transition */}
      <div className="relative aspect-[3/1] w-full">
        {prevIndex !== null && isAnimating && (
          <Image
            key={`prev-${prevIndex}`}
            src={slides[prevIndex]!.image}
            alt={`Slide ${prevIndex + 1}`}
            fill
            onClick={() => router.push(slides[prevIndex]!.route)}
            className="absolute inset-0 h-full w-full cursor-pointer rounded-lg object-cover opacity-100 transition-opacity duration-700 ease-in-out"
            style={{ zIndex: 10 }}
          />
        )}
        <Image
          key={`current-${currentIndex}`}
          src={slides[currentIndex]!.image}
          alt={`Slide ${currentIndex + 1}`}
          fill
          onClick={() => router.push(slides[currentIndex]!.route)}
          className={`absolute inset-0 h-full w-full cursor-pointer rounded-lg object-cover transition-opacity duration-700 ease-in-out ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
          style={{ zIndex: 20 }}
        />
        {/* Left Button */}
        <button
          onClick={goToPrev}
          className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70 md:p-2"
        >
          <IoIosArrowBack size={24} />
        </button>
        {/* Right Button */}
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70 md:p-2"
        >
          <IoIosArrowForward size={24} />
        </button>
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
