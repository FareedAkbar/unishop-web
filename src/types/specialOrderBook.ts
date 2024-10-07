interface SpecialBookType {
    title: string;
    link: string;
    author: string;
    isbn13: string;
    format: string;
    distributor: string;
    pubDate: string;
    stockLevel: string;
    price: string;
  }


interface Dimensions {
    width: string;
    height: string;
    weight: string;
}

interface Supplier {
    packQuantity: string;
    distributor: string;
    distributorRole: string;
}

interface BookDetailType {
    title: string;
    author: string;
    isbn13: string;
    isbn10: string;
    gtin13: string;
    imprint: string;
    originalPublisher: string;
    publicationDate: string;
    subject: string;
    bicCategories: string;
    format: string;
    numberOfPages: string;
    dimensions: Dimensions;
    edition: string;
    series: string;
    territorialRights: string;
    supplier: Supplier;
    price: string;
    stockOnHand: string;
    stockOnOrder: string;
    coverImageUrl: string;
    mainDescription: string;
    shortDescription: string;
    tableOfContents: string;
    biographicalNote: string;
}

interface SpecialOrderItem {
    book_details?: SpecialBookType | null,
    link?: string;
    deal_id?: number | null;
    quantity_item?: number;
    notes?: string;
    is_deal?: number | null;
}

interface SpecialOrderPayload {
    order_type?: number;
    online_order_type?: number;
    tracking_id?: string;
    completed_date?: string;
    started?: string;
    details?: string;
    member_id?: number | null;
    booknet_customer_id?: number | null;
    guest?: string | null;  // Adjust the type based on expected data
    special_order_items?: SpecialOrderItem[];
}

// get special order Api response
interface SpecialItem {
    special_item_id: number;
    title: string;
    link: string;
    author: string;
    isbn13: string;
    format: string;
    distributor: string;
    pubDate: string;
    stockLevel: string;
    price: string; // You can change this to number if you want to store the numeric value
}

interface SpecialOrderDataApiResponseItem {
    back_order_item_id: number;
    back_order_id: number;
    item_id: number;
    variable_id: number | null;
    quantity: number;
    note: string;
    time_added: string;
    item_price: number | null; // Adjust type if needed
    discounted_price: number | null; // Adjust type if needed
    order_status: number;
    special_item_id: number;
    book_id: number | null;
    special_items: SpecialItem;
}

interface SpecialOrderDataApiResponse {
    back_order_id: number;
    tracking_id: string;
    outlet: number;
    started: string; // Use Date if you want to parse it into a Date object
    order_status: number;
    order_type: number;
    total_order_price: number | null;
    total_discounted_price: number | null;
    customer_id: number | null;
    booknet_customer_id: number;
    guest_id: number | null;
    order_id: number | null;
    special: number;
    special_order_items: SpecialOrderDataApiResponseItem[];
}



export type {BookDetailType,SpecialOrderPayload,SpecialBookType,SpecialOrderDataApiResponse}