/* eslint-disable @typescript-eslint/no-unused-vars */

import { localStorageClient } from "~/clients/localstorage-client";
import { API_ROUTES } from "~/constants/api-routes";
import Login from "~/types/login";
import Register from "~/types/register";

export const apiRouter = async <T extends keyof typeof API_TYPE_MAPPER>(
  input: T,
  init?: RequestInit & {
    routeParam?: string; // only supports 1 route param, and it should be the last one
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryParams?: Record<string, string>; // only supports object of depth 1
  },
  options?: {
    skipAuthorization?: boolean;
    skipContentType?: boolean;
    skipCredentials?: boolean;
    skipBaseUrl?: boolean;
  },
) => {
  const headers = new Headers(init?.headers);
  const appType = window.location.pathname.split("/")?.[1] ?? "test-app";
  const token = localStorageClient().getItem("USER_INFO")?.access_token;

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
    const params = new URLSearchParams(init?.queryParams);
    const paramsString = typeof params === 'string' ? params : JSON.stringify(params);
    apiRouter += "?" + paramsString; // Now you can safely concatenate
  }

  const response = await fetch(apiRouter, {
    ...init,
    headers,
  });

  // handle 401 error
  if (response.status === 401) {
    console.log("Unauthorized");

    localStorage.clear();
  }

  const _ = API_TYPE_MAPPER[input];

  return response as Omit<Response, "json"> & { json: () => Promise<typeof _> };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const API_TYPE_MAPPER: Record<keyof typeof API_ROUTES, any> = {
  LOGIN: {} as Login,
  REGISTER: {} as Register,
  SIGN_OUT: {} as unknown,
};