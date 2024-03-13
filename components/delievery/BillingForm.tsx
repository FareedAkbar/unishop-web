"use client"

import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"

const BillingForm = ({ handlesubmit }: any) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      companyName: "",
      streetAddress: "",
      apartment: "",
      townCity: "",
      phoneNumber: "",
      emailAddress: "",
      saveInformation: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      streetAddress: Yup.string().required("Street Address is required"),
      townCity: Yup.string().required("Town/City is required"),
      phoneNumber: Yup.string().required("Phone Number is required"),
      emailAddress: Yup.string()
        .email("Invalid email address")
        .required("Email Address is required"),
    }),
    onSubmit: (values) => {
      // Handle form submission here
      handlesubmit(values)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="p-5">
      <div>
        <div className="w-36 h-7 opacity-80">
          <span className="text-black dark:text-white text-md max-md:text-sm font-normal font-['Poppins'] leading-normal">
            First Name
          </span>
          <span className="text-red-500 text-md max-md:text-sm font-normal font-['Poppins'] leading-normal">
            *
          </span>
        </div>
        <input
          className=" w-full max-md:w-full h-12 relative border outline-none bg-neutral-100 px-2 dark:text-black rounded"
          type="text"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
        ) : null}
      </div>
      <div className="mt-3">
        <div className="w-52 h-7 opacity-80 text-black dark:text-white text-md max-md:text-sm font-normal font-['Poppins'] leading-normal">
          Company Name
        </div>
        <input
          className=" w-full max-md:w-full h-12 relative border outline-none bg-neutral-100 px-2 dark:text-black rounded"
          type="text"
          name="companyName"
          value={formik.values.companyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.companyName && formik.errors.companyName ? (
          <div className="text-red-500 text-sm">
            {formik.errors.companyName}
          </div>
        ) : null}
      </div>
      <div className="mt-3">
        <div className="w-48 h-7 opacity-80">
          <span className="text-black dark:text-white text-md max-md:text-sm font-normal font-['Poppins'] leading-normal">
            Street Address
          </span>
          <span className="text-red-500 text-md max-md:text-sm font-normal font-['Poppins'] leading-normal">
            *
          </span>
        </div>
        <input
          className=" w-full max-md:w-full h-12 relative border outline-none bg-neutral-100 px-2 dark:text-black rounded"
          type="text"
          name="streetAddress"
          value={formik.values.streetAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.streetAddress && formik.errors.streetAddress ? (
          <div className="text-red-500 text-sm">
            {formik.errors.streetAddress}
          </div>
        ) : null}
      </div>
      <div className="mt-3">
        <div className=" h-7 opacity-80 text-black dark:text-white text-md max-md:text-sm font-normal font-['Poppins'] leading-normal">
          Apartment, floor, etc. (optional)
        </div>
        <input
          className=" w-full max-md:w-full h-12 relative border outline-none bg-neutral-100 px-2 dark:text-black rounded"
          type="text"
          name="apartment"
          value={formik.values.apartment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className="mt-3">
        <div className="w-36 h-6 opacity-80">
          <span className="text-black dark:text-white text-md max-md:text-sm font-normal font-['Poppins'] leading-normal">
            Town/City
          </span>
          <span className="text-red-500 text-md max-md:text-sm font-normal font-['Poppins'] leading-normal">
            *
          </span>
        </div>
        <input
          className=" w-full max-md:w-full h-12 relative border outline-none mt-1 bg-neutral-100 px-2 dark:text-black rounded"
          type="text"
          name="townCity"
          value={formik.values.townCity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.townCity && formik.errors.townCity ? (
          <div className="text-red-500 text-sm">{formik.errors.townCity}</div>
        ) : null}
      </div>
      <div className="mt-3">
        <div className="w-52 h-7 opacity-80">
          <span className="text-black dark:text-white text-md max-md:text-sm font-normal font-['Poppins'] leading-normal">
            Phone Number
          </span>
          <span className="text-red-500 text-md max-md:text-sm font-normal font-['Poppins'] leading-normal">
            *
          </span>
        </div>
        <input
          className=" w-full max-md:w-full h-12 relative border outline-none bg-neutral-100 px-2 dark:text-black rounded"
          type="text"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <div className="text-red-500 text-sm">
            {formik.errors.phoneNumber}
          </div>
        ) : null}
      </div>

      <div className="mt-3">
        <div className="w-48 h-7 opacity-80">
          <span className="text-black dark:text-white text-md max-md:text-sm font-normal font-['Poppins'] leading-normal">
            Email Address
          </span>
          <span className="text-red-500 text-md max-md:text-sm font-normal font-['Poppins'] leading-normal">
            *
          </span>
        </div>
        <input
          className=" w-full max-md:w-full h-12 relative border outline-none bg-neutral-100 px-2 dark:text-black rounded"
          type="text"
          name="emailAddress"
          value={formik.values.emailAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.emailAddress && formik.errors.emailAddress ? (
          <div className="text-red-500 text-sm">
            {formik.errors.emailAddress}
          </div>
        ) : null}
      </div>
      <div className="flex gap-3 mt-5">
        <input
          type="checkbox"
          className="w-6 h-5 max-sm:w-4 max-sm:h-3 relative bg-red-600 rounded"
          name="saveInformation"
          checked={formik.values.saveInformation}
          onChange={formik.handleChange}
        />
        <div className=" w-full max-md:w-full h-7 text-black dark:text-white text-sm max-sm:text-[12px] font-normal font-['Poppins'] leading-normal">
          Save this information for faster check-out next time
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default BillingForm
