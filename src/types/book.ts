
interface Tag {
  item_id: number;
  tag_id: number;
  tag: string;
}

interface TagLink {
  items_variations_tags_link_id: number;
  items_variations_tags_id: number;
  items_variations_tags_name: string;
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

export interface Stock {
  quantity: number | null;
  quantity_check: boolean;
  stock_id: number;
  unit_id: number | null;
  unit_name: string | null;
  stock_name: string;
  lowest_level: string;
  stock_quantities_requested: string | null;
  amount_paid: string | null;
  stock_quantities_recieved: string | null;
  stock_entry: StockEntry[];
}

interface CostDetails {
  items_costing_id: number;
  item_id: number;
  items_variable_items_id: number;
  items_costing_p2p: number;
  items_costing_p2s: number;
  items_costing_p2o: number;
}



export interface VariationTag {
  items_variations_tags_link_id: number;
  item_id: number;
  items_variations_tags_id: number;
  items_variations_tags_name: string;
  items_variations_tags_links_values_id: number;
  items_variations_tags_links_values_link_id: number;
  items_variations_tags_links_values_var_id: number;
  items_variations_tags_links_values_value: string;
}
export interface Variation {
  items_variable_items_id: number;
  item_id: number;
  items_variable_items_barcode: string;
  items_variable_items_sku_number: string;
  items_variable_items_sku_title: string;
  items_variable_items_sale_price: number;
  items_variable_items_cost_price: number;
  items_variable_items_expiry_date: string;
  book_ISBN: string | null;
  book_language: string | null;
  subtitle: string | null;
  published_date: string | null;
  variation_tags: VariationTag[];
  cost_details: CostDetails;
  stock: Stock;
}

export interface SpecialTag {
  item_special_tags_assign_id: number;
  item_id: number;
  item_special_tags_id: number;
}
export interface Media {
  object_id: number;
  object_path: string;
}
export interface Review {
  name: string;
  review: string;
  stars: number;
}
export interface category_detail {
  category_description: string,
  category_name: string,
  id: number,
  media_id: number, 
  outlet: number,
  parent: number,
  till_visibility: number,
  web_visibility: number,
}
export default interface DataCart {
  book_id: number | null;
  food_id: number | null;
  final_price_including_tax?: number; 
  quantity: number; 
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
  tags?: Tag[] | null;
  tag_links?: TagLink[] | null;
  variations?: Variation[] | null;
  selected_variation?: Variation | null;
  special_tags?: SpecialTag[] | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedValues?: any;
  reviews?: Review[],
  category_detail?: category_detail,
  book_usages: book_usages[] | null
}

interface book_usages {
  subject_name: string;
  subject_code: string;
  default_semester: number;
  type_id: number;
}

export interface Media {
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
