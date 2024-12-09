interface address {
  address: string,
  second_address?: string,
  country?: string,
  city?: string,
  state?: string,
  postal_code?: string,
  country_code?: string,
  phone_number?: string,
  default_status?: number,
  address_id?: number,
}

interface CheckoutForm {

  email: string | null; // Required, must be a valid email
  company?: string | null; // Optional
  address?: address[] | null; // Optional
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
  customer_type_id?: number,
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

interface get_address_from_email {
  status: boolean,
  data?: address[]
}

interface add_address_from_customer_id {
  status: boolean,
  data?: address
}


export type { CheckoutForm, booknet_customer_id, Booknet_customer_checkout, checkoutBooknetResponse,get_address_from_email,address ,add_address_from_customer_id}