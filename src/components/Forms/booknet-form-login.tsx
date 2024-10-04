"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form"; // Use import type
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "~/lib/utils";
import { booknetFormSchema } from "./schema";

import { useAuthContext } from "~/Context/AuthContext";
import { useRouter } from "next/navigation";
import type { CheckoutForm } from "~/types/checkoutForm";
import Spinner from "../spinner";
import Button from "../ui-components/Button";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";

interface checkoutBooknet {
  push?: boolean;
  handleData?: (data: CheckoutForm) => void;
  goTo: string;
  title?: string;
}
type CehckoutFormValues = z.infer<typeof booknetFormSchema>;

export default function BooknetFormLogin({
  push,
  handleData,
  goTo,
  title = "Checkout",
}: checkoutBooknet) {
  const { CheckoutApiWithUserName } = useAuthContext();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CehckoutFormValues>({
    resolver: zodResolver(booknetFormSchema),
  });

  const onSubmit: SubmitHandler<CehckoutFormValues> = async (data) => {
    setLoader(true);
    try {
      await CheckoutApiWithUserName(data)
        .then((res) => {
          if (res.status) {
            if (push) {
              router.push(goTo);
            }
            if (!push && handleData) {
              handleData(res?.data);
            }
          }
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
          console.log(err);
        });
    } catch (error) {
      setLoader(false);
      console.error("Failed to checkout:", error);
    }

    // Handle form submission here
  };

  return (
    <div className="mx-auto rounded-xl border bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8 lg:w-full">
      {loader && <Spinner />}
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        {title}
      </h2>
      <p className="pt-2 text-sm text-gray-500">
        If you have an account, sign in with your username and password.
      </p>
      <form className="mb-4 mt-8" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="address">Username</Label>
          <Input
            id="Username"
            placeholder="Enter username"
            type="text"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="address">Password</Label>
          <Input
            id="Password"
            placeholder="******"
            type="text"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </LabelInputContainer>

        <div className="mx-auto flex flex-col justify-center">
          <Button
            title="Login"
            onClick={() => {
              //
            }}
            width="w-full"
            type="submit"
          />
          <div className="mt-2 flex flex-col items-center justify-center text-black sm:flex-row">
            <p>I don't have an account, </p>
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
