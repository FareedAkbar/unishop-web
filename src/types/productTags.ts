export interface ItemSpecialTag {
    item_special_tags_id: number;
    tag_name: string;
    outlet_id: number;
  }

  export interface ApiResponseStatus {
    // meta: PaginationData; // Adjust based on your actual structure
    data: ItemSpecialTag[];
    status: boolean;
}