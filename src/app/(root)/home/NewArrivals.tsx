import Image from "next/image";
import React from "react";

// Sample images - replace these with your actual image URLs
const textBooksImage = "/images/home/textbook.png";
const stationaryImage = "/images/home/stationary.png";
const clothsImage = "/images/home/cloths.png";
const graduationGiftImage = "/images/home/grad.png";

const NewArrivals: React.FC = () => {
  return (
    <div className="p-4">
      {/* Featured Section */}
      <div className="my-8">
        <h2 className="text-2xl font-bold text-red-500">Featured</h2>
        <h3 className="text-4xl font-semibold">New Arrivals</h3>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Text Books */}
        <div className="group relative">
          <Image
            src={textBooksImage}
            alt="Text Books"
            className="h-64 w-full rounded-lg object-cover"
            width={1000}
            height={1000}
          />
          <div className="absolute bottom-0 left-0 w-full rounded-b-lg bg-black bg-opacity-50 p-4">
            <h4 className="text-xl font-semibold text-white">Text Books</h4>
            <p className="text-white">
              Discover a world of knowledge with our extensive collection of
              textbooks at Unishop.
            </p>
            <a href="#" className="text-red-500 underline">
              Shop Now
            </a>
          </div>
        </div>

        {/* Stationary & Merch */}
        <div className="group relative">
          <Image
            width={1000}
            height={1000}
            src={stationaryImage}
            alt="Stationary & Merch"
            className="h-64 w-full rounded-lg object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full rounded-b-lg bg-black bg-opacity-50 p-4">
            <h4 className="text-xl font-semibold text-white">
              Stationary & Merch
            </h4>
            <p className="text-white">
              Featured woman’s collections that give you another vibe.
            </p>
            <a href="#" className="text-red-500 underline">
              Shop Now
            </a>
          </div>
        </div>

        {/* Cloths */}
        <div className="group relative">
          <Image
            width={1000}
            height={1000}
            src={clothsImage}
            alt="Cloths"
            className="h-64 w-full rounded-lg object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full rounded-b-lg bg-black bg-opacity-50 p-4">
            <h4 className="text-xl font-semibold text-white">Cloths</h4>
            <p className="text-white">Amazon wireless speakers.</p>
            <a href="#" className="text-red-500 underline">
              Shop Now
            </a>
          </div>
        </div>

        {/* Graduation Gift */}
        <div className="group relative">
          <Image
            width={1000}
            height={1000}
            src={graduationGiftImage}
            alt="Graduation Gift"
            className="h-64 w-full rounded-lg object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full rounded-b-lg bg-black bg-opacity-50 p-4">
            <h4 className="text-xl font-semibold text-white">
              Graduation Gift
            </h4>
            <p className="text-white">Amazon wireless speakers.</p>
            <a href="#" className="text-red-500 underline">
              Shop Now
            </a>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 flex justify-around text-center">
        <div>
          <h5 className="font-bold">FREE AND FAST DELIVERY</h5>
          <p>Free delivery for all orders over $140</p>
        </div>
        <div>
          <h5 className="font-bold">24/7 CUSTOMER SERVICE</h5>
          <p>Friendly 24/7 customer support</p>
        </div>
        <div>
          <h5 className="font-bold">MONEY BACK GUARANTEE</h5>
          <p>We return money within 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
