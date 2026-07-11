"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ImageSlider from "./ImageSlider";
import { FlipWords } from "~/components/ui/flip-words";
import AboutSection from "./AboutSection";
import { useAuthContext } from "~/Context/AuthContext";
import ContactSection from "./ContactSection";
import CategoriesSection from "./CategoriesSection";
import { getHomeContent } from "~/_actions/content";
import type { HomeContent } from "~/types/content";
import { isActive, resolveMediaUrl } from "~/utils/content";

const HomePage: React.FC = () => {
  const { category } = useAuthContext();
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);

  useEffect(() => {
    getHomeContent()
      .then(setHomeContent)
      .catch((error) => console.error("Failed to load home content:", error));
  }, []);

  const flipWords =
    homeContent?.flipWords
      ?.filter((word) => isActive(word.is_active))
      ?.sort((a, b) => Number(a.number) - Number(b.number))
      ?.map((word) => word.flip_word_text) ?? ["Merch", "Books", "Beyond"];

  const featuredImages =
    homeContent?.featuredImages
      ?.filter((image) => isActive(image.is_active))
      ?.slice(0, 2) ?? [];

  const about = homeContent?.aboutUs?.[0] ?? null;
  const contact = homeContent?.contactUs?.[0] ?? null;

  return (
    <div className="relative z-[1] flex-1 overflow-hidden bg-opacity-80">
      <div className="flex justify-center">
        <ImageSlider banners={homeContent?.banners} />
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col items-center px-4 py-5 md:px-10">
          <div className="flex text-center text-2xl md:text-3xl lg:items-center lg:text-5xl">
            <FlipWords words={flipWords} className="font-bold text-red-500" />
            <span className="mt-0.5 block text-xl md:text-2xl lg:text-4xl">
              at UniShop!
            </span>
          </div>
        </div>
        <div className="mx-auto flex flex-wrap justify-between px-4 py-5">
          {featuredImages.length > 0 ? (
            featuredImages.map((image, index) => {
              const src =
                resolveMediaUrl(image.media_url ?? image.object_path) ||
                `/assets/images/home/hom${index + 1}.png`;
              const imageEl = (
                <Image
                  src={src}
                  alt={`Featured ${index + 1}`}
                  width={1000}
                  height={1000}
                  className={`h-fit w-full md:w-2/5 ${index === 0 ? "md:pr-9 lg:w-1/2" : "md:pl-9 lg:w-1/2"}`}
                />
              );

              if (image.link_url) {
                const isExternal = image.link_url.startsWith("http");
                return isExternal ? (
                  <a
                    key={image.unishop_featured_image_id}
                    href={image.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-2/5 lg:w-1/2"
                  >
                    {imageEl}
                  </a>
                ) : (
                  <Link
                    key={image.unishop_featured_image_id}
                    href={image.link_url}
                    className="w-full md:w-2/5 lg:w-1/2"
                  >
                    {imageEl}
                  </Link>
                );
              }

              return (
                <div
                  key={image.unishop_featured_image_id}
                  className="w-full md:w-2/5 lg:w-1/2"
                >
                  {imageEl}
                </div>
              );
            })
          ) : (
            <>
              <Image
                src="/assets/images/home/hom1.png"
                alt="hero"
                width={1000}
                height={1000}
                className="h-fit w-full md:w-2/5 md:pr-9 lg:w-1/2"
              />
              <Image
                src="/assets/images/home/hom2.png"
                alt="hero"
                width={1000}
                height={1000}
                className="h-fit w-full md:w-2/5 md:pl-9 lg:w-1/2"
              />
            </>
          )}
        </div>
        <CategoriesSection categories={category!} />
        <AboutSection about={about} />
        <ContactSection contact={contact} />
      </div>
    </div>
  );
};

export default HomePage;
