interface SpecialItem {
  special_item_id: number;
  title: string;
  link: string;
  author: string;
  isbn13: string;
  format: string;
  distributor: string;
  pubDate: string; // ISO 8601 format (e.g., "2024-09-18T12:39:44.000Z")
  stockLevel: string;
  price: string; // Can be more specific if needed (e.g., number)
}

// Assuming this could be a number

interface SpecialOrderItem {
  back_order_item_id: number;
  back_order_id: number;
  item_id: number;
  variable_id: number | null;
  quantity: number;
  note: string;
  time_added: string; // ISO 8601 format
  item_price: number | null; // Assuming this could be a number
  discounted_price: number | null; // Assuming this could be a number
  order_status: number;
  special_item_id: number;
  book_id: number | null;
  special_items: SpecialItem;
}

interface GetSpecialOrder {
  back_order_id: number;
  tracking_id: string;
  outlet: number;
  started: string; // ISO 8601 format
  order_status: number;
  order_type: number;

  booknet_customer_id: number;
  order_id: number | null;
  special: number;
  special_order_items: SpecialOrderItem[];

  // pricing
  total_order_price: number | null;
  total_discounted_price?: number | null;
  delivery_charges?: number;

  // customer
  customer_id: number | null;
  guest_id: number | null;
  // flags
  is_back_order: number;
  is_completed: number;

  // ⭐ IMPORTANT: new items array
  back_order_items: BackOrderItem[];

  order_items?: SpecialOrderItem[]; // Optional, for backward compatibility
}
interface BackOrderItem {
  back_order_item_id: number;
  back_order_id: number;

  item_id: number;
  variable_id: number | null;

  item_name: string;
  book_title: string;
  book_id: number | null;

  quantity: number;
  item_price: number | null;
  discounted_price: number | null;

  order_status: number;
  time_added: string;

  // customer info (important for UI)
  customer_id: number;
  first_name: string;
  last_name: string;
  username: string;

  // optional useful flags
  is_textbook: boolean;

  // discounts (simplified)
  applied_discounts?: {
    title: string;
    disc_value: number;
  }[];
}
interface GetSpecialOrderApiResponse {
  status: boolean;
  data: GetSpecialOrder[];
}

// order Status
interface OrderStatus {
  status_id: number;
  status_name: string;
  status_detail: string;
  display_status: string;
}

interface OrderStatusResponse {
  status: boolean;
  message: string;
  data: OrderStatus[];
}

// update Specail_order

// Assuming deal_id is null since it's not provided
interface UpdateSpecialOrderItem {
  deal_id?: number | null;
  back_order_item_id?: number | null;
  quantity_item?: number | null;
  notes?: string | null;
  is_deal?: number | null;
  item_id?: number | null;
  variable_id?: number | null;
  item_price?: number | null; // Assuming this could be a number
  discounted_price?: number | null; // Assuming this could be a number
  premium_upgrades?: [] | null;
}

interface UpdateSpecialOrderPayload {
  order_type: number;
  tracking_id?: string;
  order_status?: number;
  back_order_id?: number;
  details?: string;
  total_order_price?: number | null;
  customer_id?: number | null;
  final_price_including_tax?: number | null;
  booknet_customer_id?: number | null;
  transaction_id?: string | null;
  guest?: string | null;
  outlet_id?: number | null;
  special_order_items: UpdateSpecialOrderItem[];
}

export type {
  GetSpecialOrderApiResponse,
  GetSpecialOrder,
  SpecialOrderItem,
  OrderStatusResponse,
  OrderStatus,
  UpdateSpecialOrderPayload,
};
