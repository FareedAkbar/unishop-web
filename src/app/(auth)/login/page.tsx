"use client";

import LoginForm from "~/components/Forms/uow-login";
import { Suspense, useState } from "react";
import SendOTPForm from "~/components/Forms/send-otp";
import VerifyOTPForm from "~/components/Forms/verify-otp";
import type { LoginResponse } from "~/types/loginResponse";
import BooknetFormLogin from "~/components/Forms/booknet-form-login";
import Image from "next/image";
import { Tabs } from "~/components/ui/tabs";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import OTPVerificationForm from "~/components/Forms/otp-form";

const MyComponent = () => {
  const [view, setView] = useState("login");
  const router = useRouter();

  const [loginResponse, setLoginResponse] = useState<LoginResponse | null>(
    null,
  );

  const tabs = [
    {
      title: "Booknet Guest Login",
      value: "customerLogin",
      content: <BooknetFormLogin push={true} goTo="/" title="Login as a booknet guest" />,
    },
    {
      title: "UOW Login",
      value: "uowLogin",
      content: (
        <LoginForm setView={setView} setLoginResponse={setLoginResponse} />
      ),
    },
  ];
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
        {view == "login" && (
          <div className="relative">
            <button
              onClick={() => router.push("/")} 
              className="fixed left-10 top-10 rounded-full bg-transparent p-2 shadow-md transition hover:bg-gray-200"
            >
              <FaArrowLeft className="text-black" />
            </button>
            <Tabs tabs={tabs} />
          </div>
        )}
        
        {/* {view == "booknet" && (
          <div className="w">
            <BooknetFormLogin push={true} goTo="/" title="Customer Login" />
          </div>
        )}
        {view == "Login" && (
          <LoginForm setView={setView} setLoginResponse={setLoginResponse} />
        )}
        {view == "Send-Otp" && (
          <SendOTPForm setView={setView} loginResponse={loginResponse} />
        )}
        {view == "Verify-Otp" && (
        <VerifyOTPForm loginResponse={loginResponse} />
        )} */}
        {view == "Verify-Otp" && (
          <OTPVerificationForm email={loginResponse?.data.email}/>
          // <VerifyOTPForm loginResponse={loginResponse} />
        )}
      </main>
    </div>
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
};

export default LoginPage;
