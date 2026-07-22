"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "~/lib/utils";
import { ActualSignupSchema } from "./schema";
import { Countries_States } from "../constants/countries_states";
import Button from "../ui-components/Button";
import Link from "next/link";
import {
  Select as RadixSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { useAuthContext } from "~/Context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "~/hooks/use-toast";
import OTPVerificationForm from "./otp-form";
import type { LoginResponse } from "~/types/loginResponse";
import Spinner from "../spinner";

type SignupFormValues = z.infer<typeof ActualSignupSchema>;

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

export default function SignupFormDemo() {
  const [showPassword, setShowPassword] = useState(false);
  const [showAssistanceTooltip, setShowAssistanceTooltip] = useState(false);
  const [isOtpView, setIsOtpView] = useState(false);
  const [signupResponse, setSignupResponse] = useState<LoginResponse | null>(null);
  const [loader, setLoader] = useState(false);

  const { CheckoutApi, checkEmail } = useAuthContext();
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(ActualSignupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      remote_assistance: false,
      country: "Australia",
      phone_number: "",
      email: "",
      password: "",
      confirm_password: "",
      // captcha_verified: false,
    },
  });

  const countryValue = watch("country");
  const passwordValue = watch("password") || "";
  // const captchaVerifiedValue = watch("captcha_verified");

  // Determine phone code based on selected country
  const selectedCountryObj = Countries_States.find((c) => c.name === countryValue);
  const phoneCode = selectedCountryObj?.phone_code ?? "61";

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: "No Password", color: "text-gray-400" };
    if (pass.length < 5) return { label: "Too Short", color: "text-red-500" };

    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { label: "Weak", color: "text-orange-500" };
    if (score === 2) return { label: "Medium", color: "text-yellow-500" };
    return { label: "Strong", color: "text-green-500" };
  };

  const passwordStrength = getPasswordStrength(passwordValue);

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    try {
      setLoader(true);

      // 1. Check if email already exists
      const checkEmailRes = await checkEmail(data.email);


      if (!checkEmailRes.status) {
        throw new Error(checkEmailRes.message || "Email already exists.");
      }

      // 2. If check-email succeeds, proceed to sign up
      const payload = {
        first_name: data.first_name,
        last_name: data.last_name,
        remote_assistance: data.remote_assistance,
        country: data.country,
        phone_number: data.phone_number,
        country_code: `+${phoneCode}`,
        email: data.email,
        password: data.password,
        customer_type_id: 6,
        web_signup: true,
        account_type: "Cash Customer",
      };

      const res = await CheckoutApi(payload);
      setLoader(false);

      if (res.status) {
        toast({
          title: "Account Created Successfully",
          description: "An OTP verification code has been sent to your email.",
        });

        setSignupResponse({
          status: true,
          message: "Signup successful",
          data: {
            customer_id: res.data.customer_id ?? res.data.booknet_customer_id ?? undefined,
            email: res.data.email ?? undefined,
          },
        });
        setIsOtpView(true);
      }
    } catch (error) {
      setLoader(false);
      const errorMessage = (error as Error).message || "Failed to create account. Please try again.";
      toast({
        title: "Signup Failed",
        variant: "destructive",
        description: errorMessage,
      });
      console.error("Signup failed:", error);
    }
  };

  if (isOtpView && signupResponse) {
    return (
      <OTPVerificationForm
        loginResponse={signupResponse}
        isSignup={true}
        onSuccess={() => {
          router.push("/login");
        }}
      />
    );
  }

  return (
    <div className="z-30 mx-auto w-full max-w-2xl rounded-none border border-gray-200 dark:border-slate-800 bg-white p-6 shadow-md dark:bg-slate-900 md:rounded-2xl md:p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* PERSONAL INFORMATION SECTION */}
        <div className="space-y-3">
          <div className="border-b border-gray-200 dark:border-slate-700 pb-3">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 text-center md:text-left">
              Personal Information
            </h3>
          </div>
          <div className="sm:grid-cols-2 gap-2 grid grid-cols-1">

            <LabelInputContainer>
              <Label required htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                placeholder="Jane"
                type="text"
                {...register("first_name")}
              />
              {errors.first_name && (
                <p className="text-xs text-red-500">{errors.first_name.message}</p>
              )}
            </LabelInputContainer>

            <LabelInputContainer>
              <Label required htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                placeholder="Doe"
                type="text"
                {...register("last_name")}
              />
              {errors.last_name && (
                <p className="text-xs text-red-500">{errors.last_name.message}</p>
              )}
            </LabelInputContainer>
            {/* Country Selection */}
            <LabelInputContainer>
              <Label required htmlFor="country">Country</Label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <RadixSelect
                    value={field.value}
                    onValueChange={(val) => {
                      field.onChange(val);
                    }}
                  >
                    <SelectTrigger className="w-full h-10 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md text-sm capitalize px-3">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {Countries_States.map((country) => (
                        <SelectItem key={country.name} value={country.name}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </RadixSelect>
                )}
              />
              {errors.country && (
                <p className="text-xs text-red-500">{errors.country.message}</p>
              )}
            </LabelInputContainer>

            {/* Phone Number Field with Dynamic Prefix */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="phone_number" required>
                Phone Number
              </Label>
              <div className="relative">
                {/* Plus symbol */}

                <Input
                  id={
                    "phone_number" +
                    phoneCode
                  }
                  placeholder=""
                  type="text"
                  // value={getFieldValues(getValues("phone_number"))}
                  {...register("phone_number")}
                  className="pl-16" // increased padding for space
                />

                {errors.phone_number && (
                  <p className="text-sm text-red-500">
                    {errors.phone_number.message}
                  </p>
                )}
              </div>
            </LabelInputContainer>
          </div>


          {/* Remote shopping assistance checkbox */}
          <div className="relative flex items-center gap-2 ">
            <input
              id="remote_assistance"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-red-600 accent-red-500 focus:ring-red-500 dark:border-slate-700 dark:bg-slate-800 cursor-pointer"
              {...register("remote_assistance")}
            />
            <label
              htmlFor="remote_assistance"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
            >
              Allow remote shopping assistance
            </label>
            <div className="relative flex items-center">
              <button
                type="button"
                title={"This allows merchants to \"see what you see\" and take actions on your behalf in order to provide better assistance."}

                className="flex items-center justify-center h-4 w-4 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-xs font-bold text-gray-600 dark:text-gray-300 select-none cursor-pointer"
                onMouseEnter={() => setShowAssistanceTooltip(true)}
                onMouseLeave={() => setShowAssistanceTooltip(false)}
                onClick={() => setShowAssistanceTooltip(!showAssistanceTooltip)}
                aria-label="Remote shopping assistance info"
              >
                ?
              </button>
              {/* <div className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-64 bg-slate-800 text-white text-xs rounded-md p-3 shadow-lg border border-slate-700 leading-normal pointer-events-none">
                {"This allows merchants to \"see what you see\" and take actions on your behalf in order to provide better assistance."}
              </div> */}
            </div>
          </div>
        </div>

        {/* SIGN-IN INFORMATION SECTION */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 dark:border-slate-700 pb-3">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 text-center md:text-left">
              Sign-in Information
            </h3>
          </div>

          <LabelInputContainer>
            <Label required htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@domain.com"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </LabelInputContainer>
          <div className="sm:grid-cols-2 grid grid-cols-1 gap-2">

            <LabelInputContainer>
              <Label required htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <div className="flex justify-between items-center mt-1 text-xs">
                <span className="text-gray-500 dark:text-gray-400">
                  Password Strength:{" "}
                  <span className={cn("font-bold", passwordStrength.color)}>
                    {passwordStrength.label}
                  </span>
                </span>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
            </LabelInputContainer>

            <LabelInputContainer>
              <Label required htmlFor="confirm_password">Confirm Password</Label>
              <Input
                id="confirm_password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                {...register("confirm_password")}
              />
              {errors.confirm_password && (
                <p className="text-xs text-red-500">{errors.confirm_password.message}</p>
              )}
            </LabelInputContainer>
          </div>

        </div>

        {/* RECAPTCHA WIDGET MOCKUP */}
        {/* <div className="pt-2 flex flex-col items-center md:items-start">
          <input type="hidden" {...register("captcha_verified")} />
          <div className="flex items-center justify-between border border-gray-300 dark:border-slate-700 rounded bg-gray-50 dark:bg-slate-800 p-3 w-[302px] h-[76px] shadow-sm select-none">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={async () => {
                  setValue("captcha_verified", !captchaVerifiedValue);
                  await trigger("captcha_verified");
                }}
                className={cn(
                  "h-6 w-6 rounded border border-gray-400 dark:border-slate-500 flex items-center justify-center focus:outline-none transition-all",
                  captchaVerifiedValue ? "bg-green-500 border-green-500" : "bg-white dark:bg-slate-700"
                )}
                aria-label="Verify Captcha"
              >
                {captchaVerifiedValue && (
                  <svg
                    className="h-4 w-4 text-white animate-[bounce_0.2s_ease-in-out_1]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="3.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {"I'm not a robot"}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
              <span className="text-[9px] text-gray-400 mt-0.5">reCAPTCHA</span>
              <span className="text-[7px] text-gray-400 font-mono">Privacy - Terms</span>
            </div>
          </div>
          {errors.captcha_verified && (
            <p className="text-xs text-red-500 mt-1">{errors.captcha_verified.message}</p>
          )}
        </div> */}

        {/* SUBMIT BUTTON */}
        <div className="pt-4">
          <Button
            title="Create an Account"
            width="w-full"
            type="submit"
            className="py-3 text-base"
          />
        </div>

        {/* LOGIN REDIRECT LINK */}
        <div className="flex justify-center text-sm text-gray-700 dark:text-gray-300 mt-4">
          <span>Already have an account? </span>
          <Link href="login" className="ml-1 underline font-medium text-red-500 hover:text-red-600 transition-colors">
            Login
          </Link>
        </div>

      </form>
    </div>
  );
}
