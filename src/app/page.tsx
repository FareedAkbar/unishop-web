"use client";
import Header from "~/components/header";
// import { useState } from "react";
// import { HoverEffect } from "~/components/ui/card-hover-effect";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import BooksImage from "../../public/book.json";


// interface Project {
//   title: string;
//   description: string;
//   link: string;
// }

// export const projects: Project[] = [
//   {
//     title: "Textbooks",
//     description:
//       "Engineering, Science, Business and Arts, Social Sciences & Humanities.",
//     link: `books?detail=${"Engineering and Information Sciences EIS"}`,
//   },
//   {
//     title: "E-Textbooks",
//     description:
//       "Read on the device that works for you in Bookshelf, the most used textbook reading app loaded with built-in, interactive features.",
//     link: `books?detail=${"Engineering and Information Sciences EIS"}`,
//   },
//   {
//     title: "Books",
//     description:
//       " GENERAL FICTION,NON-FICTION, CHILDREN'S BOOKS and TRAVEL GUIIDES",
//     link: `books?detail=${"GENERAL FICTION"}`,
//   },
//   {
//     title: "UHO Merch",
//     description:
//       "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
//     link: `cloths?detail=${"MERCHANDISE"}`,
//   },
//   {
//     title: "Clothing",
//     description:
//       "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
//     link: `cloths?detail=${"CLOTHING"}`,
//   },
//   {
//     title: "Gifts",
//     description: " ERSTWILDER, INDIGENOUS ART MERCH and  IMAGINE HOMEWARES",
//     link: `gifts?detail=${"ERSTWILDER"}`,
//   },
// ];
export default function HomePage() {
  return (
    <div>
      <Header />

      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="grid h-[40rem] w-full items-center justify-between sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="flex flex-col">
            <h2 className="relative z-20 mx-auto mt-32 text-center font-serif text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl lg:text-7xl">
              Welcome to UniShop
            </h2>

            <p className="text-1xl inter-var relative left-0 top-[1px] bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat py-4 text-center font-sans text-transparent [text-shadow:0_0_rgba(0,0,0,0.1)] md:text-2xl lg:text-2xl">
              Your one-stop shop for all your official UOW Merchandise, study
              essentials, textbooks, course notes and equipment and graduation
              memorabilia and gowns.
            </p>
          </div>
          <div className="mx-auto text-left">
            <Player
              autoplay
              loop
              src={BooksImage}
              style={{ height: "500px", width: "500px" }}
            >
              <Controls buttons={["play", "repeat", "frame", "debug"]} />
            </Player>
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-8">
          {/* <HoverEffect items={projects} /> */}
        </div>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 md:gap-8"></div>
        </div>
      </main>
    </div>
  );
}
