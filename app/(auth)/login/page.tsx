"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useFormik } from "formik"
import { ToastContainer, toast } from "react-toastify"
import * as Yup from "yup"

import "react-toastify/dist/ReactToastify.css"
import { Icons } from "@/components/icons"

const Login = () => {
  const router = useRouter()

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Please enter your email address."),
    user_password: Yup.string().required("Please enter your password."),
  })

  const [loginStatus, setLoginStatus] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const formik = useFormik({
    initialValues: {
      email: "",
      user_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://192.168.18.225:3001/api/v1/student/auth/login",
          values
        )
        console.log("auth/login", response)
        if (response.status === 200) {
          // console.log("auth/login success", response.data)
          // console.log("",response.data)
          // Now send the data to the verify-login-otp API
          const verifyOtpResponse = await axios.post(
            "http://192.168.18.225:3001/api/v2/student/auth/verify-login-otp",
            {
              customer_id: response.data.data.customer_id,
              otp: "5665",
              email: response.data.data.email,
              // Add any other data you need to send to the API
            }
          )
          if (verifyOtpResponse.status === 200) {
            setLoginStatus("success")
            console.log("verifyOtpResponse", verifyOtpResponse)
            console.log(
              "verifyOtpResponse message",
              verifyOtpResponse.data.status
            )
            if (verifyOtpResponse.data.status == false) {
              toast.error(verifyOtpResponse.data.message, {
                position: "top-right",
              })
            } else {
              toast.success(verifyOtpResponse.data.message, {
                position: "top-right",
              })
            }

            // Verification was successful
            if (verifyOtpResponse.data.token) {
              localStorage.setItem("token", verifyOtpResponse.data.token)
              setLoginStatus("success")

              router.push("/")
            }
            // You can do something with the response if needed
          } else {
            // Handle verification error
            setError(verifyOtpResponse.data.message)
            setLoginStatus("error")
          }
        } else {
          setError(response.data.message)
          setLoginStatus("error")
        }
      } catch (error) {
        setError("An error occurred while trying to login.")
        setLoginStatus("error")
      }
    },
  })

  return (
    <div className=" ">
      <div className="relative">
        <Icons.bgSighup className="h-screen max-md:hidden" />
      </div>
      <div className="flex absolute inset-0">
        <div className="w-1/2 max-md:hidden"></div>
        <div className="w-1/2 flex justify-center items-center  max-md:w-full   ">
          <div className="rounded-lg border max-sm:w-[18rem] border-neutral-200 p-5">
            <div className="text-neutral-900 max-sm:text-center  dark:text-white text-[1rem] font-semibold font-['Poppins'] leading-10">
              Customer Login
            </div>
            <div className="text-black py-5 text-opacity-60 text-[0.9rem] max-sm:text-sm max-sm:text-center font-normal font-['Poppins'] leading-normal">
              If you have an account, sign in with your email address.
            </div>
            <form onSubmit={formik.handleSubmit}>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full h-12 text-[0.9rem] rounded-lg border outline-none border-neutral-400 px-2"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-600 max-sm:text-sm mt-2">
                  {formik.errors.email}
                </div>
              )}
              <input
                type="user_password"
                placeholder="password"
                className="w-full h-12 text-[0.9rem] rounded-lg border outline-none mt-5 border-neutral-400 px-2"
                name="user_password"
                value={formik.values.user_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.user_password && formik.errors.user_password && (
                <div className="text-red-600 max-sm:text-sm mt-2">
                  {formik.errors.user_password}
                </div>
              )}
              {loginStatus === "error" && (
                <div className="text-red-600 max-sm:text-sm mt-2">{error}</div>
              )}
              <div className="flex justify-end">
                <div className="text-red-600 max-sm:text-sm text-[0.7rem] underline mt-2 cursor-pointer font-medium font-['Poppins'] capitalize">
                  Forgot password?
                </div>
              </div>
              <div className="flex justify-center pt-10">
                <button
                  type="submit"
                  className="w-full h-12 text-[1rem] font-semibold text-white bg-red-600 rounded-lg border flex justify-center font-['Poppins'] items-center"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="pt-16">
              <div className="flex justify-center items-center">
                <div className="w-36 h-px border border-stone-300 max-sm:hidden"></div>
                <div className="w-24 h-6 text-zinc-500 mx-5 text-base font-normal font-['Poppins'] capitalize">
                  sign in with
                </div>
                <div className="w-36 h-px border border-stone-300 max-sm:hidden"></div>
              </div>
            </div>
            <div className="flex justify-center gap-10 mt-10">
              <Icons.fbIcon className="w-10 h-10 cursor-pointer" />
              <Icons.instagramIcon className="w-10 h-10 cursor-pointer" />
              <Icons.tweeterIcon className="w-10 h-10 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

export default Login
