import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form"; // Use import type
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "~/lib/utils";
import Link from "next/link";
import {  verifyOtpSchema } from './schema';
import { useAuthContext } from "~/Context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "~/hooks/use-toast";
import { LoginResponse } from "~/types/loginResponse";
import Spinner from "../spinner";

// Define the type of form inputs
type FormValues = z.infer<typeof verifyOtpSchema>;
interface LoginFormProps {
  
 
  loginResponse?: LoginResponse | null
}

export default function VerifyOTPForm({loginResponse} :LoginFormProps) {
  const {  verifyOTP } = useAuthContext();
  const [loader,setLoader] = useState(false)
  const router = useRouter();
  const { toast } = useToast();

  // Set up React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(verifyOtpSchema)
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const x = {
        customer_id: loginResponse?.data.customer_id, email: loginResponse?.data.email, otp: parseInt(data.otp)
      }
      setLoader(true)
      const res = await verifyOTP(x);
      setLoader(false)
  
      // Type guard to ensure res is LoginResponse
      if (typeof res !== "boolean" && res.status) {
        console.log(res)
        router.push('/')
      }
    } catch (err) {
      const errorMessage = (err as Error).message || "An unknown error occurred";
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
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 border shadow-input bg-white dark:bg-black z-30">
      {loader && (
        <Spinner />
      )}
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
      Please Verify your OTP Code
      </h2>
    

      <form className="mt-8 mb-2" onSubmit={handleSubmit(onSubmit)}>
        
      <LabelInputContainer className="mb-4">
      <Label htmlFor="email">Email Address</Label>
          <p>{loginResponse?.data.email}</p>
        
        </LabelInputContainer>
          <LabelInputContainer className="mb-4">
          <Label htmlFor="email">OTP</Label>
          <Input
            id="otp"
            placeholder="Please enter OTP"
            type="string"
            {...register("otp")}
          />
          {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type={"submit"}
        >
          Verify OTP &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-5 h-[1px] w-full" />
        <div className="flex justify-center text-black mt-2 hover:text-red-400">
          <Link href="signup">I don&apos;t have an account</Link>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
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
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
