"use client";

// import Header from "~/components/header";
import SignupForm from "~/components/Forms/signup-form";
import { Suspense } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "~/components/spinner";

const MyComponent = () => {
  const router = useRouter();

  return (
    <div className="relative flex h-screen flex-col items-center justify-center">
      <div className="absolute inset-0 hidden bg-cover bg-center lg:block">
        <Image
          src="/assets/images/auth-bg.png"
          alt="background image"
          width={1000}
          height={1000}
          objectFit="cover"
          className="relative h-full w-full dark:hidden"
        />

        <Image
          src="/assets/images/home/home1.png"
          alt="background image flipped"
          width={1000}
          height={1000}
          objectFit="cover"
          className="relative hidden h-full w-full dark:block"
          style={{ transform: "scaleX(-1)" }} // Flip image for dark mode
        />
      </div>
      <main className="absolute top-32 z-10 lg:right-10 lg:top-3 lg:w-1/3">
        <div className="relative">
          <button
            onClick={() => router.back()}
            className="fixed left-10 top-10 rounded-full bg-transparent p-2 shadow-md transition hover:bg-gray-200 dark:hover:bg-slate-700"
          >
              <FaArrowLeft className="text-black dark:text-white" />
              </button>
          <SignupForm />
        </div>
      </main>
    </div>
  );
};

const SignupPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <MyComponent />
    </Suspense>
  );
};

export default SignupPage;
