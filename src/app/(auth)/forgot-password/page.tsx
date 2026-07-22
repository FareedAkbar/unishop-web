"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import Button from "~/components/ui-components/Button";
import { useAuthContext } from "~/Context/AuthContext";
import { useToast } from "~/hooks/use-toast";
import OTPVerificationForm from "~/components/Forms/otp-form";
import Spinner from "~/components/spinner";
import Link from "next/link";
import { cn } from "~/lib/utils";

// Schema for Email Step
const EmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});
type EmailFormValues = z.infer<typeof EmailSchema>;

// Schema for Password Step
const PasswordSchema = z
  .object({
    password: z.string().min(5, "Password must be at least 5 characters long"),
    confirm_password: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
type PasswordFormValues = z.infer<typeof PasswordSchema>;

const ForgotPasswordComponent = () => {
  const [view, setView] = useState<"email" | "verify-otp" | "new-password">("email");
  const [email, setEmail] = useState("");
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [token, setToken] = useState("");
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const { resetPasswordOTP, updatePassword } = useAuthContext();

  // Email form setup
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(EmailSchema),
  });

  // Password form setup
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    watch: watchPasswordFields,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(PasswordSchema),
  });

  const onEmailSubmit = async (data: EmailFormValues) => {
    try {
      setLoader(true);
      const res = await resetPasswordOTP(data.email);
      setLoader(false);

      if (res.status) {
        toast({
          title: "OTP Sent",
          variant: "success",
          description: res.message || "An OTP has been sent to your email address.",
        });
        setEmail(data.email);
        setCustomerId(res.customer_id ?? null);
        setView("verify-otp");
      }
    } catch (error) {
      setLoader(false);
      const errorMessage = (error as Error).message || "Forgot Password request failed.";
      toast({
        title: "Request Failed",
        variant: "destructive",
        description: errorMessage,
      });
    }
  };

  const onOtpVerified = (res: unknown) => {
    // Extract token from response (could be in res.token or res.data.token)
    const typedRes = res as { token?: string; data?: { token?: string } };
    const extractedToken = typedRes?.token ?? typedRes?.data?.token;
    if (extractedToken) {
      setToken(extractedToken);
      setView("new-password");
      toast({
        title: "OTP Verified",
        description: "Please enter your new password below.",
      });
    } else {
      toast({
        title: "Verification Error",
        variant: "destructive",
        description: "Failed to retrieve verification token. Please try again.",
      });
    }
  };

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    try {
      setLoader(true);
      console.log("token", token);

      const res = await updatePassword({
        email,
        token,
        password: data.password,
        user_password: data.password,
      });
      setLoader(false);

      if (res.status) {
        toast({
          title: "Password Updated",
          description: res.message || "Your password has been reset successfully.",
        });
        router.push("/login");
      }
    } catch (error) {
      setLoader(false);
      const errorMessage = (error as Error).message || "Failed to update password.";
      toast({
        title: "Update Failed",
        variant: "destructive",
        description: errorMessage,
      });
    }
  };

  // Password strength logic
  const passwordValue = watchPasswordFields("password") || "";
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: "", color: "text-gray-400" };
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

  return (
    <div className="relative flex h-screen flex-col items-center justify-center">
      {/* Background Image Setup matching Login */}
      <div className="absolute inset-0 hidden bg-cover bg-center lg:block">
        <Image
          src="/assets/images/auth-bg.png"
          alt="background image"
          width={1000}
          height={1000}
          objectFit="cover"
          className="relative h-full w-full dark:hidden"
        />
        <Image
          src="/assets/images/home/home1.png"
          alt="background image flipped"
          width={1000}
          height={1000}
          objectFit="cover"
          className="relative hidden h-full w-full dark:block"
          style={{ transform: "scaleX(-1)" }}
        />
      </div>

      <main className="absolute z-10 mx-4 lg:right-10 lg:top-0 lg:mx-0 lg:w-1/3">
        <div className="relative">
          <button
            onClick={() => {
              if (view === "verify-otp") {
                setView("email");
              } else if (view === "new-password") {
                setView("verify-otp");
              } else {
                router.push("/login");
              }
            }}
            className="fixed left-5 top-5 rounded-full bg-transparent p-2 transition hover:bg-gray-200 dark:hover:bg-slate-700 lg:left-10 lg:top-10"
            aria-label="Back"
          >
            <FaArrowLeft className="text-black dark:text-white" />
          </button>
        </div>

        {/* STEP 1: ENTER EMAIL */}
        {view === "email" && (
          <div className="flex items-center justify-center bg-transparent pt-20 lg:h-screen lg:pt-0">
            <div className="z-30 mx-auto w-full max-w-md rounded-xl border bg-white p-4 shadow-input dark:bg-slate-800 md:rounded-2xl md:p-8">
              <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                Reset Password
              </h2>
              <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                Enter your registered email address to receive an OTP verification code.
              </p>

              <form className="mb-2 mt-8" onSubmit={handleEmailSubmit(onEmailSubmit)}>
                <div className="flex flex-col space-y-2 mb-4 w-full">
                  <Label required htmlFor="email">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    placeholder="projectmayhem@fc.com"
                    type="email"
                    autoComplete="email"
                    {...registerEmail("email")}
                  />
                  {emailErrors.email && (
                    <p className="text-sm text-red-500">{emailErrors.email.message}</p>
                  )}
                </div>

                <div className="mx-auto flex max-w-sm flex-col justify-center pt-2">
                  <Button
                    title="Send OTP"
                    type="submit"
                    width="w-full"
                    loading={loader}
                  />
                  <div className="mt-4 flex justify-center text-sm">
                    <Link href="/login" className="text-red-500 hover:underline">
                      Back to Login
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* STEP 2: VERIFY OTP */}
        {view === "verify-otp" && customerId !== null && (
          <div className="w-full">
            <OTPVerificationForm
              loginResponse={{
                status: true,
                message: "",
                data: {
                  customer_id: customerId,
                  email: email,
                },
              }}
              isSignup={true}
              onSuccess={onOtpVerified}
            />
          </div>
        )}

        {/* STEP 3: NEW PASSWORD */}
        {view === "new-password" && (
          <div className="flex items-center justify-center bg-transparent pt-20 lg:h-screen lg:pt-0">
            <div className="z-30 mx-auto w-full max-w-md rounded-xl border bg-white p-4 shadow-input dark:bg-slate-800 md:rounded-2xl md:p-8">
              <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                Choose New Password
              </h2>
              <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                Please type your new account password below.
              </p>

              <form className="mb-2 mt-8" onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
                <div className="flex flex-col space-y-2 mb-4 w-full relative">
                  <Label required htmlFor="password">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      {...registerPassword("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 focus:outline-none"
                    >
                      {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                  {passwordValue && (
                    <span className={cn("text-xs font-semibold self-start", passwordStrength.color)}>
                      Strength: {passwordStrength.label}
                    </span>
                  )}
                  {passwordErrors.password && (
                    <p className="text-sm text-red-500">{passwordErrors.password.message}</p>
                  )}
                </div>

                <div className="flex flex-col space-y-2 mb-6 w-full">
                  <Label required htmlFor="confirm_password">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm_password"
                    placeholder="••••••••"
                    type="password"
                    autoComplete="new-password"
                    {...registerPassword("confirm_password")}
                  />
                  {passwordErrors.confirm_password && (
                    <p className="text-sm text-red-500">{passwordErrors.confirm_password.message}</p>
                  )}
                </div>

                <div className="mx-auto flex max-w-sm flex-col justify-center">
                  <Button
                    title="Update Password"
                    type="submit"
                    width="w-full"
                    loading={loader}
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const ForgotPasswordPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ForgotPasswordComponent />
    </Suspense>
  );
};

export default ForgotPasswordPage;
