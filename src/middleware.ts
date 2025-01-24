import type { NextRequest } from "next/server";
import { routerReader, saveReqOrigin } from "./utils/middleware-utils";

export async function middleware(req: NextRequest) {
  const {
    NOT_FOUND,
    PROTECTED,
    PUBLIC,
    IS_LOGGED_IN,
    IS_PAGE_OR_API,
    RESPONSE_MAPPER,
    REQ_ORIGIN,
    URL,
  } = routerReader(req);

  console.log("------------------");
  console.log({ NOT_FOUND, PROTECTED, PUBLIC, IS_LOGGED_IN, IS_PAGE_OR_API, REQ_ORIGIN, URL });

  // -------- NOT FOUND --------
  if (NOT_FOUND) {
    console.log("NOT FOUND");
    return RESPONSE_MAPPER[IS_PAGE_OR_API as keyof typeof RESPONSE_MAPPER]?.NOT_FOUND;
  }

  // -------- PUBLIC ROUTES --------
  if (PUBLIC) {
    console.log("PUBLIC");
    // STOP LOGGED-IN USERS FROM ACCESSING PUBLIC ROUTES LIKE LOGIN OR REGISTER
    if (await IS_LOGGED_IN && !PROTECTED) {
      console.log("LOGGED IN AND NOT PROTECTED - REDIRECTING TO HOME");
      return RESPONSE_MAPPER[IS_PAGE_OR_API as keyof typeof RESPONSE_MAPPER]?.BASE; // Redirect to home
    }
  }

  // -------- PROTECTED ROUTES --------
  else if (PROTECTED) {
    console.log("PROTECTED");
    // STOP NON-LOGGED-IN USERS FROM ACCESSING PROTECTED ROUTES
    if (!(await IS_LOGGED_IN)) {
      console.log("NOT LOGGED IN - REDIRECTING TO LOGIN");
      return RESPONSE_MAPPER[IS_PAGE_OR_API as keyof typeof RESPONSE_MAPPER]?.UNAUTHORIZED; // Redirect to login
    }
  }

  // SAVE PAGE REQUEST ORIGIN IN COOKIE
  if (IS_PAGE_OR_API === "PAGE") {
    console.log("SAVE REQ ORIGIN");
    return saveReqOrigin(req);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|assets).*)']
};
