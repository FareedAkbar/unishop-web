"use client";

import LoginForm from "~/components/Forms/uow-login";
import { Suspense, useState } from "react";
import type { LoginResponse } from "~/types/loginResponse";
import BooknetFormLogin from "~/components/Forms/booknet-form-login";
import Image from "next/image";
import { Tabs } from "~/components/ui/tabs";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import OTPVerificationForm from "~/components/Forms/otp-form";
import Spinner from "~/components/spinner";

const MyComponent = () => {
  const [view, setView] = useState("login");
  const router = useRouter();

  const [loginResponse, setLoginResponse] = useState<LoginResponse | null>(
    null,
  );

  // const tabs = [
  //   {
  //     title: "Guest Login",
  //     value: "customerLogin",
  //     content: (
  //       <BooknetFormLogin push={true} goTo="/" title="Login as a Guest" />
  //     ),
  //   },
  //   {
  //     title: "UOW Login",
  //     value: "uowLogin",
  //     content: (
  //       <LoginForm setView={setView} setLoginResponse={setLoginResponse} />
  //     ),
  //   },
  // ];

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
        {view == "login" && (
          <div className="relative">
            <button
              onClick={() => router.back()}
              className="fixed left-10 top-10 rounded-full bg-transparent p-2 transition hover:bg-gray-200 dark:hover:bg-slate-700"
            >
              <FaArrowLeft className="text-black dark:text-white" />
            </button>
            <LoginForm setView={setView} setLoginResponse={setLoginResponse} />
            {/* <Tabs tabs={tabs} /> */}
          </div>
        )}

        {view == "Verify-Otp" && (
          <OTPVerificationForm loginResponse={loginResponse} />
          // <VerifyOTPForm loginResponse={loginResponse} />
        )}
      </main>
    </div>
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <MyComponent />
    </Suspense>
  );
};

export default LoginPage;
