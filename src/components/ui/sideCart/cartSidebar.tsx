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
  const {
    cartItems,
    removeCartItems,
    increaseCartItemQuantity,
    isLoggedIn,
    logout,
  } = useAuthContext();
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
    if (isLoggedIn) {
      onClose();
      router.push("checkout");
      // setIsOpenAlert(true);
    } else {
      setLoginAlert(true);
    }
    // setIsOpenAlert(true);
  };

  const goToCheckout = () => {
    setIsOpenAlert(false);
    setLoginAlert(false);
    onClose();
    router.push("checkout");
  };
  const goToLogin = () => {
    void logout();
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
    if (typeof window !== "undefined") {
      if (isOpen) {
        document.body.style.overflow = "hidden"; // Disable scrolling
      } else {
        document.body.style.overflow = ""; // Enable scrolling when sidebar is closed
      }
    }
    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = ""; // Clean up on component unmount
      }
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
        className={`fixed right-0 top-0 z-30 w-full transform border-l-2 bg-white shadow-lg transition-transform dark:bg-slate-800 lg:w-2/5 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cart Inner Layout */}
        <div className="flex h-screen flex-col">
          {/* Cart Header */}
          <div className="flex-shrink-0 border-b bg-gray-100 p-4 dark:bg-slate-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-red-500">Cart Items</h2>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-200"
              >
                <CgClose className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Cart Items Scrollable Area */}
          <div className="h-[calc(100vh-30vh)] overflow-y-auto p-4 lg:h-[calc(100vh-160px)]">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center p-4">
                <span className="text-lg font-medium text-red-600 dark:text-white">
                  It appears that your cart is empty. Please choose items before
                  proceeding to checkout.
                </span>
                <div className="mt-2 self-center">
                  <Button
                    title="Continue Shopping"
                    onClick={() => router.push("/")}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item: DataCart, index) => (
                  <CartItem
                    key={`cartItems-${item.item_id}-${index}`}
                    title={item.item_name}
                    imageSrc={
                      item?.object_path ?? item.media?.[0]?.object_path ?? ""
                    }
                    price={item.item_sale_price}
                    showRemove={true}
                    onChangeQuantity={(id, number) =>
                      onChangeQuantity(id, number)
                    }
                    onIncrease={() => {
                      if (
                        item.quantity >= (item?.stock?.quantity ?? 0) &&
                        item.allow_special_order == 0
                      ) {
                        console.log("Stock limit reached");
                      } else {
                        void handleIncrease(
                          item.item_id,
                          item.quantity + 1,
                          item?.selected_variation?.items_variable_items_id,
                        );
                      }
                    }}
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
              </div>
            )}
          </div>

          {/* Cart Footer (Fixed at bottom) */}
          <div className="h-fit flex-shrink-0 border-t bg-white p-3 dark:bg-slate-800">
            <div className="mb-2 flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-200">
                Subtotal
              </span>
              <span className="text-sm">${subTotal.toFixed(2)}</span>
            </div>
            <Button
              // disabled={items?.[0] ? false : true}
              onClick={() => {
                if (!isOpenAlert) {
                  opencart();
                }
              }}
              width="w-full"
              className={`mt-4`}
              title="View Cart"
            />
          </div>
        </div>
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
        title="How would you like to continue"
        description="Log in for a faster checkout and order tracking, or continue as a guest."
        open={loginAlert}
        onClose={() => goToCheckout()}
        cancelButtonText="Continue as Guest"
        continueButtonText="Login"
        onContinue={() => goToLogin()}
      />
    </>
  );
};

export default SidebarCart;
