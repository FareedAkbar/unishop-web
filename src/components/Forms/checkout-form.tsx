"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form"; // Use import type
import { zodResolver } from "@hookform/resolvers/zod";
import { boolean, z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "~/lib/utils";
import { SignupSchema } from "./schema";
import Select from "../Fields/select";
import DynamicInput from "../Fields/dynamicInput";
// import isEmpty from "lodash/isEmpty";

// import { getCachedCountriesList } from "~/_actions/country";
// import type { CountriesData, Country, State } from "~/types/country";
import { useAuthContext } from "~/Context/AuthContext";
import { useRouter } from "next/navigation";
import shippingOptions from "../constants/shippingMethod";
import states from "../constants/austrailia";
import cities from "../constants/cities";
import { PhoneNumberInput } from "../ui/phoneNumberInput";
import { v5 as uuidv5 } from "uuid";
import { checkoutBooknetResponse, CheckoutForm } from "~/types/checkoutForm";

type CehckoutFormValues = z.infer<typeof SignupSchema>;

interface checkout {
  push?: boolean;
  handleData?: (data: CheckoutForm) => void;
}

export default function CehckoutForm({ push, handleData }: checkout) {
  // const [stateOptions, setStateOptions] = useState<
  //   { value: number; label: string }[]
  // >([]);
  const [cityOptions, setCityOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const { checkoutFormData, checkoutData, CheckoutApi } = useAuthContext();
  // const [countriesData, setCountriesData] = useState<CountriesData | null>(
  //   null,
  // );

  const defaultValues = checkoutData
    ? {
        ...checkoutData,
        city:
          cities
            .find((state) => state.stateCode === checkoutData.stateCode)
            ?.city.find((city) => city.value === Number(checkoutData.cityCode))
            ?.value.toString() ?? "",
        state: checkoutData?.state
          ? states.find((state) => state.label === checkoutData.state)?.value
          : null,
      }
    : {};

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CehckoutFormValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues,
  });

  const getCitiesForState = (stateId: string | null) => {
    const foundState = cities.find((city) => city.stateCode === stateId);
    return foundState ? foundState.city : [];
  };

  useEffect(() => {
    if (!checkoutData) return;
    setCityOptions(getCitiesForState(checkoutData.stateCode ?? ""));
  }, []);

  const handleStateChange = (e: string) => {
    const stateId = e;

    const x = states;
    const selectedStateName =
      x?.find((state) => state.countryCode == stateId)?.label ?? "";

    setValue("state", selectedStateName); // Set human-readable name
    setValue("city", "");
    setCityOptions(getCitiesForState(stateId));
  };

  const onSubmit: SubmitHandler<CehckoutFormValues> = async (data) => {
    // Map the selected state and city IDs to their names

    // Get the human-readable state name based on the selected state ID
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
    const NAMESPACE = uuidv5("uniShop", uuidv5.URL);

    const uuid = uuidv5(data.email, NAMESPACE);
    const updatedData = {
      ...data,
      country: "Australia",
      stateCode: data.state,
      cityCode: data.city,
      state: selectedStateName,
      city: selectedCityName,
      customer_id: null,
      booknet_customer_type_id: 1,
      uuid: uuid,
    };

    try {
      await checkoutFormData(updatedData);
      await CheckoutApi(updatedData)
        .then((res: checkoutBooknetResponse) => {
          if (res.status) {
            if (push) {
              router.push("placeorder");
            }
            if (!push && handleData) {
              handleData(res?.data);
            }
          }
        })
        .catch((err) => console.log(err));
      // router.push("placeorder");

      console.log(updatedData);
      // router.push("placeorder");
    } catch (error) {
      console.error("Failed to checkout:", error);
    }

    // Handle form submission here
  };

  return (
    <div className="mx-auto w-full rounded-none border bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
      <h2 className="font-serif text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Checkout
      </h2>

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
        {/* <div className="mb-4">
          <p className="mb-2 font-serif font-bold">Shipping Method</p>
          <div className="flex flex-col">
            <DynamicInput
              name="shippingMethod"
              options={shippingOptions}
              control={control}
              error={errors.shippingMethod?.message}
            />
          </div>
        </div> */}
        <div className="flex max-w-sm justify-center mx-auto">
          <button
            className="group/btn relative block h-10 w-full rounded-md bg-zinc-600 to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] hover:bg-zinc-800 dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Checkout &rarr;
            <BottomGradient />
          </button>
        </div>
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
