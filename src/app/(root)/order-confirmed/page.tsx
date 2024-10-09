"use client";

import { useRouter } from "next/navigation";
import { Suspense } from "react";
import Button from "~/components/ui-components/Button";
import { motion } from "framer-motion";

const MyComponent = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-16 dark:bg-gray-900 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800"
      >
        <div className="text-center">
          <motion.h2
            className="text-3xl font-bold text-red-600 dark:text-white"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Order Placed Successfully!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg font-semibold text-gray-600 dark:text-gray-300"
          >
            Thank you for your order.
          </motion.p>

          <div className="mt-6 space-y-4">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-md text-zinc-500 dark:text-gray-400"
            >
              <strong>Tracking ID:</strong> 123456789
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-md text-zinc-500 dark:text-gray-400"
            >
              <strong>Transaction ID:</strong> ABC123456
            </motion.p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            title="Go to Home"
            className="mt-8 rounded-full px-6 py-3 text-white shadow-lg transition duration-300 ease-in-out"
            onClick={() => router.push("/")}
          />
        </div>
      </motion.div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
};

export default Page;
