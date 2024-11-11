interface CheckoutForm {

  email: string | null; // Required, must be a valid email
  company?: string | null; // Optional
  address?: string | null; // Optional
  second_address?: string | null; // Optional
  city?: string | null; // Optional
  state?: string | null; // Optional
  postal_code?: string | null; // Optional
  country?: string | null; // Optional
  cityCode?: string | null; // Optional
  stateCode?: string | null; // Optional
  phone_number?: string | null; // Optional
  customer_id?: number | null,
  uuid?: string | null,
  booknet_customer_type_id?: number,
  booknet_customer_id?: number | null,
  username?: string | null
  password?: string | null,
  duplicate?: number | null
}

interface booknet_customer_id {
  booknet_customer_id: number | null
}



interface checkoutBooknetResponse {
  status: boolean;
  data: CheckoutForm
}

interface Booknet_customer_checkout {
  username: string;
  password: string

}


export type { CheckoutForm,booknet_customer_id,Booknet_customer_checkout,checkoutBooknetResponse }