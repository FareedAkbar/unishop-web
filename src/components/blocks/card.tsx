"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "~/components/hooks/outSideClick";
import { useAuthContext } from "~/Context/AuthContext";
// import isEmpty from "lodash/isEmpty";
import BookIcon from '../../../public/bookIcon.png'
import type DataCart from "~/types/book";


  interface DataArray {
    data: DataCart[];
    
  }
  
export function ExpandableCardDemo({data} : DataArray) {
 
  const {cartItems} = useAuthContext()
  const [items, setItems] = useState<DataCart[]>([]);
  const [active, setActive] = useState<(typeof items)[number] | boolean | null>(
    null
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
    const itemsCart: DataCart[] = typeof cartItems === 'string' ? JSON.parse(cartItems) as DataCart[] : cartItems!;
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

    window.addEventListener("keydown", onKeyDown);
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
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.book_title}`}
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
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.book_title}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.book_title}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={!active.object_path ? `https://ipos-storage.s3.amazonaws.com/${active.object_path}` : BookIcon}  
                  alt={active.book_title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.book_title}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200 font-serif"
                    >
                      {active.book_title}
                    </motion.h3>
                    <motion.p
                  layoutId={`description-${active.item_sale_price}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left font-sans"
                >
                  ${active.item_sale_price}
                </motion.p>
                    <motion.p
                      layoutId={`description-${active.description}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.button
                    layoutId={`button-${active.book_title}`}
                    onClick={()=>setActive(null)}
                   
                    className="px-4 py-3 text-sm rounded-full font-bold bg-red-400 text-white"
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
      <ul className="max-w-2xl gap-4 shadow shadow-card  shadow-zinc-400  w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-white dark:bg-black">
        <div>
            <p className="font-bold font-serif text-lg">Order Summary</p>
            <p>{data.length} items in cart</p>
        </div>
        {data.map((card) => (
          <motion.div
            layoutId={`card-${card.book_title}`}
            key={`card-${card.book_title}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center shadow hover:shadow-zinc-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row ">
              <motion.div layoutId={`image-${card.book_title}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.object_path ? `https://ipos-storage.s3.amazonaws.com/${card.object_path}` : BookIcon}  
                  
                  alt={card.book_title}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.book_title}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left font-serif"
                >
                  {card.book_title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.item_sale_price}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  ${card.item_sale_price}
                </motion.p>
                <motion.p
                  layoutId={`description-${card.description}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.book_title}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
            >
              View
            </motion.button>
            {/* <button
                onClick={(event)=>{event.stopPropagation(); setRemoveItem(card); setIsOpenAlert(true);}}
            //   layoutId={`button-${card.book_title}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-red-500 hover:text-white text-black mt-4 md:mt-0"
            >
              Remove
            </button> */}
          </motion.div>
        ))}
      </ul>
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


