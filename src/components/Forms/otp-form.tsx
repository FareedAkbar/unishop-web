import React, { useState } from "react";
import Button from "../ui-components/Button";
import type { LoginResponse } from "~/types/loginResponse";
import { useAuthContext } from "~/Context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "~/hooks/use-toast";


interface Props {

  loginResponse?: LoginResponse | null
}

const OTPVerificationForm = ({ loginResponse }: Props) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [loader, setLoader] = useState(false);
  const { verifyOTP, sendOTP } = useAuthContext();
  const router = useRouter();

  // Handle OTP input change
  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move to the next input if the user enters a number
    if (value.length === 1 && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleVerify = async () => {
    // Your verification logic here
    console.log("Verifying OTP:", otp.join(""));
    console.log(otp)
    if (otp && otp.join("").length == 4) {
      try {
        const x = {
          customer_id: loginResponse?.data.customer_id, email: loginResponse?.data.email, otp: parseInt(otp.join(""))
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

      }
    } else {
      toast({
        title: "Invalid OTP",
        variant: "destructive",
        description: "Please enter 4 digit OTP", // Use the error message from the thrown error
      });
    }



  };

  const ResentOtp = async () => {
    try {
      setLoader(true);

      const response = await sendOTP({
        customer_id: loginResponse?.data.customer_id,
        email: loginResponse?.data.email,
      });
      // Type guard to ensure res is LoginResponse
      if (typeof response !== "boolean" && response.status) {
        toast({
          title: "OTP Resend",
          variant: "default",
        });
      }

      setLoader(false);

    } catch (err) {
      const errorMessage =
        (err as Error).message || "An unknown error occurred";
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
      <div className="bg-white p-8 border rounded-2xl  max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-4">OTP Verification</h2>
        <p className="text-center mb-6 text-gray-600">
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
              className="w-12 h-12 text-center text-2xl font-semibold border-2 border-red-400 rounded-md focus:border-red-500 focus:outline-none"
              onChange={(e) => handleChange(e.target.value, index)}
              autoComplete="one-time-code" // This enables auto-filling OTP on supported devices
            />
          ))}
        </div>

        {/* Resend Link */}
        <div className="text-center mb-4">
          <p className="text-gray-600">
            {`Don't Receive Code Yet?`}{" "}
            <a href="#" onClick={async () => {
              await (!loader ? ResentOtp() :
                '')
            }} className="text-red-500 underline">
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
