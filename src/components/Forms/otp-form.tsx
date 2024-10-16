/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from "react";
import Button from "../ui-components/Button";
import type { LoginResponse } from "~/types/loginResponse";
import { useAuthContext } from "~/Context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "~/hooks/use-toast";

interface Props {
  loginResponse?: LoginResponse | null;
}

const OTPVerificationForm = ({ loginResponse }: Props) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [loader, setLoader] = useState(false);
  const { verifyOTP, sendOTP } = useAuthContext();
  const router = useRouter();

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if a value is entered
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput && (nextInput as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to the previous input if Backspace is pressed and the current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput && (prevInput as HTMLInputElement).focus();
    }
  };

  const handleVerify = async () => {
    console.log("Verifying OTP:", otp.join(""));
    if (otp.join("").length === 4) {
      try {
        const data = {
          customer_id: loginResponse?.data.customer_id,
          email: loginResponse?.data.email,
          otp: otp.join(""),
        };
        setLoader(true);
        const res = await verifyOTP(data);
        setLoader(false);

        if (typeof res !== "boolean" && res.status) {
          router.push("/");
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
    } else {
      toast({
        title: "Invalid OTP",
        variant: "destructive",
        description: "Please enter a 4-digit OTP",
      });
    }
  };

  const ResendOtp = async () => {
    try {
      setLoader(true);
      const response = await sendOTP({
        customer_id: loginResponse?.data.customer_id,
        email: loginResponse?.data.email,
      });

      if (typeof response !== "boolean" && response.status) {
        toast({
          title: "OTP Resent",
          variant: "default",
        });
      }
      setLoader(false);
    } catch (err) {
      const errorMessage = (err as Error).message || "An unknown error occurred";
      setLoader(false);
      toast({
        title: "OTP Resend Failed",
        variant: "destructive",
        description: errorMessage,
      });
    }
  };

  return (
    <div className="flex items-center justify-center pt-20 lg:pt-0 lg:h-screen bg-transparent">
      <div className="bg-white dark:bg-slate-800 p-8 border rounded-2xl max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-4">OTP Verification</h2>
        <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
          Enter the verification code we just sent to your email {loginResponse?.data.email}.
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-between mb-6">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              value={value}
              maxLength={1}
              className="w-12 h-12 text-center text-2xl dark:bg-slate-700 font-semibold border-2 border-red-400 rounded-md focus:border-red-500 focus:outline-none"
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              autoComplete="one-time-code"
            />
          ))}
        </div>

        {/* Resend Link */}
        <div className="text-center mb-4">
          <p className="text-gray-600 dark:text-gray-300">
            Don&apos;t Receive Code Yet?{" "}
            <a
              href="#"
              onClick={async () => !loader && (await ResendOtp())}
              className="text-red-500 underline"
            >
              Resend
            </a>
          </p>
        </div>

        {/* Verify Button */}
        <Button
          title="Verify"
          onClick={handleVerify}
          className="w-full h-12"
          loading={loader}
        />
      </div>
    </div>
  );
};

export default OTPVerificationForm;
