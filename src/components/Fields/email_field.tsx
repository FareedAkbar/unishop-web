"use client";
import * as React from "react";
import { cn } from "~/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { get_address_from_email } from "~/types/checkoutForm";
import { useAuthContext } from "~/Context/AuthContext";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const InputEmail = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & {
  value?: string; // New prop explicitly defined
}>(
  ({ className, type = "email", value, ...props }, ref) => {
    const radius = 100;
    const [visible, setVisible] = React.useState(false);
    const { addBillingAddress } = useAuthContext();
    const [debounceTimer, setDebounceTimer] = React.useState<NodeJS.Timeout | null>(null);
    const effectRan = React.useRef(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (event: React.MouseEvent<HTMLInputElement>) => {
      const { currentTarget } = event;
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    };
    const fetchData = async (email: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/customer/address?email=${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_PASSKEY_TOKEN}`,
            },

          },
        );

        const result: get_address_from_email = (await response.json()) as get_address_from_email;

        // Check if result has the expected structure
        if (result?.status) {
          addBillingAddress(result?.data ?? null)
        } else {
          console.error("Unexpected result structure api/customer/address?email:", result);
        }
      } catch (error) {
        console.error("Error fetching api/customer/address?email:", error);
      }
    };

    const callApi = async (email: string) => {
      console.log(email)
      void fetchData(email)
    };

    React.useEffect(() => {
      if (effectRan.current) return;
      if (!value) return
      void fetchData(value)
      effectRan.current = true;
    }, [value])


    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

      const value = event.target.value;
      //   setEmail(value);

      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      // Set a new timer
      const newTimer = setTimeout(() => {
        if (emailRegex.test(value)) {
          void callApi(value);
        }
      }, 2000);

      setDebounceTimer(newTimer);
    };

    React.useEffect(() => {
      // Cleanup on unmount
      return () => {
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
      };
    }, [debounceTimer]);


    return (
      <motion.div
        style={{
          background: useMotionTemplate`
          radial-gradient(
            ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
            var(--red-500),
            transparent 80%
          )
        `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input"
      >
        <input
          type={type}
          className={cn(
            `flex h-10 w-full border-none bg-gray-50 dark:bg-slate-700 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm 
            file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-300 dark:placeholder:text-neutral-500 
            focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-red-400 dark:focus-visible:ring-red-600 input
            disabled:cursor-not-allowed disabled:opacity-50
            dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
            group-hover/input:shadow-none transition duration-400`,
            className
          )}
          ref={ref}
          onInput={handleChange}
          //   value={email}
          {...props}
        />
      </motion.div>
    );
  }
);

InputEmail.displayName = "Input";

export { InputEmail };
