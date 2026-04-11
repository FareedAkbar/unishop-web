/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import moment from "moment";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ModalBody, ModalContent, useModal } from "../ui/animated-modal";
import { GetSpecialOrder } from "~/types/getSpecialBackOrders";
import { FiSearch } from "react-icons/fi";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Ensure rendering happens only after client-side hydration
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const toggleFullScreen = () => {
    if (typeof window !== "undefined") {
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
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleFullScreenChange = () => {
        setIsFullScreen(!!document.fullscreenElement);
      };

      document.addEventListener("fullscreenchange", handleFullScreenChange);

      return () => {
        document.removeEventListener(
          "fullscreenchange",
          handleFullScreenChange,
        );
      };
    }
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
    setCurrentPage(1);
  };
  const items =
    selectedItem?.order_items ??
    selectedItem?.back_order_items ??
    selectedItem?.special_order_items ??
    [];
  const handleSearch = () => {
    filterResult();
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
  };

  const totalPages = Math.ceil(filteredData?.length / pageSize);

  const displayedData = filteredData?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  function formatToSydneyDateOnly(
    date: string | Date | number | null | undefined,
    format = "DD/MM/YYYY",
  ): string {
    if (!date) return "";

    // Parse date WITHOUT applying UTC or timezone shift

    const safe =
      typeof date === "string" ? date.replace(/Z$/, "") : String(date);

    return moment(safe).format(format);
    //  return moment.parseZone(date).local().format(format);
  }
  return (
    <>
      <div
        className={`flex flex-col rounded bg-white p-3 dark:bg-slate-900`}
        id="tableContainer"
      >
        <h1 className="pb-3 text-center text-2xl font-bold text-red-500">
          My Orders
        </h1>
        <div className="mb-4 flex justify-between">
          <div className="flex items-center">
            <div className="ml-4" />
          </div>
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search"
                className="w-full border-b border-gray-300 bg-gray-100 p-2 pl-8 text-sm focus:outline-none dark:bg-slate-700 dark:text-white"
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-500 dark:text-white">
                <FiSearch />
              </span>
            </div>

            <div className="ml-4">
              <DatePicker
                selectsRange
                startDate={selectedDateRange[0] ?? undefined}
                endDate={selectedDateRange[1] ?? undefined}
                onChange={(update: [Date | null, Date | null]) =>
                  handleDateRangeChange(update)
                }
                className="rounded border border-gray-300 px-4 py-2 text-sm dark:bg-slate-700 dark:text-white"
                isClearable={true}
                placeholderText="Select Date Range"
              />
            </div>
          </div>
        </div>
        <div className="mb-4 flex flex-col justify-between gap-2 lg:flex-row lg:gap-0">
          <div className="flex items-center">
            <span className="font-bold">Columns:</span>
            {columns.map((column) => (
              <span key={column.key} className="ml-2 text-sm">
                <input
                  type="checkbox"
                  checked={column.isVisible}
                  className="accent-red-500"
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
                    <td key={column.key} className="p-2 text-sm">
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
            {displayedData?.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="p-4 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between">
          <button
            className={`rounded-full p-2 ${currentPage === 1 ? "cursor-not-allowed bg-gray-200 text-black" : "bg-red-500 text-white"}`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          <span className="px-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`rounded-full p-2 ${currentPage === totalPages ? "cursor-not-allowed bg-gray-200 text-black" : "bg-red-500 text-white"}`}
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
            <h2 className="text-center text-3xl font-extrabold uppercase tracking-wide text-red-500">
              Order Details
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Order Info */}
              <div className="flex flex-col items-center lg:items-start">
                <h3 className="mb-2 text-center text-xl font-bold">
                  Order Information
                </h3>

                <div className="flex items-center">
                  <p className="mr-2 text-sm text-gray-600 dark:text-gray-300">
                    Order ID:
                  </p>
                  <p className="text-lg font-medium">
                    {selectedItem?.order_id}
                  </p>
                </div>

                <div className="mt-2 flex items-center">
                  <p className="mr-2 text-sm text-gray-600 dark:text-gray-300">
                    Tracking ID:
                  </p>
                  <p className="text-lg font-medium">
                    {selectedItem?.tracking_id}
                  </p>
                </div>
                <div className="mt-2 flex items-center">
                  <p className="mr-2 text-sm text-gray-600 dark:text-gray-300">
                    Order Type:
                  </p>
                  <p className="text-lg font-medium">
                    {selectedItem?.order_type == 1 ? "Pickup" : "Delivery"}
                  </p>
                </div>
                <div className="mt-2 flex items-center">
                  <p className="mr-2 text-sm text-gray-600 dark:text-gray-300">
                    {selectedItem?.total_order_price ==
                    selectedItem?.total_discounted_price
                      ? "Price: "
                      : "Actual Price: "}
                  </p>
                  <p className="text-lg font-medium">
                    ${selectedItem?.total_order_price?.toFixed(2)}
                  </p>
                </div>
                {selectedItem?.total_order_price ==
                selectedItem?.total_discounted_price ? (
                  ""
                ) : (
                  <div className="mt-2 flex items-center">
                    <p className="mr-2 text-sm text-gray-600 dark:text-gray-300">
                      Discounted Price:
                    </p>
                    <p className="text-lg font-medium">
                      ${selectedItem?.total_discounted_price?.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>

              {/* Customer Info */}
              <div className="flex flex-col items-center lg:items-end">
                <h3 className="mb-2 text-center text-xl font-bold">
                  Customer Information
                </h3>

                <div className="flex items-center">
                  <p className="mr-2 text-sm text-gray-600 dark:text-gray-300">
                    Customer ID:
                  </p>
                  <p className="text-lg font-medium">
                    {selectedItem?.customer_id ?? "Guest"}
                  </p>
                </div>

                {/* <div className="mt-2 flex items-center">
                  <p className="mr-2 text-sm text-gray-600 dark:text-gray-300">Outlet:</p>
                  <p className="text-lg font-medium">
                    {selectedItem?.outlet}
                  </p>
                </div> */}

                <div className="mt-2 flex items-center">
                  <p className="mr-2 text-sm text-gray-600 dark:text-gray-300">
                    Special Order:
                  </p>
                  <p className="text-lg font-medium">
                    {selectedItem?.back_order_id ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>

            {/* {selectedItem?.special_order_items && (
              <div className="mt-8">
                <h3 className="text-center text-xl font-extrabold uppercase tracking-wider">
                  Order Items
                </h3>
                {selectedItem.special_order_items?.length > 0 ? (
                  <ul className="mt-2 list-inside list-disc text-gray-700 dark:text-gray-300">
                    {selectedItem.special_order_items.map((item, index) => (
                      <li key={index}>
                        <span className="">Item ID:</span> {item.item_id},{" "}
                        <span className="">Quantity:</span> {item.quantity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-gray-700">No items in this order.</p>
                )}
              </div>
            )}

            {selectedItem?.back_order_items && (
              <div className="mt-8">
                <h3 className="text-center text-xl font-extrabold uppercase tracking-wider">
                  Order Items
                </h3>
                {selectedItem.back_order_items?.length > 0 ? (
                  <ul className="mt-2 list-inside list-disc text-gray-700 dark:text-gray-300">
                    {selectedItem.back_order_items.map((item, index) => (
                      <li key={index}>
                        <span className="">Item ID:</span> {item.item_id},{" "}
                        <span className="">Quantity:</span> {item.quantity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-gray-700">No items in this order.</p>
                )}
              </div>
            )}
            {selectedItem?.order_items && (
              <div className="mt-8">
                <h3 className="text-center text-xl font-extrabold uppercase tracking-wider">
                  Order Items
                </h3>
                {selectedItem.order_items?.length > 0 ? (
                  <ul className="mt-2 list-inside list-disc text-gray-700 dark:text-gray-300">
                    {selectedItem.order_items.map((item, index) => (
                      <li key={index}>
                        <span className="">Item ID:</span> {item.item_id},{" "}
                        <span className="">Quantity:</span> {item.quantity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-gray-700">No items in this order.</p>
                )}
              </div>
            )} */}
            {items.length > 0 ? (
              <div className="mt-8">
                <h3 className="mb-4 text-center text-xl font-extrabold uppercase tracking-wider">
                  Order Items
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-500 text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th className="border border-gray-500 p-2">
                          Name/Title
                        </th>
                        <th className="border border-gray-500 p-2">Qty</th>
                        <th className="border border-gray-500 p-2">
                          Unit Price
                        </th>
                        <th className="border border-gray-500 p-2">Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {Array.isArray(items) &&
                        items.map((item: any, index: number) => (
                          <tr key={index} className="text-center">
                            <td className="border border-gray-500 p-2">
                              {item.item_name ??
                                item.food_name ??
                                item.book_title ??
                                "-"}
                            </td>

                            <td className="border border-gray-500 p-2">
                              {item.quantity}
                            </td>

                            <td className="border border-gray-500 p-2">
                              ${(Number(item?.item_price) ?? 0).toFixed(2)}
                            </td>
                            <td className="border border-gray-500 p-2">
                              $
                              {(Number(item?.discounted_price) ?? 0).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* 🔥 TOTAL SECTION (RIGHT BOTTOM) */}
                <div className="mt-4 flex justify-end">
                  <div className="w-full max-w-xs space-y-1 border-t pt-3 text-right">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Subtotal
                        {Number(selectedItem?.delivery_charges ?? 0) > 0 &&
                          " (Delivery charges: $" +
                            selectedItem?.delivery_charges +
                            ")"}
                        :
                      </span>
                      <span>
                        ${selectedItem?.total_order_price?.toFixed(2) ?? "0.00"}
                      </span>
                    </div>

                    {selectedItem?.total_order_price !==
                      selectedItem?.total_discounted_price && (
                      <div className="flex justify-between text-sm text-red-500">
                        <span>Discount:</span>
                        <span>
                          -$
                          {(
                            (selectedItem?.total_order_price ?? 0) -
                            (selectedItem?.total_discounted_price ?? 0)
                          ).toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-base font-bold">
                      <span>Total:</span>
                      <span>
                        $
                        {selectedItem?.total_discounted_price?.toFixed(2) ??
                          "0.00"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-8 text-center text-gray-500">
                No items in this order.
              </p>
            )}
            {/* Order Started */}
            <div className="mt-">
              <p className="text-center text-sm text-gray-500 dark:text-gray-300">
                <span className="font-medium">Order Started:</span>{" "}
                {selectedItem?.started
                  ? formatToSydneyDateOnly(
                      selectedItem.started,
                      "DD/MM/YYYY h:mm A",
                    )
                  : ""}
              </p>
            </div>
          </div>
        </ModalContent>
      </ModalBody>
    </>
  );
};

export default DataTable;
