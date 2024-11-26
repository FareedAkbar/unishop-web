import { z } from "zod";
// Example ZIP code validation functions
const zipCodeFormats: Record<string, RegExp> = {
  "United States": /^\d{5}(-\d{4})?$/, // US ZIP code
  Canada: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/, // Canadian postal code
  "United Kingdom": /^[A-Za-z]{1,2}\d[A-Za-z\d]? \d[A-Za-z]{2}$/, // UK postcode
  Australia: /^\d{4}$/, // Australia postcode
  Germany: /^\d{5}$/, // Germany postal code
  France: /^\d{5}$/, // France postal code
  Italy: /^\d{5}$/, // Italy postal code
  India: /^\d{6}$/, // India PIN code
  Japan: /^\d{3}-\d{4}$/, // Japan postal code
  China: /^\d{6}$/, // China postal code
  Brazil: /^\d{5}-\d{3}$/, // Brazil postal code
  Mexico: /^\d{5}$/, // Mexico postal code
  Spain: /^\d{5}$/, // Spain postal code
  Netherlands: /^\d{4} \w{2}$/, // Netherlands postal code
  Sweden: /^\d{3} \d{2}$/, // Sweden postal code
  Switzerland: /^\d{4}$/, // Switzerland postal code
  Belgium: /^\d{4}$/, // Belgium postal code
  Austria: /^\d{4}$/, // Austria postal code
  Denmark: /^\d{4}$/, // Denmark postal code
  Norway: /^\d{4}$/, // Norway postal code
  Finland: /^\d{5}$/, // Finland postal code
  Poland: /^\d{2}-\d{3}$/, // Poland postal code
  Russia: /^\d{6}$/, // Russia postal code
  "South Korea": /^\d{5}$/, // South Korea postal code
  Thailand: /^\d{5}$/, // Thailand postal code
  Singapore: /^\d{6}$/, // Singapore postal code
  "Hong Kong": /^[A-Z]{1,2}\d{1,2} \d{4}$/, // Hong Kong postal code
  Taiwan: /^\d{3}$/, // Taiwan postal code
  Israel: /^\d{7}$/, // Israel postal code
  "South Africa": /^\d{4}$/, // South Africa postal code
  Argentina: /^\d{4}[A-Z]{3}$/, // Argentina postal code
  Chile: /^\d{7}$/, // Chile postal code
  Colombia: /^\d{6}$/, // Colombia postal code
  Peru: /^\d{5}$/, // Peru postal code
  Venezuela: /^\d{4}$/, // Venezuela postal code
  Ukraine: /^\d{5}$/, // Ukraine postal code
  Turkey: /^\d{5}$/, // Turkey postal code
  "New Zealand": /^\d{4}$/, // New Zealand postal code
  Malaysia: /^\d{5}$/, // Malaysia postal code
  Philippines: /^\d{4}$/, // Philippines postal code
  "Saudi Arabia": /^\d{5}$/, // Saudi Arabia postal code
  "United Arab Emirates": /^\d{5}$/, // UAE postal code
  Qatar: /^\d{5}$/, // Qatar postal code
  Kuwait: /^\d{5}$/, // Kuwait postal code
  Oman: /^\d{6}$/, // Oman postal code
  Bahrain: /^\d{3}$/, // Bahrain postal code
  Iceland: /^\d{3}$/, // Iceland postal code
  Liechtenstein: /^\d{4}$/, // Liechtenstein postal code
  Andorra: /^\d{3}$/, // Andorra postal code
  "San Marino": /^\d{5}$/, // San Marino postal code
  Monaco: /^\d{5}$/, // Monaco postal code
  "Vatican City": /^\d{5}$/, // Vatican City postal code
  Malta: /^[A-Z]{3} \d{4}$/, // Malta postal code
  Luxembourg: /^\d{4}$/, // Luxembourg postal code
  Montenegro: /^\d{5}$/, // Montenegro postal code
  "Bosnia and Herzegovina": /^\d{5}$/, // Bosnia and Herzegovina postal code
  "North Macedonia": /^\d{4}$/, // North Macedonia postal code
  Serbia: /^\d{5}$/, // Serbia postal code
  Albania: /^\d{4}$/, // Albania postal code
  Kosovo: /^\d{5}$/, // Kosovo postal code
  Armenia: /^\d{4}$/, // Armenia postal code
  Georgia: /^\d{4}$/, // Georgia postal code
  Azerbaijan: /^\d{4}$/, // Azerbaijan postal code
  Kazakhstan: /^\d{6}$/, // Kazakhstan postal code
  Uzbekistan: /^\d{6}$/, // Uzbekistan postal code
  Turkmenistan: /^\d{6}$/, // Turkmenistan postal code
  Kyrgyzstan: /^\d{6}$/, // Kyrgyzstan postal code
  Tajikistan: /^\d{6}$/, // Tajikistan postal code
  Mongolia: /^\d{6}$/, // Mongolia postal code
  "Sri Lanka": /^\d{5}$/, // Sri Lanka postal code
  Nepal: /^\d{5}$/, // Nepal postal code
  Bangladesh: /^\d{4}$/, // Bangladesh postal code
  Pakistan: /^\d{5}$/, // Pakistan postal code
  Myanmar: /^\d{5}$/, // Myanmar postal code
  Laos: /^\d{5}$/, // Laos postal code
  Cambodia: /^\d{5}$/, // Cambodia postal code
  Vietnam: /^\d{6}$/, // Vietnam postal code
  Brunei: /^\d{6}$/, // Brunei postal code
  Palestine: /^\d{4}$/, // Palestine postal code
  Jordan: /^\d{5}$/, // Jordan postal code
  Lebanon: /^\d{4}$/, // Lebanon postal code
  Syria: /^\d{5}$/, // Syria postal code
  Iraq: /^\d{5}$/, // Iraq postal code
  Yemen: /^\d{5}$/, // Yemen postal code
  Libya: /^\d{5}$/, // Libya postal code
  Tunisia: /^\d{4}$/, // Tunisia postal code
  Morocco: /^\d{5}$/, // Morocco postal code
  Algeria: /^\d{5}$/, // Algeria postal code
  Egypt: /^\d{5}$/, // Egypt postal code
  Mauritania: /^\d{5}$/, // Mauritania postal code
  "Western Sahara": /^\d{5}$/, // Western Sahara postal code
  Angola: /^\d{6}$/, // Angola postal code
  Botswana: /^\d{3}$/, // Botswana postal code
  Eswatini: /^\d{4}$/, // Eswatini postal code
  Lesotho: /^\d{3}$/, // Lesotho postal code
  Namibia: /^\d{5}$/, // Namibia postal code
  Zambia: /^\d{5}$/, // Zambia postal code
  Zimbabwe: /^\d{5}$/, // Zimbabwe postal code
  Ghana: /^\d{5}$/, // Ghana postal code
  Nigeria: /^\d{6}$/, // Nigeria postal code
  "Ivory Coast": /^\d{5}$/, // Ivory Coast postal code
  Senegal: /^\d{5}$/, // Senegal postal code
  Mali: /^\d{5}$/, // Mali postal code
  "Burkina Faso": /^\d{5}$/, // Burkina Faso postal code
  Niger: /^\d{5}$/, // Niger postal code
  Chad: /^\d{5}$/, // Chad postal code
  "Central African Republic": /^\d{5}$/, // Central African Republic postal code
  "South Sudan": /^\d{5}$/, // South Sudan postal code
  Somalia: /^\d{5}$/, // Somalia postal code
  Djibouti: /^\d{5}$/, // Djibouti postal code
  Eritrea: /^\d{5}$/, // Eritrea postal code
  Seychelles: /^\d{4}$/, // Seychelles postal code
  Comoros: /^\d{4}$/, // Comoros postal code
  Madagascar: /^\d{3}$/, // Madagascar postal code
  Mauritius: /^\d{3}$/, // Mauritius postal code
  Réunion: /^\d{5}$/, // Réunion postal code
  "Saint Pierre and Miquelon": /^\d{5}$/, // Saint Pierre and Miquelon postal code
  "French Polynesia": /^\d{5}$/, // French Polynesia postal code
  "New Caledonia": /^\d{5}$/, // New Caledonia postal code
  "Wallis and Futuna": /^\d{5}$/, // Wallis and Futuna postal code
  Vanuatu: /^\d{4}$/, // Vanuatu postal code
  "Solomon Islands": /^\d{4}$/, // Solomon Islands postal code
  Tonga: /^\d{3}$/, // Tonga postal code
  Samoa: /^\d{5}$/, // Samoa postal code
  Kiribati: /^\d{4}$/, // Kiribati postal code
  Tuvalu: /^\d{4}$/, // Tuvalu postal code
  Nauru: /^\d{4}$/, // Nauru postal code
  Palau: /^\d{5}$/, // Palau postal code
  "Marshall Islands": /^\d{5}$/, // Marshall Islands postal code
  "Federated States of Micronesia": /^\d{5}$/, // Federated States of Micronesia postal code
  "Northern Mariana Islands": /^\d{5}$/, // Northern Mariana Islands postal code
  "American Samoa": /^\d{5}$/, // American Samoa postal code
  Guam: /^\d{5}$/, // Guam postal code
  "U.S. Virgin Islands": /^\d{5}$/, // U.S. Virgin Islands postal code
};
const isValidZipCode = (zip: string, country: string): boolean => {
  const format = zipCodeFormats[country];
  return format ? format.test(zip) : false;
};
const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  user_password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
const verifyOtpSchema = z.object({
  otp: z.string().min(4, { message: "OTP must be at least 4 characters long" }),
});

// Define the schema
const SignupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postal_code: z.string().min(1, "Postal code is required"),
    country: z.string().optional(),
    phone_number: z
      .string()
      .min(1, "Phone Number is required")
      .regex(/^\(0[4]\) \d{4} \d{4}$/, "Invalid mobile number "),
  })
  .superRefine((data, ctx) => {
    const { postal_code, country } = data;

    // Ensure that country is set
    if (country && postal_code && !isValidZipCode(postal_code, "Australia")) {
      ctx.addIssue({
        path: ["postal_code"],
        message: "Invalid postal code for the given country",
        code: z.ZodIssueCode.custom,
      });
    }
  });
// Define the Zod schema
const CehckoutFormSchema = z
  .object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    company: z.string().optional(),
    streetAddress: z.string(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "Zip Code is required"),
    country: z.string().optional(),
    phoneNumber: z
      .string()
      .min(1, "Phone Number is required")
      .regex(/^\(0[4]\) \d{4} \d{4}$/, "Invalid mobile number format"),
    shippingMethod: z.string().min(1, "Shipping Method is required"),
  })
  .superRefine((data, ctx) => {
    const { zip, country } = data;

    // Ensure that country is set
    if (country && zip && !isValidZipCode(zip, "Australia")) {
      ctx.addIssue({
        path: ["zip"],
        message: "Invalid ZIP code for the given country",
        code: z.ZodIssueCode.custom,
      });
    }
  });

const booknetFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
});

export {
  LoginSchema,
  SignupSchema,
  CehckoutFormSchema,
  verifyOtpSchema,
  booknetFormSchema,
};
