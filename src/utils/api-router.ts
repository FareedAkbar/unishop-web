/* eslint-disable @typescript-eslint/no-unused-vars */

import { localStorageClient } from "~/clients/localstorage-client";
import { API_ROUTES } from "~/constants/api-routes";
import { Booknet_customer_checkout } from "~/types/checkoutForm";
import {Login, SendOTP, VerifyOTP} from "~/types/login";
import Register from "~/types/register";

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
  const token = localStorageClient().getItem("TOKEN") ? localStorageClient().getItem("TOKEN") : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MzI3LCJwcm9maWxlX2lkIjoxNzYsIm91dGxldF9pZCI6MjIxLCJmaXJzdF9uYW1lIjoiSW1wYWN0IiwibGFzdF9uYW1lIjoiQWRtaW4iLCJ0ZW1wbGF0ZV9pZCI6NSwicGFzc3BvcnRfbm8iOm51bGwsImRhdGVfb2ZfYmlydGgiOm51bGwsImdlbmRlciI6bnVsbCwiZGVzaWduYXRpb25faWQiOls4LDgsOCw4LDgsOF0sImVtYWlsIjoic2hhbXMucWF6aUBpaXRzb2xzLmNvbSIsInBob25lX251bWJlciI6bnVsbCwic2lnbl91cCI6bnVsbCwiY3JlYXRlZF9hdCI6bnVsbCwic2Vzc2lvbl9pZCI6OTk5OCwic2FsdCI6bnVsbCwiaWF0IjoxNzIzMDA0Nzg4fQ.v53sa7lIH1NnkxnYhxIwTeQIt1juzSwKEVQ3Z_cq-Nw';

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