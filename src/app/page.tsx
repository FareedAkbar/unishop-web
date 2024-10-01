"use client";
import dynamic from "next/dynamic";
import { HoverEffect } from "~/components/ui/card-hover-effect";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import BooksImage from "../../public/book.json";
import image1 from "../../public/homePage/Textbooks.jpg";
import image2 from "../../public/homePage/etextbooks.png";
import image3 from "../../public/homePage/Books-Banner.jpg";
import image4 from "../../public/homePage/UOW_Merch.jpg";
import image5 from "../../public/homePage/Graduation.jpg";
import image6 from "../../public/homePage/Gifts.jpg";
import ContactImage from "../../public/homePage/about-us-side.jpg";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import CategoriesSideBar from "~/components/ui-components/CategoriesSideBar"; // Importing Sidebar component
import HomePage from "./home/page";

interface itemsType {
  title: string;
  description: string;
  link: string;
  image_path: StaticImageData;
}

const Index = () => {
  const projects: itemsType[] = [
    {
      title: "Textbooks",
      description:
        "Engineering, Science, Business and Arts, Social Sciences & Humanities.",
      link: "books?detail=Engineering and Information Sciences EIS",
      image_path: image1,
    },
    {
      title: "E-Textbooks",
      description:
        "Read on the device that works for you in Bookshelf, the most used textbook reading app loaded with built-in, interactive features.",
      link: "books?detail=Engineering and Information Sciences EIS",
      image_path: image2,
    },
    {
      title: "Books",
      description:
        " GENERAL FICTION,NON-FICTION, CHILDREN'S BOOKS and TRAVEL GUIDES",
      link: "books?detail=GENERAL FICTION",
      image_path: image3,
    },
    {
      title: "UOW Merch",
      description:
        "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
      link: "cloths?detail=MERCHANDISE",
      image_path: image4,
    },
    {
      title: "Clothing",
      description:
        "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
      link: "cloths?detail=CLOTHING",
      image_path: image5,
    },
    {
      title: "Gifts",
      description: " ERSTWILDER, INDIGENOUS ART MERCH and  IMAGINE HOMEWARES",
      link: "gifts?detail=ERSTWILDER",
      image_path: image6,
    },
  ];

  return (
    <div className="">
       {/* <div className="hidden lg:block "> 
          <CategoriesSideBar />
        </div> */}
        <HomePage/>
      {/* Main content area to the right of the sidebar */}
      {/* <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.title} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image
                src={project.image_path}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
                <Link href={project.link}>
                  <a className="text-blue-500 hover:underline">Learn more</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main> */}
    </div>
  );
};

export default Index;
