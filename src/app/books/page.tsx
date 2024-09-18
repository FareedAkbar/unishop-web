"use client";

import { Controls, Player } from "@lottiefiles/react-lottie-player";
import Header from "~/components/header";
import ProductGradient from "../../components/productGradient";
import { Suspense, useEffect, useState } from "react";
import Pagination from "~/components/pagination";
import {useSearchParams } from "next/navigation";
import BookSkelton from "./bookSkelton";
import { useAuthContext } from "~/Context/AuthContext";
import BooksImage from '../../../public/book.json';
import type PaginationData from '~/types/paginationData'
import type DataCart from "~/types/book";



const requestOptions: RequestInit = {
  method: "GET",
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MzQ5LCJwcm9maWxlX2lkIjoxOTgsIm91dGxldF9pZCI6IjIyMSIsImZpcnN0X25hbWUiOiJTaGFtcyIsImxhc3RfbmFtZSI6IlFhemkiLCJ0ZW1wbGF0ZV9pZCI6NSwicGFzc3BvcnRfbm8iOm51bGwsImRhdGVfb2ZfYmlydGgiOm51bGwsImdlbmRlciI6bnVsbCwiZGVzaWduYXRpb25faWQiOlsxXSwiZW1haWwiOiJzaGFtcy5xYXppQGdtYWlsLmNvbSIsInBob25lX251bWJlciI6Iis5MjMyMTk1NjUwMjUiLCJzaWduX3VwIjoiMjAyMy0xMi0yMVQwNToxMTo0OC4wMDBaIiwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMjFUMDU6MTE6NDguMDAwWiIsInNlc3Npb25faWQiOjExNjg1LCJzYWx0IjpudWxsLCJpYXQiOjE3MjU5NTgyMDJ9.R-8jJlaDp2ExXVWLJa_X-fgc4lMAsjlWq3DhPjBXs2U`,
    "Content-Type": "application/json", // Optional, depending on your API
  },
  redirect: "follow", // Use the correct type for `redirect`
};


interface ApiResponse {
  meta: PaginationData; // Adjust based on your actual structure
  data: DataCart[];
}

const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loader, setLoader] = useState<boolean>(false);
  const [data, setData] = useState<DataCart[]>([]);
  const [meta, setMeta] = useState<PaginationData>({
    current_page_url: null,
    first_page_url: null,
    from: 1,
    last_page_url: null,
    limit: 10,
    links: [],
    next_page_url: null,
    page: 1,
    pages: 1,
    pagination: false,
    prev_page_url: null,
    to: 1,
    total: 0,
  });
  const params = useSearchParams();
  const detail = params.get("detail");
  const {cartItems, addCartItems, removeCartItems} = useAuthContext();
  const fetchData = async (page: number) => {
    try {
      const response = await fetch(
        `https://booknet-dev.iconsole.com.au/api/books?detailed=1&images=1&pagination=1&page=${page}&limit=15&entries=1`,
        requestOptions
      );
      const result: ApiResponse = await response.json() as ApiResponse;
  
      // Check if result has the expected structure
      if (result?.meta) {
        setMeta(result.meta);
        setData(result.data);
      } else {
        console.error("Unexpected result structure:", result);
        // Handle unexpected structure here
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        // setLoader(true);
        await fetchData(currentPage);
        // setData(result);
        // setTotalPages(result.totalPages);
        setTotalPages(2);
      } catch (error) {
        console.error("Failed to load data:", error);
        // Optionally set an error state here
      }
    };
    loadData().catch((error) => {
      console.error("Failed to load data in useEffect:", error);
    });
  }, [currentPage]);


  // Handle add to cart
  const handleAddToCart = async (item: DataCart) => {
    try {
      
      await addCartItems(item);
    
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };
  const handleRemoveFromCart = async (item: DataCart) => {
    try {
      
      await removeCartItems(item);
    
    } catch (error) {
      console.error('Failed to remove item to cart:', error);
    }
  };

  const isItemInCart = (itemId: number) => {
    
    const newItems: DataCart[] = typeof cartItems === 'string' 
    ? JSON.parse(cartItems) as DataCart[] 
    : cartItems!;
    return newItems.findIndex((cartItem: DataCart) => cartItem.item_id === itemId) > -1 ? true : false
  };
  
    // Handle pagination
    useEffect(() => {
      // const startIndex = (currentPage - 1) * meta.limit;
      // const endIndex = startIndex + meta.limit;
      setTotalPages(Math.ceil(meta.total / meta.limit));
    }, [currentPage, meta]);

    // const smoothScrollTo = (targetPosition: number, duration: number) => {
    //   const startPosition = window.scrollY;
    //   const distance = targetPosition - startPosition;
    //   const startTime = performance.now();
    
    //   const easeInOutQuad = (time: number, start: number, change: number, duration: number) => {
    //     time /= duration / 2;
    //     if (time < 1) return (change / 2) * time * time + start;
    //     time--;
    //     return (-change / 2) * (time * (time - 2) - 1) + start;
    //   };
    
    //   const animation = (currentTime: number) => {
    //     const timeElapsed = currentTime - startTime;
    //     const progress = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    //     window.scrollTo(0, progress);
    
    //     if (timeElapsed < duration) {
    //       requestAnimationFrame(animation);
    //     } else {
    //       window.scrollTo(0, targetPosition); // Ensure it ends at the target position
    //     }
    //   };
    
    //   requestAnimationFrame(animation);
    // };
 // Scroll to top with smooth animation
 
 const handlePageChange = (page: number) => {
  setCurrentPage(page);
  // smoothScrollTo(0, 1500); //
};

  return (
    <div>
       <Header />
       <main className="flex min-h-screen flex-col items-center justify-center">
       

       <div className="grid h-[40rem] w-full lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 items-center justify-between">
         <div className="flex flex-col">
         <h2 className="font-serif mr-5 ml-5 mx-auto text-xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white tracking-tight">
         
              {detail}
         
        
          </h2>
          
          <p className="font-serif relative left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent
          bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)] text-1xl inter-var text-center  md:text-2xl lg:text-2xl">
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
        <div className="mx-auto max-w-5xl px-8"></div>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols2 xs:grid-cols-1 gap-4 md:gap-8">
            {loader ?? (
              <>
                <BookSkelton />
                <BookSkelton />
                <BookSkelton />
                <BookSkelton />
              </>
            )}
            {data?.map((item: DataCart) => (
                <ProductGradient
                  key={item.item_id}
                  book_title={item.book_title}
                  description={item.description}
                  object_path={item.object_path}
                  item_sale_price={item.item_sale_price}
                  showAddToCart={!isItemInCart(item.item_id)}
                  onAddToCart={() => handleAddToCart(item)}
                  onRemoveFromCart={() => handleRemoveFromCart(item)}
                  stock={item.stock}
                />
              ))}
          </div>
          {!loader ?? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>
     
    </div>
  );
};
const BooksPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
};
export default BooksPage;