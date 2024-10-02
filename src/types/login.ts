
  interface Login {
    email: string;
    user_password: string;
  }

  interface SendOTP {
    customer_id?: number;
    email?: string
  }
 
 interface VerifyOTP {
    customer_id?: number;
    otp?: number;
    email?: string
  }

  export type {Login, SendOTP, VerifyOTP}