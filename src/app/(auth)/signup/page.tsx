"use client";

// import Header from "~/components/header";
import SignupForm from "~/components/Forms/signup-form";
import { Suspense } from "react";

const MyComponent = () => {
  return (
    <div>
      <main className="mt-10 flex min-h-screen flex-col justify-center">
        {/* {name}
      <Button onClick={()=>ChangeName()}>change name</Button> */}

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
