import React, { useState } from "react";
import { Label } from "../ui/label";
import Link from "next/link";
import { useAuthContext } from "~/Context/AuthContext";
import { useToast } from "~/hooks/use-toast";
import { LoginResponse } from "~/types/loginResponse";
import { cn } from "~/lib/utils";
import Spinner from "../spinner";

// Define the type of form inputs

interface LoginFormProps {
  setView: (payload: string) => void;
  loginResponse: LoginResponse | null;
}

export default function SendOTPForm({
  setView,
  loginResponse,
}: LoginFormProps) {
  const { sendOTP } = useAuthContext();
  const { toast } = useToast();
  const [loader,setLoader] = useState(false)

  // Set up React Hook Form

  // Handle form submission
  const sendOTPApi = async () => {
    try {
      setLoader(true)
      const res = await sendOTP({
        customer_id: loginResponse?.data.customer_id,
        email: loginResponse?.data.email,
      });
      setLoader(false)
      // Type guard to ensure res is LoginResponse
      if (typeof res !== "boolean" && res.status) {
        console.log(res);
        setView("Verify-Otp");
      }
    } catch (err) {
      const errorMessage =
        (err as Error).message || "An unknown error occurred";
        setLoader(false)
      toast({
        title: "Login Failed",
        variant: "destructive",
        description: errorMessage, // Use the error message from the thrown error
      });
      console.log(err);
    }
  };

  return (
    <div className="z-30 mx-auto w-full max-w-md rounded-none border bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
      {loader && (
        <Spinner />
      )}
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Send OTP Code to your Email
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300"></p>

      <div className="mb-2 mt-8">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <p>{loginResponse?.data.email}</p>
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          onClick={() => sendOTPApi()}
        >
          Send OTP &rarr;
          <BottomGradient />
        </button>

        <div className="mt-5 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        <div className="mt-2 flex justify-center text-black hover:text-red-400">
          <Link href="signup">I don&apos;t have an account</Link>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
