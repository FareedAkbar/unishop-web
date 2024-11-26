"use client";
import * as React from "react";
import { cn } from "~/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const InputEmail = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "email", ...props }, ref) => {
    const radius = 100; 
    const [visible, setVisible] = React.useState(false);
    const [debounceTimer, setDebounceTimer] = React.useState<NodeJS.Timeout | null>(null);


    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (event: React.MouseEvent<HTMLInputElement>) => {
      const { currentTarget } = event;
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    };

    const callApi = (email: string) => {
        console.log(email)
      };
  

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
       
      const value = event.target.value;
    //   setEmail(value);
        
    if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      // Set a new timer
      const newTimer = setTimeout(() => {
        if (emailRegex.test(value)) {
           callApi(value);
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
          onChange={()=>console.log("Adsadsa")}
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
