"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import AlertBox from "~/components/alertBox/alert";
import GiftCategoryInfo from "./GiftCategory";
import Spinner from "~/components/spinner";

interface GiftCategory {
  name: string;
  description: string;
  additionalInfo?: string;
  history?: string;
  tagline?: string;
  mission?: string;
  featuredLocation: string;
  images: string[];
  lastWord: string;
  featuredProducts: string[];
}

const giftCategories: GiftCategory[] = [
  {
    name: "Danielle Hulls Photography",
    description:
      "Danielle Hulls is a photographer based in sunny Shellharbour, on the South Coast of New South Wales, Australia. She has been capturing the coastline from an aerial and land perspective for the better part of a decade, and printing her work to be displayed in homes, workspaces, and retail settings since 2021.",
    additionalInfo:
      "Her work is much loved by locals and travelers for her unique perspective on the pristine coastline we call home.",
    featuredLocation:
      "Featured in store at UniShop, Danielle’s work showcases the finest views the Illawarra has to offer. ",
    images: [
      "/assets/images/gifts/danielle_hulls_photo1.jpg",
      "/assets/images/gifts/danielle_hulls_photo2.png",
    ],
    lastWord: "Photography",
    featuredProducts: [
      "Prints",
      "Blank greeting cards",
      "Stickers",
      "Gift tags",
    ],
  },
  {
    name: "Marini Ferlazzo",
    description:
      "Marini Ferlazzo is a family business based in Melbourne, Australia. Founder and wildlife artist Nathan Ferlazzo creates ranges to support wildlife conservation, making perfect wildlife gifts and Australian souvenirs.",
    history:
      "Nathan started the business in 2011 with his mother, Clare, and sister, Simone. The unique products celebrate Australia’s wildlife, with a share of profits donated to wildlife conservation for a sustainable future.",
    featuredLocation: "Shop a range of gifts at UniShop.",
    additionalInfo:
      "Marini Ferlazzo’s original take on Australiana through floral arrangements is unique and appealing, making it a popular gift choice at UniShop.",
    images: [
      "/assets/images/gifts/marini_ferlazzo1.png",
      "/assets/images/gifts/marini_ferlazzo2.jpg",
    ],
    lastWord: "Ferlazzo",
    featuredProducts: [
      "Mugs",
      "Coasters",
      "Tableware",
      "Tote bags",
      "Umbrellas",
      "Bookmarks",
      "Greeting cards",
    ],
  },
  {
    name: "White Clay Mountain",
    tagline: "Authenticity | Connection | Creativity | Curiosity | Gratitude",
    description:
      "White Clay Mountain pieces provide a reminder to notice and connect with your environment and inspire tactile creativity using evidence-based methods to increase wellbeing.",
    mission:
      "The mission is to spread positive wellbeing and appreciation of Australia’s natural beauty, connecting people to nature, others, and their innate creativity through handcrafted pieces and experiences.",
    featuredLocation: "Available at UniShop.",
    images: [
      "/assets/images/gifts/white_clay_mountain1.jpg",
      "/assets/images/gifts/white_clay_mountain2.jpg",
    ],
    lastWord: "Mountain",
    featuredProducts: [
      "Dangle earrings",
      "Stud earrings",
      "Delicate rings",
      "Gemstone bracelets",
    ],
  },
  {
    name: "Eliza Jade Candles",
    description:
      "Eliza Jade Candles focuses on creating unique scents using premium perfumes and superior coconut soy wax, free from petrochemicals, phthalates, and parabens.",
    additionalInfo:
      "The brand promotes eco-friendly practices with refilling and recycling options.",
    featuredLocation: "Browse the aromatic display at UniShop.",
    images: [
      "/assets/images/gifts/eliza_jade1.png",
      "/assets/images/gifts/eliza_jade2.png",
    ],
    lastWord: "Candles",
    featuredProducts: ["Candles", "Room sprays", "Reed diffusers"],
  },
];

const MyComponent = () => {
  const router = useRouter();
  const params = useSearchParams();

  const [subcategoryStatic, setSubcategoryStatic] = useState<string | null>(
    null,
  );
  const [loginAlert, setLoginAlert] = useState<boolean>(false);

  useEffect(() => {
    const d = params.get("desc");
    if (d) {
      setSubcategoryStatic(d);
    }
  }, [params]);

  const goToLogin = () => {
    setLoginAlert(false);
    router.push("login");
  };

  const matchedCategory = giftCategories.find(
    (cat) => cat.lastWord === subcategoryStatic,
  );

  return (
    <div>
      <motion.main
        className="flex flex-col items-center pt-20"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        {matchedCategory ? <GiftCategoryInfo category={matchedCategory} /> : ""}
      </motion.main>
      <AlertBox
        title="Login Your Account"
        description="Please login to add item to wishlist"
        open={loginAlert}
        onClose={() => setLoginAlert(false)}
        onContinue={() => goToLogin()}
      />
    </div>
  );
};
const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <MyComponent />
    </Suspense>
  );
};

export default Page;

