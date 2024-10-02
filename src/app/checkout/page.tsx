"use client";

// import Header from "~/components/header";
import { Suspense, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
// import { useSearchParams, usePathname } from "next/navigation";
import { useAuthContext } from "~/Context/AuthContext";
import CheckoutForm from '~/components/Forms/checkout-form' 

import type DataCart from "~/types/book";
import BooknetForm from "~/components/Forms/booknet-form";
import CartItem from "~/components/ui-components/CartItem";
import { ScrollArea } from "~/components/ui/scroll-area";
import AlertBox from "~/components/alertBox/alert";





const MyComponent = () => {
  


  const { cartItems, removeCartItems, increaseCartItemQuantity, isLoggedIn } =
    useAuthContext();
  const [items, setItems] = useState<DataCart[]>([]);
  const [view, setView] = useState("checkout");
  const [removeItem, setRemoveItem] = useState<DataCart | null>(null);
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState<boolean>(false);

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

  const onChangeQuantity = async (id: number, number: number) => {
    console.log(id, number);
    await increaseCartItemQuantity(id, number);
  };

  // Handlers for increasing, decreasing, and removing items
  const handleIncrease = async (id: number, number: number) => {
    console.log(`Increase quantity for item ${id}`);
    await increaseCartItemQuantity(id, number);
  };

  const handleDecrease = async (id: number, number: number) => {
    console.log(`Decrease quantity for item ${id}`);
    await increaseCartItemQuantity(id, number);
  };

  const handleRemoveFromCart = async (item: DataCart) => {
    if (item) {
      try {
        await removeCartItems(item);
        setIsOpenDeleteAlert(false);
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
      }
    }
  };

  return (
    <div>
       
       
       <main className="flex min-h-screen flex-col items-center justify-center z-10">


        <div className="grid grid-cols-2 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-2 justify-center gap-12 px-4 pt-32">
          <div className="z-10">
          {view == 'checkout' ? (
            <CheckoutForm push={true}/>
          ): (
            <BooknetForm push={true} goTo="placeorder"/>
          )}
         
          <div className="mt-5 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        <div className="flex justify-center text-black mt-2 hover:text-red-400">
          <div className="cursor-pointer hover:text-red-500" onClick={()=>setView(view == "checkout" ? "booknetForm" : "checkout")}>
            {view == 'checkout' ? 'I already have booknet account' : "I don't have booknet account yet"}
           
            </div>
        </div>
        </div>
          <div className="z-10">
          <ScrollArea className="h-3/5 flex-1 p-4">
          {items.map((item: DataCart) => (
            <CartItem
              key={item.item_id}
              title={item.book_title}
              imageSrc={item?.object_path}
              price={item.item_sale_price}
              size={"aa"}
              color={"red"}
              showRemove={true}
              onChangeQuantity={(id, number) => onChangeQuantity(id, number)}
              onIncrease={() => handleIncrease(item.item_id, item.quantity + 1)}
              onDecrease={() => handleDecrease(item.item_id, item.quantity - 1)}
              itemQuantity={item.quantity}
              showQuantityIncriment={true}
              stock={item.stock}
              onRemove={() => {
                setRemoveItem(item);
                setIsOpenDeleteAlert(true);
              }}
            />
          ))}
        </ScrollArea>
          </div>
        </div>
      </main>
      <AlertBox
        title="Remove Item"
        description="Are you sure you want to remove this item from cart?"
        open={isOpenDeleteAlert}
        onClose={() => setIsOpenDeleteAlert(false)}
        onContinue={() => handleRemoveFromCart(removeItem!)}
      />
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