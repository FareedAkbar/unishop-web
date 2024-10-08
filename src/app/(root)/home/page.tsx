"use client";

import React from "react";
import ImageSlider from "./ImageSlider";
import CategoriesSidebar from "~/components/ui-components/CategoriesSideBar";
import ProductsSection from "./ProductsSection";
import GraduationBanner from "./GraduationBanner";
import NewArrivals from "./NewArrivals";
import BackgroundWords from "~/components/ui-components/BackgroundWords";

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
const HomePage: React.FC = () => {
  return (
    <div className="relative flex-1 pt-32 lg:pt-24 overflow-hidden">
      <BackgroundWords />
      <div className="flex lg:flex-row">
        <div className="hidden lg:block">
          <CategoriesSidebar />
        </div>
        <ImageSlider images={images} />
      </div>
      <ProductsSection
        products={flashSaleProducts}
        targetDate={new Date("2024-10-25T10:00:00")}
        headingPartOne="Today's"
        headingPartTwo="Flash Sales"
      />
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
