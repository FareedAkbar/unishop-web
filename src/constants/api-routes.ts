export const BACKEND_BASE_URL_IPOS =
  process.env.NEXT_PUBLIC_PASSKEY_IPOS ?? "http://localhost:3000";
export const BACKEND_BASE_URL_BOOKNET =
  process.env.NEXT_PUBLIC_PASSKEY_BOOKNET ?? "http://localhost:3000";

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
  POSTAGE_AND_HANDLING = "/postage-and-handling",
  REFUND_AND_RETURNS = "/refunds-and-returns",
  TERMS_AND_CONDITION = "/terms-and-conditions",
  ABOUT = "/about-us",
  CONTACT_US = "/contact-us",
  ACADEMIC_DRESS_HIRE = "/academic-dress-hire",
  SPECIAL_ORDER = "/special-order",
  MY_ORDERS = "/my-orders",
  ORDER_CONFIRMED = "/order-confirmed",
  PRIVACY_POLICY = "/privacy-policy",
  FAVORITES = "/favorites",
  PRODUCTS = "/products",
  PRODUCT_DETAILS = "/product-details",
  COMPARE_PRODUCTS = "/compare-products",
  RESULT = "/result",
  FORGOT_PASSWORD = "/forgot-password"
}

export const API_ROUTES = {
  LOGIN: `${BACKEND_BASE_URL_IPOS}api/v1/student/auth/login`,
  LOGIN_WEB: `${BACKEND_BASE_URL_IPOS}api/v1/student/auth/login-web`,
  SENDOTP: `${BACKEND_BASE_URL_IPOS}api/v1/student/auth/send-otp`,
  VERIFYOTP: `${BACKEND_BASE_URL_IPOS}api/v1/student/auth/verify-login-otp`,
  CHECK_EMAIL: `${BACKEND_BASE_URL_BOOKNET}api/customer/check-customer-email`,
  VERIFY_SIGNUP_OTP: `${BACKEND_BASE_URL_BOOKNET}api/customer/varify-customer-otp`,
  RESET_PASSWORD_OTP: `${BACKEND_BASE_URL_BOOKNET}api/customer/reset-customer-password-otp`,
  UPDATE_PASSWORD: `${BACKEND_BASE_URL_BOOKNET}api/customer/update-customer-password`,
  GENRE: `${BACKEND_BASE_URL_BOOKNET}api/genre`,
  CATEGORY: `${BACKEND_BASE_URL_BOOKNET}api/category/type`,
  SUB_CATEGORY: `${BACKEND_BASE_URL_BOOKNET}api/category`,
  CHECKOUT: `${BACKEND_BASE_URL_BOOKNET}api/customer`,
  // CHECKOUT_WITH_USERNAME = "https://booknet-dev.iconsole.com.au/api/customer",
  REGISTER: "/api/auth/register",
  SIGN_OUT: "/api/auth/sign-out",
};
