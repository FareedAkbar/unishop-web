import type UserType from "./userType";


export default interface LoginResponse {
    status: boolean;
    data: UserType
  }