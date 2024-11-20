"use server";

import type DataCart from '~/types/book';

interface ApiResponse {
    // meta: PaginationData; 
    data: DataCart[];
    status: boolean;
}
const requestOptions: RequestInit = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PASSKEY_TOKEN}`,
        "Content-Type": "application/json", 
    },
    redirect: "follow", 
};

export async function getBooks(genre_id: number): Promise<ApiResponse | boolean> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/books/getBooksByGenreCat?category_id=${genre_id}&entries=1&images=1&detailed=1`,
            requestOptions,
        );

        const result: ApiResponse = (await response.json()) as ApiResponse;

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
