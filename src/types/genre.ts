 interface Genre {
    genre_id: number;
    genre: string;
    description: string;
}

 interface GenreResponse {
    status: boolean;
    data: Genre[];
}

export type {Genre,GenreResponse}