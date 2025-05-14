"use client";
import * as React from "react";
import { cn } from "~/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, id, type = "text", ...props }, ref) => {
  const radius = 100;
  const [visible, setVisible] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  };

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
      className="group/input relative rounded-lg p-[2px] transition duration-300"
    >
      <div className="relative">
        {id && id.includes("phone") && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
            {id.split("number")[1]?.includes("+") ? id.split("number")[1] : `+${id.split("number")[1]}`}
          </span>
        )}

        <input
          type={inputType}
          className={cn(
            `input duration-400 flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 pr-10 text-sm text-black shadow-input transition file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-300 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-red-400 disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none dark:bg-slate-700 dark:text-white dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] dark:placeholder:text-neutral-500 dark:focus-visible:ring-red-600`,
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none dark:text-gray-300 dark:hover:text-white"
          tabIndex={-1} // prevent stealing focus
        >
          {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
        </button>
      )}
    </motion.div>
  );
});

Input.displayName = "Input";
export { Input };
