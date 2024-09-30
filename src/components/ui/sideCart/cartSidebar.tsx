"use client";
import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useAuthContext } from "~/Context/AuthContext";
import CartItemCard from "./cartItemCard";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import AlertBox from "~/components/alertBox/alert";
import type DataCart from "~/types/book";

interface SidebarCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarCart: React.FC<SidebarCartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeCartItems, increaseCartItemQuantity, isLoggedIn } = useAuthContext();
  const [items, setItems] = useState<DataCart[]>([]);
  const [subTotal, setSubtotal] = useState<number>(0);
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
  const [loginAlert, setLoginAlert] = useState<boolean>(false);
  const [removeItem, setRemoveItem] = useState<DataCart | null>(null);
  const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState<boolean>(false);
  const router = useRouter();

  const handleRemoveFromCart = async (item: DataCart) => {
    if (item) {
      try {
        await removeCartItems(item);
        setIsOpenDeleteAlert(false)
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
      }
    }
  };

  useEffect(() => {
    
    const itemsCart: DataCart[] = typeof cartItems === 'string' ? JSON.parse(cartItems) as DataCart[] : cartItems!;
    setItems(itemsCart);
  }, [cartItems]);

  useEffect(() => {
    const total = items.reduce(
      (acc, item) => acc + (item.item_sale_price || 0),
      0,
    );
    setSubtotal(total);
  }, [items]);

  const opencart = () => {
    // if(isLoggedIn){
    //   setIsOpenAlert(true);
    // }else{
    //   setLoginAlert(true)
    // }
    setIsOpenAlert(true);
    
  };

  const goToCheckout = () => {
    setIsOpenAlert(false);
    onClose()
    router.push("checkout");
  };
  const goToLogin = () => {
    setLoginAlert(false);
    onClose()
    router.push("login");
  };


const onChangeQuantity = async (id: number, number: number)=>{
  await increaseCartItemQuantity(id,number)
}


  return (
    <>
      <div
        className={`fixed right-0 top-0 border-l-2 h-screen w-96 transform overflow-hidden bg-white shadow-lg transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="relative border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold font-serif">UNISHOP Cart</h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-600 hover:text-gray-900"
          >
            <CgClose className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="h-[calc(100vh-96px)] overflow-y-auto px-4 pb-20 pt-16">
          <div className="mb-4 flex flex-row justify-between">
            <h3 className="text-md font-semibold pl-2">
              Items in cart: {items.length}
            </h3>
            <div className="flex flex-col text-right">
              <h3 className="text-md font-semibold">Cart subtotal:</h3>
              <h3 className="text-md font-semibold">${subTotal.toFixed(2)}</h3>
            </div>
          </div>

          {/* Cart items */}
          {items.length > 0 ? (
            items.map((item: DataCart, index: number) => (
              <CartItemCard
                key={`${index}-${item.item_id}`}
                id={item.item_id}
                name={item.book_title}
                price={item.item_sale_price}
                imageUrl={item.object_path}
                showRemove={true}
                onChangeQuantity={(id,number)=>onChangeQuantity(id,number)}
                itemQuantity={item.quantity}
                showQuantityIncriment={true}
                stock={item.stock}
                onRemove={() => {
                  setRemoveItem(item);
                  setIsOpenDeleteAlert(true);
                }}
              />
            ))
          ) : (
            <div>
              <p>You have no items in your shopping cart.</p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 p-4">
          <Button
            disabled={items.length === 0}
            className="w-full rounded-lg bg-zinc-600 p-3 font-semibold text-white shadow-lg transition-colors hover:bg-black"
            onClick={() => {
              if (!isOpenAlert) {
                // Check if alert is not already open
                opencart();
              }
            }}
          >
            Proceed to Checkout
          </Button>
          <Button
            className="w-full rounded-lg bg-blue-500 p-3 font-semibold text-white shadow-lg transition-colors hover:bg-blue-600"
            onClick={() => alert("Edit Cart")}
          >
            Edit Cart
          </Button>
        </div>
      </div>
      <AlertBox
        title="Complete Your Order"
        description="Are you sure you want to proceed with the checkout? Please review your cart items and ensure everything is correct before finalizing your purchase."
        open={isOpenAlert}
        onClose={() => setIsOpenAlert(false)}
        onContinue={() => goToCheckout()}
      />
      <AlertBox
        title="Remove Item"
        description="Are you sure you want to remove this item from cart?"
        open={isOpenDeleteAlert}
        onClose={() => setIsOpenDeleteAlert(false)}
        onContinue={() => handleRemoveFromCart(removeItem!)}
      />
      <AlertBox
        title="Login Your Account"
        description="Please Login to proceed with checkout"
        open={loginAlert}
        onClose={() => setLoginAlert(false)}
        onContinue={() => goToLogin()}
      />
    </>
  );
};

export default SidebarCart;
