interface Stock {
    quantity: number; // Just use number; 0 is included
  }
  
  export default interface DataCart {
    item_id: number; // Just use number; 0 is included
    book_title: string; // Just use string; "" is included
    description: string; // Just use string; "" is included
    object_path: string; // Just use string; "" is included
    item_sale_price: number; // Just use number; 0 is included
    stock: Stock;
  }
  