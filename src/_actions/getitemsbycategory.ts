"use server";

import type DataCart from '~/types/book';
import type { Pagination } from '~/types/pagination';
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
export async function getItemsByCategory(id: number, page: number, food: number, gifts: number): Promise<ApiResponse | boolean> {
    
    try {
        const response = await fetch(
            `https://booknet-dev.iconsole.com.au/api/books/items?pagination=1&limit=15&entries=1&default_supplier_details=1&supplier_details=1&food=${food}&}&category=${id}&page=${page}&images=1&detailed=1`,
            requestOptions,
        );
        const result: ApiResponse = (await response.json()) as ApiResponse;

        // Check if result has the expected structure
        if (result?.status) {
            // setMeta(result.meta);
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





