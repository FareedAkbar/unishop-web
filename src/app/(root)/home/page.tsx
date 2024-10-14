"use client";

import React from "react";
import ImageSlider from "./ImageSlider";
import CategoriesSidebar from "~/components/ui-components/CategoriesSideBar";
import ProductsSection from "./ProductsSection";
import GraduationBanner from "./GraduationBanner";
import NewArrivals from "./NewArrivals";
import BackgroundWords from "~/components/ui-components/BackgroundWords";
import BackgroundImages from "~/components/ui-components/BackgroundImages";
import { FlipWords } from "~/components/ui/flip-words";
import ProductList from "~/components/ui-components/ProductList";
import { Player } from "@lottiefiles/react-lottie-player";

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
    <div className="relative z-[1] flex-1 overflow-hidden bg-red-50 dark:bg-slate-800 bg-opacity-80 pt-32 lg:pt-24">
      {/* <BackgroundWords /> */}
      {/* <BackgroundImages /> */}
      <div className="container mx-auto flex justify-center">
        <ImageSlider />
      </div>
      <div className="flex flex-col py-5">
        <div className="self-center lg:text-5xl">
          <FlipWords words={words} />
          your reading adventure!
        </div>
      </div>
      <div className="absolute inset-0 z-[-1] overflow-hidden lg:left-64">
        <Player
          src={"assets/gifs/products-bg.json"}
          loop
          autoplay
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <div className="flex">
        <div className="hidden lg:block lg:pl-20">
          <CategoriesSidebar />
        </div>
        <div className="flex w-full flex-col justify-evenly p-5 lg:flex-row">
          <div className="pl-0 lg:pl-44">
            <ProductList
              products={products}
              title="Trending"
              width="lg:w-80 w-full"
            />
          </div>
          <div className="pl-0">
            <ProductList
              products={products}
              title="Top Rated"
              width="lg:w-80 w-full"
            />
          </div>
        </div>
      </div>

      <GraduationBanner />
      <ProductsSection
        products={bestSellingProducts}
        headingPartOne="Best Selling"
        headingPartTwo="Products This Month"
      />
      {/* <NewArrivals/> */}
    </div>
  );
};

export default HomePage;
