"use client";

import Header from "~/components/header";
import { Suspense, useEffect, useState } from "react";
// import { useSearchParams, usePathname } from "next/navigation";
import { useAuthContext } from "~/Context/AuthContext";
import CheckoutForm from '~/components/Forms/checkout-form' 
import { ExpandableCardDemo } from "~/components/blocks/card";
import type DataCart from "~/types/book";


// const requestOptions: RequestInit = {
//   method: "GET",
//   headers: {
//     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MzQ5LCJwcm9maWxlX2lkIjoxOTgsIm91dGxldF9pZCI6IjIyMSIsImZpcnN0X25hbWUiOiJTaGFtcyIsImxhc3RfbmFtZSI6IlFhemkiLCJ0ZW1wbGF0ZV9pZCI6NSwicGFzc3BvcnRfbm8iOm51bGwsImRhdGVfb2ZfYmlydGgiOm51bGwsImdlbmRlciI6bnVsbCwiZGVzaWduYXRpb25faWQiOlsxXSwiZW1haWwiOiJzaGFtcy5xYXppQGdtYWlsLmNvbSIsInBob25lX251bWJlciI6Iis5MjMyMTk1NjUwMjUiLCJzaWduX3VwIjoiMjAyMy0xMi0yMVQwNToxMTo0OC4wMDBaIiwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMjFUMDU6MTE6NDguMDAwWiIsInNlc3Npb25faWQiOjExNjg1LCJzYWx0IjpudWxsLCJpYXQiOjE3MjU5NTgyMDJ9.R-8jJlaDp2ExXVWLJa_X-fgc4lMAsjlWq3DhPjBXs2U`,
//     "Content-Type": "application/json", // Optional, depending on your API
//   },
//   redirect: "follow", // Use the correct type for `redirect`
// };



const MyComponent = () => {
  
  // const params = useSearchParams();

  const {cartItems } = useAuthContext()
  const [items, setItems] = useState<DataCart[]>([]);

  // Handle add to cart
  // const handleAddToCart = async (item: any) => {
  //   try {
      
  //     await addCartItems(item);
    
  //   } catch (error) {
  //     console.error('Failed to add item to cart:', error);
  //   }
  // };
  // const handleRemoveFromCart = async (item: any) => {
  //   try {
      
  //     await removeCartItems(item);
    
  //   } catch (error) {
  //     console.error('Failed to remove item to cart:', error);
  //   }
  // };

  // const isItemInCart = (itemId: number) => {
    
  //   const newItems = typeof cartItems === 'string' ? JSON.parse(cartItems) :cartItems
  //   return newItems.findIndex((cartItem:any) => cartItem.item_id === itemId) > -1 ? true : false
  // };
  

  useEffect(() => {
    const itemsCart: DataCart[] = typeof cartItems === 'string' ? JSON.parse(cartItems) as DataCart[] : cartItems!;
    setItems(itemsCart);
  }, [cartItems]);



  return (
    <div>
       <Header />
       
       <main className="flex min-h-screen flex-col items-center justify-center">


        <div className="grid grid-cols-2 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-2 justify-center gap-12 px-4 pt-32">
          <CheckoutForm />
          <div className="z-30">
              <ExpandableCardDemo data={items}/>
          </div>
        </div>
      </main>
     
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
};

export default CheckoutPage;