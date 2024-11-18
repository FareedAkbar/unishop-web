"use server";

import type { addFavResponse, getFavResponse } from "~/types/favourite";


export async function addToFavourite(item_id: number, booknet_customer_id: number): Promise<addFavResponse | boolean> {
    const payload = {
        booknet_customer_id: booknet_customer_id,
        item_id: item_id
    }
    const requestOptions: RequestInit = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PASSKEY_TOKEN}`,
            "Content-Type": "application/json", // Optional, depending on your API
        },
        body: JSON.stringify(payload),
        redirect: "follow", // Use the correct type for `redirect`
    };
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/customer/wishlist`,
            requestOptions,
        );
        const result: addFavResponse = (await response.json()) as addFavResponse;

        // Check if result has the expected structure
        if (result?.status) {

            return result
        } else {
            console.error("Unexpected result structure addToFavourite:", result);
            return result
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return false
    }
};
export async function removeFromFavourite(item_id: number, booknet_customer_id: number): Promise<addFavResponse | boolean> {
    const payload = {
        booknet_customer_id: booknet_customer_id,
        item_id: item_id
    }
    const requestOptions: RequestInit = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PASSKEY_TOKEN}`,
            "Content-Type": "application/json", // Optional, depending on your API
        },
        body: JSON.stringify(payload),
        redirect: "follow", // Use the correct type for `redirect`
    };
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/customer/wishlist`,
            requestOptions,
        );
        const result: addFavResponse = (await response.json()) as addFavResponse;

        // Check if result has the expected structure
        if (result?.status) {

            return result
        } else {
            console.error("Unexpected result structure removeFromFavourite:", result);
            return result
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return false
    }
};

export async function getFavouriteItems(booknet_customer_id: number | null | undefined): Promise<getFavResponse | boolean> {

    const requestOptions: RequestInit = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PASSKEY_TOKEN}`,
            "Content-Type": "application/json", // Optional, depending on your API
        },
       
        redirect: "follow", // Use the correct type for `redirect`
    };
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/customer/wishlist?booknet_customer_id=${booknet_customer_id}`,
            requestOptions,
        );
        const result: getFavResponse = (await response.json()) as getFavResponse;

        // Check if result has the expected structure
        if (result?.status) {
            console.log("result",result)
            return result
        } else {
            console.error("Unexpected result structure getFavouriteItems:", result);
            return result
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return false
    }
};




