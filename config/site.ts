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
  { category: "Text Book" },
  { category: "Books" },
  { category: "E-Text Book" },
  { category: "Pluse" },
  { category: "Graduation" },
  { category: "Clothing" },
  { category: "Stationary" },
  { category: "Art & Gifts" },
  { category: "Contact" },
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

export const footerConfig = [
  {
    header: "Support",
    subItems: [
      {
        header: "Building 11, University of Wollongong NSW 2522 Australia",
      },
      {
        header: "ABN 28 915 832 337 ACN 081 114 089",
      },
      {
        header: "UOW Pulse provides top quality campus life and services.",
      },
    ],
  },
  {
    header: "Account",
    subItems: [
      {
        header: "Postage & Handling",
      },
      {
        header: "Refunds & Returns",
      },
      {
        header: "About Us",
      },
      {
        header: "Wishlist",
      },
    ],
  },
  {
    header: "Quick Link",
    subItems: [
      {
        header: "Privacy Policy",
      },
      {
        header: "Terms Of Use",
      },
      {
        header: "FAQ",
      },
      {
        header: "Contact Us",
      },
    ],
  },
  {
    header: "Shop Online",
    subItems: [
      {
        header: "Text Books",
      },
      {
        header: "Books",
      },
      {
        header: "Merchandise",
      },
      {
        header: "Stationery",
      },
    ],
  },
]

export const catogaryListArray = [
  {
    category: "Text Book",
    subcategories: [
      {
        nestedcategory: "Math Textbooks",
        subnestedcategories: [
          "Algebra",
          "Calculus",
          "Geometry",
          "Statistics",
          "Trigonometry",
        ],
      },
      {
        nestedcategory: "Science Textbooks",
        subnestedcategories: [
          "Algebra",
          "Calculus",
          "Geometry",
          "Statistics",
          "Trigonometry",
        ],
      },
      {
        nestedcategory: "History Textbookss",
        subnestedcategories: [
          "World History",
          "American History",
          "Ancient History",
          "European History",
          "Asian History",
        ],
      },
    ],
  },
  {
    category: "Art & Gifts",
    subcategories: [
      {
        nestedcategory: "Math Textbooks",
        subnestedcategories: [
          "Algebra",
          "Calculus",
          "Geometry",
          "Statistics",
          "Trigonometry",
        ],
      },
      {
        nestedcategory: "Science Textbooks",
        subnestedcategories: [
          "Algebra",
          "Calculus",
          "Geometry",
          "Statistics",
          "Trigonometry",
        ],
      },
      {
        nestedcategory: "History Textbookss",
        subnestedcategories: [
          "World History",
          "American History",
          "Ancient History",
          "European History",
          "Asian History",
        ],
      },
    ],
  },
]
export const colors = [
  "bg-green-600",
  "bg-yellow-400",
  "bg-orange-500",
  "bg-cyan-400",
  "bg-blue-700",
  "bg-violet-700",
  "bg-red-500",
  "bg-pink-600",
  "bg-white",
  "bg-black",
  // Add more colors as needed
]
export const size = [
  "XXL",
  "XXS",
  "XL",
  "XS",
  "M",
  "L",
  "S",

  // Add more colors as needed
]
