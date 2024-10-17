interface addFavResponse {
    // meta: PaginationData; // Adjust based on your actual structure
    // data: DataCart[];
    status: boolean;
}

type FavData = {
    booknet_customer_wishlist_id: number,
    booknet_customer_id: number,
    item_id: number
}
interface getFavResponse {
    data: FavData[];
    status: boolean;
}


export type {addFavResponse, getFavResponse, FavData}