"use client";

import LoginForm from "~/components/Forms/login-form";
import { Suspense, useState } from "react";
import SendOTPForm from "~/components/Forms/send-otp";
import VerifyOTPForm from "~/components/Forms/verify-otp";
import type { LoginResponse } from "~/types/loginResponse";
import BooknetFormLogin from "~/components/Forms/booknet-form-login";

// Import the image
import BackgroundImage from "~/public/your-image-path.jpg"; // Adjust the path as necessary
import Image from "next/image";

const MyComponent = () => {
  const [view, setView] = useState("booknet");
  const [loginResponse, setLoginResponse] = useState<LoginResponse | null>(
    null,
  );

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-center">
        <Image
          src={"/images/auth-bg.png"}
          alt="bg img"
          width={1000}
          height={1000}
          objectFit="cover "
          className="relative h-full w-full"
        />
      </div>
      <main className="absolute right-0 z-10 p-10">
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
        )} */}
        {/* {view == "Verify-Otp" && ( */}
          <VerifyOTPForm loginResponse={loginResponse} />
        {/* )} */}
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
