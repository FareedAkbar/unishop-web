import { NextResponse } from "next/server";
import { PAGE_ROUTES } from "./api-routes";

export const PAGE_MAPPER: Record<Exclude<PAGE_ROUTES, PAGE_ROUTES.UNKNOWN>, { PUBLIC: boolean; PROTECTED: boolean }> = {
  [PAGE_ROUTES.HOME]: {
    PUBLIC: true,
    PROTECTED: true,
  },
  [PAGE_ROUTES.LOGIN]: {
    PUBLIC: true,
    PROTECTED: false,
  },
  [PAGE_ROUTES.REGISTER]: {
    PUBLIC: true,
    PROTECTED: false,
  },

  [PAGE_ROUTES.NOT_FOUND]: {
    PUBLIC: true,
    PROTECTED: true,
  },
  [PAGE_ROUTES.GIFTS]: {
    PUBLIC: true,
    PROTECTED: true,
  },
  [PAGE_ROUTES.BOOKS]: {
    PUBLIC: true,
    PROTECTED: true,
  },
  [PAGE_ROUTES.CHECKOUT]: {
    PUBLIC: true,
    PROTECTED: true,
  },
  [PAGE_ROUTES.TEXTBOOKS]: {
    PUBLIC: true,
    PROTECTED: true,
  },
  [PAGE_ROUTES.PLACEORDER]: {
    PUBLIC: true,
    PROTECTED: true,
  },
  [PAGE_ROUTES.ACADEMIC_DRESS_HIRE]: {
    PUBLIC: true,
    PROTECTED: true,
  },
  [PAGE_ROUTES.ABOUT]: {
    PUBLIC: true,
    PROTECTED: true,
  },
  [PAGE_ROUTES.CONTACT_US]: {
    PUBLIC: true,
    PROTECTED: true,
  },
  [PAGE_ROUTES.POSTAGE_AND_HANDLING]: {
    PUBLIC: true,
    PROTECTED: true,
  },
  [PAGE_ROUTES.REFUND_AND_RETURNS]: {
    PUBLIC: true,
    PROTECTED: true,
  },
  [PAGE_ROUTES.TERMS_AND_CONDITION]: {
    PUBLIC: true,
    PROTECTED: true,
  },
  [PAGE_ROUTES.SPECIAL_ORDER]: {
    PUBLIC: true,
    PROTECTED: true,
  },
  [PAGE_ROUTES.MY_ORDERS]: {
    PUBLIC: true,
    PROTECTED: true,
  },
  [PAGE_ROUTES.ORDER_CONFIRMED]: {
    PUBLIC: true,
    PROTECTED: true,
  },
  [PAGE_ROUTES.PRIVACY_POLICY]: {
    PUBLIC: true,
    PROTECTED: true,
  },
  [PAGE_ROUTES.FAVORITES]: {
    PUBLIC: true,
    PROTECTED: true,
  },
  [PAGE_ROUTES.CLOTHS]: {
    PUBLIC: true,
    PROTECTED: true,
  },
  [PAGE_ROUTES.PRODUCTS]: {
    PUBLIC: true,
    PROTECTED: true,
  },
};

// export const RESPONSE_MAPPER1 = (url: string, REQ_ORIGIN: string) => {
//   return {
//     PAGE: {
//       NOT_FOUND: NextResponse.redirect(new URL(PAGE_ROUTES.NOT_FOUND, url)),
//       ONLY_PUBLIC: NextResponse.redirect(new URL(PAGE_ROUTES.HOME, url)), // Redirect to home for logged-in users
//       UNAUTHORIZED: NextResponse.redirect(new URL(PAGE_ROUTES.LOGIN, url)),
//       BASE: NextResponse.redirect(new URL(PAGE_ROUTES.HOME, url)), // Home page redirection for logged-in users
//     },
//   };
// };

export const RESPONSE_MAPPER = (url: string, REQ_ORIGIN: string) => {
  return {
    PAGE: {
      NOT_FOUND: NextResponse.redirect(new URL(PAGE_ROUTES.NOT_FOUND, url)),
      ONLY_PUBLIC: NextResponse.redirect(new URL(REQ_ORIGIN, url)),
      UNAUTHORIZED: NextResponse.redirect(new URL(PAGE_ROUTES.LOGIN, url)),
      BASE: NextResponse.redirect(new URL(PAGE_ROUTES.HOME, url)),
    },
  };
};