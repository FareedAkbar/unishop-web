import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form"; // Use import type
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { LoginSchema } from "./schema";
import { useAuthContext } from "~/Context/AuthContext";
import { useToast } from "~/hooks/use-toast";
import { type LoginResponse } from "~/types/loginResponse";
// import Spinner from "../spinner";
import Button from "../ui-components/Button";

type FormValues = z.infer<typeof LoginSchema>;
interface LoginFormProps {
  setView: (payload: string) => void;
  setLoginResponse: (payload: LoginResponse) => void;
}

export default function SignupFormDemo({
  setView,
  setLoginResponse,
}: LoginFormProps) {
  const { login } = useAuthContext();
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
      setLoader(false);
      console.log(res);
      if (typeof res !== "boolean" && res.status) {
        setLoginResponse(res);
        setView("Send-Otp");
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
    <div className="z-30 mx-auto w-full max-w-md rounded-none border bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
      {/* {loader && <Spinner />} */}
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Unishop
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to Unishop if you can because we don&apos;t have a login flow yet
      </p>

      <form className="mb-2 mt-8" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label required htmlFor="email">Email Address</Label>
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
          <Label required htmlFor="password">Password</Label>
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

        <Button
          title="Login"
          onClick={() => {
            //
          }}
          loading={loader}
          width="w-full"
          type="submit"
        />

        <div className="mt-5 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        <div className="mt-2 flex justify-center text-black hover:text-red-400">
          <Link href="signup">I don&apos;t have an account</Link>
        </div>
      </form>
    </div>
  );
}

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
