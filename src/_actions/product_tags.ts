"use server";

import type { OrderStatusResponse } from '~/types/getSpecialBackOrders';
import type { ItemSpecialTag } from '~/types/productTags';
import { token221, token223 } from '~/types/tokens';


interface ApiResponseStatus {
    // meta: PaginationData; // Adjust based on your actual structure
    data: ItemSpecialTag[];
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


export async function getProductTags(): Promise<ApiResponseStatus | boolean> {
    try {
        const response = await fetch(
            `http://192.168.18.92:3001/api/customer/special-tags`,
            requestOptions,
        );
        const result: ApiResponseStatus =
            (await response.json()) as ApiResponseStatus;
        // Check if result has the expected structure
        if (result?.status) {
            // setMeta(result.meta);
            return result

        } else {
            console.error("Unexpected result structure getProductTags:", result);
            // Handle unexpected structure here
            return result
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return false
    }
};




