"use client";
// components/Pagination.tsx
import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalRecords: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalRecords,
  limit,
  onPageChange,
}) => {
  const searchParams = useSearchParams();

  // Calculate total pages based on total records and limit
  const totalPages = Math.ceil(totalRecords / limit);

  const handlePageChange = (pageNumber: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", pageNumber.toString());

    // Navigate to the new URL
    onPageChange(pageNumber);
  };

  return (
    <div className="mt-4 flex items-center justify-center space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 disabled:opacity-50"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`rounded-md px-4 py-2 ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-400`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalRecords = 100; // Example total records
  const limit = 10; // Records per page

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`Navigated to page: ${page}`);
    // Additional logic, such as fetching data, can be added here.
  };

  return (
    <Suspense fallback={<></>}>
      <Pagination
        currentPage={currentPage}
        totalRecords={totalRecords}
        limit={limit}
        onPageChange={handlePageChange}
      />
    </Suspense>
  );
};

export default Page;
