"use client";

import React from "react";
import ImageSlider from "./ImageSlider";
import CategoriesSidebar from "~/components/ui-components/CategoriesSideBar";
import ProductsSection from "./ProductsSection";
import GraduationBanner from "./GraduationBanner";
import ProductList from "~/components/ui-components/ProductList";
import { FlipWords } from "~/components/ui/flip-words";
import { Player } from "@lottiefiles/react-lottie-player";
import AboutSection from "./AboutSection";

const bestSellingProducts = [
  {
    id: 1,
    book_title: "Red North Coat",
    item_sale_price: 180,
    name: "Red North Coat",
    price: 120,
    originalPrice: 160,
    memberPrice: 78.99,
    discount: 40,
    image: "/assets/images/products/product.png",
    reviews: 88,
    rating: 4.5,
  },
  {
    id: 2,
    book_title: "UOW Boxed Gift Pen",
    item_sale_price: 120,
    name: "Red North Coat",
    price: 120,
    originalPrice: 160,
    memberPrice: 78.99,
    discount: 45,
    image: "/assets/images/products/product.png",
    reviews: 88,
    rating: 4.5,
  },
  {
    id: 3,
    book_title: "UOW Boxed Gift Pen",
    item_sale_price: 120,
    name: "Red North Coat",
    price: 120,
    originalPrice: 160,
    memberPrice: 78.99,
    discount: 40,
    image: "/assets/images/products/product.png",
    reviews: 88,
    rating: 4.5,
  },
  {
    id: 4,
    book_title: "UOW Boxed Gift Pen",
    item_sale_price: 120,
    name: "Red North Coat",
    price: 120,
    originalPrice: 160,
    memberPrice: 78.99,
    discount: 45,
    image: "/assets/images/products/product.png",
    reviews: 88,
    rating: 4.5,
  },
  {
    id: 5,
    book_title: "UOW Boxed Gift Pen",
    item_sale_price: 120,
    name: "Red North Coat",
    price: 120,
    originalPrice: 160,
    memberPrice: 78.99,
    discount: 45,
    image: "/assets/images/products/product.png",
    reviews: 88,
    rating: 4.5,
  },
];
const products = [
  {
    id: 1,
    name: "Product 1",
    category: "Category 1",
    image: "/assets/images/bookicon.png",
    price: 29.99,
  },
  {
    id: 2,
    name: "Product 2",
    category: "Category 2",
    image: "/assets/images/bookicon.png",
    price: 39.99,
  },
  {
    id: 3,
    name: "Product 3",
    category: "Category 3",
    image: "/assets/images/bookicon.png",
    price: 19.99,
  },
];

const HomePage: React.FC = () => {
  const words = ["Imagine", "Create", "Inspire", "Transform"];

  return (
    <div className="relative z-[1] flex-1 overflow-hidden bg-opacity-80 pt-32 dark:bg-slate-800 lg:pt-24">
      <div className="container mx-auto flex justify-center">
        <ImageSlider />
      </div>

      <div className="flex flex-col py-5">
        <div className="self-center lg:text-5xl">
          <FlipWords words={words} className="text-red-500" />
          your reading adventure!
        </div>
      </div>

      {/* Product List Section with Background Animation */}
      <div className="relative w-full">
        {/* Lottie Animation in the Background */}
        <div className="absolute inset-0 -z-10">
          <Player
            src={"assets/gifs/products-bg.json"}
            loop
            autoplay
            className="h-[500px] w-full object-contain overflow-visible"
          />
        </div>
       

        <div className="flex">
          <div className="hidden lg:block lg:pl-20">
            <CategoriesSidebar />
          </div>

          <div className="container mx-auto grid w-full p-5 pb-10 lg:grid-cols-2 lg:pl-48">
            <div className="-mr-4 w-full ">
              <ProductList
                products={products}
                title="Trending"
                width="w-full"
              />
            </div>

            <div className="w-full">
              <ProductList
                products={products}
                title="Top Rated"
                width="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <AboutSection />
      <GraduationBanner />
      <ProductsSection
        products={bestSellingProducts}
        headingPartOne="Best Selling"
        headingPartTwo="Products This Month"
      />
    </div>
  );
};

export default HomePage;
