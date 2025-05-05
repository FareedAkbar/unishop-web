"use client";
import { useParams, useRouter } from "next/navigation";
import React, {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { localStorageClient } from "~/clients/localstorage-client";
import type DataCart from "~/types/book";
import type { Login, SendOTP, VerifyOTP } from "~/types/login";

import type Register from "~/types/register";
import type UserType from "~/types/userType";
import { apiRouter } from "~/utils/api-router";
import type {
  address,
  Booknet_customer_checkout,
  checkoutBooknetResponse,
  CheckoutForm,
} from "~/types/checkoutForm";
import type { Genre, GenreResponse } from "~/types/genre";
import type {
  LoginData,
  LoginResponse,
  SendOTPResponse,
  VerifyOTPResponse,
} from "~/types/loginResponse";
import {
  SubCategoryResponse,
  SuperCategory,
  type Category,
  type CategoryResponse,
} from "~/types/category";
import { setCookie } from "~/utils/cookie";
import { VerifyOTPCApi } from "~/_actions/authLogin";
import { cookies } from "next/headers";
import { LogOutApi } from "~/_actions/logout";
import {
  addToFavourite,
  getFavouriteItems,
  removeFromFavourite,
} from "~/_actions/wishlist";
import type {
  addFavResponse,
  FavData,
  getFavResponse,
} from "~/types/favourite";
import { getProductTags } from "~/_actions/product_tags";
import type { ApiResponseStatus, ItemSpecialTag } from "~/types/productTags";
import { getItemsBySearch } from "~/_actions/getitemsbycategory";
import { getTextBookTypeData } from "~/_actions/meta_actions";
import { TextBookApiResponse, TextbookType } from "~/types/textbookType";

type transactionData = {
  transaction_id?: string | null;
  order_id?: number | null;
  tracking_id?: number | null;
};

interface AuthContextProps {
  isLoggedIn: boolean;
  userInfo?: UserType;
  login: (payload: Login) => Promise<LoginResponse | boolean>;
  sendOTP: (payload: SendOTP) => Promise<SendOTPResponse | boolean>;
  verifyOTP: (payload: VerifyOTP) => Promise<VerifyOTPResponse | boolean>;
  CheckoutApi: (payload: CheckoutForm) => Promise<checkoutBooknetResponse>;
  register: (payload: Register) => Promise<boolean>;
  logout: () => Promise<void>;
  getCheckoutFormData: () => Promise<boolean>;
  getGenre: () => Promise<boolean>;
  getCategory: () => Promise<boolean>;
  getSubCategory: (payload: number) => Promise<boolean>;
  addCartItems: (payload: DataCart) => Promise<boolean>;
  checkoutFormData: (payload: CheckoutForm) => Promise<boolean>;
  removeCartItems: (payload: DataCart) => Promise<boolean>;
  increaseCartItemQuantity: (
    item_id: number,
    quantity: number,
    variable_id?: number,
  ) => Promise<boolean>;
  cartItems?: DataCart[];
  genre?: Genre[] | null;
  category?: SuperCategory[] | null;
  subCategory?: Category[] | null;
  checkoutData: CheckoutForm | null;
  billing_address: address[] | null;
  appId: string;
  removeAllCartItems: () => Promise<boolean>;
  setTransactionData: (payload: transactionData | null) => Promise<boolean>;
  setUUID: (payload: string) => Promise<boolean>;
  setTheme: (payload: string) => void;
  CheckoutApiWithUserName: (
    payload: Booknet_customer_checkout,
  ) => Promise<checkoutBooknetResponse>;
  uuidLocal: string | undefined;
  token: string | undefined;
  themeMode: string;
  booknetCustomerId?: number | null;
  orderTransactionData?: transactionData | null;
  addFavourite: (
    item_id: DataCart,
    booknet_customer_id: number,
  ) => Promise<boolean>;
  removeFavourite: (
    item: DataCart,
    booknet_customer_id: number,
  ) => Promise<boolean>;
  getFavourite: (booknet_customer_id: number) => Promise<boolean>;
  favItems: DataCart[];
  setProductForDetail: (data: DataCart | null) => Promise<void>;
  productDetail: DataCart | null;
  getProductTagStatus: () => Promise<boolean>;
  productTags: ItemSpecialTag[] | null;
  setCheckoutData: React.Dispatch<SetStateAction<CheckoutForm | null>>;
  addBillingAddress: (data: address[] | null) => void;
  searchInCategory: (value: string, id: string) => Promise<boolean>;
  searchItems: DataCart[];
  textbookType: TextbookType[] | null;
  getTextBookType: () => Promise<boolean | void>;

}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const lsClient = localStorageClient();

  const slugParams = useParams();
  const appId = (slugParams["app-id"] as string) || "";

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserType | undefined>();

  const [token, setToken] = useState<string | undefined>();
  const [themeMode, setThemeMode] = useState<string>("");
  const [cartItems, setItems] = useState<DataCart[]>([]);
  const [searchItems, setSearchItems] = useState<DataCart[]>([]);
  const [favItems, setFavItems] = useState<DataCart[]>([]);
  const [orderTransactionData, setOrderTransactionData] =
    useState<transactionData | null>(null);
  const [genre, setGenre] = useState<Genre[] | null>([]);
  const [category, setCategory] = useState<SuperCategory[] | null>([]);
  const [subCategory, setSubCategory] = useState<Category[] | null>([]);
  const [uuidLocal, setUuidLocal] = useState<string | undefined>();
  const [checkoutData, setCheckoutData] = useState<CheckoutForm | null>(null);
  const [booknetCustomerId, setBooknetCustomerId] = useState<number | null>(
    null,
  );
  const [productDetail, setProductDetail] = useState<DataCart | null>(null);
  const [productTags, setProductTags] = useState<ItemSpecialTag[] | null>(null);
  const [textbookType, setTextbookType] = useState<TextbookType[] | null>(null);
  const [billing_address, setBillingAddress] = useState<address[] | null>(null);
  const router = useRouter();



  const addBillingAddress = (address: address[] | null) => {
    setBillingAddress(address);
    lsClient.setItem("BILLING_ADDRESS", address)
  }

  const login = async (payload: Login): Promise<LoginResponse | boolean> => {
    const response = await apiRouter(
      "LOGIN",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      { skipAuthorization: true },
    );

    const responsePayload: {
      status: boolean;
      data: LoginData;
      message: string;
    } = (await response.json()) as LoginResponse;
    if (responsePayload.status) {
      lsClient.setItem("IS_LOGGED_IN", true);
      return responsePayload;
    } else {
      throw new Error(responsePayload.message); // Throw an error with the message
    }

    // lsClient.setItem("TOKEN", responsePayload.token);
  };
  const sendOTP = async (
    payload: SendOTP,
  ): Promise<SendOTPResponse | boolean> => {
    const response = await apiRouter(
      "SENDOTP",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      { skipAuthorization: true },
    );

    const responsePayload: { status: boolean } =
      (await response.json()) as SendOTPResponse;
    if (responsePayload.status) {
      return responsePayload;
    } else {
      throw new Error("failed"); // Throw an error with the message
    }
  };
  const verifyOTP = async (
    payload: VerifyOTP,
  ): Promise<VerifyOTPResponse | boolean> => {
    const response = await VerifyOTPCApi(payload);

    const responsePayload: {
      status: boolean;
      data: UserType;
      message: string;
      token: string;
    } = response as VerifyOTPResponse;
    if (responsePayload.status) {
      setIsLoggedIn(true);
      console.log(responsePayload);
      setToken(responsePayload.token);
      setUserInfo(responsePayload.data);
      lsClient.setItem("USER_INFO", responsePayload.data);
      lsClient.setItem("TOKEN", responsePayload.token);
      lsClient.setItem("IS_LOGGED_IN", true);

      return responsePayload;
    } else {
      throw new Error(responsePayload.message); // Throw an error with the message
    }

    // lsClient.setItem("TOKEN", responsePayload.token);
  };

  const getGenre = async (): Promise<boolean> => {
    const response = await apiRouter(
      "GENRE",
      {
        method: "GET",
      },
      // { skipAuthorization: true },
    );

    if (!response.ok) return false;

    const responsePayload: { status: boolean; data: Genre[] } =
      (await response.json()) as GenreResponse;
    if (!responsePayload.status) return false;

    setGenre(responsePayload.data);

    lsClient.setItem("GENRE", responsePayload.data);

    return true;
  };

  interface ApiResponse {
    // meta: PaginationData; 
    data: DataCart[];
    status: boolean;
}
  const searchInCategory = async (value: string, id: string): Promise<boolean> => {
    const response = await getItemsBySearch(value,id);

    if (typeof response == "string") return false;

    const responsePayload: { status: boolean; data: DataCart[] } =
      response as ApiResponse;
    if (!responsePayload.status) return false;
    console.log(responsePayload.data)
    setSearchItems(responsePayload.data);

    return true;
  };

  const getCategory = async (): Promise<boolean> => {
    const response = await apiRouter(
      "CATEGORY",
      {
        method: "GET",
      },
      // { skipAuthorization: true },
    );

    if (!response.ok) return false;

    const responsePayload: { status: boolean; data: SuperCategory[] } =
      (await response.json()) as CategoryResponse;
    if (!responsePayload.status) return false;

    setCategory(responsePayload.data);

    lsClient.setItem("CATEGORY", responsePayload.data);

    return true;
  };
  const getSubCategory = async (payload: number): Promise<boolean> => {
    const response = await apiRouter(
      "SUB_CATEGORY",
      {
        method: "GET",
        queryParams:
          payload && payload > -1 ? `category_type_id=${payload}` : "",
      },
      // { skipAuthorization: true },
    );

    if (!response.ok) return false;

    const responsePayload: { status: boolean; data: Category[] } =
      (await response.json()) as SubCategoryResponse;
    if (!responsePayload.status) return false;

    setSubCategory(responsePayload.data);

    // lsClient.setItem("CATEGORY", responsePayload.data);

    return true;
  };

  const setTransactionData = async (
    payload: transactionData | null,
  ): Promise<boolean> => {
    setOrderTransactionData(payload);
    return true;
  };

  const setUUID = async (payload: string): Promise<boolean> => {
    lsClient.setItem("UUID", payload);
    setUuidLocal(payload);
    return true;
  };

  const setTheme = (payload: string) => {
    lsClient.setItem("THEME_MODE", payload);
    setThemeMode(payload);
  };

  const addFavourite = async (
    item: DataCart,
    booknet_customer_id: number,
  ): Promise<boolean> => {
    setFavItems((prevFavItems) => {
      // Check if the item already exists in the favorite list

      // Create a new item object that conforms to the FavData type
      const newItem: DataCart = item;

      const updatedFavItems = [...prevFavItems, newItem];
      return updatedFavItems;
    });
    const response = await addToFavourite(item.item_id, booknet_customer_id);
    const responsePayload: {
      status: boolean;
    } = response as addFavResponse;
    if (responsePayload.status) {
      return true;
    } else if (!responsePayload.status) {
      const itemExists = favItems.some((items) => items.item_id === item.item_id);
      if (itemExists) {
        setFavItems((prevFavItems) => {
          // If it exists, remove it by filtering out the item
          const updatedFavItems = prevFavItems.filter(
            (items) => items.item_id !== item.item_id,
          );
          return updatedFavItems;
        });
      }
      return false;
    } else {
      return false;
    }
  };
  const removeFavourite = async (
    item: DataCart,
    booknet_customer_id: number,
  ): Promise<boolean> => {
    const itemExists = favItems.some((items) => items.item_id === item.item_id);
    if (itemExists) {
      const newItemList = favItems.filter(
        (items) => items.item_id !== item.item_id,
      );
      setFavItems(newItemList);
      
      
      console.log(itemExists)
      console.log("favItems",favItems)

      console.log("newlist",newItemList)
    }
   
    const response = await removeFromFavourite(
      item.item_id,
      booknet_customer_id,
    );
    const responsePayload: {
      status: boolean;
    } = response as addFavResponse;
    if (responsePayload.status) {
      return true;
    } else if (!responsePayload.status) {
      const itemExistsAgain = favItems.some(
        (items) => items.item_id === item.item_id,
      );
      if (!itemExistsAgain) {
        setFavItems((prevFavItems) => {
          // Create a new item object that conforms to the FavData type
          const newItem: DataCart = item;

          const updatedFavItems = [...prevFavItems, newItem];
          return updatedFavItems;
        });
      }
      return false;
    } else {
      return false;
    }
    return false
  };
  const getFavourite = async (
    booknet_customer_id: number,
  ): Promise<boolean> => {
    const response = await getFavouriteItems(booknet_customer_id);
    const responsePayload: {
      status: boolean;
      data: DataCart[];
    } = response as getFavResponse;
    if (responsePayload.status) {
      setFavItems(responsePayload.data);
      return true;
    } else {
      return false;
    }
  };
  const getProductTagStatus = async (): Promise<boolean> => {
    const response = await getProductTags();
    const responsePayload: {
      status: boolean;
      data: ItemSpecialTag[];
    } = response as ApiResponseStatus;
    if (responsePayload.status) {
      lsClient.setItem("PRODUCT_SPECIAL_TAGS", responsePayload.data);
      setProductTags(responsePayload.data);
      return true;
    } else {
      return false;
    }
  };

  const getTextBookType = async (): Promise<boolean | void> => {
    const response = await getTextBookTypeData();
    const responsePayload: {
      status: boolean;
      data: TextbookType[];
    } = response as TextBookApiResponse;
    console.log("data" , responsePayload.data)
    if (responsePayload.status) {
      lsClient.setItem("TEXTBOOK_TYPE", responsePayload.data);
      setTextbookType(responsePayload.data);
      return true;
    } else {
      return false;
    }
  };

  const addCartItems = async (payload: DataCart): Promise<boolean> => {
    setItems((prev) => {
      let existingItemIndex = -1;
      // Check if the item already exists in the cart
      if (payload?.selected_variation?.items_variable_items_id) {
        existingItemIndex = prev.findIndex(
          (item) =>
            item.item_id === payload.item_id &&
            item?.selected_variation?.items_variable_items_id ==
            payload?.selected_variation?.items_variable_items_id,
        );
      } else {
        existingItemIndex = prev.findIndex(
          (item) => item.item_id === payload.item_id,
        );
      }

      // Prepare new or updated item
      const newItem = {
        ...payload,
        quantity: payload.quantity || 1, // Default to 1 if no quantity specified
      };

      if (existingItemIndex > -1) {
        // If item exists, update the quantity
        const updatedItems = prev.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + newItem.quantity, // Increase the quantity
            };
          }
          return item;
        });
        lsClient.setItem("CART_ITEM", updatedItems);

        return updatedItems;
      } else {
        // Item does not exist, add as new entry
        const updatedItems = [...prev, newItem];

        lsClient.setItem("CART_ITEM", updatedItems);
        return updatedItems;
      }
    });

    return true;
  };

  // increase or decrease quantity implementation
  const increaseCartItemQuantity = async (
    item_id: number,
    quantity: number,
    variable_id?: number,
  ): Promise<boolean> => {
    const updatedItems = cartItems.map((item) => {
      if (
        variable_id &&
        variable_id == item?.selected_variation?.items_variable_items_id &&
        item.item_id === item_id
      ) {
        return { ...item, quantity: quantity };
      } else {
        if (!variable_id && item.item_id === item_id) {
          return { ...item, quantity: quantity };
        }
      }
      return item;
    });
    setItems(updatedItems);
    lsClient.setItem("CART_ITEM", updatedItems);
    return true;
  };

  const removeCartItems = async (payload: DataCart): Promise<boolean> => {
  
    const currentItems = lsClient.getItem("CART_ITEM") || [];
    const newItems: DataCart[] =
      typeof currentItems === "string"
        ? (JSON.parse(currentItems) as DataCart[])
        : currentItems;
    if (payload?.selected_variation?.items_variable_items_id) {
      const updatedItems = newItems.filter(
        (item: DataCart) =>
          item?.selected_variation?.items_variable_items_id !==
          payload?.selected_variation?.items_variable_items_id,
      );
     
      lsClient.setItem("CART_ITEM", updatedItems);
      
      setItems(updatedItems);
    } else {
      const updatedItems = newItems.filter(
        (item: DataCart) => item.item_id !== payload.item_id,
      );
   
      lsClient.setItem("CART_ITEM", updatedItems);
      setItems(updatedItems);
    }

    return true;
  };
  const removeAllCartItems = async (): Promise<boolean> => {
    lsClient.setItem("CART_ITEM", []);
    setItems([]);

    return true;
  };

  const register = async (payload: Register): Promise<boolean> => {
    const response = await apiRouter(
      "REGISTER",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      { skipAuthorization: true },
    );

    if (!response.ok) return false;

    const responsePayload: { status: boolean; data: LoginData } =
      (await response.json()) as LoginResponse;
    if (!responsePayload.status) return false;

    // setUserInfo(responsePayload.data);
    // lsClient.setItem("USER_INFO", responsePayload.data);

    return true;
  };

  const logout = async (): Promise<void> => {
    // lsClient.cleanStorage();
    console.log("logout", token);
    await LogOutApi();

    lsClient.setEmpty("TOKEN", "");
    lsClient.setEmpty("IS_LOGGED_IN", false);
    lsClient.setEmpty("USER_INFO", null);
    lsClient.setEmpty("CHECKOUT_DATA", null);
    lsClient.setEmpty("BILLING_ADDRESS", null);
    setBillingAddress(null);
    setCheckoutData(null);
    setIsLoggedIn(false);
    setUserInfo(undefined);
    setToken(undefined);
    
    router.push("/login");
  };

  useEffect(() => {
    const userInfo = lsClient.getItem("USER_INFO");
    const isLoggedIn = lsClient.getItem("IS_LOGGED_IN");
    const cartItems = lsClient.getItem("CART_ITEM");
    const checkoutData = lsClient.getItem("CHECKOUT_DATA");
    const GENRE = lsClient.getItem("GENRE");
    const CATEGORY = lsClient.getItem("CATEGORY");
    const UUID = lsClient.getItem("UUID");
    const TOKEN = lsClient.getItem("TOKEN");
    const BOOKNET_CUSTOMER_ID = lsClient.getItem("BOOKNET_CUSTOMER_ID");
    const THEME_MODE = lsClient.getItem("THEME_MODE");
    const PRODUCT_DETAIL = lsClient.getItem("PRODUCT_DETAIL");
    const SPECIAL_TAGS = lsClient.getItem("PRODUCT_SPECIAL_TAGS");
    const BILLING_ADDRESS = lsClient.getItem("BILLING_ADDRESS");
    const TEXTBOOK_TYPE = lsClient.getItem("TEXTBOOK_TYPE");
    setItems(
      cartItems
        ? typeof cartItems === "string"
          ? (JSON.parse(cartItems) as DataCart[])
          : cartItems
        : [],
    );
    setProductTags(SPECIAL_TAGS);
    setBillingAddress(BILLING_ADDRESS);
    setProductDetail(PRODUCT_DETAIL);
    setThemeMode(THEME_MODE);
    setUuidLocal(UUID);
    setBooknetCustomerId(BOOKNET_CUSTOMER_ID);
    setToken(TOKEN);
    setGenre(GENRE);
    setCategory(CATEGORY);
    setCheckoutData(checkoutData);
    setTextbookType(TEXTBOOK_TYPE);

    if (isLoggedIn && userInfo) {
      setIsLoggedIn(true);
      setUserInfo(userInfo);
    }
  }, []);

  const setProductForDetail = async (
    payload: DataCart | null,
  ): Promise<void> => {
    setProductDetail(payload);
    lsClient.setItem("PRODUCT_DETAIL", payload ?? null);
  };
  const checkoutFormData = async (payload: CheckoutForm): Promise<boolean> => {
    lsClient.setItem("CHECKOUT_DATA", payload);
    // setCheckoutData(payload)
    return true;
  };
  const getCheckoutFormData = async (): Promise<boolean> => {
    const checkoutData = lsClient.getItem("CHECKOUT_DATA");
    setCheckoutData(checkoutData);
    return true;
  };

  const CheckoutApi = async (
    payload: CheckoutForm,
  ): Promise<checkoutBooknetResponse> => {
    const response = await apiRouter(
      "CHECKOUT",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      { skipAuthorization: true },
    );

    const responsePayload: { status: boolean; data: CheckoutForm } =
      (await response.json()) as checkoutBooknetResponse;
    if (responsePayload.status) {
      const x = responsePayload.data.booknet_customer_id ?? null;
      setBooknetCustomerId(x);
      // setCheckoutData(responsePayload.data);

      lsClient.setItem(
        "BOOKNET_CUSTOMER_ID",
        responsePayload?.data.booknet_customer_id ?? null,
      );
      // lsClient.setItem("CHECKOUT_DATA", responsePayload?.data ?? null);
      return responsePayload;
    } else {
      console.log(response)
      throw new Error("failed"); // Throw an error with the message
    }
  };

  const CheckoutApiWithUserName = async (
    payload: Booknet_customer_checkout,
  ): Promise<checkoutBooknetResponse> => {
    const response = await apiRouter(
      "CHECKOUT",
      {
        method: "GET",
        queryParams: `username=${payload.username}&password=${payload.password}`,
      },

      { skipAuthorization: true },
    );

    const responsePayload: { status: boolean; data: CheckoutForm } =
      (await response.json()) as checkoutBooknetResponse;
    if (responsePayload.status) {
      // setCheckoutData(responsePayload.data);
      const x = responsePayload.data.booknet_customer_id ?? null;
      setBooknetCustomerId(x);
      // lsClient.setItem("CHECKOUT_DATA", responsePayload.data);
      if (responsePayload?.data?.booknet_customer_id) {
        lsClient.setItem(
          "BOOKNET_CUSTOMER_ID",
          responsePayload?.data?.booknet_customer_id,
        );
      } else {
        lsClient.setEmpty("BOOKNET_CUSTOMER_ID", null)
      }

      return responsePayload;
    } else {
      throw new Error("failed"); // Throw an error with the message
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        register,
        logout,
        userInfo,
        appId,
        addCartItems,
        cartItems,
        removeCartItems,
        checkoutFormData,
        checkoutData,
        getCheckoutFormData,
        increaseCartItemQuantity,
        removeAllCartItems,
        getGenre,
        getCategory,
        category,
        genre,
        setUUID,
        setTheme,
        uuidLocal,
        token,
        sendOTP,
        verifyOTP,
        CheckoutApi,
        setCheckoutData,
        booknetCustomerId,
        CheckoutApiWithUserName,
        setTransactionData,
        themeMode,
        orderTransactionData,
        addFavourite,
        removeFavourite,
        getFavourite,
        favItems,
        setProductForDetail,
        productDetail,
        getProductTagStatus,
        productTags,
        getSubCategory,
        subCategory,
        billing_address,
        addBillingAddress,
        searchInCategory,
        searchItems,
        getTextBookType,
        textbookType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { useAuthContext, AuthProvider };
