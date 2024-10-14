export const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3000";

export enum PAGE_ROUTES {
  HOME = "/",
  LOGIN = "/login",
  REGISTER = "/signup",
  NOT_FOUND = "/404",
  UNKNOWN = "/unknown",
  GIFTS = "/gifts",
  BOOKS = "/books",
  CHECKOUT = "/checkout",
  PLACEORDER = "/placeorder",
  TEXTBOOKS = "/textbooks",
  POSTAGE_AND_HANDLING = "/postage-and-handling",
  REFUND_AND_RETURNS = "/refunds-and-returns",
  TERMS_AND_CONDITION = "/terms-and-conditions",
  ABOUT = "/about",
  CONTACT_US = "/contact-us",
  ACADEMIC_DRESS_HIRE = "/academic-dress-hire",
  SPECIAL_ORDER = "/special-order",
  MY_ORDERS = "/my-orders",
  ORDER_CONFIRMED = "/order-confirmed",
  PRIVACY_POLICY = "/privacy-policy"
}

export enum API_ROUTES {
  LOGIN = "https://ipos-dev.iconsole.com.au/api/v1/student/auth/login",
  SENDOTP = "https://ipos-dev.iconsole.com.au/api/v1/student/auth/send-otp",
  VERIFYOTP = "https://ipos-dev.iconsole.com.au/api/v1/student/auth/verify-login-otp",
  GENRE = "https://booknet-dev.iconsole.com.au/api/genre",
  CATEGORY = "https://booknet-dev.iconsole.com.au/api/genre/categories",
  CHECKOUT = "https://booknet-dev.iconsole.com.au/api/customer",
  // CHECKOUT_WITH_USERNAME = "https://booknet-dev.iconsole.com.au/api/customer",
  REGISTER = "/api/auth/register",
  SIGN_OUT = "/api/auth/sign-out",
}
