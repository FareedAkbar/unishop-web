"use client";

import React, { useEffect, useRef, useState } from "react";
import ImageSlider from "./ImageSlider";
import CategoriesSidebar from "~/components/ui-components/CategoriesSideBar";
import GraduationBanner from "./GraduationBanner";
import ProductList from "~/components/ui-components/ProductList";
import { FlipWords } from "~/components/ui/flip-words";
import AboutSection from "./AboutSection";
import { useAuthContext } from "~/Context/AuthContext";
import type { SpecialItemsForHomePage } from "~/types/specialItems";
import BackgroundBubbles from "~/components/ui-components/BackgroundBubbles";
import { getSpecialItems } from "~/_actions/getitemsbycategory";
import type { ItemSpecialTag } from "~/types/productTags";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaLeftLong, FaRightLong } from "react-icons/fa6";

const HomePage: React.FC = () => {
  const transitionVariants = {
    enter: {
      opacity: 0,
      x: 50, // Start from right for forward motion
    },
    center: {
      opacity: 1,
      x: 0, // Center position
    },
    exit: {
      opacity: 0,
      x: -50, // Exit to left for backward motion
    },
  };
  const words = ["Imagine", "Create", "Inspire", "Transform"];
  const { productTags } = useAuthContext();
  const [specialItems, setSpecialItems] = useState<
    SpecialItemsForHomePage[] | null
  >(null);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (productTags && productTags?.length < 0) return;
    if (isFirstRender.current) {
      isFirstRender.current = false; // Prevents further API calls on first render
    } else {
      const loadData = async (Tag: ItemSpecialTag) => {
        const x = await getSpecialItems(Tag.item_special_tags_id);
        if (typeof x != "boolean" && x.status && x.data) {
          // setSpecialItems(x?.data)
          console.log("API Call");
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
    }
  }, [productTags]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < specialItems?.length! - 2) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <div className="relative z-[1] flex-1 overflow-hidden bg-opacity-80 pt-32 dark:bg-slate-800 lg:pt-24">
      <BackgroundBubbles />

      <div className="container mx-auto flex justify-center">
        <ImageSlider />
      </div>

      <div className="flex flex-col py-5">
        <div className="self-center lg:text-5xl">
          <FlipWords words={words} className="text-red-500 dark:text-red-500" />
          your reading adventure!
        </div>
      </div>

      <div className="relative w-full">
        {/* Lottie Animation in the Background */}
        {/* <div className="absolute inset-0 -z-10">
          <Player
            src={"assets/gifs/products-bg.json"}
            loop
            autoplay
            className="h-[500px] w-full overflow-visible object-contain"
          />
        </div> */}

        <div className="flex">
          <div className="hidden lg:block lg:pl-20">
            <CategoriesSidebar />
          </div>

          <div className="mx-auto w-full px-5 pb-10">
            <div className="relative min-h-[450px] lg:pl-64">
              {/* Grid for the list */}
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentIndex}
                  className="grid grid-cols-1 gap-6 lg:grid-cols-2"
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={transitionVariants}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {specialItems
                    ?.slice(currentIndex, currentIndex + 2)
                    .map((item, index) => (
                      <div key={index} className="w-full">
                        <ProductList
                          title={item.title}
                          width="w-full"
                          index={index}
                          specialItems={item.data!}
                        />
                      </div>
                    ))}
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              {specialItems?.length! > 2 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-48 top-1/2 -translate-y-1/2 rounded-full bg-white p-5 text-red-400 shadow-lg hover:text-red-500 hover:shadow-2xl disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black"
                    disabled={currentIndex === 0}
                  >
                    <FaLeftLong size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-5 text-red-400 shadow-lg hover:text-red-500 hover:shadow-2xl disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black"
                    disabled={currentIndex >= specialItems?.length! - 2}
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
      {/* <ProductsSection
        products={bestSellingProducts}
        headingPartOne="Best Selling"
        headingPartTwo="Products This Month"
      /> */}
    </div>
  );
};

export default HomePage;
