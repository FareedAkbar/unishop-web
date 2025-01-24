"use client";

import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { useAuthContext } from "~/Context/AuthContext";

import Link from "next/link";
import { FaHome } from "react-icons/fa";
import Spinner from "~/components/spinner";
import dynamic from "next/dynamic";
 const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then(mod => mod.Player), { ssr: false });
const OrderConfirmed = () => {
  const router = useRouter();
  const { orderTransactionData } = useAuthContext();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 pb-16 pt-28 dark:bg-gray-900 sm:px-8">
      <motion.h2
        className="mb-6 text-3xl font-bold text-red-500"
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
        className="flex flex-col items-center gap-3 py-5 lg:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-md text-center text-gray-600 dark:text-gray-300">
          For any inquiries regarding your order, feel free to contact our
          support team.
        </p>

        <div className="flex justify-center">
          <Link
            href="/"
            className="flex min-w-28 flex-row items-center justify-center gap-2 whitespace-nowrap rounded bg-red-500 p-2 text-white transition-transform hover:scale-105"
          >
            <FaHome size={16} />
            <span className="text-sm">Home</span>
          </Link>
        </div>
      </motion.div>

      <div className="flex w-full max-w-4xl items-center justify-between">
        <div className="flex flex-1 items-center justify-center">
          <Player
            autoplay
            loop
            src={"assets/gifs/orderconfirmed.json"}
            className="h-32 w-32 object-cover md:h-48 md:w-48"
          />
        </div>

        <motion.div
          className="flex h-fit flex-1 flex-col justify-center rounded-lg border p-3 shadow-md dark:bg-slate-800"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-md flex justify-between text-zinc-500 dark:text-gray-400">
            <strong>Order ID:</strong> {orderTransactionData?.order_id ?? 0}
          </p>
          <p className="text-md flex justify-between text-zinc-500 dark:text-gray-400">
            <strong>Tracking ID:</strong>{" "}
            {orderTransactionData?.tracking_id ?? 0}
          </p>
          <p className="text-md flex justify-between text-zinc-500 dark:text-gray-400">
            <strong>Transaction ID:</strong>{" "}
            {orderTransactionData?.transaction_id ?? 0}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <OrderConfirmed />
    </Suspense>
  );
};

export default Page;

