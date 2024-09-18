// Define an interface for a single pagination link, if applicable
interface PaginationLink {
    url: string | null; // URL of the page; null if not available
    label: string; // Label for the link (e.g., "Next", "Previous")
  }
  
  // Define the main interface for pagination data
  export default interface PaginationData {
    current_page_url: string | null;
    first_page_url: string | null;
    from: number; // Start index of the current page
    last_page_url: string | null;
    limit: number; // Number of items per page
    links: PaginationLink[]; // Array of pagination links
    next_page_url: string | null;
    page: number; // Current page number
    pages: number; // Total number of pages
    pagination: boolean; // Indicates if pagination is enabled
    prev_page_url: string | null;
    to: number; // End index of the current page
    total: number; // Total number of items
  }
  
