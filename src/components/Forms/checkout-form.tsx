"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
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
  type address,
  type checkoutBooknetResponse,
  type CheckoutForm,
  type add_address_from_customer_id,
} from "~/types/checkoutForm";
import Button from "../ui-components/Button";
import { InputEmail } from "../Fields/email_field";
import { useToast } from "~/hooks/use-toast";
import { ScrollArea } from "../ui/scroll-area";
import { BsPencilSquare } from "react-icons/bs";
import { BsPlusCircle } from "react-icons/bs";
import { error } from "console";
type CheckoutFormValues = z.infer<typeof SignupSchema>;

interface checkout {
  push?: boolean;
  disabled?: boolean;
  handleData?: (data: CheckoutForm) => void;
  title: string;
  subTitle: string;
  pushPath?: string;
}

export default function CheckoutForm({
  push,
  handleData,
  disabled = false,
  title,
  subTitle,
  pushPath,
}: checkout) {
  // const [stateOptions, setStateOptions] = useState<
  //   { value: number; label: string }[]
  // >([]);
  const router = useRouter();
  const [cityOptions, setCityOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const { toast } = useToast();
  const { checkoutData, CheckoutApi, checkoutFormData, billing_address } = useAuthContext();
  const [loader, setLoader] = useState(false);
  const [addressIndex, setAddressIndex] = useState(0);
  const [showFormFields, setShowFormFields] = useState(true);

  const defaultValues = billing_address
    ? {
      ...checkoutData,
      address: billing_address[addressIndex]?.address,
      postal_code: billing_address[addressIndex]?.postal_code,
      phone_number: billing_address[addressIndex]?.phone_number,
      city:
        cities
          .find(
            (state) =>
              state.stateCode ==
              states.find((state) => state.label === billing_address[addressIndex]?.state)?.value)
          ?.city.find((city) => city.label == billing_address[addressIndex]?.city)
          ?.value.toString() ?? "",
      state: billing_address[addressIndex]?.state
        ? states.find((state) => state.label === billing_address[addressIndex]?.state)?.value
        : null,
    }
    : {};




  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
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
        states.find((state) => state.label === checkoutData.address?.[0]?.state)?.value ?? "",
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


  const getObjectFromArray = (obj: address): address | null => {
    return billing_address
      ? billing_address.find((item) =>
        item.address === obj.address &&
        item.second_address === obj.second_address &&
        item.country === obj.country &&
        item.city === obj.city &&
        item.state === obj.state &&
        item.postal_code === obj.postal_code &&
        item.country_code === obj.country_code &&
        item.phone_number === obj.phone_number
      ) ?? null // Return null if no match is found
      : null;
  };

  const addAddress = async (address: address, data: CheckoutForm) => {
    const payload = {
      ...address,
      customer_id: data.customer_id
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/customer/address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PASSKEY_TOKEN}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const result: add_address_from_customer_id = (await response.json()) as add_address_from_customer_id;

      // Check if result has the expected structure
      if (result?.status && result?.data) {
        const newCheckoutData = {
          ...data,
          address: [result?.data],
        }
        if (pushPath) {
          void checkoutFormData(newCheckoutData).then(() =>
            router.push(pushPath),
          );
        }

        toast({
          title: "Billing Address Added",
          variant: "success",
          description:
            "New Billing Address was Added",
        });
      } else {
        console.error("Unexpected result structure api/customer/address?email:", result);
      }
    } catch (error) {
      console.error("Error fetching api/customer/address?email:", error);
    }
  }

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {

    console.log("data",data)

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
    function DeclineSnackMessage() {
      toast({
        title: "Checkout Declined",
        variant: "destructive",
        description:
          "Something went wrong. Please try again.",
      });
    }
    // create new address object
    const newAddress = {
      address: data?.address,
      second_address: data.address,
      country: "Australia",
      city: selectedCityName,
      state: selectedStateName,
      postal_code: data.postal_code,
      country_code: "61",
      phone_number: data.phone_number,
      default_status: 1,
    }
    // compare address from the form and previous billing address and if yes then pick address from previous billing address
    const xx = billing_address && getObjectFromArray(newAddress)
      ? [getObjectFromArray(newAddress)!]
      : [newAddress];

    const updatedData = {
      ...data,
      country: "Australia",
      stateCode: data.state,
      cityCode: data.city,
      state: selectedStateName,
      city: selectedCityName,
      customer_id: null,
      country_code: "61",
      address: xx,
      customer_type_id: 6,
      uuid: uuid,
    };


    try {
      // await checkoutFormData(updatedData);
      setLoader(true);
      await CheckoutApi(updatedData)
        .then(async (res: checkoutBooknetResponse) => {
          setLoader(false);
          if (res.status && res?.data?.customer_id) {
            // check if the page render from checkout page or signup page
            if (push && pushPath) {
              // check if the user already have billing address and want to add a new address 
              if (billing_address && billing_address?.length > 0 && !getObjectFromArray(newAddress)) {
                await addAddress(newAddress, res?.data)
              } else {
                const newCheckoutData = {
                  ...res?.data,
                  address: xx,
                }
                void checkoutFormData(newCheckoutData).then(() =>
                  router.push(pushPath),
                );
              }

            }
            if (!push && handleData) {
              handleData(res?.data);
            }
          } else {
            DeclineSnackMessage()
          }
        })
        .catch((err) => {
          setLoader(false);
          console.log(err);
          DeclineSnackMessage()
        });
      // router.push("placeorder");

      // router.push("placeorder");
    } catch (error) {
      setLoader(false);
      DeclineSnackMessage()
      console.error("Failed to checkout:", error);
    }
  };

  console.log(errors)

  useEffect(() => {
    if (billing_address) {
      setCityOptions(
        getCitiesForState(
          states.find((state) => state.label === billing_address[addressIndex]?.state)?.value ?? "",
        ),
      );
      setValue("address", billing_address[addressIndex]?.address ? billing_address[addressIndex]?.address : "")
      setValue("postal_code", billing_address[addressIndex]?.postal_code ? billing_address[addressIndex]?.postal_code : "")
      setValue("phone_number", billing_address[addressIndex]?.phone_number ? billing_address[addressIndex]?.phone_number : "")
      const xCity = cities
        .find(
          (state) =>
            state.stateCode ==
            states.find((state) => state.label === billing_address[addressIndex]?.state)?.value)
        ?.city.find((city) => city.label == billing_address[addressIndex]?.city)
        ?.value.toString() ?? "";

      setValue("city", xCity);

      const xState = billing_address[addressIndex]?.state
        ? states.find((state) => state.label === billing_address[addressIndex]?.state)?.value
        : "";
      console.log("city",xCity)

      setValue("state", xState ?? "");
    }
  }, [addressIndex, billing_address])

  const onChange = (val: number) => {
    setAddressIndex(val)
  };

  useEffect(() => {
    if (!billing_address?.[0]) return;
    setShowFormFields(false)
  }, [billing_address])

  return (
    <div className="mx-auto w-full rounded-lg border bg-white p-4 shadow-input dark:bg-slate-800 md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        {title}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        {subTitle}
      </p>

      <form className="mb-4 mt-8" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">

          <Label htmlFor="email" required>
            Email Address
          </Label>
          <InputEmail
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={checkoutData?.email ?? ""}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </LabelInputContainer>
        {billing_address?.[0] && (
          <div className="flex justify-end cursor-pointer text-red-500" onClick={() => setShowFormFields(!showFormFields)}>{showFormFields ? (<div className="flex items-center">{<BsPencilSquare />} <div className="ml-1">Use Existing Address</div></div>) : (<div className="flex items-center">{<BsPlusCircle />} <div className="ml-1">Add New Billing Address</div></div>)}</div>
        )}
        {!showFormFields && billing_address?.[0] && (
          <ScrollArea className="h-[15rem] flex-1 rounded-lg border p-4 dark:bg-slate-800 mb-2 mt-2">
            {billing_address?.map((item, index) => (
              <React.Fragment key={index}>
                <div className="rounded-lg border bg-white p-2 shadow-input dark:bg-slate-900 md:rounded-2xl m-2">


                  <label className="flex items-center gap-4">

                    <input
                      type="radio"
                      value={index}
                      checked={addressIndex === index}
                      onChange={() => onChange(index)}
                      className="form-radio"
                    />
                    <div>
                      <div className="font-semibold">Billing Address {index + 1}: {item.phone_number} </div>


                    </div>
                  </label>
                  <div className="flex"><div className="mr-2 text-sm  rounded bg-red-500 px-1 py-0.5 text-[8px] text-white sm:px-2 sm:py-[2px]">Home </div><div>{item.address}</div></div>
                  <div className="flex mb-4"><div className="font-semibold mr-2 text-sm text-gray-400">Region: </div><div className="text-sm text-gray-400">{item.state}, {item.city}, {item.postal_code}</div></div>

                </div>

                {/* <div className="font-semibold">Billing Address {index + 1} </div>
            <div className="flex"><div className="font-semibold mr-2">Address: </div><div>{item.address}</div></div>
            <div className="flex"><div className="font-semibold mr-2">State: </div><div>{item.state}</div></div>
            <div className="flex mb-3"><div className="font-semibold mr-2">City: </div><div>{item.city}</div></div> */}

              </React.Fragment>

            ))}
          </ScrollArea>
        )}
        {(!billing_address?.[0] || showFormFields) && (
          <>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="address" required>
                Street Address
              </Label>
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
                <Label htmlFor="postal_code" required>
                  Zip/Postal Code
                </Label>
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
                <Label htmlFor="country" required>
                  Country
                </Label>

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
                <Label htmlFor="state" required>
                  State/Province
                </Label>
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
                <Label htmlFor="city" required>
                  City
                </Label>
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
              <Label htmlFor="phone_number" required>
                Phone Number
              </Label>
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
          </>
        )}

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
          title="Confirm &rarr;"
          type="submit"
          width="w-full"
          loading={loader}
          disabled={disabled}
          onClick={() => {
            //
          }}
        />
      </form>
    </div >
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
