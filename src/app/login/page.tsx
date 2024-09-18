"use client";

import Header from "~/components/header";


import LoginForm from "~/components/Forms/login-form";
import { Suspense } from "react";



const MyComponent = () => {
  
  return (
    <div>
    <Header />
    <main className="flex min-h-screen flex-col items-center justify-center">
      {/* {name}
      <Button onClick={()=>ChangeName()}>change name</Button> */}

      <LoginForm />
     
      
      
    </main>

  </div>
  );
}

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
};

export default LoginPage;
