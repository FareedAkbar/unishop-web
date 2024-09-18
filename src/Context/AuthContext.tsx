"use client";
import { useParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { localStorageClient } from "~/clients/localstorage-client";
import type DataCart from "~/types/book";
import type Login from "~/types/login";
import type LoginResponse from "~/types/loginResponse";
import type Register from "~/types/register";
import type UserType from "~/types/userType";
import { apiRouter } from "~/utils/api-router";

interface AuthContextProps {
  isLoggedIn: boolean;
  userInfo?: UserType;
  login: (payload: Login) => Promise<boolean>;
  register: (payload: Register) => Promise<boolean>;
  logout: () => Promise<void>;
  addCartItems: (payload: DataCart) => Promise<boolean>;
  removeCartItems: (payload: DataCart) => Promise<boolean>;
  cartItems?: DataCart[];
  appId: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lsClient = localStorageClient();
  const slugParams = useParams();
  const appId = (slugParams["app-id"] as string) || "";

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserType | undefined>();
  const [cartItems, setItems] = useState<DataCart[]>([]);

  const login = async (payload: Login): Promise<boolean> => {
    const response = await apiRouter("LOGIN", {
      method: "POST",
      body: JSON.stringify(payload),
    }, { skipAuthorization: true });

    if (!response.ok) return false;

    const responsePayload: { status: boolean; data: UserType } = await response.json() as LoginResponse;
    if (!responsePayload.status) return false;

    setIsLoggedIn(true);
    setUserInfo(responsePayload.data);

    lsClient.setItem("IS_LOGGED_IN", true);
    lsClient.setItem("USER_INFO", responsePayload.data);

    return true;
  };

  const addCartItems = async (payload: DataCart): Promise<boolean> => {
    setItems((prev) => {
      const updatedItems = [...prev, payload];
      lsClient.setItem("CART_ITEM", updatedItems);
      return updatedItems;
    });
    return true;
  };

  const removeCartItems = async (payload: DataCart): Promise<boolean> => {
    const currentItems = lsClient.getItem("CART_ITEM") || [];
    const newItems: DataCart[] = typeof currentItems === 'string' ? JSON.parse(currentItems) as DataCart[] : currentItems;

    const updatedItems = newItems.filter((item: DataCart) => item.item_id !== payload.item_id);
    lsClient.setItem("CART_ITEM", updatedItems);
    setItems(updatedItems);

    return true;
  };

  const register = async (payload: Register): Promise<boolean> => {
    const response = await apiRouter("REGISTER", {
      method: "POST",
      body: JSON.stringify(payload),
    }, { skipAuthorization: true });

    if (!response.ok) return false;

    const responsePayload: { status: boolean; data: UserType } = await response.json() as LoginResponse;
    if (!responsePayload.status) return false;

    setIsLoggedIn(true);
    setUserInfo(responsePayload.data);

    lsClient.setItem("IS_LOGGED_IN", true);
    lsClient.setItem("USER_INFO", responsePayload.data);

    return true;
  };

  const logout = async (): Promise<void> => {
    lsClient.cleanStorage();
    setIsLoggedIn(false);
    setUserInfo(undefined);
  };

  useEffect(() => {
    const userInfo = lsClient.getItem("USER_INFO");
    const isLoggedIn = lsClient.getItem("IS_LOGGED_IN");
    const cartItems = lsClient.getItem('CART_ITEM');

    setItems(cartItems ? (typeof cartItems === 'string' ? JSON.parse(cartItems) as DataCart[] : cartItems) : []);
    
    if (isLoggedIn && userInfo) {
      setIsLoggedIn(true);
      setUserInfo(userInfo);
    }
  }, [lsClient]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout, userInfo, appId, addCartItems, cartItems, removeCartItems }}>
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
