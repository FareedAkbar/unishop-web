"use server";

import type DataCart from '~/types/book';
import type { TextBookApiResponse } from '~/types/textbookType';

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

export async function getMetaData(genre_id: number): Promise<ApiResponse | boolean> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/books/getBooksByGenreCat?genre_id=${genre_id}&category_id=27&entries=1&images=1&detailed=1`,
            requestOptions,
        );
        const result: ApiResponse = (await response.json()) as ApiResponse;

        if (result?.status) {
            // setMeta(result.meta);
            return result
        } else {
            console.error("Unexpected resulttt getMetaData:", result);
            return result
        }
    } catch (error) {
        console.error("Errorrr fetching getMetaData:", error);
        return false
    }
};

export async function getTextBookTypeData(): Promise<TextBookApiResponse | boolean> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/books/types`,
            requestOptions,
        );
        const result: TextBookApiResponse = (await response.json()) as TextBookApiResponse;

        if (result?.status) {
            // setMeta(result.meta);
            return result
        } else {
            console.error("Unexpected result books/types:", result);
            return result
        }
    } catch (error) {
        console.error("Error fetching books/types:", error);
        return false
    }
};




