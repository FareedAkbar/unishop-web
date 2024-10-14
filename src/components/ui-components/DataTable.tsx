/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaExpand,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaCompress,
} from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiMiniViewColumns } from "react-icons/hi2";

interface DataTableProps {
  tableData: any[];
  columns: {
    key: string;
    header: string;
    isSortable?: boolean;
    cell?: (info: any) => JSX.Element;
  }[];
  isLoading: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  tableData,
  columns: tableColumns,
  isLoading,
}) => {
  const [selectedDateRange, setSelectedDateRange] = useState<
    [Date | null, Date | null]
  >([null, null]);
  const [data, setData] = useState([...tableData]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([...tableData]);
  const [columns, setColumns] = useState(
    tableColumns.map((column) => ({ ...column, isVisible: true })),
  );
  const [sortOptions, setSortOptions] = useState(
    columns
      .filter((column) => column.isSortable)
      .map((column) => ({ key: column.key, mode: "" })),
  );
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Ensure rendering happens only after client-side hydration
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true); // Ensure rendering happens only after client-side hydration
  }, []);

  useEffect(() => {
    setData([...tableData]);
  }, [tableData]);

  const toggleFullScreen = () => {
    const element = document.getElementById("tableContainer");
    if (!document.fullscreenElement) {
      element!.requestFullscreen().catch((err) => {
        console.error(
          "Error attempting to enable full-screen mode:",
          err.message,
        );
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(
          "Error attempting to exit full-screen mode:",
          err.message,
        );
      });
    }
  };

  // Handle fullscreen state change (including ESC key)
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    filterResult();
  }, [searchText, selectedDateRange, tableData]);

  const filterResult = () => {
    let filtered = [...tableData];

    // Search filter
    if (searchText) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    }

    // Date range filter
    const [startDate, endDate] = selectedDateRange;
    if (startDate && endDate) {
      filtered = filtered.filter((row) => {
        const date = new Date(row.creationDate); // Adjust according to your date field
        return date >= startDate && date <= endDate;
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page on new filter
  };

  const handleSearch = () => {
    filterResult(); // Execute search on button click or enter
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleDateRangeChange = (update: [Date | null, Date | null]) => {
    setSelectedDateRange(update);
  };

  const handleColumnToggle = (columnKey: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.key === columnKey) {
          return { ...column, isVisible: !column.isVisible };
        }
        return column;
      }),
    );
  };

  const handleSort = (columnKey: string) => {
    const sortOption = sortOptions.find((option) => option.key === columnKey);
    if (sortOption) {
      sortOption.mode =
        sortOption.mode === "asc"
          ? "desc"
          : sortOption.mode === "desc"
            ? ""
            : "asc";

      const sortedData = [...data].sort((a, b) => {
        if (sortOption.mode === "asc") {
          return a[columnKey] > b[columnKey] ? 1 : -1;
        } else if (sortOption.mode === "desc") {
          return a[columnKey] < b[columnKey] ? 1 : -1;
        }
        return 0;
      });

      setData(sortedData);
    }
    setSortOptions([...sortOptions]);
  };

  const onClickView = (orderId: number) => {
    console.log("Viewing order ID:", orderId);
    // Add your view logic here
  };

  // Calculate total pages based on filtered data and page size
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Get the data to be displayed for the current page
  const displayedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  if (!isClient) return null; // Prevent mismatched SSR/CSR content

  return (
    <div className={`flex flex-col bg-white p-3`} id="tableContainer">
      <div className="mb-4 flex justify-between">
        <div className="flex items-center">
          <div className="ml-4"></div>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
            onKeyPress={handleSearchKeyPress}
            className="rounded border border-gray-300 px-2 py-1"
          />

          <div className="ml-4">
            <DatePicker
              selectsRange
              startDate={selectedDateRange[0]!}
              endDate={selectedDateRange[1]!}
              onChange={(update: [Date | null, Date | null]) =>
                handleDateRangeChange(update)
              }
              className="rounded border border-gray-300 px-4 py-1"
              isClearable={true}
              placeholderText="Select Date Range"
            />
          </div>
        </div>
      </div>
      <div className="mb-4 flex justify-between">
        <div className="flex items-center">
          <HiMiniViewColumns size={20} className="mr-2" />
          <span>Columns:</span>
          {columns.map((column) => (
            <span key={column.key} className="ml-2">
              <input
                type="checkbox"
                checked={column.isVisible}
                onChange={() => handleColumnToggle(column.key)}
              />
              <span className="ml-1">{column.header}</span>
            </span>
          ))}
        </div>
        <div className="flex items-center">
          <span className="mr-2">Page Size:</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="rounded border border-gray-300 px-2 py-1"
          >
            {[10, 20, 30, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <button onClick={toggleFullScreen} className="ml-2">
            {isFullScreen ? <FaCompress /> : <FaExpand />}
          </button>
        </div>
      </div>
      <table className="min-w-full border">
        <thead>
          <tr>
            {columns.map((column) =>
              column.isVisible ? (
                <th
                  key={column.key}
                  className="cursor-pointer border-b p-2 text-left"
                  onClick={() => column.isSortable && handleSort(column.key)}
                >
                  {column.header}
                  {sortOptions.find((sort) => sort.key === column.key)?.mode ===
                    "asc" && <FaAngleUp className="ml-1 inline" />}
                  {sortOptions.find((sort) => sort.key === column.key)?.mode ===
                    "desc" && <FaAngleDown className="ml-1 inline" />}
                </th>
              ) : null,
            )}
          </tr>
        </thead>
        <tbody>
          {displayedData.map((row) => (
            <tr key={row.id} className="border-b">
              {columns.map((column) =>
                column.isVisible ? (
                  <td key={column.key} className="p-2">
                    {column.cell ? column.cell(row) : row[column.key]}
                  </td>
                ) : null,
              )}
              <td className="p-2">
                <FaEye
                  className="cursor-pointer"
                  onClick={() => onClickView(row.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          className={`border px-3 py-1 ${currentPage === 1 ? "bg-gray-200" : "bg-white"}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        <span className="px-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`border px-3 py-1 ${currentPage === totalPages ? "bg-gray-200" : "bg-white"}`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default DataTable;
