"use server";

import type { getSubmitReviewResponse, ReviewData } from "~/types/reviews";
import { token221, token223 } from "~/types/tokens";
 


interface ApiResponseReviews {
    // meta: PaginationData; // Adjust based on your actual structure
    data: ReviewData[]
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

export async function submitReviewsApi(ReviewData: ReviewData): Promise<getSubmitReviewResponse | boolean> {
    console.log(ReviewData)
    const requestOptions: RequestInit = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token223}`,
            "Content-Type": "application/json", // Optional, depending on your API
        },
        body: JSON.stringify(ReviewData),
        redirect: "follow", // Use the correct type for `redirect`
    };
    try {
        const response = await fetch(
            `https://booknet-dev.iconsole.com.au/api/books/review`,
            requestOptions,
        );
        const result: getSubmitReviewResponse = (await response.json()) as getSubmitReviewResponse;

        // Check if result has the expected structure
        if (result?.status) {

            return result
        } else {
            console.error("Unexpected result structure submitReviews:", result);
            return result
        }
    } catch (error) {
        console.error("Error fetching data submitReviews:", error);
        return false
    }
};





export async function getReviewsApi(id: number): Promise<ApiResponseReviews | boolean> {
    console.log("id",id)
    try {
        const response = await fetch(
            `https://booknet-dev.iconsole.com.au/api/books/review?item_id=${id}`,
            requestOptions,
        );
        const result: ApiResponseReviews = (await response.json()) as ApiResponseReviews;

        // Check if result has the expected structure
        if (result?.status) {
            // setMeta(result.meta);
            console.log("result structure:",result)
            return result
        } else {
            console.error("Unexpected result getReviews:", result);
            return result
        }
    } catch (error) {
        console.error("Error fetching data getReviews:", error);
        return false
    }
};