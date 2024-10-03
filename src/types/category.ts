// interfaces.ts

 interface Category {
    id: number;
    outlet: number;
    category_name: string;
    category_description: string;
    deleted: number;
    parent: number;
    media_id: number;
    booknet: number;
  }
  
   interface CategoryResponse {
    status: boolean;
    data: Category[];
  }

export type {Category, CategoryResponse}