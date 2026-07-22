/* eslint-disable @typescript-eslint/await-thenable */
import { cookieClient } from "~/clients/cookie-client";
import { type NextRequest, NextResponse } from "next/server";
import { API_ROUTES, PAGE_ROUTES } from "~/constants/api-routes";
import { PAGE_MAPPER, RESPONSE_MAPPER } from "~/constants/middleware-mapper";
import { cookies } from 'next/headers'


export async function create() {
  const cookieStore = await cookies()
  const x = cookieStore.get('IS_LOGGED_IN');

  return x?.value ? true : false



}
export const routerReader = (req: NextRequest) => {
  const { getItem } = cookieClient(req);
  const URL = matchRoute(req.nextUrl.pathname) as typeof PAGE_ROUTES[keyof typeof PAGE_ROUTES];

  const REQ_ORIGIN = getItem("REQ_ORIGIN");
  const _RESPONSE_MAPPER = RESPONSE_MAPPER(req.url, REQ_ORIGIN);

  // Get the 'IS_LOGGED_IN' cookie value

  // cookieStore.get('IS_LOGGED_IN')?.value === 'true';
  const IS_LOGGED_IN = create()

  const IS_PAGE_OR_API = "PAGE"; // For now, always assume it's a page

  const pageRoute = PAGE_MAPPER[URL as Exclude<PAGE_ROUTES, PAGE_ROUTES.UNKNOWN>];

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

type AllRoutes = typeof PAGE_ROUTES[keyof typeof PAGE_ROUTES] | typeof API_ROUTES[keyof typeof API_ROUTES];

const matchRoute = (route: string): AllRoutes => {
  const enumValues = [...Object.values(PAGE_ROUTES), ...Object.values(API_ROUTES)];

  for (const enumRoute of enumValues) {
    const regex = new RegExp(`^${enumRoute.replace(/:[^/]+/g, "[^/]+")}$`);
    if (regex.test(route)) {
      return enumRoute;
    }
  }

  return PAGE_ROUTES.UNKNOWN;
};

export const embedAppIdSlug = (route: string, _urlOrAppId: string): AllRoutes => {
  return route; // Ensure this returns a string
};
