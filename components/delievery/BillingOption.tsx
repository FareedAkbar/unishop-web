"use client"

// BillingOption.js
import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"

import { Icons } from "@/components/icons"

const BillingOption = ({ onSubmit, submitBillingForm }: any) => {
  const formik = useFormik({
    initialValues: {
      couponCode: "",
      paymentMethod: "bank", // Default to "bank" payment method
    },
    validationSchema: Yup.object({
      couponCode: Yup.string(),
    }),
    onSubmit: (values) => {
      // Call the function passed from the parent component to trigger form submission
      submitBillingForm(values)
    },
  })

  const handleFormSubmit = () => {
    formik.handleSubmit() // Manually trigger the form submission
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-full rounded-lg border p-5 max-sm:p-0 border-neutral-200">
        {[1, 2].map((item) => (
          <div className="flex  max-sm:flex-col justify-between   " key={item}>
            <div
              className="flex gap-5 w-full max-sm:flex-col  justify-between  mt-3  py-3 px-5  "
              key={item}
            >
              <div className=" w-20  h-20 max-sm:justify-center  max-sm:w-full px-6  bg-red-100 rounded-lg justify-center items-center flex">
                <Icons.hodi className="w-12 h-16" />
              </div>

              <div className="text-black  items-center flex dark:text-white max-sm:text-[10px] text-md max-lg:text-sm font-semibold font-['Poppins']">
                UOW Indigenous Hoodie
              </div>

              <div className="w-20 items-center flex text-black  dark:text-white text-md max-lg:text-sm font-semibold font-['Poppins']">
                $145
              </div>
            </div>
          </div>
        ))}

        <div className="px-12 max-sm:px-7">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center  max-lg:flex-col">
              <div className="pt-10 max-sm:pt-0 max-sm:gap-y-2  flex flex-col max-lg:w-full  ">
                <div className="flex  gap-3  items-center">
                  <input
                    type="radio"
                    className="w-4 h-4"
                    name="paymentMethod"
                    value="bank"
                    onChange={formik.handleChange}
                    checked={formik.values.paymentMethod === "bank"}
                  />
                  <div className="text-black text-lg max-sm:text-sm font-normal font-['Poppins'] leading-normal">
                    Bank
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    className="w-4 h-4"
                    name="paymentMethod"
                    value="cash"
                    onChange={formik.handleChange}
                    checked={formik.values.paymentMethod === "cash"}
                  />
                  <div className="text-black text-lg  max-sm:text-sm  font-normal font-['Poppins'] leading-normal">
                    Cash on delivery
                  </div>
                </div>
              </div>
              <div className="flex gap-5 max-lg:mt-3 max-md:flex-wrap">
                <Icons.bKash className="cursor-pointer h-10" />
                <Icons.visa className="cursor-pointer h-10" />
                <Icons.mCard className="cursor-pointer h-10" />
                <Icons.nagad className="cursor-pointer h-10" />
              </div>
            </div>

            <div className="flex max-lg:flex-col gap-3 pt-5 max-lg:justify-center">
              <input
                type="text"
                placeholder="Coupon Code"
                className="h-12 outline-none px-5 w-full pt-4 pb-3.5 rounded border border-black justify-start items-center inline-flex"
                name="couponCode"
                value={formik.values.couponCode}
                onChange={formik.handleChange}
              />
              <button
                type="button"
                onClick={handleFormSubmit}
                className="h-12 w-[20rem] max-lg:w-full bg-red-600 rounded justify-center items-center inline-flex cursor-pointer"
              >
                <div className="text-neutral-50 text-lg  font-medium font-['Poppins'] leading-normal">
                  Apply Coupon
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BillingOption
