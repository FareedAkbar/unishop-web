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

const images = [
  "/images/home/home1.png",
  "/images/home/stationary-and-merch.png",
  "/images/home/graduation-gift.png",
  "/images/home/home1.png",
  "/images/home/text-books.png",
];
const flashSaleProducts = [
  {
    id: 1,
    book_title: "UOW Boxed Gift Pen",
    name: "Red North Coat",
    price: 180,
    item_sale_price: 120,
    originalPrice: 160,
    image: "/images/products/product.png",
    rating: 4.5,
    reviews: 88,
  },
  {
    id: 2,
    book_title: "Red North Coat",
    item_sale_price: 180,
    name: "Red North Coat",
    price: 180,
    originalPrice: 250,
    image: "/images/products/product.png",
    rating: 4.8,
    reviews: 120,
  },
  {
    id: 3,
    book_title: "ents Engineering for Software and Systems",
    item_sale_price: 90,
    name: "ents Engineering for Software and Systems",
    price: 90,
    originalPrice: 120,
    image: "/images/products/product.png",
    rating: 4.2,
    reviews: 50,
  },
  {
    id: 4,
    book_title: "Gaming Laptop",
    item_sale_price: 800,
    name: "Gaming Laptop",
    price: 800,
    originalPrice: 1000,
    image: "/images/products/product.png",
    rating: 4.7,
    reviews: 200,
  },
  {
    id: 5,
    book_title: "Smartwatch",
    item_sale_price: 150,
    name: "Smartwatch",
    price: 150,
    originalPrice: 200,
    image: "/images/products/product.png",
    rating: 4.3,
    reviews: 100,
  },
  {
    id: 6,
    book_title: "Wireless Headphones",
    item_sale_price: 100,
    name: "Wireless Headphones",
    price: 100,
    originalPrice: 150,
    image: "/images/products/product.png",
    rating: 4.6,
    reviews: 80,
  },
];
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
    image: "/images/products/product.png",
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
    image: "/images/products/product.png",
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
    image: "/images/products/product.png",
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
    image: "/images/products/product.png",
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
    image: "/images/products/product.png",
    reviews: 88,
    rating: 4.5,
  },
];
const products = [
  {
    id: 1,
    name: "Product 1",
    category: "Category 1",
    image: "/images/bookicon.png",
    price: 29.99,
  },
  {
    id: 2,
    name: "Product 2",
    category: "Category 2",
    image: "/images/bookicon.png",
    price: 39.99,
  },
  {
    id: 3,
    name: "Product 3",
    category: "Category 3",
    image: "/images/bookicon.png",
    price: 19.99,
  },
];
const HomePage: React.FC = () => {
  const words = ["Imagine", "Create", "Inspire", "Transform"];

  return (
    <div className="relative flex-1 overflow-hidden bg-red-50 bg-opacity-80 z-[1] pt-32 lg:pt-24">
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
      <div className="absolute inset-0 z-[-1] lg:left-64 overflow-hidden">
        <Player
            src={"assets/gifs/products-bg.json"}
            loop 
          autoplay 
          className="w-full h-full absolute inset-0"
          // style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} 
        />
      </div>
      <div className="flex">
        <div className="hidden lg:block lg:pl-20">
          <CategoriesSidebar />
        </div>
        <div className="flex w-full justify-evenly lg:flex-row flex-col p-5">
          <div className="pl-0 lg:pl-44">
            <ProductList products={products} title="Trending" width="lg:w-80 w-full"/>
          </div>
          <div className="pl-0">
            <ProductList products={products} title="Top Rated" width="lg:w-80 w-full"/>
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
