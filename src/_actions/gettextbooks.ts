"use server";

import type DataCart from '~/types/book';
import { token221, token223 } from '~/types/tokens';


interface ApiResponse {
    // meta: PaginationData; // Adjust based on your actual structure
    data: DataCart[];
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
export async function getBooks(genre_id: number): Promise<ApiResponse | boolean> {
    try {
        const response = await fetch(
            `https://booknet-dev.iconsole.com.au/api/books/getBooksByGenreCat?category_id=${genre_id}&entries=1&images=1&detailed=1`,
            requestOptions,
        );
        const result: ApiResponse = (await response.json()) as ApiResponse;

        // Check if result has the expected structure
        if (result?.status) {
            // setMeta(result.meta);
            console.log(result)
            return result
        } else {
            console.error("Unexpected result structure getBooks:", result);
            return result
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return false
    }
};




