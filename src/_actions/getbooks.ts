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
            `http://192.168.18.92:3001/api/books/getBooksByGenreCat?genre_id=${genre_id}&category_id=27&entries=1&images=1&detailed=1`,
            requestOptions,
        );
        const result: ApiResponse = (await response.json()) as ApiResponse;

        // Check if result has the expected structure
        if (result?.status) {
            // setMeta(result.meta);
            console.log("Result Structure:", result)
            return result
        } else {
            console.error("Unexpected resulttt structure:", result);
            return result
        }
    } catch (error) {
        console.error("Errorrr fetching data:", error);
        return false
    }
};




