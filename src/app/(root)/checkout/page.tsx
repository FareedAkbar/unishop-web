"use client";

// import Header from "~/components/header";
import { Suspense, useEffect, useState } from "react";
// import { useSearchParams, usePathname } from "next/navigation";
import { useAuthContext } from "~/Context/AuthContext";
import CheckoutForm from "~/components/Forms/checkout-form";

import type DataCart from "~/types/book";
import BooknetForm from "~/components/Forms/booknet-form";
import CartItem from "~/components/ui-components/CartItem";
import { ScrollArea } from "~/components/ui/scroll-area";
import AlertBox from "~/components/alertBox/alert";
import { Tabs } from "~/components/ui/tabs";
import Button from "~/components/ui-components/Button";
import { useRouter } from "next/navigation";
import Spinner from "~/components/spinner";

const MyComponent = () => {
  const { cartItems, removeCartItems, increaseCartItemQuantity } =
    useAuthContext();
  const router = useRouter();
  const [items, setItems] = useState<DataCart[]>([]);
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
    const itemsCart: DataCart[] =
      typeof cartItems === "string"
        ? (JSON.parse(cartItems) as DataCart[])
        : cartItems!;
    setItems(itemsCart);
  }, [cartItems]);

  const onChangeQuantity = async (id: number, number: number) => {
    console.log(id, number);
    await increaseCartItemQuantity(id, number);
  };

  // Handlers for increasing, decreasing, and removing items
  const handleIncrease = async (id: number, number: number) => {
    await increaseCartItemQuantity(id, number);
  };

  const handleDecrease = async (id: number, number: number) => {
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
  const tabs = [
    {
      title: "Checkout",
      value: "checkout",
      content: (
        <CheckoutForm push={true} disabled={!items?.[0] ? true : false} />
      ),
    },
    {
      title: "Booknet Account",
      value: "booknetForm",
      content: (
        <BooknetForm
          push={true}
          goTo="placeorder"
          disabled={!items?.[0] ? true : false}
        />
      ),
    },
  ];

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-start pt-24 dark:bg-slate-900">
        <div className="grid w-full grid-cols-1 gap-12 px-4 lg:grid-cols-2">
         
          <div className="z-10 lg:h-screen pt-10 lg:order-2">
            <ScrollArea className="flex-1 p-4 lg:h-4/5 max-h-[40vh] dark:bg-slate-700 rounded-lg">
              {items?.[0] ? (
                items.map((item: DataCart) => (
                  <CartItem
                    key={item.item_id}
                    title={item.book_title}
                    imageSrc={item?.object_path}
                    price={item.item_sale_price}
                    showRemove={true}
                    onChangeQuantity={(id, number) =>
                      onChangeQuantity(id, number)
                    }
                    onIncrease={() =>
                      handleIncrease(item.item_id, item.quantity + 1)
                    }
                    onDecrease={() =>
                      handleDecrease(item.item_id, item.quantity - 1)
                    }
                    itemQuantity={item.quantity}
                    showQuantityIncriment={true}
                    stock={item.stock}
                    onRemove={() => {
                      setRemoveItem(item);
                      setIsOpenDeleteAlert(true);
                    }}
                    item={item}
                  />
                ))
              ) : (
                <div>
                  <span className="text-lg font-bold text-red-600 dark:text-white">
                  It appears that your cart is empty. Please choose items before proceeding to checkout.
                  </span>
                  <div className="mt-2">
                    <Button
                      title="Continue Shoping"
                      onClick={() => router.push("/")}
                    />
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
          <div className="z-10 w-full lg:pt-0 pt-16">
            <Tabs tabs={tabs} key={items?.toString()} />
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
    <Suspense fallback={<Spinner />}>
      <MyComponent />
    </Suspense>
  );
};

export default CheckoutPage;
