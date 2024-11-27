"use server";

import type { GetSpecialOrder, GetSpecialOrderApiResponse, OrderStatus, OrderStatusResponse } from '~/types/getSpecialBackOrders';


interface ApiResponse {
    // meta: PaginationData; 
    data: GetSpecialOrder[];
    status: boolean;
}
interface ApiResponseStatus {
    // meta: PaginationData; 
    data: OrderStatus[];
    status: boolean;
}

export async function getMyOrders(booknetCustomerId: number): Promise<ApiResponse | boolean> {
    const payload = {
        customer_id: null,
        booknet_customer_id: booknetCustomerId
    }

    const requestOptions: RequestInit = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PASSKEY_TOKEN}`,
            "Content-Type": "application/json", 
        },
        redirect: "follow", 
        body: JSON.stringify(payload),
    };

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/orders/customer`,
            requestOptions,
        );
        const result: GetSpecialOrderApiResponse =
            (await response.json()) as GetSpecialOrderApiResponse;

        if (result?.status) {
            // setMeta(result.meta);
            return result

        } else {
            console.error("Unexpected result structure getMyOrders:", result);
            // Handle unexpected structure here
            return result
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return false
    }
};

export async function getOrderStatus(): Promise<ApiResponseStatus | boolean> {
    const requestOptions: RequestInit = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PASSKEY_TOKEN}`,
            "Content-Type": "application/json", 
        },
        redirect: "follow",
    };
    
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_PASSKEY_IPOS}api/v1/ipos/orders/getOrderStatuses`,
            requestOptions,
        );
        const result: OrderStatusResponse =
            (await response.json()) as OrderStatusResponse;
        if (result?.status) {
            // setMeta(result.meta);
            return result

        } else {
            console.error("Unexpected result structure getOrderStatus:", result);
            return result
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return false
    }
};




