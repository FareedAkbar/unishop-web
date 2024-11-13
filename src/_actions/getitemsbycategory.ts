"use server";

import type DataCart from '~/types/book';
import type { Pagination } from '~/types/pagination';
import { SpecialItemsApiResponse } from '~/types/specialItems';
import { token221, token223 } from '~/types/tokens';


interface ApiResponse {
    // meta: PaginationData; // Adjust based on your actual structure
    data: DataCart[];
    meta: Pagination;
    status: boolean;
}
const requestOptions: RequestInit = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token223}`,
        "Content-Type": "application/json", // Optional, depending on your API
    },
    redirect: "follow", // Use the correct type for `redirect`
};
export async function getItemsByCategory(id: number | null, page: number,category_type: number): Promise<ApiResponse | boolean> {
    let x = ""
    if(category_type != 0){
        x = `https://booknet-dev.iconsole.com.au/api/books/items?pagination=1&limit=15&entries=1&default_supplier_details=1&supplier_details=1&food=0&book=0&category=${id}&page=${page}&images=1&detailed=1&special_tags_only=1&category_type=${category_type}` 
    }else{
        x = `https://booknet-dev.iconsole.com.au/api/books/items?pagination=1&limit=15&entries=1&default_supplier_details=1&supplier_details=1&food=0&book=0&category=${id}&page=${page}&images=1&detailed=1&special_tags_only=1`
    }
    try {
        const response = await fetch(
            x,
            requestOptions,
        );
        const result: ApiResponse = (await response.json()) as ApiResponse;

        // Check if result has the expected structure
        if (result?.status) {
            // setMeta(result.meta);
            console.log(result)
            return result
        } else {
            console.error("Unexpected result structure:", result);
            return result
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return false
    }
};

export async function getSpecialItems(id: number): Promise<SpecialItemsApiResponse | boolean> {
    
    try {
        const response = await fetch(
            `https://booknet-dev.iconsole.com.au/api/customer/special-tags-items?special_tag_id=${id}`,
            requestOptions,
        );
        const result: SpecialItemsApiResponse = (await response.json()) as SpecialItemsApiResponse;

        // Check if result has the expected structure
        if (result?.status) {
            // setMeta(result.meta);
            
            return result
        } else {
            console.error("Unexpected result structure getSpecialItems:", result);
            return result
        }
    } catch (error) {
        console.error("Error fetching data getSpecialItems:", error);
        return false
    }
};




