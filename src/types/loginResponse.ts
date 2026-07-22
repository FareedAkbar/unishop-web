import type UserType from "./userType";

type LoginData = {
  customer_id?: number;
  email?: string;
};

interface LoginResponse {
  status: boolean;
  data: LoginData;
  message: string;
}

interface SendOTPResponse {
  status: boolean;
}

interface VerifyOTPResponse {
  status: boolean;
  message: string;
  data: UserType;
  token: string;
}

export type { LoginData, LoginResponse, SendOTPResponse, VerifyOTPResponse };
