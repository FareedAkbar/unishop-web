"use client";
import { useParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { localStorageClient } from "~/clients/localstorage-client";
import type DataCart from "~/types/book";
import type {Login, SendOTP, VerifyOTP} from "~/types/login";

import type Register from "~/types/register";
import type UserType from "~/types/userType";
import { apiRouter } from "~/utils/api-router";
import type {Booknet_customer_checkout, booknet_customer_id, checkoutBooknetResponse, CheckoutForm } from "~/types/checkoutForm";
import type {Genre, GenreResponse} from "~/types/genre";
import type { LoginData,LoginResponse, SendOTPResponse, VerifyOTPResponse } from "~/types/loginResponse";
import { cookieClient } from "~/clients/cookie-client";
interface AuthContextProps {
  isLoggedIn: boolean;
  userInfo?: UserType;
  login: (payload: Login) => Promise<LoginResponse | boolean>;
  sendOTP: (payload: SendOTP) => Promise<SendOTPResponse | boolean>;
  verifyOTP: (payload: VerifyOTP) => Promise<VerifyOTPResponse | boolean>;
  CheckoutApi: (payload: CheckoutForm) => Promise<checkoutBooknetResponse>;
  register: (payload: Register) => Promise<boolean>;
  logout: () => Promise<void>;
  getcheckoutFormData: () => Promise<boolean>;
  getGenre: () => Promise<boolean>;
  addCartItems: (payload: DataCart) => Promise<boolean>;
  checkoutFormData: (payload: CheckoutForm) => Promise<boolean>;
  removeCartItems: (payload: DataCart) => Promise<boolean>;
  increaseCartItemQuantity: (item_id: number, quantity: number) => Promise<boolean>;
  cartItems?: DataCart[];
  genre?: Genre[] | null;
  checkoutData: CheckoutForm | null;
  appId: string;
  removeAllCartItems: () => Promise<boolean>;
  setUUID: (payload: string) => Promise<boolean>;
  CheckoutApiWithUserName: (payload: Booknet_customer_checkout) => Promise<checkoutBooknetResponse>;
  uuidLocal: string | undefined;
  token: string | undefined;
  bookentcustomerId?: number | null
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
  const [cartItems, setItems] = useState<DataCart[]>([]);
  const [genre, setGenre] = useState<Genre[] | null>([]);
  const [uuidLocal, setUuidLocal] = useState<string | undefined>();
  const [checkoutData, setCheckoutData] = useState<CheckoutForm | null>(null);
  const [bookentcustomerId, setBookentcustomerId] = useState<number | null>(null);

  const login = async (payload: Login): Promise<LoginResponse | boolean> => {
    const response = await apiRouter(
      "LOGIN",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      { skipAuthorization: true },
    );

    

    const responsePayload: { status: boolean; data: LoginData, message: string } =
      (await response.json()) as LoginResponse;
    if (responsePayload.status){
     
      lsClient.setItem("IS_LOGGED_IN", true);
      return responsePayload
    } else {
      throw new Error(responsePayload.message); // Throw an error with the message
    }

   
    // lsClient.setItem("TOKEN", responsePayload.token);

  };
  const sendOTP = async (payload: SendOTP): Promise<SendOTPResponse | boolean> => {
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
    if (responsePayload.status){
    
      return responsePayload
    } else {
      throw new Error("failed"); // Throw an error with the message
    }

   

  };
  const verifyOTP = async (payload: VerifyOTP): Promise<VerifyOTPResponse | boolean> => {
    const response = await apiRouter(
      "VERIFYOTP",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      { skipAuthorization: true },
    );

    

    const responsePayload: { status: boolean; data: UserType, message: string, token: string } =
      (await response.json()) as VerifyOTPResponse;
    if (responsePayload.status){
      setIsLoggedIn(true);
  
      setToken(responsePayload.token);
       setUserInfo(responsePayload.data);
       lsClient.setItem("USER_INFO", responsePayload.data);
      lsClient.setItem("TOKEN", responsePayload.token);
      lsClient.setItem("IS_LOGGED_IN", true);
      return responsePayload
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

    
    setGenre(responsePayload.data)

    lsClient.setItem("GENRE", responsePayload.data);
    
    return true;
  };

  const setUUID = async (payload: string): Promise<boolean> => {
        lsClient.setItem("UUID",payload);
        setUuidLocal(payload)
    return true;
  };
  

  const addCartItems = async (payload: DataCart): Promise<boolean> => {
    setItems((prev) => {
      // Check if the item already exists in the cart
      const existingItemIndex = prev.findIndex(item => item.item_id === payload.item_id);
     
      // Prepare new or updated item
      const newItem = {
        ...payload,
        quantity: payload.quantity || 1  // Default to 1 if no quantity specified
      };
  
      if (existingItemIndex > -1) {
        // If item exists, update the quantity
        const updatedItems = prev.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + newItem.quantity  // Increase the quantity
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
  const increaseCartItemQuantity = async (item_id: number, quantity: number): Promise<boolean> => {
    const updatedItems = cartItems.map(item => {
      if (item.item_id === item_id) {
        return { ...item, quantity: quantity };
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

    const updatedItems = newItems.filter(
      (item: DataCart) => item.item_id !== payload.item_id,
    );
    console.log(updatedItems)
    lsClient.setItem("CART_ITEM", updatedItems);
    setItems(updatedItems);

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
    lsClient.setEmpty("TOKEN", '');
    lsClient.setEmpty("IS_LOGGED_IN", false);
    lsClient.setEmpty("USER_INFO", null);
    setIsLoggedIn(false);
    setUserInfo(undefined);
    setToken(undefined);
    
  };

  useEffect(() => {
    const userInfo = lsClient.getItem("USER_INFO");
    const isLoggedIn = lsClient.getItem("IS_LOGGED_IN");
    const cartItems = lsClient.getItem("CART_ITEM");
    const checkoutData = lsClient.getItem("CHECKOUT_DATA");
    const GENRE = lsClient.getItem("GENRE");
    const UUID = lsClient.getItem("UUID");
    const TOKEN = lsClient.getItem("TOKEN");
    const BOOKENT_CUSTOMER_ID = lsClient.getItem("BOOKENT_CUSTOMER_ID");
    setItems(
      cartItems
        ? typeof cartItems === "string"
          ? (JSON.parse(cartItems) as DataCart[])
          : cartItems
        : [],
    );
    setUuidLocal(UUID);
    setBookentcustomerId(BOOKENT_CUSTOMER_ID);
    setToken(TOKEN);
    setGenre(GENRE);
    setCheckoutData(checkoutData);
    
    if (isLoggedIn && userInfo) {
      setIsLoggedIn(true);
      setUserInfo(userInfo);
    }
  }, []);

  const checkoutFormData = async (payload: CheckoutForm): Promise<boolean> => {
    lsClient.setItem("CHECKOUT_DATA", null);
    lsClient.setItem("CHECKOUT_DATA", payload);
    return true;
  };
  const getcheckoutFormData = async (): Promise<boolean> => {
    const checkoutData = lsClient.getItem("CHECKOUT_DATA");
    setCheckoutData(checkoutData);
    return true
  };


  const CheckoutApi = async (payload: CheckoutForm): Promise<checkoutBooknetResponse> => {
    const response = await apiRouter(
      "CHECKOUT",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      { skipAuthorization: true },
    );


    const responsePayload: { status: boolean, data: CheckoutForm} =
      (await response.json()) as checkoutBooknetResponse;
    if (responsePayload.status){
        setBookentcustomerId(responsePayload.data.booknet_customer_id ?? null)
        setCheckoutData(responsePayload.data)
        lsClient.setItem("BOOKENT_CUSTOMER_ID", responsePayload?.data.booknet_customer_id ?? null);
      return responsePayload
    } else {
      throw new Error("failed"); // Throw an error with the message
    }

   

  };

  const CheckoutApiWithUserName = async (payload: Booknet_customer_checkout): Promise<checkoutBooknetResponse> => {
   
    const response = await apiRouter(
      "CHECKOUT",
      {
        method: "GET",
        queryParams: `username=${payload.username}&password=${payload.password}`,
      },
      
      { skipAuthorization: true },
    );


    const responsePayload: { status: boolean, data: CheckoutForm} =
      (await response.json()) as checkoutBooknetResponse;
    if (responsePayload.status){
        setCheckoutData(responsePayload.data)
        lsClient.setItem("CHECKOUT_DATA", responsePayload.data)
        lsClient.setItem("BOOKENT_CUSTOMER_ID", responsePayload?.data?.booknet_customer_id ?? null);
      return responsePayload
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
        getcheckoutFormData,
        increaseCartItemQuantity,
        removeAllCartItems,
        getGenre,
        genre,
        setUUID,
        uuidLocal,
        token,
        sendOTP,
        verifyOTP,
        CheckoutApi,
        bookentcustomerId,
        CheckoutApiWithUserName
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
