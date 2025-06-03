"use server";

// import type { OrderStatusResponse } from '~/types/getSpecialBackOrders';
import type { ItemSpecialTag } from '~/types/productTags';


interface ApiResponseStatus {
    // meta: PaginationData; 
    data: ItemSpecialTag[];
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

export async function getProductTags(): Promise<ApiResponseStatus | boolean> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/customer/special-tags`,
            requestOptions,
        );
        const result: ApiResponseStatus =
            (await response.json()) as ApiResponseStatus;
        if (result?.status) {
            console.log("getProductTags result:", result);
            // setMeta(result.meta);
            return result

        } else {
            console.error("Unexpected result structure getProductTags:", result);
            return result
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return false
    }
};
