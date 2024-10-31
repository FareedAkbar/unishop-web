


export type ReviewData = {
    name: string,
    review: string,
    stars?: number | null,
    booknet_customer_id?: number | null,
    customer_id?: number | null,
    item_id?: number | null,
    item_reviews_id?: number | null,
  }


interface getSubmitReviewResponse {
    data?: number,
    status: boolean;
}


export type { getSubmitReviewResponse}