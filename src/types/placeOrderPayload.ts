interface EftPosDetails {
  card_type: string;
  card_pan: string;
  ref_no: string;
}

interface AppliedVoucher {
  cus_id: number | null;
  code: string;
  total_order_price: number | null;
  final_order_price: number | null;
  voucher_value: number;
  used_value: number;
  order_id: number | null;
  discount_unit: number;
}

interface OrderItem {
  item_id: number;
  deal_id: number | null;
  variable_id: number | null;
  quantity_item: number;
  notes: string;
  is_deal: boolean | null;
  item_price: number;
  discounted_price: number | null;
  deal_items: Array<{
    item_id: string;
    variable_id: string;
    quantity_item: string;
  }>;
  premium_upgrades: Array<{
    upgrade_id: string;
    upgrade_name: string;
    upgrade_price: string;
  }>;
  applied_vouchers?: AppliedVoucher[];
  cost_price?: number | string | null;
}

interface SplitPayment {
  payment_type: number;
  order_intent: string;
  rounded_amount: number;
  cash_in: number;
  cash_out: number;
  card_type?: string;
  card_pan?: string;
  ref_no?: string;
  order_amount: number;
}

interface placeOrderPayload {
  order_type: number;
  online_order_type: number;
  outlet_id: number;
  // tracking_id: string;
  order_status: number;
  completed_date: string;
  started: string;
  details: string;
  kitchen_comments: string;
  waiter_id: number | null;
  table_served: number | null;
  total_order_price: number;
  tab_limit: number;
  final_price_including_tax: number;
  eft_pos_details?: EftPosDetails;
  member_id: number | null;
  booknet_customer_id?: number | null;
  transaction_id?: string | null,
  guest?: string | null;
  order_items: OrderItem[];
  address_id: number | null;
  collect_campus?: string;
  splits?: SplitPayment[];
}

export type { placeOrderPayload, OrderItem }