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

const HomePage: React.FC = () => {
  const words = ["Imagine", "Create", "Inspire", "Transform"];
  const { productTags } = useAuthContext();
  const [specialItems, setSpecialItems] = useState<SpecialItemsForHomePage[] | null>(null)
  const isFirstRender = useRef(true);
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_PASSKEY)
    if (productTags && productTags?.length < 0) return;
    if (isFirstRender.current) {
      isFirstRender.current = false; // Prevents further API calls on first render
    } else {
      const loadData = async (Tag: ItemSpecialTag) => {
        const x = await getSpecialItems(Tag.item_special_tags_id)
        if (typeof x != "boolean" && x.status && x.data) {
          if (x.data?.[0]) {
            const newData = {
              title: Tag.tag_name,
              data: x?.data
            }
            setSpecialItems((prevData) => {
              // If the previous data is null, initialize it as an array
              const z = prevData?.find((item) => item.title == Tag.tag_name);
              if (z) {
                return prevData
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
      })
    }

  }, [productTags])

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

      {/* Product List Section with Background Animation */}
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

          {/* {specialItems?.map((item, index) => (
              <div className="text-lg mt-10 mb-10 flex justify-center" key={index}>
                {item.tag_name == productTags?.[0]?.tag_name && item.tag_name}
              </div>
            ))} */}

          <div className="container mx-auto grid min-h-[450px] w-full px-5 pb-10 lg:grid-cols-2 lg:pl-48">
            {specialItems?.map((item, index) => (
              <>
                <div className="-mr-4 w-full">
                  <ProductList
                    title={item.title}
                    width="w-full"
                    index={index}
                    specialItems={item.data!}
                  />
                </div>
              </>
            ))}
          </div>

          {/* <div className="w-full">
              <ProductList
                products={products}
                title="Top Rated"
                width="w-full"
              />
            </div> */}
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
