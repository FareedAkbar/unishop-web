import React, { useEffect } from "react";

type Callback = (event: MouseEvent | TouchEvent) => void;

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: Callback
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback(event);
    };
    if (typeof window !== "undefined") {
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    }
    return () => {
      if (typeof window !== "undefined") {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      }
    };
  }, [ref, callback]);
};
