"use client"

import React, { useContext, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ContextApiData } from "@/context/ContextGlobal"
import { Select } from "@radix-ui/react-select"
import axios from "axios"
import { useFormik } from "formik"
import { ToastContainer, toast } from "react-toastify"
import * as Yup from "yup"

import "react-toastify/dist/ReactToastify.css"
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "@/components/icons"
import Otp from "@/components/otp/Otp"

const Signup = () => {
  const { AllCampus, AllProfile } = useContext(ContextApiData)

  // State variables to store selected profile and campus values
  const [selectedProfile, setSelectedProfile] = useState("")
  const [selectedCampus, setSelectedCampus] = useState<any>()
  const [FormState, setFormState] = useState<any>("")
  const [ResponseStatus, setResponseStatus] = useState<boolean>()
  const [OtpID, setOtpID] = useState<any>("")
  const route = useRouter()
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    dob: Yup.string().required("Date of birth is required"),
    profile: Yup.string().required("profile is required"),
    campus: Yup.string().required("campus is required"),
    studentID: Yup.string(),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    agreeToTerms: Yup.boolean().oneOf(
      [true],
      "You must agree to the terms and conditions"
    ),
    membership: Yup.string().required("Please select your membership status"),
  })

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      profile: "", // Initialize with an empty string
      campus: "", // Initialize with an empty string
      studentID: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
      membership: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.agreeToTerms) {
        // Handle form submission if terms are agreed
        console.log("Form values:", values)
        setFormState(values)
        submitForm()
      } else {
        // Display an error message or take appropriate action if terms are not agreed
        console.error("You must agree to the terms and conditions.")
      }
    },
  })

  const submitForm = async () => {
    try {
      const response = await axios.post(
        "http://192.168.18.225:3001/api/v1/student/auth/register",
        {
          email: formik.values.email, // Send just the email
        }
      )

      // Handle the response here (e.g., show a success message)
      console.log("API response:", response.data)
      const isSuccess = response.status >= 200 && response.status < 300
      if (response.data.status == false) {
        toast.error(response.data.message, {
          position: "top-right",
        })
      } else {
        toast.success(response.data.message, {
          position: "top-right",
        })
      }
      setResponseStatus(isSuccess)
      setOtpID(response.data.id)
    } catch (error) {
      // Handle any errors (e.g., display an error message)
      console.error("API error:", (error as Error)?.message)
      toast.success((error as Error)?.message, {
        position: "top-right",
      })
    }
  }
  const otpCallback = (opt: any) => {
    const payload = {
      userData: {
        first_name: FormState.firstName,
        last_name: FormState.lastName,
        national_ID: FormState.studentID,
        email: FormState.email,
        phone_number: FormState.phone,
        user_name: FormState.firstName,
        user_password: FormState.password,
        date_of_birth: FormState.dob,
        gender: 1,
        campus: 1,
        student_number: FormState.studentID,
        customer_type: 1,
        membership: 1,
      },
      otp: opt,
      otpId: OtpID,
    }

    // Make a POST request using Axios
    axios
      .post(
        "http://192.168.18.225:3001/api/v1/student/auth/verifyOTP-and-register",
        payload
      )
      .then((response) => {
        // Handle the response here
        // console.log("Response from the POST request:", response.data)
        const successMessage = "Student Registration successfully"
        console.log("otp call back responce", response)
        if (response.data.status == false) {
          toast.error(response.data.error, {
            position: "top-right",
          })
        } else {
          toast.success(response.data.message, {
            position: "top-right",
          })
        }

        // route.push("/")
      })
      .catch((error) => {
        // Handle any errors that occurred during the POST request
        toast.success(error, {
          position: "top-right",
        })
      })
  }

  return (
    <div className=" h-screen">
      <ToastContainer />

      <div className="relative max-md:hidden">
        <Icons.bgSighup className="h-auto" />
      </div>
      <div className="flex max-md:flex-col absolute   container inset-0">
        <div className="w-1/2 max-md:w-full "></div>
        <div className=" flex w-1/2 items-center pt-10  justify-center   max-md:w-full">
          <div className="rounded-lg border h-fit border-neutral-200 p-5 ">
            <div className="text-neutral-900 dark:text-white text-[1rem] font-semibold font-['Poppins']">
              Sign up now
            </div>
            <form onSubmit={formik.handleSubmit} className="h-full">
              <div className="flex max-sm:flex-col gap-8 mt-4">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full h-10 dark:text-white font-['Poppins']  rounded-lg border outline-none border-[#9D9D9D] px-2"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-red-500 text-[0.9rem] font-normal font-['Poppins']">
                      {formik.errors.firstName}
                    </div>
                  ) : null}
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full h-10 dark:text-white font-['Poppins'] rounded-lg border outline-none border-[#9D9D9D] px-2"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="text-red-500 text-[0.9rem] font-normal font-['Poppins']">
                      {formik.errors.lastName}
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full h-10 dark:text-white font-['Poppins'] rounded-lg border outline-none mt-4 border-[#9D9D9D] px-2"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-[0.9rem] font-normal font-['Poppins']">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="flex max-sm:flex-col gap-8 ">
                <div className="w-full">
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full h-10 dark:text-white font-['Poppins'] rounded-lg border outline-none mt-4 border-[#9D9D9D] px-2"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-red-500 text-[0.9rem] font-normal font-['Poppins']">
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </div>
                <div className=" w-full max-sm:-mt-8">
                  <input
                    type="date"
                    placeholder="DOB"
                    className="w-full h-10 dark:text-white font-['Poppins'] rounded-lg border outline-none mt-4 border-[#9D9D9D] px-2"
                    name="dob"
                    value={formik.values.dob}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.dob && formik.errors.dob ? (
                    <div className="text-red-500 text-[0.9rem] font-normal font-['Poppins']">
                      {formik.errors.dob}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex max-sm:flex-col gap-8">
                <div className="w-full">
                  <select
                    className="w-full h-10 dark:text-white font-['Poppins'] rounded-lg border outline-none mt-4 border-[#9D9D9D] px-2"
                    name="profile"
                    value={formik.values.profile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" disabled>
                      Select profile
                    </option>
                    {AllProfile?.data?.map((item: any, index: any) => (
                      <option key={index} value={item?.type_name}>
                        {item?.type_name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.profile && formik.errors.profile ? (
                    <div className="text-red-500 text-[0.9rem] font-normal font-['Poppins']">
                      {formik.errors.profile}
                    </div>
                  ) : null}
                </div>

                <div className="w-full max-sm:-mt-8">
                  <select
                    className="w-full h-10 dark:text-white font-['Poppins'] rounded-lg border outline-none mt-4 border-[#9D9D9D] px-2"
                    name="campus"
                    value={formik.values.campus}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" disabled>
                      Select campus
                    </option>
                    {AllCampus?.data?.map((item: any, index: any) => (
                      <option key={index} value={item.campus_name}>
                        {item.campus_name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.campus && formik.errors.campus ? (
                    <div className="text-red-500 text-[0.9rem] font-normal font-['Poppins']">
                      {formik.errors.campus}
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Student ID (If Applicable)"
                  className="w-full h-10 dark:text-white font-['Poppins'] rounded-lg border outline-none mt-4 border-[#9D9D9D] px-2"
                  name="studentID"
                  value={formik.values.studentID}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.studentID && formik.errors.studentID ? (
                  <div className="text-red-500 text-[0.9rem] font-normal font-['Poppins']">
                    {formik.errors.studentID}
                  </div>
                ) : null}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full h-10 dark:text-white font-['Poppins'] rounded-lg border outline-none mt-4 border-[#9D9D9D] px-2"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-[0.9rem] font-normal font-['Poppins']">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full h-10 dark:text-white font-['Poppins'] rounded-lg border outline-none mt-4 border-[#9D9D9D] px-2"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-red-500 text-[0.9rem] font-normal font-['Poppins']">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
              <div className="flex max-sm:flex-col gap-8 ">
                <div className="w-full ">
                  <div className="pt-2 items-center flex gap-5">
                    <div>
                      <label className="flex gap-1 pt-2">
                        <input
                          type="radio"
                          name="membership"
                          value={"1"}
                          checked={formik.values.membership === "1"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="cursor-pointer font-['Poppins']"
                        />
                        With Membership
                      </label>
                    </div>
                    <div className="mt-2">
                      <label className="flex gap-2 items-center">
                        <input
                          type="radio"
                          name="membership"
                          value="0"
                          className="cursor-pointer font-['Poppins']"
                          checked={formik.values.membership === "0"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        Without Membership
                      </label>
                    </div>
                  </div>
                  {formik.touched.membership && formik.errors.membership ? (
                    <div className="text-red-500 text-[0.9rem] font-normal font-['Poppins']">
                      {formik.errors.membership}
                    </div>
                  ) : null}
                </div>
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
                <div className="max-md:text-[0.9rem]">
                  <span className="text-zinc-800 dark:text-white text-[0.9rem] max-sm:text-[12px] font-normal font-['Poppins']">
                    By creating an account, I agree to our{" "}
                  </span>
                  <span className="text-black dark:text-white max-sm:text-[12px] text-[0.9rem] font-normal font-['Poppins'] underline">
                    Terms of use
                  </span>
                  <span className="text-zinc-600 dark:text-white max-sm:text-[12px] text-[0.9rem] font-normal font-['Poppins']">
                    {" "}
                  </span>
                  <span className="text-zinc-800 dark:text-white max-sm:text-[12px] text-[0.9rem] font-normal font-['Poppins']">
                    and
                  </span>
                  <span className="text-zinc-600 dark:text-white max-sm:text-[12px] text-[0.9rem] font-normal font-['Poppins']">
                    {" "}
                  </span>
                  <span className="text-black dark:text-white text-[0.9rem] max-sm:text-[12px] font-normal font-['Poppins'] underline">
                    Privacy Policy
                  </span>
                  <span className="text-zinc-600 text-[0.9rem] font-normal font-['Poppins'] underline">
                    {" "}
                  </span>
                </div>
              </div>

              {formik.touched.agreeToTerms && formik.errors.agreeToTerms ? (
                <div className="text-red-500 text-[0.9rem] font-normal font-['Poppins']">
                  {formik.errors.agreeToTerms}
                </div>
              ) : null}
              <div className="flex justify-center mt-3">
                <button
                  type="submit"
                  className="w-full h-10 dark:text-white max-sm:h-10 text-[1rem] font-semibold font-['Poppins'] text-white bg-red-600 rounded-lg border flex justify-center items-center"
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
            {ResponseStatus && <Otp otpCallback={otpCallback} />}
            {/* <Otp otpCallback={otpCallback} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
