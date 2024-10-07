// interfaces.ts

 type Category = {
    id: number;
    outlet: number;
    category_name: string;
    category_description: string;
    deleted: number;
    parent: number;
    media_id: number;
    booknet: number;
  }
  type CategoryTreeNode = {
    id: number;
    outlet: number;
    category_name: string;
    category_description: string;
    deleted: number;
    media_id: number;
    booknet: number;
    children?: CategoryTreeNode[];
  };
  
   interface CategoryResponse {
    status: boolean;
    data: Category[];
  }

export type {Category, CategoryResponse, CategoryTreeNode}