"use server";

import type DataCart from '~/types/book';
import type { Pagination } from '~/types/pagination';
import { token221 } from '~/types/tokens';


interface ApiResponse {
    // meta: PaginationData; // Adjust based on your actual structure
    data: DataCart[];
    meta: Pagination;
    status: boolean;
}
const requestOptions: RequestInit = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token221}`,
        "Content-Type": "application/json", // Optional, depending on your API
    },
    redirect: "follow", // Use the correct type for `redirect`
};
export async function getItemsByCategory(id: number, page: number, food: number, gifts: number): Promise<ApiResponse | boolean> {
    console.log("food",food)
    console.log("gifts",gifts)
    console.log("page",page)
    
    try {
        const response = await fetch(
            `http://110.93.226.167:3000/api/books/items?pagination=1&limit=15&entries=1&default_supplier_details=1&supplier_details=1&food=${food}&gifts=${gifts}}&category=${id}&page=${page}&images=1&detailed=1`,
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




