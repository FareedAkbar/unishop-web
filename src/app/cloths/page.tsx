"use client";

import { Controls, Player } from "@lottiefiles/react-lottie-player";

import Header from "~/components/header";
import ProductGradient from "../../components/productGradient";
import { useSearchParams } from "next/navigation";
import { useAuthContext } from "~/Context/AuthContext";
import BooksImage from "../../../public/book.json";
import type DataCart from "~/types/book";
import { Suspense } from "react";

const MyComponent = () => {
  const { cartItems, addCartItems, removeCartItems } = useAuthContext();

  const params = useSearchParams();
  const detail = params.get("detail");
  const data: DataCart[] = [];

  // Handle add to cart
  const handleAddToCart = async (item: DataCart) => {
    try {
      await addCartItems(item);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };
  const handleRemoveFromCart = async (item: DataCart) => {
    try {
      await removeCartItems(item);
    } catch (error) {
      console.error("Failed to remove item to cart:", error);
    }
  };

  const isItemInCart = (itemId: number) => {
    const newItems: DataCart[] =
      typeof cartItems === "string" ? JSON.parse(cartItems) as DataCart[] : cartItems!;
    return newItems.findIndex((cartItem: DataCart) => cartItem.item_id === itemId) > -1
      ? true
      : false;
  };

  return (
    <div>
      {/* bg-gradient-to-b from-[#cfa6a6] to-[#dd9999] text-white */}
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center">
        {/* {name}
      <Button onClick={()=>ChangeName()}>change name</Button> */}

        <div className="grid h-[40rem] w-full items-center justify-between sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="flex flex-col">
            <h2 className="relative z-20 mx-auto ml-5 mr-5 text-center font-serif text-xl font-bold tracking-tight text-black dark:text-white md:text-4xl lg:text-7xl">
              {detail}
            </h2>

            <p className="text-1xl inter-var relative left-0 top-[1px] bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat py-4 text-center font-serif text-transparent [text-shadow:0_0_rgba(0,0,0,0.1)] md:text-2xl lg:text-2xl">
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
          <div className="grid grid-cols-4 gap-4 md:gap-8">
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
          {/* <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          /> */}
        </div>
      </main>
    </div>
  );
}

const clothsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
};

export default clothsPage;
