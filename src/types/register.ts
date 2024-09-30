
export default interface Register {
  customer_id?: number | null,
  uuid: number | null,
  booknet_customer_type_id: number,
  email: string,
  address: string,
  second_address?: string | null,
  phone_number: string,
  country: string,
  city: string,
  state: string,
  postal_code: string
}