"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "~/components/hooks/outSideClick";
import { useAuthContext } from "~/Context/AuthContext";
// import isEmpty from "lodash/isEmpty";
import BookIcon from "../../../public/bookIcon.png";
import type DataCart from "~/types/book";
import { MdWarning } from "react-icons/md";
import { ScrollArea } from "~/components/ui/scroll-area";
interface DataArray {
  data: DataCart[];
}

export default function ExpandableCardDemo({ data }: DataArray) {
  const { cartItems } = useAuthContext();
  const [items, setItems] = useState<DataCart[]>([]);
  const [active, setActive] = useState<(typeof items)[number] | boolean | null>(
    null,
  );
  // const [removeItem, setRemoveItem] = useState({});
  // const [isOpenAlert, setIsOpenAlert] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  // const id = useId();

  // const handleRemoveFromCart = async (item: any) => {
  //   try {

  //     await removeCartItems(item);

  //   } catch (error) {
  //     console.error('Failed to remove item to cart:', error);
  //   }
  // };

  useEffect(() => {
    const itemsCart: DataCart[] =
      typeof cartItems === "string"
        ? (JSON.parse(cartItems) as DataCart[])
        : cartItems!;
    setItems(itemsCart);
  }, [cartItems]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-black/20"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 z-[100] grid place-items-center">
            <motion.button
              key={`button-${active.book_title}-${active.book_id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white lg:hidden"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.book_title}-${active.book_id}`}
              ref={ref}
              className="flex h-full w-full max-w-[500px] flex-col overflow-hidden bg-white dark:bg-neutral-900 sm:rounded-3xl md:h-fit md:max-h-[90%]"
            >
              <motion.div
                layoutId={`image-${active.book_title}-${active.book_id}`}
              >
                <Image
                  priority
                  width={200}
                  height={200}
                  src={
                    active.object_path
                      ? `https://ipos-storage.s3.amazonaws.com/${active.object_path}`
                      : BookIcon
                  }
                  alt={active.book_title}
                  className="h-80 w-full object-cover object-top sm:rounded-tl-lg sm:rounded-tr-lg lg:h-80"
                />
              </motion.div>

              <div>
                <div className="flex items-start justify-between p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.book_title}-${active.book_id}`}
                      className="font-serif font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.book_title}
                    </motion.h3>
                    <motion.p
                      layoutId={`item_sale_price-${active.item_sale_price}-${active.book_id}`}
                      className="text-center font-sans text-neutral-600 dark:text-neutral-400 md:text-left"
                    >
                      ${active.item_sale_price}
                    </motion.p>
                    <motion.p
                      layoutId={`description-${active.description}-${active.book_id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                    {active.stock.quantity < active.quantity && (
                      <motion.p
                        layoutId={`stock-quantity-${active.quantity}-${active.stock.quantity}`}
                        className="rounded bg-yellow-200 p-2 text-center text-neutral-700 dark:text-neutral-400 md:text-left"
                      >
                        We don&apos;t have as many quantity as you requested, but
                        we&apos;ll back order the remaining{" "}
                        {active.quantity - active.stock.quantity}.
                      </motion.p>
                    )}
                  </div>

                  <motion.button
                    layoutId={`button-${active.book_title}-${active.book_id}`}
                    onClick={() => setActive(null)}
                    className="rounded-full bg-red-400 px-4 py-3 text-sm font-bold text-white"
                  >
                    close
                  </motion.button>
                </div>
                {/* <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.description === "function"
                      ? active.description
                      : active.description}
                  </motion.div>
                </div> */}
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ScrollArea className=" h-3/4 rounded-md border mx-auto w-full max-w-2xl gap-4 bg-white p-4 shadow shadow-card shadow-zinc-300 dark:bg-black md:rounded-xl md:p-8">
     
        <div>
          <p className="font-serif text-lg font-bold">Order Summary</p>
          <p>{data.length} items in cart</p>
        </div>
        {data.map((card, index) => (
          <motion.div
            layoutId={`card-${card.book_title}-${card.book_id}`} // Ensure this is unique
            key={`card-${card.book_title}-${card.book_id}`} // Same key pattern for consistency
            onClick={() => setActive(card)}
            className="flex cursor-pointer flex-col items-center justify-between rounded-xl p-4 shadow hover:bg-neutral-50 hover:shadow-zinc-300 dark:hover:bg-neutral-800 md:flex-row"
          >
            <div className="flex flex-col gap-4 md:flex-row">
              <motion.div layoutId={`image-${card.book_title}-${card.book_id}`}>
                <Image
                  width={100}
                  height={100}
                  src={
                    card.object_path
                      ? `https://ipos-storage.s3.amazonaws.com/${card.object_path}`
                      : BookIcon
                  }
                  alt={card.book_title}
                  className="h-40 w-40 rounded-lg object-cover object-top md:h-14 md:w-14"
                />
              </motion.div>
              <div>
                <motion.h3
                  layoutId={`title-${card.book_title}-${card.book_id}`}
                  className="text-center font-serif font-medium text-neutral-800 dark:text-neutral-200 md:text-left"
                >
                  {card.book_title}
                </motion.h3>
                <motion.p
                  layoutId={`item_sale_price-${card.item_sale_price}-${card.book_id}`}
                  className="text-center text-neutral-600 dark:text-neutral-400 md:text-left"
                >
                  ${card.item_sale_price}
                </motion.p>
                <motion.p
                  layoutId={`quantity-${card.quantity}-${card.book_id}`}
                  className="text-center text-neutral-600 dark:text-neutral-400 md:text-left"
                >
                  Quantity: {card.quantity}
                </motion.p>
                <motion.p
                  layoutId={`description-${card.description}-${card.book_id}`}
                  className="text-center text-neutral-600 dark:text-neutral-400 md:text-left"
                >
                  {card.description}
                </motion.p>
                {card.stock.quantity < card.quantity && (
                  <motion.p
                    layoutId={`stock-quantity-${card.quantity}-${card.stock.quantity}`}
                    className="rounded bg-yellow-200 p-2 text-center text-neutral-700 dark:text-neutral-400 md:text-left flex"
                  >
                   <MdWarning size={23}/> {" "}We don&apos;t have as many quantity as you requested, but we&apos;ll
                    back order the remaining{" "}
                    {card.quantity - card.stock.quantity}.
                  </motion.p>
                )}
              </div>
            </div>
            <motion.button
              layoutId={`button-view-${card.book_title}-${card.book_id}`}
              className="mt-4 rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-black hover:bg-green-500 hover:text-white md:mt-0"
            >
              View
            </motion.button>
          </motion.div>
        ))}
     
      </ScrollArea>
      {/* <AlertBox title="Remove Item" description="Are you sure you want to Remove this item from cart?" open={isOpenAlert} onClose={()=>setIsOpenAlert(false)} onContinue={()=> handleRemoveFromCart(removeItem)}></AlertBox> */}
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
