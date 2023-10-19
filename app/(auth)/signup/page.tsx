"use client"

import React from "react"
import Link from "next/link"
import { useFormik } from "formik"
import * as Yup from "yup"

import { Icons } from "@/components/icons"

const Signup = () => {
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    agreeToTerms: Yup.boolean().oneOf(
      [true],
      "You must agree to the terms and conditions"
    ),
  })

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false, // Initialize to false, user must check the checkbox
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.agreeToTerms) {
        // Handle form submission if terms are agreed
        console.log("Form values:", values)
      } else {
        // Display an error message or take appropriate action if terms are not agreed
        console.error("You must agree to the terms and conditions.")
      }
    },
  })

  return (
    <div className="flex">
      <div className="w-1/2 max-md:hidden max-lg:w-1/3">
        <Icons.withoutBg className="h-screen" />
      </div>
      <div className="w-1/2 flex justify-center items-center max-md:w-full">
        <div className="rounded-lg border border-neutral-200 p-5">
          <div className="  text-neutral-900 dark:text-white text-4xl font-semibold font-['Poppins']">
            Sign up now
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex max-sm:flex-col gap-8 mt-10">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full h-12 rounded-lg border outline-none border-[#9D9D9D] px-2"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-red-500 text-sm font-normal font-['Poppins']">
                    {formik.errors.firstName}
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full h-12 rounded-lg border outline-none border-[#9D9D9D] px-2"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-red-500 text-sm font-normal font-['Poppins']">
                    {formik.errors.lastName}
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full h-12 rounded-lg border outline-none mt-5 border-[#9D9D9D] px-2"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm font-normal font-['Poppins']">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full h-12 rounded-lg border outline-none mt-5 border-[#9D9D9D] px-2"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm font-normal font-['Poppins']">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full h-12 rounded-lg border outline-none mt-5 border-[#9D9D9D] px-2"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm font-normal font-['Poppins']">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <div className="flex items-center gap-5 mt-10">
              <input
                type="checkbox"
                className="rounded-lg border outline-none border-[#9D9D9D]"
                name="agreeToTerms"
                checked={formik.values.agreeToTerms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className=" max-md:text-sm">
                <span className="text-zinc-800 dark:text-white text-sm font-normal font-['Poppins']">
                  By creating an account, I agree to our{" "}
                </span>
                <span className="text-black dark:text-white text-sm font-normal font-['Poppins'] underline">
                  Terms of use
                </span>
                <span className="text-zinc-600 dark:text-white text-sm font-normal font-['Poppins']">
                  {" "}
                </span>
                <span className="text-zinc-800 dark:text-white text-sm font-normal font-['Poppins']">
                  and
                </span>
                <span className="text-zinc-600 dark:text-white text-sm font-normal font-['Poppins']">
                  {" "}
                </span>
                <span className="text-black dark:text-white text-sm font-normal font-['Poppins'] underline">
                  Privacy Policy
                </span>
                <span className="text-zinc-600 text-sm font-normal font-['Poppins'] underline">
                  {" "}
                </span>
              </div>
            </div>

            {formik.touched.agreeToTerms && formik.errors.agreeToTerms ? (
              <div className="text-red-500 text-sm font-normal font-['Poppins']">
                {formik.errors.agreeToTerms}
              </div>
            ) : null}

            <div className="flex justify-center mt-3">
              <button
                type="submit"
                className="w-full h-12 text-[1rem] font-semibold text-white bg-red-600 rounded-lg border flex justify-center items-center"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="w-52 h-5 justify-start items-start gap-1 inline-flex">
            <div className="justify-center items-center flex">
              <div className="text-zinc-600 dark:text-white text-xs font-normal font-['Poppins']">
                Already have an account?
              </div>
            </div>
            <div className="justify-center items-center flex">
              <Link
                href="/login"
                className="text-black text-xs font-normal font-['Poppins'] underline"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
