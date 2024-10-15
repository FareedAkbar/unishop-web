"use client";

// import Header from "~/components/header";
import SignupForm from "~/components/Forms/signup-form";
import { Suspense } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const MyComponent = () => {
  const router = useRouter();

  return (
    <div className="relative flex h-screen flex-col items-center justify-center">
      <div className="absolute inset-0 hidden bg-cover bg-center lg:block">
        <Image
          src={"/images/auth-bg.png"}
          alt="bg img"
          width={1000}
          height={1000}
          objectFit="cover "
          className="relative h-full w-full"
        />
      </div>
      <main className="absolute top-32 z-10 lg:right-10 lg:top-3 lg:w-1/3">
        <div className="relative">
          <button
            onClick={() => router.push("/")}
            className="fixed left-10 top-10 rounded-full bg-transparent p-2 shadow-md transition hover:bg-gray-200"
          >
            <FaArrowLeft className="text-black" />
          </button>
          <SignupForm />
        </div>
      </main>
    </div>
  );
};

const SignupPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
};

export default SignupPage;
