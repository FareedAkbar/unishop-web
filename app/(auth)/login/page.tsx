"use client"

import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"

import { Icons } from "@/components/icons"

const Login = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Please enter your email address."),
    password: Yup.string().required("Please enter your password."),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Your login logic can be placed here
      // For simplicity, we'll just show a success message.
      alert("Login successful!")
    },
  })

  return (
    <div className="flex h-screen">
      <div className="w-1/2 max-md:hidden max-lg:w-1/3">
        <Icons.withoutBg className="h-screen" />
      </div>
      <div className="w-1/2 flex justify-center items-center max-md:w-full   ">
        <div className="rounded-lg border max-sm:w-[18rem] border-neutral-200 p-5">
          <div className="text-neutral-900 max-sm:text-center  dark:text-white text-3xl font-semibold font-['Poppins'] leading-10">
            Customer Login
          </div>
          <div className="text-black py-5 text-opacity-60 text-lg max-sm:text-sm max-sm:text-center font-normal font-['Poppins'] leading-normal">
            If you have an account, sign in with your email address.
          </div>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full h-12 rounded-lg border outline-none border-neutral-400 px-2"
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
              type="password"
              placeholder="Password"
              className="w-full h-12 rounded-lg border outline-none mt-5 border-neutral-400 px-2"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 max-sm:text-sm mt-2">
                {formik.errors.password}
              </div>
            )}
            <div className="flex justify-end">
              <div className="text-red-600 max-sm:text-sm text-sm underline mt-2 cursor-pointer font-medium font-['Poppins'] capitalize">
                Forgot Password?
              </div>
            </div>
            <div className="flex justify-center pt-10">
              <button
                type="submit"
                className="w-full h-12 text-[1rem] font-semibold text-white bg-red-600 rounded-lg border flex justify-center items-center"
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
  )
}

export default Login
