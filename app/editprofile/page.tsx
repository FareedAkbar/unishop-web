"use client"

import React from "react"
import Link from "next/link"
import { useFormik } from "formik"
import * as yup from "yup"

import { Icons } from "@/components/icons"

const EditProfile = () => {
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    address: yup.string().required("Address is required"),
    currentPassword: yup.string().required("Current Password is required"),
    newPassword: yup.string(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match"),
  })

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values)
    },
  })

  return (
    <div className="container p-5">
      <div>
        <div className="flex items-center">
          <div className="text-black dark:text-white  text-opacity-60 text-[0.9rem] font-semibold font-['Poppins']">
            Home
          </div>
          <Icons.chevronRight className="w-4 h-4 text-[0.9rem] origin-top-left " />
          <div className="text-black dark:text-white text-[0.9rem] font-['Poppins'] leading-normal">
            Profile
          </div>
        </div>
        <div className="text-black flex max-md:justify-center dark:text-white text-[1rem] mt-10 font-semibold font-['Poppins']">
          Edit Your Profile
        </div>
      </div>
      <div className="flex justify-center   pt-10">
        <form
          onSubmit={formik.handleSubmit}
          className="border max-sm:w-full  p-10 max-sm:p-5 rounded-xl"
        >
          <div className="flex max-sm:flex-col max-sm:gap-3 gap-20 ">
            <div className="">
              <div className="text-black dark:text-white text-[1rem] font-normal font-['Poppins'] leading-normal">
                First Name
              </div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                className=" px-2 w-[20rem] max-md:w-full h-10 border outline-none dark:text-black bg-neutral-100 rounded"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="text-red-500">{formik.errors.firstName}</div>
              )}
            </div>
            <div className="">
              <div className="text-black dark:text-white text-[1rem] font-normal font-['Poppins'] leading-normal">
                Last Name
              </div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                className=" px-2 h-10 border w-[20rem] max-md:w-full outline-none bg-neutral-100 dark:text-black rounded"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="text-red-500">{formik.errors.lastName}</div>
              )}
            </div>
          </div>
          <div className="flex max-sm:gap-2 max-sm:flex-col gap-20 mt-5 max-sm:mt-3">
            <div className="">
              <div className="text-black dark:text-white text-[1rem] font-normal font-['Poppins'] leading-normal">
                Email
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className=" px-2 h-10 w-[20rem] max-md:w-full border outline-none bg-neutral-100 dark:text-black rounded"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
            </div>
            <div className="">
              <div className="text-black dark:text-white text-[1rem] font-normal font-['Poppins'] leading-normal">
                Address
              </div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                className="w-[20rem] max-md:w-full px-2 h-10 border outline-none bg-neutral-100 dark:text-black rounded"
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-red-500">{formik.errors.address}</div>
              )}
            </div>
          </div>
          <div className="w-full mt-5 max-sm:mt-3">
            <div className="text-black dark:text-white text-[1rem] font-normal font-['Poppins'] leading-normal">
              Current Password
            </div>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currentPassword}
              className="w-full px-2 h-10 border outline-none bg-neutral-100 dark:text-black rounded"
            />
            {formik.touched.currentPassword &&
              formik.errors.currentPassword && (
                <div className="text-red-500">
                  {formik.errors.currentPassword}
                </div>
              )}
          </div>
          <div className="flex max-sm:gap-2 max-sm:flex-col gap-20 mt-5 max-sm:mt-3">
            <div className="">
              <div className="text-black dark:text-white text-[1rem] font-normal font-['Poppins'] leading-normal">
                New Password
              </div>
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                className="w-[20rem] max-md:w-full px-2 h-10 border outline-none bg-neutral-100 dark:text-black rounded"
              />
              {formik.touched.newPassword && formik.errors.newPassword && (
                <div className="text-red-500">{formik.errors.newPassword}</div>
              )}
            </div>
            <div className="">
              <div className="text-black dark:text-white text-[1rem] font-normal font-['Poppins'] leading-normal">
                Confirm Password
              </div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="w-[20rem] max-md:w-full px-2 h-10 border outline-none bg-neutral-100 dark:text-black rounded"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="text-red-500">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>
          </div>
          <div className="mt-10 flex  max-sm:items-center max-sm:flex-col-reverse sm:justify-end  gap-5">
            <Link
              href={"/"}
              className="w-28 max-sm:w-44 h-10 flex justify-center items-center bg-neutral-100 dark:text-black rounded"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="w-44 max-sm:w-40 h-10 px-5 py-4 cursor-pointer bg-red-600 rounded justify-center items-center gap-2.5 inline-flex"
              disabled={!formik.isValid}
            >
              <div className="text-neutral-50 text-[1rem] font-medium font-['Poppins'] leading-normal">
                Save Changes
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
