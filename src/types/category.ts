// interfaces.ts

export interface SuperCategory {
  category_type_id: number;
  type: string;
  description: string;
  outlet_id: number;
  object_path: string | null;
}

type Category = {
  id: number;
  outlet: number;
  category_name: string;
  category_description: string;
  category_type_id: number,
  deleted: number;
  parent: number;
  media_id: number;
  booknet: number;
  gifts: number;
  arts: number;
  object_path: string,
  clothings: number | null;
  children: Category[]; // Update to match your data's nested structure
  till_visibility: number;
  web_visibility: number;
  app_visibility: number;
  type: string;
}
type CategoryTreeNode = {
  id: number;
  outlet: number;
  category_name: string;
  category_description: string;
  deleted: number;
  media_id: number;
  booknet: number;
  object_path: string,
  category_type_id: number;
  children: CategoryTreeNode[];
};

interface CategoryResponse {
  status: boolean;
  data: SuperCategory[];
}
export interface SubCategoryResponse {
  status: boolean;
  data: Category[];
}

export interface SideBarCategory {
  category_type_id: number;
  type: string;
  description: string;
  outlet_id: number;
  children: Category[] | null
}

export type { Category, CategoryResponse, CategoryTreeNode }