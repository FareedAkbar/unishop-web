import React from "react";
import ImageSlider from "./ImageSlider";
import CategoriesSidebar from "~/components/ui-components/CategoriesSideBar";
import ProductsSection from "./ProductsSection";
import GraduationBanner from "./GraduationBanner";

const images = [
  "/images/home/home1.png",
  "/images/home/home1.png",
  "/images/home/home1.png",
  "/images/home/home1.png",
  "/images/home/home1.png",
];
const flashSaleProducts = [
  {
    id: 1,
    name: "UOW Boxed Gift Pen",
    price: 120,
    originalPrice: 160,
    image: "/images/products/product.png",
    rating: 4.5,
    reviews: 88,
  },
  {
    id: 2,
    name: "Red North Coat",
    price: 180,
    originalPrice: 250,
    image: "/images/products/product.png",
    rating: 4.8,
    reviews: 120,
  },
  {
    id: 3,
    name: "ents Engineering for Software and Systems",
    price: 90,
    originalPrice: 120,
    image: "/images/products/product.png",
    rating: 4.2,
    reviews: 50,
  },
  {
    id: 4,
    name: "Gaming Laptop",
    price: 800,
    originalPrice: 1000,
    image: "/images/products/product.png",
    rating: 4.7,
    reviews: 200,
  },
  {
    id: 5,
    name: "Smartwatch",
    price: 150,
    originalPrice: 200,
    image: "/images/products/product.png",
    rating: 4.3,
    reviews: 100,
  },
  {
    id: 6,
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
    <div className="flex flex-col">
      <div className="flex lg:flex-row">
        <div className="hidden lg:block">
          <CategoriesSidebar />
        </div>

        {/* Image Slider */}
        <ImageSlider images={images} />
      </div>
      <ProductsSection
        products={flashSaleProducts}
        targetDate={new Date("2024-10-25T10:00:00")}
        headingPartOne="Today's"
        headingPartTwo="Flash Sales"
      />
      <GraduationBanner/>
      <ProductsSection
        products={bestSellingProducts}
        headingPartOne="Best Selling"
        headingPartTwo="Products This Month"
      />
    </div>
  );
};

export default HomePage;
