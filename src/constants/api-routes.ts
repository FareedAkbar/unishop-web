export const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3000";

export enum PAGE_ROUTES {
  HOME = "/",
  LOGIN = "/login",
  REGISTER = "/signup",
  NOT_FOUND = "/404",
  UNKNOWN = "/unknown",
  GIFTS = "/gifts",
  BOOKS = "/books",
  CHECKOUT = "/checkout"
}

export enum API_ROUTES {
  LOGIN = "https://api.iconsole.com.au/api/v1/ipos/auth/login",
  REGISTER = "/api/auth/register",
  SIGN_OUT = "/api/auth/sign-out",
}
