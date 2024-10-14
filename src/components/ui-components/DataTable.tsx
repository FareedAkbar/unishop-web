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
import { ModalBody, ModalContent, useModal } from "../ui/animated-modal";
import { GetSpecialOrder } from "~/types/getSpecialBackOrders";

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
  const { setOpen } = useModal();
  const [data, setData] = useState(tableData);
  const [selectedItem, setSelectedItem] = useState<GetSpecialOrder | null>(
    null,
  );
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(tableData);
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
    setData(tableData);
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
    let filtered = tableData;

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
        const date = new Date(row.started); // Adjust according to your date field
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

      setFilteredData(sortedData);
    }
    setSortOptions([...sortOptions]);
  };

  const onClickView = (order: GetSpecialOrder) => {
    console.log("Viewing order ID:", order);
    setSelectedItem(order);
    setOpen(true);
    // Add your view logic here
  };

  // Calculate total pages based on filtered data and page size
  const totalPages = Math.ceil(filteredData?.length / pageSize);

  // Get the data to be displayed for the current page
  const displayedData = filteredData?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  if (!isClient) return null; // Prevent mismatched SSR/CSR content

  return (
    <>
      <div className={`flex flex-col bg-white dark:bg-slate-900 rounded p-3`} id="tableContainer">
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
              className="rounded border border-gray-300 dark:bg-slate-700 dark:text-white px-2 py-1"
            />

            <div className="ml-4">
              <DatePicker
                selectsRange
                startDate={selectedDateRange[0]!}
                endDate={selectedDateRange[1]!}
                onChange={(update: [Date | null, Date | null]) =>
                  handleDateRangeChange(update)
                }
                className="rounded border border-gray-300 px-4 py-1 dark:bg-slate-700 dark:text-white"
                isClearable={true}
                placeholderText="Select Date Range"
              />
            </div>
          </div>
        </div>
        <div className="mb-4 flex lg:flex-row flex-col  lg:gap-0 gap-2 justify-between">
          <div className="flex items-center">
            <span className="font-bold">Columns:</span>
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
          <div className="flex items-center self-end">
            <span className="mr-2">Page Size:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="rounded border border-gray-300 px-2 py-1 dark:bg-slate-700 dark:text-white"
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
                    {sortOptions.find((sort) => sort.key === column.key)
                      ?.mode === "asc" && <FaAngleUp className="ml-1 inline" />}
                    {sortOptions.find((sort) => sort.key === column.key)
                      ?.mode === "desc" && (
                      <FaAngleDown className="ml-1 inline" />
                    )}
                  </th>
                ) : null,
              )}
            </tr>
          </thead>
          <tbody>
            {displayedData?.map((row) => (
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
                    className="cursor-pointer text-red-400 hover:text-red-600"
                    onClick={() => onClickView(row)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between">
          <button
            className={`rounded-full p-2 ${currentPage === 1 ? "bg-gray-200" : "bg-red-500 text-white"}`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          <span className="px-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`rounded-full p-2 ${currentPage === totalPages ? "bg-gray-200" : "bg-red-500 text-white"}`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <ModalBody>
        <ModalContent>
          <div className="space-y-8 p-3">
            <h2 className="text-center text-3xl font-extrabold uppercase tracking-wide text-gray-900">
              Order Details
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Order Info */}
              <div className="flex flex-col items-center lg:items-start">
                <h3 className="mb-2 text-center text-xl font-bold text-gray-800">
                  Order Information
                </h3>

                {/* Using flex for attribute-value pairs */}
                <div className="flex items-center">
                  <p className="mr-2 text-sm text-gray-600">Order ID:</p>
                  <p className="text-lg font-semibold">
                    {selectedItem?.order_id}
                  </p>
                </div>

                <div className="mt-2 flex items-end">
                  <p className="mr-2 text-sm text-gray-600">Tracking ID:</p>
                  <p className="text-lg font-semibold">
                    {selectedItem?.tracking_id}
                  </p>
                </div>

                <div className="mt-2 flex items-center">
                  <p className="mr-2 text-sm text-gray-600">Actual Price:</p>
                  <p className="text-lg font-semibold">
                    ${selectedItem?.total_order_price}
                  </p>
                </div>

                <div className="mt-2 flex items-center">
                  <p className="mr-2 text-sm text-gray-600">
                    Discounted Price:
                  </p>
                  <p className="text-lg font-semibold">
                    ${selectedItem?.total_discounted_price}
                  </p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="flex flex-col items-center lg:items-end">
                <h3 className="mb-2 text-center text-xl font-bold">
                  Customer Information
                </h3>

                <div className="flex items-center">
                  <p className="mr-2 text-sm text-gray-600">Customer ID:</p>
                  <p className="text-lg font-semibold">
                    {selectedItem?.customer_id || "Guest"}
                  </p>
                </div>

                <div className="mt-2 flex items-center">
                  <p className="mr-2 text-sm text-gray-600">Outlet:</p>
                  <p className="text-lg font-semibold">
                    {selectedItem?.outlet}
                  </p>
                </div>

                <div className="mt-2 flex items-center">
                  <p className="mr-2 text-sm text-gray-600">Special Order:</p>
                  <p className="text-lg font-semibold">
                    {selectedItem?.special ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>

            {/* Special Order Items */}
            {selectedItem?.special && (
              <div className="mt-8">
                <h3 className="text-center text-xl font-extrabold uppercase tracking-wider">
                  Special Order Items
                </h3>
                {selectedItem.special_order_items?.length > 0 ? (
                  <ul className="mt-2 list-inside list-disc text-gray-700">
                    {selectedItem.special_order_items.map((item, index) => (
                      <li key={index}>
                        <span className="">Item ID:</span> {item.item_id},{" "}
                        <span className="">Quantity:</span> {item.quantity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-gray-700">
                    No special items in this order.
                  </p>
                )}
              </div>
            )}
            {/* Order Started */}
            <div className="mt-">
              <p className="text-center text-sm text-gray-500">
                <span className="font-semibold">Order Started:</span>{" "}
                {new Date(selectedItem?.started!).toLocaleString()}
              </p>
            </div>
          </div>
        </ModalContent>
      </ModalBody>
    </>
  );
};

export default DataTable;
