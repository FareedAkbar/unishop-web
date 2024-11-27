"use server";

import type { getSubmitReviewResponse, ReviewData } from "~/types/reviews";
 
interface ApiResponseReviews {
    // meta: PaginationData; 
    data: ReviewData[]
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

export async function submitReviewsApi(ReviewData: ReviewData): Promise<getSubmitReviewResponse | boolean> {
    const requestOptions: RequestInit = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PASSKEY_TOKEN}`,
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(ReviewData),
        redirect: "follow", 
    };

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/books/review`,
            requestOptions,
        );
        const result: getSubmitReviewResponse = (await response.json()) as getSubmitReviewResponse;

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
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET}api/books/review?item_id=${id}`,
            requestOptions,
        );
        const result: ApiResponseReviews = (await response.json()) as ApiResponseReviews;

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