import * as React from "react";
import MaskedInput, { MaskedInputProps } from 'react-text-mask';
import { cn } from "~/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

interface TextMaskCustomProps extends MaskedInputProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

  
  const TextMaskCustom = React.forwardRef<HTMLInputElement, TextMaskCustomProps>(
    ({ inputRef, ...other }, ref) => {
      return (
        <MaskedInput
          {...other}
          ref={(instance: MaskedInput | null) => {
            // Ensure instance is not null
            if (instance) {
              // Pass the actual input element to the inputRef
              if (inputRef) {
                if (typeof inputRef === 'function') {
                  inputRef(instance.input); // Pass the input element
                } else {
                  // If inputRef is a ref object, assign the input element
                  (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = instance.input;
                }
              }
  
              // Forward the ref to the parent component
              if (ref) {
                (ref as React.MutableRefObject<HTMLInputElement | null>).current = instance.input;
              }
            }
          }}
          placeholderChar={'\u2000'}
        />
      );
    }
  );

  TextMaskCustom.displayName = "TextMaskCustom";
  
const PhoneNumberInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "tel", ...props }, ref) => {
    const radius = 100; // Change this to increase the radius of the hover effect
    const [visible, setVisible] = React.useState(false);

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
        className="p-[2px] rounded-lg transition duration-300 group/input"
        ref={ref} 
      >
        <TextMaskCustom
           mask={[
            '(',
            /0/,
            /4/,
            ')',
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]}
          type={type}
          className={cn(
            `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm 
            file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder:text-neutral-600 
            focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-red-400 dark:focus-visible:ring-neutral-600
            disabled:cursor-not-allowed disabled:opacity-50
            dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
            group-hover/input:shadow-none transition duration-400`,
            className
          )}
          ref={ref} // Pass the ref correctly here
          inputRef={(input) => {
            if (input) {
                console.log("Input reference:", input); // Replace with actual logic as needed
                input.focus()
              }
              
          }}
          {...props} // Ensure any other props are passed through
        />
      </motion.div>
    );
  }
);

PhoneNumberInput.displayName = "PhoneNumberInput";

export { PhoneNumberInput };
