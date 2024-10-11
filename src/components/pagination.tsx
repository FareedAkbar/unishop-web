"use client";
// components/Pagination.tsx
import React from 'react';
import { useSearchParams  } from 'next/navigation';
interface PaginationProps {
  currentPage: number;
  totalRecords: number; // Add totalRecords
  limit: number;        // Add limit
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalRecords, limit, onPageChange }) => {
  const searchParams = useSearchParams();
  
  // Calculate total pages based on total records and limit
  const totalPages = Math.ceil(totalRecords / limit);

  const handlePageChange = (pageNumber: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', pageNumber.toString());
    
    // Navigate to the new URL
    onPageChange(pageNumber);
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
