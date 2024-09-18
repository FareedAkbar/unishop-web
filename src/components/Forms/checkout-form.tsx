"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form"; // Use import type
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "~/lib/utils";
import { CehckoutFormSchema } from "./schema";
import Select from "../Fields/select";
import DynamicInput from "../Fields/dynamicInput";
// import isEmpty from "lodash/isEmpty";

import { getCachedCountriesList } from "~/_actions/country";
import type { CountriesData, State } from "~/types/country";

type CehckoutFormValues = z.infer<typeof CehckoutFormSchema>;

export default function CehckoutForm() {
  const [stateOptions, setStateOptions] = useState<{ value: number; label: string }[]>([]);
  const [cityOptions, setCityOptions] = useState<
    { value: number; label: string }[]
  >([]);

  const [countriesData, setCountriesData] = useState<CountriesData | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CehckoutFormValues>({
    resolver: zodResolver(CehckoutFormSchema),
  });

  // Ensure Country interface is imported
  useEffect(() => {
    // Define the async function inside the useEffect
    const loadCountriesData = async () => {
      try {
        
        const data = await getCachedCountriesList();
      
        setCountriesData(data);
        // Set the state with the fetched data
      } catch (error) {
        console.error("Failed to fetch countries data:", error);
      }
    };

    loadCountriesData().catch((error) => {
      console.error("Error loading countries data:", error);
    });
  }, []);

  const getStatesForCountry = (countryCode: string) => {
    
    const x = countriesData?.statesData;
    return x
      ? x
          .filter((state) => state.country_code == countryCode)
          .map((state) => ({
            value: Number(state.id),
            label: state.name,
          }))
      : [];
  };

  const getCitiesForState = (stateId: string) => {
    const id = parseInt(stateId)
    const x = countriesData?.citiesData;
    return x
      ? x
          .filter((city) => city.state_id === id)
          .map((city) => ({
            value: city.id,
            label: city.name,
          }))
      : [];
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    const x = countriesData?.countryData;

    const selectedCountryName = x
      ? x.find((country) => country.iso2 == e.target.value)?.name ?? ""
      : "";

    setValue("country", selectedCountryName);
    setStateOptions(getStatesForCountry(countryCode));
    // Set human-readable name
    setValue("state", "");
    setValue("city", "");

    setCityOptions([]); // Clear city options
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateId = e.target.value;
  
    const x = countriesData?.statesData;
    const selectedStateName =
      (x?.find((state: State) => state.id == stateId)?.name) ?? "";

    setValue("state", selectedStateName); // Set human-readable name
    setValue("city", "");
    setCityOptions(getCitiesForState(stateId));
  };

  const onSubmit: SubmitHandler<CehckoutFormValues> = (data) => {
    // Map the selected country, state, and city IDs to their names

    const cityId = data.city ? parseInt(data.city, 10) : null;
    const cD = countriesData ? countriesData.countryData : [];
    const sD = countriesData ? countriesData.statesData : [];
    const cityD = countriesData ? countriesData.citiesData : [];
    // Find the human-readable names

    const selectedCountryName =
      cD.find((country) => country.iso2 === data.country)?.name ?? "";

    const selectedStateName = data.state
      ? sD.find((state) => state.id == data.state)?.name ?? ""
      : "";
    const selectedCityName =
      cityId !== null
        ? cityD.find((city) => city.id === cityId)?.name ?? ""
        : "";

    const updatedData = {
      ...data,
      country: selectedCountryName,
      state: selectedStateName,
      city: selectedCityName,
    };

    console.log(updatedData)
    
    // Handle form submission here
  };
  const shippingOptions = [
    {
      value: "free",
      amount: "0",
      type: "free",
      label:
        "Click and Collect. Pickup Instore only. you will be notified once the order is ready for collection.",
    },
    {
      value: "fixed",
      amount: "10",
      type: "fixed",
      label: "Flat Rate- Austrlia wide- fixed.",
    },
    // { value: 'express', label: 'Express Shipping' },
  ];

  return (
    <div className="z-30 mx-auto w-full rounded-none bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
      <h2 className="font-serif text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Checkout
      </h2>

      <form className="mb-4 mt-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              {...register("firstname")}
            />
            {errors.firstname && (
              <p className="text-sm text-red-500">{errors.firstname.message}</p>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Durden"
              type="text"
              {...register("lastname")}
            />
            {errors.lastname && (
              <p className="text-sm text-red-500">{errors.lastname.message}</p>
            )}
          </LabelInputContainer>
        </div>
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
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            placeholder="Your Company (optional)"
            type="text"
            {...register("company")}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="streetAddress">Street Address</Label>
          <Input
            id="streetAddress"
            placeholder="123 Main St"
            type="text"
            {...register("streetAddress")}
          />
        </LabelInputContainer>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <LabelInputContainer>
            <Label htmlFor="zip">Zip/Postal Code</Label>
            <Input
              id="zip"
              placeholder="12345"
              type="text"
              {...register("zip")}
            />
            {errors.zip && (
              <p className="text-sm text-red-500">{errors.zip.message}</p>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="country">Country</Label>
            <Controller
              name="country"
              control={control}
              
              render={({ field }) => (
                <div>
                  <Select
                    id="country"
                    name="country"
                    options={(countriesData?.countryData ?? []).map(
                      (country) => ({
                        value: country.iso2,
                        label: country.name,
                      }),
                    )}
                    value={field.value ? field.value : ""}
                    placeholder="Select your country"
                   
                    error={errors.country?.message}
                    onChange={(value) => {
                      handleCountryChange(value);
                      field.onChange(value);
                    }}
                  />
                </div>
              )}
            />
          </LabelInputContainer>
        </div>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
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
                    value={field.value}
                    placeholder="Select your city"
                   
                    error={errors.city?.message}
                    onChange={(e) => field.onChange(e)} // Updated
                  />
                </div>
              )}
            />
          </LabelInputContainer>
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
                    options={stateOptions.map((state) => ({
                      value: state.value.toString(), // Ensure value is a string
                      label: state.label,
                    }))}
                    value={field.value}
                    placeholder="Select your state/province"
                   
                    onChange={(value) => {
                      handleStateChange(value);
                      field.onChange(value);
                    }}
                    error={errors.state?.message}
                  />
                </div>
              )}
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            placeholder="(123) 456-7890"
            type="tel"
            {...register("phoneNumber")}
          />
        </LabelInputContainer>
        <div className="mb-4">
          <p className="mb-2 font-serif font-bold">Shipping Method</p>
          <div className="flex flex-col">
            <DynamicInput
              name="shippingMethod"
              options={shippingOptions}
              control={control}
              error={errors.shippingMethod?.message}
            />
          </div>
        </div>
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Checkout &rarr;
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
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
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
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
