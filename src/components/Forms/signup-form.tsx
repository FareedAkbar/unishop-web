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

    setValue("state", selectedStateName); // Set human-readable name
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
      console.log(updatedData)
      // router.push("placeorder");
    } catch (error) {
      console.error("Failed to checkout:", error);
    }
    // Handle form submission here
  };

  return (
    <div className="max-w-2xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input border bg-white dark:bg-black z-30">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Unishop
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
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
              <p className="text-sm text-red-500">{errors.postal_code.message}</p>
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
                      value: state.value.toString(), // Ensure value is a string
                      label: state.label,
                    }))}
                    // loader={loader}
                    value={field.value ? field.value : ""}
                    placeholder="Select your state/province"
                    onChange={(option) => {
                      handleStateChange(option.value); // Call your existing state change handler
                      field.onChange(option.value); // Update form state with the selected value
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
                      value: city.value.toString(), // Ensure value is a string
                      label: city.label,
                    }))}
                    // loader={loader}
                    value={field.value ? field.value : ""}
                    placeholder="Select your city"
                    error={errors.city?.message}
                    onChange={(e) => field.onChange(e.value)} // Updated
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
            
            {...register("phone_number", { required: "Phone Number is required" })}
          />
             {errors.phone_number && (
              <p className="text-sm text-red-500">{errors.phone_number.message}</p>
            )}
        </LabelInputContainer>
        
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-zinc-600 to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] hover:bg-zinc-800 dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Signup &rarr;
          <BottomGradient />
        </button>

        <div className="mt-5 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        {/* <div className="flex justify-center text-black mt-2 hover:text-red-400">
          <Link href="/login">I already have an account</Link>
        </div> */}
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
