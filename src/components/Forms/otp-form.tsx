import React, { useState } from "react";
import Button from "../ui-components/Button";


interface Props {
  email?: string
}

const OTPVerificationForm = ({email}: Props) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);

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

  const handleVerify = () => {
    // Your verification logic here
    console.log("Verifying OTP:", otp.join(""));
  };

  return (
    <div className="flex items-center justify-center pt-20 lg:pt-0 lg:h-screen bg-transparent">
      <div className="bg-white p-8 border rounded-2xl  max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-4">OTP Verification</h2>
        <p className="text-center mb-6 text-gray-600">
          Enter the verification code we just sent to your email {email}.
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
            Don't Receive Code Yet?{" "}
            <a href="#" className="text-red-500 underline">
              Resend
            </a>
          </p>
        </div>

        {/* Verify Button */}
        <Button
          title="Verify"
          onClick={handleVerify}
          className="w-full h-12"
        />
      </div>
    </div>
  );
};

export default OTPVerificationForm;
