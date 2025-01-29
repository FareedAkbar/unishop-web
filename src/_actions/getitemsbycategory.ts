"use server";

import type DataCart from '~/types/book';
import type { Pagination } from '~/types/pagination';
import { SpecialItemsApiResponse } from '~/types/specialItems';

interface ApiResponse {
    // meta: PaginationData; 
    data: DataCart[];
    meta: Pagination;
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

export async function getItemsByCategory(id: number | null, page: number, category_type: number): Promise<ApiResponse | boolean> {
    let x = ""
    if (category_type != 0) {
        x = `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/books/items?pagination=1&limit=15&entries=1&default_supplier_details=1&supplier_details=1&food=0&book=0&category=${id}&page=${page}&images=1&detailed=1&special_tags_only=1&category_type=${category_type}`
    }
    else {
        x = `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/books/items?pagination=1&limit=15&entries=1&default_supplier_details=1&supplier_details=1&food=0&book=0&category=${id}&page=${page}&images=1&detailed=1&special_tags_only=1`
    }

    try {
        const response = await fetch(
            x,
            requestOptions,
        );
        const result: ApiResponse = (await response.json()) as ApiResponse;

        if (result?.status) {
            // setMeta(result.meta);
            console.log(result)
            return result
        } else {
            console.error("Unexpected result getItemsByCategory:", result);
            return result
        }
    } catch (error) {
        console.error("Error fetching getItemsByCategory:", error);
        return false
    }
};


export async function getItemsBySearch(val: string, id: string): Promise<ApiResponse | boolean> {
    console.log(val)
    console.log(id)
    let x = ""
    if (id) {
        x = `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/books/searchUnishop?term=${val}&category_type_id=${id}`
    }
    else {
        x = `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/books/searchUnishop?term=${val}`
    }
    try {
        const response = await fetch(
            x,
            requestOptions,
        );
        const result: ApiResponse = (await response.json()) as ApiResponse;

        if (result?.status) {
            // setMeta(result.meta);
            console.log(result)
            return result
        } else {
            console.error("Unexpected result getItemsByCategory:", result);
            return result
        }
    } catch (error) {
        console.error("Error fetching getItemsByCategory:", error);
        return false
    }
};
export async function getSpecialItems(id: number): Promise<SpecialItemsApiResponse | boolean> {

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/customer/special-tags-items?special_tag_id=${id}`,
            requestOptions,
        );
        const result: SpecialItemsApiResponse = (await response.json()) as SpecialItemsApiResponse;

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
