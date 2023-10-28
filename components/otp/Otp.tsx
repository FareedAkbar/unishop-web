import { RefObject, useEffect, useRef, useState } from "react"
import * as Yup from "yup"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type InputRef = RefObject<HTMLInputElement>

const Otp = ({ otpCallback }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const [otp, setOtp] = useState(["", "", "", ""])
  const [ShowError, setShowError] = useState("")
  const inputRefs: InputRef[] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value

    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Move to the next input field if there is a value
      if (value && index < 3) {
        inputRefs[index + 1].current?.focus()
      }

      // Check if all fields are filled and hide the error message
      if (newOtp.every((digit) => digit !== "")) {
        setShowError("")
      }
    }
  }

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0) {
      const newOtp = [...otp]
      newOtp[index] = ""
      setOtp(newOtp)
      inputRefs[index - 1].current?.focus()
    }
  }
  useEffect(() => {
    setIsOpen(true)
  }, [])
  const handleVerify = () => {
    const otpString = otp.join("")

    // Check if all input fields are filled
    if (otpString.length === 4) {
      // Here, you can add your OTP validation logic.
      // For example, you can use Yup to validate the OTP.

      // Assuming you have a Yup schema for OTP validation, you can use it like this:
      const otpSchema = Yup.string()
        .matches(/^\d{4}$/, "Invalid OTP format")
        .required("OTP is required")

      otpSchema
        .validate(otpString)
        .then(() => {
          // OTP is valid
          setShowError("")
          const otpNumber = parseInt(otpString, 10)
          otpCallback(otpNumber)
          setIsOpen(false)
        })
        .catch((error) => {
          // OTP is invalid
          setShowError(error.message)
        })
    } else {
      // Not all fields are filled
      setShowError("Please fill in all OTP fields.")
    }
  }

  return (
    <div>
      <AlertDialog open={isOpen}>
        <AlertDialogTrigger></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <p className="font-bold text-[1.5rem] font-['Poppins']">
                OTP Verification
              </p>
            </AlertDialogTitle>
          </AlertDialogHeader>
          <p className="text-[0.9rem] font-['Poppins']">
            Enter the verification code we just sent to your Emial.
          </p>
          <div className="flex flex-col justify-center items-center">
            <div className="flex space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  className="w-12 h-12 text-center border border-gray-300 rounded"
                  value={digit}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                />
              ))}
            </div>
            <div className="text-[#ED1C29] text-[0.9rem] mt-2">{ShowError}</div>
            <div className="flex justify-center py-7 font-['Poppins']">
              <p className="text-[#80807F] text-[0.9rem]">
                Don’t receive code yet?{" "}
                <span
                  onClick={() => handleVerify()}
                  className="text-[#ED1C29] hover:underline cursor-pointer"
                >
                  Resend
                </span>
              </p>
            </div>
            <AlertDialogFooter>
              <button
                type="button"
                onClick={() => handleVerify()}
                className="w-[15rem] text-white h-10 font-['Poppins'] text-[1rem] bg-red-600 rounded-lg "
              >
                Verify
              </button>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Otp
