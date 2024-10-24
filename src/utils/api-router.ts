/* eslint-disable @typescript-eslint/no-unused-vars */

import { localStorageClient } from "~/clients/localstorage-client";
import { API_ROUTES } from "~/constants/api-routes";
import type { Booknet_customer_checkout } from "~/types/checkoutForm";
import type {Login, SendOTP, VerifyOTP} from "~/types/login";
import type Register from "~/types/register";
import { token221, token223 } from "~/types/tokens";

export const apiRouter = async <T extends keyof typeof API_TYPE_MAPPER>(
  input: T,
  init?: RequestInit & {
    routeParam?: string; // only supports 1 route param, and it should be the last one
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryParams?: string; // only supports object of depth 1
  },
  options?: {
    skipAuthorization?: boolean;
    skipContentType?: boolean;
    skipCredentials?: boolean;
    skipBaseUrl?: boolean;
  },
) => {
  const headers = new Headers(init?.headers);
  const token = token223;
  // const token = localStorageClient().getItem("TOKEN") ? localStorageClient().getItem("TOKEN") : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MzU0LCJwcm9maWxlX2lkIjoyMDMsIm91dGxldF9pZCI6MjIzLCJmaXJzdF9uYW1lIjoiU2hpbnphIiwibGFzdF9uYW1lIjoiR3VsIiwidGVtcGxhdGVfaWQiOjUsInBhc3Nwb3J0X25vIjpudWxsLCJkYXRlX29mX2JpcnRoIjpudWxsLCJnZW5kZXIiOm51bGwsImRlc2lnbmF0aW9uX2lkIjpbOCwxXSwiZW1haWwiOiJzaGluemEuZ3VsNDFAZ21haWwuY29tIiwicGhvbmVfbnVtYmVyIjoiMzQ1Njc4OTA0NTY3Iiwic2lnbl91cCI6IjIwMjQtMDEtMjJUMDg6MTk6NDEuMDAwWiIsImNyZWF0ZWRfYXQiOiIyMDI0LTAxLTIyVDA4OjE5OjQxLjAwMFoiLCJzZXNzaW9uX2lkIjoxMDk1NCwic2FsdCI6bnVsbCwiaWF0IjoxNzI4MzEwMzk3fQ.LJUiDLcMcXSDXWPvFi-qqx-lQJ_wVE9gdoG7iW5krkM';

  if (!options?.skipAuthorization && token) {
    headers.set("Authorization",`Bearer ${token}`);
  }
  if (!options?.skipContentType) {
    headers.set("Content-Type", "application/json");
  }
  if (!options?.skipCredentials) {
    headers.set("credentials", "include");
  }


  let apiRouter: string = API_ROUTES[input];
  if (init?.routeParam) {
    apiRouter = API_ROUTES[input] + "/" + init?.routeParam;
  }
  if (init?.queryParams) {
    // const params = new URLSearchParams(init?.queryParams);
    // const paramsString = typeof params === 'string' ? params : JSON.stringify(params);
    apiRouter += "?" + init?.queryParams; // Now you can safely concatenate
  }

  const response = await fetch(apiRouter, {
    ...init,
    headers,
  });

  // handle 401 error
  if (response.status === 401) {
    console.log("Unauthorized");

    // localStorage.clear();
  }

  const _ = API_TYPE_MAPPER[input];
  return response as Omit<Response, "json"> & { json: () => Promise<typeof _> };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const API_TYPE_MAPPER: Record<keyof typeof API_ROUTES, any> = {
  LOGIN: {} as Login,
  SENDOTP: {} as SendOTP,
  VERIFYOTP: {} as VerifyOTP,
  REGISTER: {} as Register,
  CHECKOUT: {} as Register | Booknet_customer_checkout,
  // CHECKOUT_WITH_USERNAME: {} as Booknet_customer_checkout | Register,
  GENRE: {} as unknown,
  CATEGORY: {} as unknown,
  SIGN_OUT: {} as unknown,
};