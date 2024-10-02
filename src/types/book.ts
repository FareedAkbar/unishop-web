export default interface DataCart {
  book_id: number;
  final_price_including_tax?: number; // Just use number; 0 is included
  quantity: number; // Just use number; 0 is included
  item_id: number;
  genre_id: number;
  book_title: string;
  subtitle: string;
  edition: string;
  author_first_name: string;
  author_last_name: string;
  book_ISBN: string;
  pages: number;
  hardcover: number;
  publisher_id: number;
  book_language: string;
  additional_notes: string;
  outlet: number;
  media_id: number | null;
  item_name: string;
  expiry_date: string;
  barcode: string;
  URL: string | null;
  introduced: string;
  category: number;
  detail: string;
  deleted: number;
  item_sale_price: number;
  discount_amount: number | null;
  discount_percentage: number | null;
  items_type: number;
  parent_item: number | null;
  SKU: string;
  SKU_title: string;
  tax_id: number;
  event_price: number;
  event_check: number;
  cost_price: string;
  weighable: number;
  tax_exempted: number;
  stockable_item: number;
  readyMade: number;
  available: boolean | null;
  returnable: number;
  product_id: string;
  object_path: string | null;
  genre: string;
  description: string;
  stock: Stock;
  media: Media[];
  publisher: Publisher;
}

interface Stock {
  stock_id: number;
  unit_id: number;
  unit_name: string;
  stock_name: string;
  lowest_level: string;
  stock_quantities_requested: string;
  amount_paid: string;
  stock_quantities_recieved: string;
  quantity_check: boolean;
  quantity: number;
  stock_entry: StockEntry[];
}

interface StockEntry {
  stock_id: number;
  stock_name: string;
  stock_quantities_requested: string;
  amount_paid: string;
  stock_quantities_recieved: string;
  quantities: string;
  unit_id: number;
  unit_name: string;
  lowest_level: string;
}

interface Media {
  object_id: number;
  object_path: string;
}

interface Publisher {
  publisher_id: number;
  supplier_id: number | null;
  outlet_id: number;
  publisher_name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
  email: string;
  website: string;
  created_at: string;
  updated_at: string;
}
