"use client";
// components/Pagination.tsx
import React from 'react';
import { useSearchParams  } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  
  const searchParams = useSearchParams();
  // const path = usePathname();

 
    const handlePageChange = (pageNumber: number) => {
      // Create a new URLSearchParams object based on the current search params
      const newParams = new URLSearchParams(searchParams.toString());
      
      // Set the 'page' query parameter
      newParams.set('page', pageNumber.toString());
  
      // Construct the new URL with updated query parameters

      // const newUrl = `${path}?${newParams.toString()}`;
  
      // Navigate to the new URL
      onPageChange(pageNumber);
      // router.push(newUrl);
     
     
    };
   


  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 rounded-md ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
