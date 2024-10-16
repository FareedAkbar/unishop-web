"use server";

import type DataCart from '~/types/book';
import { token221 } from '~/types/tokens';


interface ApiResponse {
    // meta: PaginationData; // Adjust based on your actual structure
    data: DataCart[];
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
export async function getBooks(genre_id: number): Promise<ApiResponse | boolean> {
    try {
        const response = await fetch(
            `https://booknet-dev.iconsole.com.au/api/books/getBooksByGenreCat?genre_id=${genre_id}&category_id=27&entries=1&images=1&detailed=1`,
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




