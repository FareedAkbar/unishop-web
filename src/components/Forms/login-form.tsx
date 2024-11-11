import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form"; // Use import type
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { LoginSchema } from './schema';
import { useAuthContext } from "~/Context/AuthContext";
import { useToast } from "~/hooks/use-toast";
import { LoginResponse } from "~/types/loginResponse";
import Spinner from "../spinner";
import Button from "../ui-components/Button";

// Define the type of form inputs
type FormValues = z.infer<typeof LoginSchema>;
interface LoginFormProps {
  setView: (payload: string) => void;
  setLoginResponse: (payload: LoginResponse) => void;
}

export default function SignupFormDemo({ setView, setLoginResponse }: LoginFormProps) {
  const { login } = useAuthContext();
  const [loader, setLoader] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoader(true);
      const res = await login(data);
      setLoader(false);
      console.log(res)
      if (typeof res !== "boolean" && res.status) {
        setLoginResponse(res);
        setView("Send-Otp");
      }
    } catch (err) {
      const errorMessage = (err as Error).message || "An unknown error occurred";
      setLoader(false);
      toast({
        title: "Login Failed",
        variant: "destructive",
        description: errorMessage,
      });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 border shadow-input bg-white dark:bg-black z-30">
      {/* {loader && <Spinner />} */}
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Unishop
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to Unishop if you can because we don&apos;t have a login flow yet
      </p>

      <form className="mt-8 mb-2" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            {...register("user_password")}
          />
          {errors.user_password && <p className="text-red-500 text-sm">{errors.user_password.message}</p>}
        </LabelInputContainer>

        <Button
          title="Login"
          onClick={() => {
            //
          }}
          loading={loader}
          width="w-full"
          type="submit"
        />
         
        
       
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
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
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
