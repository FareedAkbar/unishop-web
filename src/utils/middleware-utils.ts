import { cookieClient } from "~/clients/cookie-client";
import { NextRequest, NextResponse } from "next/server";
import { API_ROUTES, PAGE_ROUTES } from "~/constants/api-routes";
import { PAGE_MAPPER, RESPONSE_MAPPER } from "~/constants/middleware-mapper";

export const routerReader = (req: NextRequest) => {
  const { getItem } = cookieClient(req);
  const URL = matchRoute(req.nextUrl.pathname);

  const REQ_ORIGIN = getItem("REQ_ORIGIN");
  const IS_LOGGED_IN = getItem("IS_LOGGED_IN");

  const _RESPONSE_MAPPER = RESPONSE_MAPPER(req.url, REQ_ORIGIN);

  // Removed unnecessary type assertion
  const IS_PAGE_OR_API = "PAGE"; // This can be inferred as a string

  const pageRoute = PAGE_MAPPER[URL as Exclude<PAGE_ROUTES, PAGE_ROUTES.UNKNOWN>];

  // PAGE
  if (pageRoute) {
    return {
      ...pageRoute,
      URL,
      REQ_ORIGIN,
      IS_LOGGED_IN,
      IS_PAGE_OR_API,
      NOT_FOUND: false,
      IS_HOME: URL === PAGE_ROUTES.HOME,
      RESPONSE_MAPPER: _RESPONSE_MAPPER,
    };
  }

  // NOT FOUND
  return {
    URL,
    REQ_ORIGIN,
    IS_LOGGED_IN,
    IS_PAGE_OR_API,
    PUBLIC: false,
    IS_HOME: false,
    NOT_FOUND: true,
    PROTECTED: false,
    RESPONSE_MAPPER: _RESPONSE_MAPPER,
  };
};

export const saveReqOrigin = (req: NextRequest) => {
  if (req.nextUrl.pathname === embedAppIdSlug(PAGE_ROUTES.NOT_FOUND, req.url)) {
    return NextResponse.next();
  }

  const pageName = req.nextUrl.pathname;
  const searchParams = req.nextUrl.searchParams.size > 0 ? `?${req.nextUrl.searchParams.toString()}` : "";
  const res = NextResponse.next();

  cookieClient(req, res).setItem("REQ_ORIGIN", pageName + searchParams);

  return res;
};

const matchRoute = (route: string): API_ROUTES | PAGE_ROUTES => {
  const enumValues = [...Object.values(PAGE_ROUTES), ...Object.values(API_ROUTES)];

  for (const enumRoute of enumValues) {
    // Replace dynamic segments like :id with a regex pattern that matches any segment
    const regex = new RegExp(`^${enumRoute.replace(/:[^/]+/g, "[^/]+")}$`);
    if (regex.test(route)) {
      return enumRoute as API_ROUTES; // Still necessary to cast, since API_ROUTES is a union type
    }
  }

  return PAGE_ROUTES.UNKNOWN;
};

export const embedAppIdSlug = (route: PAGE_ROUTES | API_ROUTES, _urlOrAppId: string): string => {
  return route; // Ensure this returns a string
};
