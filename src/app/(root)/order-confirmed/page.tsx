"use client";

import { useRouter } from "next/navigation";
import { Suspense } from "react";
import Button from "~/components/ui-components/Button";
import { motion } from "framer-motion";
import { useAuthContext } from "~/Context/AuthContext";
import { Player } from "@lottiefiles/react-lottie-player";

const OrderConfirmed = () => {
  const router = useRouter();
  const { orderTrasactionData } = useAuthContext();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 pb-16 pt-32 dark:bg-gray-900 sm:px-8">
      {/* Thank You Message */}
      <motion.h2
        className="mb-6 text-3xl font-bold text-red-600 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Thanks for your order!
      </motion.h2>

      <motion.div
        className="flex w-full max-w-4xl flex-col justify-items-center rounded-lg bg-red-100 p-8 shadow-lg dark:bg-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-white">
          ORDER CONFIRMATION
        </h3>
        <p className="text-md text-center text-gray-600 dark:text-gray-300">
          Your order has been placed successfully. We are currently processing
          it and will notify you when your items are on the way.
        </p>
      </motion.div>
      <motion.div
        className="flex flex-col items-center gap-3 py-3 lg:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-md mt-4 text-center text-gray-600 dark:text-gray-300">
          For any inquiries regarding your order, feel free to contact our
          support team.
        </p>

        <div className="flex justify-center">
          <Button
            title="Go to Home"
            className="rounded-full px-6 py-3 text-white shadow-lg transition duration-300 ease-in-out"
            onClick={() => router.push("/")}
          />
        </div>
      </motion.div>

      <div className=" flex w-full max-w-4xl justify-between">
        <div
          className="flex flex-1 items-center justify-center"
          // initial={{ opacity: 0, x: -20 }}
          // animate={{ opacity: 1, x: 0 }}
          // transition={{ duration: 0.5 }}
        >
          <Player
            autoplay
            loop
            src={"assets/gifs/orderconfirmed.json"}
            className="h-32 w-32 md:h-48 md:w-48 object-cover"
          />
        </div>

        <motion.div
          className="flex flex-1 flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-md text-zinc-500 dark:text-gray-400">
            <strong>Tracking ID:</strong> {orderTrasactionData?.tracking_id||1233}
          </p>
          <p className="text-md text-zinc-500 dark:text-gray-400">
            <strong>Transaction ID:</strong>{" "}
            {orderTrasactionData?.trasaction_id||4567 }
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmed />
    </Suspense>
  );
};

export default Page;
