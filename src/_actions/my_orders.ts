"use server";

import type { GetSpecialOrder, GetSpecialOrderApiResponse, OrderStatus, OrderStatusResponse } from '~/types/getSpecialBackOrders';
import { token221 } from '~/types/tokens';


interface ApiResponse {
    // meta: PaginationData; // Adjust based on your actual structure
    data: GetSpecialOrder[];
    status: boolean;
}
interface ApiResponseStatus {
    // meta: PaginationData; // Adjust based on your actual structure
    data: OrderStatus[];
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
export async function getMyOrders(booknetCustomerId: number): Promise<ApiResponse | boolean> {
    try {
        const response = await fetch(
            `https://booknet-dev.iconsole.com.au/api/special/customer?booknet_customer_id=${booknetCustomerId}&special=0`,
            requestOptions,
        );
        const result: GetSpecialOrderApiResponse =
            (await response.json()) as GetSpecialOrderApiResponse;

        // Check if result has the expected structure
        if (result?.status) {
            // setMeta(result.meta);
            return result

        } else {
            console.error("Unexpected result structure:", result);
            // Handle unexpected structure here
            return result
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return false
    }
};

export async function getOrderStatus(): Promise<ApiResponseStatus | boolean> {
    try {
        const response = await fetch(
            `https://ipos-dev.iconsole.com.au/api/v1/ipos/orders/getOrderStatuses`,
            requestOptions,
        );
        const result: OrderStatusResponse =
            (await response.json()) as OrderStatusResponse;
        // Check if result has the expected structure
        if (result?.status) {
            // setMeta(result.meta);
            return result

        } else {
            console.error("Unexpected result structure:", result);
            // Handle unexpected structure here
            return result
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return false
    }
};




