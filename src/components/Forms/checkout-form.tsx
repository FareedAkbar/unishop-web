"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form"; // Use import type
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "~/lib/utils";
import { SignupSchema } from "./schema";
import Select from "../Fields/select";
// import isEmpty from "lodash/isEmpty";

// import { getCachedCountriesList } from "~/_actions/country";
// import type { CountriesData, Country, State } from "~/types/country";
import { useAuthContext } from "~/Context/AuthContext";
import { useRouter } from "next/navigation";
import states from "../constants/Australia";
import cities from "../constants/cities";
import { PhoneNumberInput } from "../ui/phoneNumberInput";
import { v5 as uuidv5 } from "uuid";
import {
  type checkoutBooknetResponse,
  type CheckoutForm,
} from "~/types/checkoutForm";
import Button from "../ui-components/Button";

type CehckoutFormValues = z.infer<typeof SignupSchema>;

interface checkout {
  push?: boolean;
  disabled?: boolean;
  handleData?: (data: CheckoutForm) => void;
  title: string,
  subTitle: string;
  pushPath?: string
}

export default function CehckoutForm({ push, handleData, disabled = false, title, subTitle,pushPath }: checkout) {
  // const [stateOptions, setStateOptions] = useState<
  //   { value: number; label: string }[]
  // >([]);
  const [cityOptions, setCityOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const { checkoutData, CheckoutApi, checkoutFormData } = useAuthContext();
  const [loader, setLoader] = useState(false);

  const defaultValues = checkoutData
    ? {
        ...checkoutData,
        city:
          cities
            .find(
              (state) =>
                state.stateCode ==
                states.find((state) => state.label === checkoutData.state)
                  ?.value,
            )
            ?.city.find((city) => city.label == checkoutData.city)
            ?.value.toString() ?? "",
        state: checkoutData?.state
          ? states.find((state) => state.label === checkoutData.state)?.value
          : null,
      }
    : {};
  // console.log(cities)
  // console.log(states)
  // console.log(checkoutData)
  // console.log( cities
  //   .find((state) => state.stateCode == states.find((state) => state.label === checkoutData?.state)?.value)
  //   ?.city.find((city) => city.label == checkoutData?.city)
  //   ?.value.toString() ?? "",)

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
    setCityOptions(
      getCitiesForState(
        states.find((state) => state.label === checkoutData.state)?.value ?? "",
      ),
    );
  }, [checkoutData]);

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
      booknet_customer_type_id: checkoutData?.customer_id ? 1 : 4,
      uuid: uuid,
    };

    try {
      // await checkoutFormData(updatedData);
      setLoader(true);
      await CheckoutApi(updatedData)
        .then((res: checkoutBooknetResponse) => {
          setLoader(false);
          if (res.status) {
            if (push && pushPath) {
              console.log(res?.data)
              void checkoutFormData(res?.data).then(()=>router.push(pushPath));
              
            }
            if (!push && handleData) {
              handleData(res?.data);
            }
          }
          
        })
        .catch((err) => {
          setLoader(false);
          console.log(err);
        });
      // router.push("placeorder");

      console.log(updatedData);
      // router.push("placeorder");
    } catch (error) {
      setLoader(false);
      console.error("Failed to checkout:", error);
    }

    // Handle form submission here
  };

  return (
    <div className="mx-auto w-full rounded-none border bg-white p-4 shadow-input dark:bg-slate-800 md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        {title}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
       {subTitle}
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
        <Button
          title="Checkout &rarr;"
          type="submit"
          width="w-full"
          loading={loader}
          disabled={disabled}
          onClick={() => {
            //
          }}
        />
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
