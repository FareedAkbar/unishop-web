export interface TextbookType {
    item_book_type_id: number;
    type_name: string;
    type_desc: string;
  }

 export interface TextBookApiResponse {
    // meta: PaginationData; 
    data: TextbookType[];
    status: boolean;
}