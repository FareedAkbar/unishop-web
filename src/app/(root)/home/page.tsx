"use client";

import React, { useEffect, useRef, useState } from "react";
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

const HomePage: React.FC = () => {
  const { productTags } = useAuthContext();
  const [specialItems, setSpecialItems] = useState<
    SpecialItemsForHomePage[] | null
  >(null);
  const isFirstRender = useRef(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Hook to detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // Tailwind `lg` breakpoint is 1024px
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
    console.log(process.env.NEXT_PUBLIC_PASSKEY);
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
            // If the previous data is null, initialize it as an array
            const z = prevData?.find((item) => item.title == Tag.tag_name);
            if (z) {
              return prevData;
            } else {
              if (!prevData) return [newData];

              // Otherwise, return a new array with the previous data and the new item
              return [...prevData, newData];
            }
          });
        }
      }
    };
    productTags?.map((item) => {
      loadData(item).catch((error) => {
        console.error("Failed to load data in useEffect:", error);
      });
    });
  }, [productTags]);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(interval);
  }, [specialItems, currentIndex]);

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
    <div className="relative z-[1] flex-1 overflow-hidden bg-opacity-80 pt-32 dark:bg-slate-800 lg:pt-24">
      <BackgroundSquares />

      <div className="flex justify-center">
        <ImageSlider />
      </div>

      <div className="flex flex-col py-5">
        <div className="self-center text-xl lg:text-5xl">
          <FlipWords
            words={["Imagine", "Create", "Inspire", "Transform"]}
            className="text-[22px] text-red-500 dark:text-red-500 lg:text-5xl"
          />
          your reading adventure!
        </div>
      </div>

      <div className="relative w-full">
        <div className="flex">
          <div className="hidden lg:ml-20 lg:block">
            <CategoriesSidebar />
          </div>

          <div className="mx-auto w-full px-5 pb-10">
            <div className="relative min-h-[350px] lg:ml-64">
              <AnimatePresence initial={false} mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  className={`flex flex-wrap transition-none lg:flex-nowrap lg:gap-6 lg:overflow-x-hidden lg:transition-all`}
                  {...(isLargeScreen && {
                    custom: direction,
                    initial: "enter",
                    animate: "center",
                    exit: "exit",
                    variants: transitionVariants,
                    transition: { duration: 0.5, ease: "easeInOut" },
                  })}
                >
                  {/* Render all lists for small screens */}
                  {specialItems?.map((item, index) => (
                    <div key={index} className="w-full lg:hidden">
                      <ProductList
                        title={item.title}
                        width="w-full"
                        index={index}
                        specialItems={item.data!}
                      />
                    </div>
                  ))}

                  {/* Conditionally render only two lists for large screens */}
                  {specialItems && specialItems?.length > 2 && (
                    <div className="hidden w-full gap-6 lg:flex">
                      {getDisplayedItems().map((item, index) => (
                        <div key={`display-${index}`} className="w-full">
                          <ProductList
                            title={item?.title}
                            width="w-full"
                            index={index}
                            specialItems={item?.data ?? null}
                          />
                        </div>
                      ))}
                    </div>
                  )}
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

export default HomePage;
