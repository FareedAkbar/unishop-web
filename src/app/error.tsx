"use client";
import React, { useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";
import Button from "~/components/ui-components/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to console or reporting services
    console.error("Global boundary caught error:", error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center text-red-500 bg-white dark:bg-slate-900 p-6 text-center">
      <FaExclamationTriangle className="mb-4 animate-pulse text-6xl" />
      <h1 className="mb-2 text-3xl font-extrabold text-neutral-800 dark:text-neutral-200">
        Something went wrong!
      </h1>
      <p className="mb-6 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
        An unexpected error occurred. Please try reloading the page or returning home.
      </p>
      <div className="flex gap-4">
        <Button title="Try Again" onClick={() => reset()} />
        <Link href="/">
          <Button title="Go Home" variant="secondary" />
        </Link>
      </div>
    </div>
  );
}
