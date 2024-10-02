"use client";

// import Header from "~/components/header";

import LoginForm from "~/components/Forms/login-form";
import { Suspense, useState } from "react";
import SendOTPForm from "~/components/Forms/send-otp";
import VerifyOTPForm from "~/components/Forms/verify-otp";
import type { LoginResponse } from "~/types/loginResponse";
import BooknetForm from "~/components/Forms/booknet-form";

const MyComponent = () => {
  const [view, setView] = useState("booknet");
  const [loginResponse, setLoginResponse] = useState<LoginResponse | null>(null);
  
  return (
    <div>
      
      <main className="flex min-h-screen flex-col items-center justify-center">
        {/* {name}
      <Button onClick={()=>ChangeName()}>change name</Button> */}
        {view == "booknet" && <div className="w-96">
          <BooknetForm push={true} goTo="/" title="login" />
          </div>}
        {view == "Login" && <LoginForm setView={setView} setLoginResponse={setLoginResponse}/>}
        {view == "Send-Otp" && <SendOTPForm setView={setView} loginResponse={loginResponse}/>}
        {view == "Verify-Otp" && <VerifyOTPForm loginResponse={loginResponse}/>}
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
