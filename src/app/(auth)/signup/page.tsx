"use client";

// import Header from "~/components/header";
import SignupForm from "~/components/Forms/signup-form";
import { Suspense } from "react";
import Image from "next/image";

const MyComponent = () => {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center">
      <div className="absolute inset-0 hidden bg-cover bg-center lg:block">
        <Image
          src={"/assets/images/auth-bg.png"}
          alt="bg img"
          width={1000}
          height={1000}
          objectFit="cover "
          className="relative h-full w-full"
        />
      </div>
      <main className="absolute top-32 z-10 lg:right-10 lg:top-3 lg:w-1/3">
        <SignupForm />
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
