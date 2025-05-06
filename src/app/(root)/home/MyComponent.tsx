"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import ImageSlider from "./ImageSlider";
import CategoriesSidebar from "~/components/ui-components/CategoriesSideBar";
import GraduationBanner from "./GraduationBanner";
import ProductList from "~/components/ui-components/ProductList";
import { FlipWords } from "~/components/ui/flip-words";
import AboutSection from "./AboutSection";
import { useAuthContext } from "~/Context/AuthContext";
import { getSpecialItems } from "~/_actions/getitemsbycategory";
import { motion, AnimatePresence } from "framer-motion";
import { FaLeftLong, FaRightLong } from "react-icons/fa6";
import { ItemSpecialTag } from "~/types/productTags";
import { SpecialItemsForHomePage } from "~/types/specialItems";
import BackgroundSquares from "~/components/ui-components/BackgroundSquares";
import Spinner from "~/components/spinner";
const HomePage: React.FC = () => {
  const { productTags } = useAuthContext();
  const [specialItems, setSpecialItems] = useState<
    SpecialItemsForHomePage[] | null
  >(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Hover state
  const isHoveredRef = useRef(false); // Use a ref to track hover state

  // Hook to detect screen size
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setIsLargeScreen(window ? window.innerWidth >= 1024 : false); // Tailwind `lg` breakpoint is 1024px
    };
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const transitionVariants = {
    enter: (direction: "left" | "right") => ({
      opacity: 0,
      x: direction === "right" ? 50 : -50,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: "left" | "right") => ({
      opacity: 0,
      x: direction === "right" ? -50 : 50,
    }),
  };

  // Load data for special items
  useEffect(() => {
    if (productTags && productTags?.length < 0) return;

    const loadData = async (Tag: ItemSpecialTag) => {
      const x = await getSpecialItems(Tag.item_special_tags_id);
      if (typeof x != "boolean" && x.status && x.data) {
        if (x.data?.[0]) {
          const newData = {
            title: Tag.tag_name,
            data: x?.data,
          };
          setSpecialItems((prevData) => {
            const z = prevData?.find((item) => item.title == Tag.tag_name);
            if (z) return prevData;
            return prevData ? [...prevData, newData] : [newData];
          });
        }
      }
    };
    productTags?.map((item) => {
      loadData(item).catch((error) =>
        console.error("Failed to load data:", error),
      );
    });
  }, [productTags]);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHoveredRef.current) {
        handleNext();
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [specialItems]);

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      specialItems ? (prevIndex + 1) % specialItems.length : 0,
    );
  };

  const handlePrevious = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      specialItems
        ? (prevIndex - 1 + specialItems.length) % specialItems.length
        : 0,
    );
  };

  const getDisplayedItems = () => {
    if (!specialItems || specialItems.length === 0) return [];
    const firstIndex = currentIndex;
    const secondIndex = (currentIndex + 1) % specialItems.length;
    return [specialItems[firstIndex], specialItems[secondIndex]];
  };

  return (
    <div className="relative z-[1] flex-1 overflow-hidden bg-opacity-80 dark:bg-slate-800">
      <BackgroundSquares />
      <div className="flex justify-center">
        <ImageSlider />
      </div>
      <div className="flex flex-col items-center px-4 py-5 md:px-10">
        <div className="text-center text-xl md:flex md:text-3xl lg:flex lg:items-center lg:text-5xl">
          <FlipWords
            words={["Imagine", "Create", "Inspire", "Transform"]}
            className="font-bold text-red-500"
          />
          <span className="mt-2 block text-base md:mt-0.5 md:text-2xl lg:mt-0 lg:text-4xl">
            your reading adventure!
          </span>
        </div>
      </div>{" "}
      <div className="relative w-full">
        <div className="flex h-fit">
          <div className="hidden lg:block">
            <CategoriesSidebar />
          </div>
          <div
            className={`mx-auto w-full lg:pr-3 ${specialItems && specialItems?.length > 2 && "lg:pl-10"} pb-10`}
          >
            <div className="relative lg:min-h-[360px]">
              <AnimatePresence initial={false} mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  className="flex flex-wrap lg:flex-nowrap lg:p-3 lg:pr-10"
                  {...(isLargeScreen && {
                    custom: direction,
                    initial: "enter",
                    animate: "center",
                    exit: "exit",
                    variants: transitionVariants,
                    transition: { duration: 0.5, ease: "easeInOut" },
                  })}
                >
                  {getDisplayedItems().map((item, index) => (
                    <div
                      key={`display-${index}`}
                      className="w-full"
                      onMouseEnter={() => (isHoveredRef.current = true)}
                      onMouseLeave={() => (isHoveredRef.current = false)}
                    >
                      <ProductList
                        title={item?.title}
                        width="w-full"
                        index={index}
                        specialItems={item?.data ?? null}
                      />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
              {specialItems && specialItems?.length > 2 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute -left-10 top-1/2 hidden -translate-y-1/2 rounded-full bg-white p-3 text-red-400 shadow-lg hover:text-red-500 hover:shadow-xl dark:bg-slate-700 lg:block"
                  >
                    <FaLeftLong size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-full bg-white p-3 text-red-400 shadow-lg hover:text-red-500 hover:shadow-xl dark:bg-slate-700 lg:block"
                  >
                    <FaRightLong size={24} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <AboutSection />
      <GraduationBanner />
    </div>
  );
};

// const Page = () => {
//   return (
//     <Suspense fallback={<Spinner />}>
//       <HomePage />
//     </Suspense>
//   );
// };

export default HomePage;
