import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form"; // Use import type
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { LoginSchema } from "./schema";
import { useAuthContext } from "~/Context/AuthContext";
import { useToast } from "~/hooks/use-toast";
import { LoginResponse } from "~/types/loginResponse";
import Spinner from "../spinner";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Button from "../ui-components/Button";

// Define the type of form inputs
type FormValues = z.infer<typeof LoginSchema>;
interface LoginFormProps {
  setView: (payload: string) => void;

  setLoginResponse: (payload: LoginResponse) => void;
}

export default function SignupFormDemo({
  setView,
  setLoginResponse,

}: LoginFormProps) {
  const { login, sendOTP } = useAuthContext();
  const [loader, setLoader] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoader(true);
      const res = await login(data);


      if (typeof res !== "boolean" && res.status) {
        const response = await sendOTP({
          customer_id: res?.data.customer_id,
          email: res?.data.email,
        });
        if (typeof response !== "boolean" && response.status) {
          console.log(res);
          setView("Verify-Otp");
        }
        setLoginResponse(res);
        setLoader(false);
      }
    } catch (err) {
      const errorMessage =
        (err as Error).message || "An unknown error occurred";
      setLoader(false);
      toast({
        title: "Login Failed",
        variant: "destructive",
        description: errorMessage,
      });
    }
  };

  return (
    <div className="z-30 mx-auto w-full max-w-md rounded-xl border bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
      {/* {loader && <Spinner />} */}
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Login as a Pulse Member
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to Unishop with your Email and Password
      </p>

      <form className="mb-2 mt-8" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            {...register("user_password")}
          />
          {errors.user_password && (
            <p className="text-sm text-red-500">
              {errors.user_password.message}
            </p>
          )}
        </LabelInputContainer>

        <div className="mx-auto flex max-w-sm flex-col justify-center">
          <Button
            title="Login"
            onClick={() => {
              //
            }}

            width="w-full"
            type="submit"
            loading={loader}
          />
          <div className="mt-2 flex flex-col items-center justify-center text-black sm:flex-row">
            <p>{`I don't have an account, `}</p>
            <Link href="signup" className="ml-1 underline hover:text-red-500">
              signup
            </Link>
          </div>
        </div>
        {/* <div className="mt-6 flex flex-col items-center">
          <div className="mb-2 text-gray-500">Sign In With</div>
          <div className="flex space-x-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 transition hover:bg-blue-600">
              <FaTwitter className="text-white" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 transition hover:from-pink-600 hover:to-yellow-600">
              <FaInstagram className="text-white" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800 transition hover:bg-blue-900">
              <FaFacebook className="text-white" />
            </button>
          </div>
        </div> */}
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
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
