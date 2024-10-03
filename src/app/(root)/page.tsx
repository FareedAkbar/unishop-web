"use client";
import CategoriesSideBar from "~/components/ui-components/CategoriesSideBar"; // Importing Sidebar component
import HomePage from "./(root)/home/page";
import { Suspense } from "react";
import Spinner from "~/components/spinner";

const Page = () => {
  return (
    <div className="flex">
      {/* <div className="hidden lg:block "> 
          <CategoriesSideBar />
        </div> */}
      <HomePage />
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

const BooksPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      
        <Page />
    
    </Suspense>
  );
};

export default BooksPage;
