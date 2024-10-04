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

interface checkoutBooknet {
  push?: boolean;
  handleData?: (data: CheckoutForm) => void;
  goTo: string;
  title?: string;
}
type CehckoutFormValues = z.infer<typeof booknetFormSchema>;

export default function BooknetForm({
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
    <div className="mx-auto w-full rounded-none border bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
      {loader && <Spinner />}
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        {title}
      </h2>

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

        {/* <div className="mb-4">
          <p className="mb-2 font-serif font-bold">Shipping Method</p>
          <div className="flex flex-col">
            <DynamicInput
              name="shippingMethod"
              options={shippingOptions}
              control={control}
              error={errors.shippingMethod?.message}
            />
          </div>
        </div> */}
        <Button
          title="Checkout &rarr;"
          type="submit"
          width="w-full"
          onClick={() => {
            //
          }}
        />
      </form>
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
