interface PaginationLink {
    page: number;
    url: string;
    active: boolean;
  }
  
  interface Pagination {
    total: number;
    pagination: boolean;
    pages: number;
    page: number;
    limit: number;
    from: number;
    to: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    first_page_url: string;
    last_page_url: string;
    current_page_url: string;
    links: PaginationLink[];
  }

  export type {Pagination}