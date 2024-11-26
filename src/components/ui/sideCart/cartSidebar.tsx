"use client";
import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useAuthContext } from "~/Context/AuthContext";
import CartItemCard from "./cartItemCard";
import { useRouter } from "next/navigation";
import AlertBox from "~/components/alertBox/alert";
import type DataCart from "~/types/book";
import CartItem from "~/components/ui-components/CartItem";
import { FaTimes } from "react-icons/fa";
import { ScrollArea } from "../scroll-area";
import Button from "~/components/ui-components/Button";

interface SidebarCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarCart: React.FC<SidebarCartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeCartItems, increaseCartItemQuantity, isLoggedIn } =
    useAuthContext();
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
        setIsOpenDeleteAlert(false);
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
      }
    }
  };

  useEffect(() => {
    const itemsCart: DataCart[] =
      typeof cartItems === "string"
        ? (JSON.parse(cartItems) as DataCart[])
        : cartItems!;
    setItems(itemsCart);
  }, [cartItems]);

  useEffect(() => {
    const total = items.reduce(
      (acc, item) => acc + (item.item_sale_price * item.quantity || 0),
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
    onClose();
    router.push("checkout");
  };
  const goToLogin = () => {
    setLoginAlert(false);
    onClose();
    router.push("login");
  };

  const onChangeQuantity = async (id: number, number: number) => {
    console.log(id, number);
    await increaseCartItemQuantity(id, number);
  };

  // Handlers for increasing, decreasing, and removing items
  const handleIncrease = async (
    id: number,
    number: number,
    variable_id?: number,
  ) => {
    await increaseCartItemQuantity(id, number, variable_id);
  };

  const handleDecrease = async (
    id: number,
    number: number,
    variable_id?: number,
  ) => {
    await increaseCartItemQuantity(id, number, variable_id);
  };

  useEffect(() => {
    // Prevent background scrolling when the sidebar is open
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable scrolling when sidebar is closed
    }

    return () => {
      document.body.style.overflow = ""; // Clean up on component unmount
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed right-0 top-0 z-30 h-screen w-full transform overflow-hidden border-l-2 bg-white shadow-lg transition-transform dark:bg-slate-800 lg:w-2/5 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cart Sidebar */}
        {/* Cart Header */}
        <div className="flex items-center justify-between border-b bg-gray-100 p-4 dark:bg-slate-700">
          <h2 className="text-xl font-semibold text-red-500">Your Cart</h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
          >
            <CgClose className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items List */}
        <ScrollArea className="h-3/4 flex-1 p-4">
          {items.map((item: DataCart) => (
            <CartItem
              key={item.item_id}
              title={item.item_name}
              imageSrc={item?.object_path}
              price={item.item_sale_price}
              showRemove={true}
              onChangeQuantity={(id, number) => onChangeQuantity(id, number)}
              onIncrease={() =>
                handleIncrease(
                  item.item_id,
                  item.quantity + 1,
                  item?.selected_variation?.items_variable_items_id,
                )
              }
              onDecrease={() =>
                handleDecrease(
                  item.item_id,
                  item.quantity - 1,
                  item?.selected_variation?.items_variable_items_id,
                )
              }
              itemQuantity={item.quantity}
              showQuantityIncrement={true}
              stock={item.stock}
              onRemove={() => {
                setRemoveItem(item);
                setIsOpenDeleteAlert(true);
              }}
              item={item}
            />
          ))}
        </ScrollArea>

        {/* Cart Footer */}
        <div className="fixed bottom-0 w-full p-3">
          {/* Subtotal and Fees */}
          <div className="mb-2 flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-200">
              Subtotal
            </span>
            <span className="text-sm">${subTotal.toFixed(2)}</span>
          </div>
          {/* <div className="mb-2 flex justify-between">
            <span className="text-sm text-gray-500">Delivery Fee</span>
            <span className="text-sm">$15</span>
          </div> */}

          {/* Total Amount */}
          {/* <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>$467</span>
          </div> */}

          {/* Confirm Order Button */}
          <Button
            disabled={items?.[0] ? false : true}
            onClick={() => {
              if (!isOpenAlert) {
                // Check if alert is not already open
                opencart();
              }
            }}
            className={`mt-4 w-full rounded-md bg-red-600 py-2 text-sm text-white ${items.length === 0 ? "disabled" : ""}`}
            title="Confirm Order"
          />
          {/* Confirm Order
          </Button> */}
        </div>
        {/* Header */}
        {/* <div className="relative border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold font-serif">UNISHOP Cart</h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-600 hover:text-gray-900"
          >
            <CgClose className="h-6 w-6" />
          </button>
        </div> */}

        {/* Cart Content */}
        <div className="h-[calc(100vh-96px)] overflow-y-auto px-4 pb-20 pt-16">
          {/* <div className="mb-4 flex flex-row justify-between">
            <h3 className="text-md font-semibold pl-2">
              Items in cart: {items.length}
            </h3>
            <div className="flex flex-col text-right">
              <h3 className="text-md font-semibold">Cart subtotal:</h3>
              <h3 className="text-md font-semibold">${subTotal.toFixed(2)}</h3>
            </div>
          </div> */}

          {/* Cart items */}
          {/* {items.length > 0 ? (
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
                showQuantityIncrement={true}
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
          )} */}
        </div>

        {/* Buttons */}
        {/* <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 p-4">
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
        </div> */}
      </div>
      <AlertBox
        title="Confirmation"
        description="Are you sure you want to proceed with the checkout?"
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
