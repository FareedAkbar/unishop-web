// import { postLoginProfilerResType } from "@/app/api/auth/login/validators";
import type DataCart from "~/types/book";
import type UserType from "~/types/userType";
import { isStringified } from "~/utils";

const STORAGE_MAPPER = {
  USER_INFO: {
    TYPE: {} as UserType | null,
    KEY: "user-info",
    DEFAULT: null,
  },
  IS_LOGGED_IN: {
    TYPE: {} as boolean,
    KEY: "is-logged-in",
    DEFAULT: false,
  },
  CART_ITEM:{
    TYPE:[] as DataCart[],
    KEY:"cart-items",
    DEFAULT:[]
  }
};

export const localStorageClient = () => {
  const getItem = <T extends keyof typeof STORAGE_MAPPER>(key: T): (typeof STORAGE_MAPPER)[T]["TYPE"] => {
    const item = localStorage.getItem(STORAGE_MAPPER[key].KEY) ?? STORAGE_MAPPER[key].DEFAULT;
    try {
      return isStringified(item)
        ? (JSON.parse(item) as (typeof STORAGE_MAPPER)[T]["TYPE"])
        : (item as unknown as (typeof STORAGE_MAPPER)[T]["TYPE"]);
    } catch (error) {
      console.log(error);
      return STORAGE_MAPPER[key].DEFAULT;
    }
  };

  const setItem = <T extends keyof typeof STORAGE_MAPPER>(key: T, value: (typeof STORAGE_MAPPER)[T]["TYPE"]) => {
    if (!value) {
      return;
    }
    
    localStorage.setItem(STORAGE_MAPPER[key].KEY, JSON.stringify(value));
  };

  const cleanStorage = (key?: keyof typeof STORAGE_MAPPER) => {
    if (key) {
      localStorage.removeItem(STORAGE_MAPPER[key].KEY);
      return;
    }

    const keys = Object.keys(STORAGE_MAPPER) as (keyof typeof STORAGE_MAPPER)[];

    for (const k of keys) {
      localStorage.removeItem(STORAGE_MAPPER[k].KEY);
    }
  };

  return { getItem, setItem, cleanStorage };
};