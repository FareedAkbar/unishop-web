"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaGhost } from "react-icons/fa";

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <FaGhost className="mb-4 animate-bounce self-center text-6xl text-red-500" />
      <h1 className="mb-2 text-5xl font-extrabold text-red-500">404</h1>
      <p className="mb-6 text-lg opacity-80">
        `Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <button
        onClick={() => router.push("/")}
        className="rounded-lg bg-red-500 px-6 py-2 text-lg text-white transition-all hover:bg-opacity-90"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
