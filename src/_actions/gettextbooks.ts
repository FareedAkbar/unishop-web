"use server";

import type DataCart from '~/types/book';


interface ApiResponse {
    // meta: PaginationData; // Adjust based on your actual structure
    data: DataCart[];
    status: boolean;
}
const requestOptions: RequestInit = {
    method: "GET",
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MzU0LCJwcm9maWxlX2lkIjoyMDMsIm91dGxldF9pZCI6MjIzLCJmaXJzdF9uYW1lIjoiU2hpbnphIiwibGFzdF9uYW1lIjoiR3VsIiwidGVtcGxhdGVfaWQiOjUsInBhc3Nwb3J0X25vIjpudWxsLCJkYXRlX29mX2JpcnRoIjpudWxsLCJnZW5kZXIiOm51bGwsImRlc2lnbmF0aW9uX2lkIjpbOCwxXSwiZW1haWwiOiJzaGluemEuZ3VsNDFAZ21haWwuY29tIiwicGhvbmVfbnVtYmVyIjoiMzQ1Njc4OTA0NTY3Iiwic2lnbl91cCI6IjIwMjQtMDEtMjJUMDg6MTk6NDEuMDAwWiIsImNyZWF0ZWRfYXQiOiIyMDI0LTAxLTIyVDA4OjE5OjQxLjAwMFoiLCJzZXNzaW9uX2lkIjoxMDk1NCwic2FsdCI6bnVsbCwiaWF0IjoxNzI4MzEwMzk3fQ.LJUiDLcMcXSDXWPvFi-qqx-lQJ_wVE9gdoG7iW5krkM`,
        "Content-Type": "application/json", // Optional, depending on your API
    },
    redirect: "follow", // Use the correct type for `redirect`
};
export async function getBooks(genre_id: number): Promise<ApiResponse | boolean> {

    try {
        const response = await fetch(
            `https://booknet-dev.iconsole.com.au/api/books/getBooksByGenreCat?category_id=${genre_id}&entries=1&images=1&detailed=1`,
            requestOptions,
        );
        const result: ApiResponse = (await response.json()) as ApiResponse;

        // Check if result has the expected structure
        if (result?.status) {
            // setMeta(result.meta);
            return result
        } else {
            console.error("Unexpected result structure:", result);
            return result
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return false
    }
};




