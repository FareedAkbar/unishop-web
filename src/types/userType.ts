export default interface UserType {
  customer_id: number;
  first_name: string;
  last_name: string;
  national_ID: string;
  email: string;
  user_name: string;
  date_of_birth: string; // ISO date string
  gender: string | null; // Optional, could be null
  campus: number;
  country_code: string | null; // Optional, could be null
  phone_number: string; // Assuming it's a string, change if needed
  address: string | null; // Optional, could be null
  city: string | null; // Optional, could be null
  state: string | null; // Optional, could be null
  postal_code: string | null; // Optional, could be null
  country: string | null; // Optional, could be null
  customer_type: number;
  membership: string | null; // Optional, could be null
  object_path: string;
  check_id: number;
  check_status: number;
  uuid: string;
  }