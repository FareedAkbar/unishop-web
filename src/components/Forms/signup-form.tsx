"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form"; // Use import type
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "~/lib/utils";
import { SignupSchema } from "./schema";
import { PhoneNumberInput } from "../ui/phoneNumberInput";
import Select from "../Fields/select";
import states from "../constants/Australia";
import cities from "../constants/cities";
import Button from "../ui-components/Button";
import Link from "next/link";

type CehckoutFormValues = z.infer<typeof SignupSchema>;

export default function SignupFormDemo() {
  const [cityOptions, setCityOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CehckoutFormValues>({
    resolver: zodResolver(SignupSchema),
  });
  const getCitiesForState = (stateId: string | null) => {
    const foundState = cities.find((city) => city.stateCode === stateId);
    return foundState ? foundState.city : [];
  };

  const handleStateChange = (e: string) => {
    const stateId = e;

    const x = states;
    const selectedStateName =
      x?.find((state) => state.countryCode == stateId)?.label ?? "";

    setValue("state", selectedStateName);
    setValue("city", "");
    setCityOptions(getCitiesForState(stateId));
  };
  const onSubmit: SubmitHandler<CehckoutFormValues> = (data) => {
    const selectedStateName = data.state
      ? (states.find((state) => state.value.toString() === data.state)?.label ??
        "")
      : "";

    // Find the city options based on the selected state code
    const foundState = cities.find((state) => state.stateCode === data.state);

    // Get the selected city name
    const selectedCityName = foundState
      ? (foundState.city.find((city) => city.value.toString() === data.city)
          ?.label ?? "")
      : "";

    // Prepare the updated data object for submission
    const updatedData = {
      ...data,
      country: "Australia",
      stateCode: data.state,
      cityCode: data.city,
      state: selectedStateName,
      city: selectedCityName,
    };

    try {
      // await checkoutFormData(updatedData);
      // await CheckoutApi(updatedData);
      console.log(updatedData);
      // router.push("placeorder");
    } catch (error) {
      console.error("Failed to checkout:", error);
    }
  };

  return (
    <div className="z-30 mx-auto w-full max-w-2xl rounded-none border bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Unishop
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Create New Customer Account
      </p>

      <form className="mb-4 mt-8" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="address">Street Address</Label>
          <Input
            id="address"
            placeholder="123 Main St"
            type="text"
            {...register("address")}
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address.message}</p>
          )}
        </LabelInputContainer>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <LabelInputContainer>
            <Label htmlFor="postal_code">Zip/Postal Code</Label>
            <Input
              id="postal_code"
              placeholder="12345"
              type="text"
              {...register("postal_code")}
            />
            {errors.postal_code && (
              <p className="text-sm text-red-500">
                {errors.postal_code.message}
              </p>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="country">Country</Label>

            <Input
              id="country"
              placeholder=""
              value="Australia"
              type="text"
              disabled
              {...register("country")}
            />
            {/* <Select
                    id="country"
                    name="country"
                    options={(countriesData?.countryData ?? []).map(
                      (country) => ({
                        value: country.iso2,
                        label: country.name,
                      }),
                    )}
                    loader={loader}
                    value={field.value ? field.value : ""}
                    placeholder="Select your country"
                    error={errors.country?.message}
                    onChange={(value) => {
                      handleCountryChange(value);
                      field.onChange(value);
                    }}
                  /> */}
          </LabelInputContainer>
        </div>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <LabelInputContainer>
            <Label htmlFor="state">State/Province</Label>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    id="state"
                    name="state"
                    options={states.map((state) => ({
                      value: state.value.toString(),
                      label: state.label,
                    }))}
                    // loader={loader}
                    value={field.value ? field.value : ""}
                    placeholder="Select your state/province"
                    onChange={(option) => {
                      handleStateChange(option.value);
                      field.onChange(option.value);
                    }}
                    error={errors.state?.message}
                  />
                </div>
              )}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="city">City</Label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    id="city"
                    name="city"
                    options={cityOptions.map((city) => ({
                      value: city.value.toString(),
                      label: city.label,
                    }))}
                    // loader={loader}
                    value={field.value ? field.value : ""}
                    placeholder="Select your city"
                    error={errors.city?.message}
                    onChange={(e) => field.onChange(e.value)}
                  />
                </div>
              )}
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="phone_number">Phone Number</Label>
          <PhoneNumberInput
            id="phone_number"
            placeholder="(123) 456-7890"
            type="tel"
            {...register("phone_number", {
              required: "Phone Number is required",
            })}
          />
          {errors.phone_number && (
            <p className="text-sm text-red-500">
              {errors.phone_number.message}
            </p>
          )}
        </LabelInputContainer>

        <div className="mx-auto flex flex-col justify-center">
          <Button
            title="Signup"
            onClick={() => {
              //
            }}
            // disabled={disabled}
            // loading={loader}
            width="w-full"
            type="submit"
          />
          <div className="mt-2 flex flex-col items-center justify-center text-black sm:flex-row">
            <p>{`I already have an account,`} </p>
            <Link href="login" className="ml-1 underline hover:text-red-500">
              login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
