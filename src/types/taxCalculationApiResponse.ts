interface OrderDiscountInfo {
  discount_type: string;
  disc_order_id: number;
  disc_id: number;
  valid_until: string;
  min_amount: number;
  title: string;
  mem_disc_value: number;
  disc_value: number;
  guest_disc_value: number;
  disc_unit: number;
  valid_from: string;
  active_status: number;
  outlet_id: number;
}

export interface DiscountInfo {
  discount_type: string;
  disc_item_id?: number;
  disc_cat_id?: number;
  disc_id: number;
  item_id?: number;
  cat_id?: number;
  valid_until: string;
  title: string;
  mem_disc_value: number;
  disc_value: number;
  guest_disc_value: number;
  disc_unit: number;
  valid_from: string;
  active_status: number;
  outlet_id: number;
}

interface DiscountItem {
  item_id: number;
  variationId: number | null;
  deal_id: number | null;
  original_value: number;
  discount_value_applied: number;
  discounted_price_item_or_cat: number;
  order_discount: number;
  membership_discount: number;
  tax_price: number;
  final_price_including_tax: number;
  final_price_excluding_tax: number;
  item_tax_price: number;
  premium_upgrades: []; // Adjust if premium_upgrades has a specific structure
  discounts: DiscountInfo;
}

interface TaxCalculationApiResponse {
  status: boolean;
  original_price: number;
  after_item_discount: number;
  after_cat_discount: number;
  after_order_discount: number;
  order_discount_info: OrderDiscountInfo;
  price_after_membership: number;
  final_price_including_tax: number;
  final_price_excluding_tax: number;
  item_tax_price: number;
  items: DiscountItem[];
}

export default TaxCalculationApiResponse;
