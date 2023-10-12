import { Icons } from "@/components/icons"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "UNISHOP",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Shop",
      href: "/",
    },
    {
      title: "Contact",
      href: "/",
    },
    {
      title: "Signup",
      href: "/",
    },
  ],
}

export const catogaryList = [
  { name: "Text Book" },
  { name: "Books" },
  { name: "E-Text Book" },
  { name: "Pluse" },
  { name: "Graduation" },
  { name: "Clothing" },
  { name: "Stationary" },
  { name: "Art & Gifts" },
  { name: "Contact" },
]

export const serviceFeature = [
  {
    title: "FREE AND FAST DELIVERY",
    desc: "Free delivery for all orders over $140",
    image: Icons.delivery,
  },
  {
    title: "24/7 CUSTOMER SERVICE",
    desc: "Friendly 24/7 customer support",
    image: Icons.headphone,
  },
  {
    title: "MONEY BACK GUARANTEE",
    desc: "We reurn money within 30 days",
    image: Icons.backUp,
  },
]
