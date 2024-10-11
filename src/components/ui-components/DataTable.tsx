import React, { useState, useEffect } from "react";
import { FaAngleDown, FaAngleUp, FaExpand, FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [data, setData] = useState([...tableData]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([...tableData]);
  const [columns, setColumns] = useState(tableColumns.map(column => ({ ...column, isVisible: true })));
  const [sortOptions, setSortOptions] = useState(columns.filter(column => column.isSortable).map(column => ({ key: column.key, mode: "" })));
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setData([...tableData]);
  }, [tableData]);

  const handleFilterApply = () => {
    filterResult();
  };

  const toggleFullScreen = () => {
    const element = document.getElementById("tableContainer");
    if (!document.fullscreenElement) {
      element!.requestFullscreen().catch(err => {
        console.error("Error attempting to enable full-screen mode:", err.message);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen().catch(err => {
        console.error("Error attempting to exit full-screen mode:", err.message);
      });
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    filterResult();
  }, [searchText, selectedDateRange, tableData]);

  const filterResult = () => {
    let filtered = [...tableData];

    // Search filter
    if (searchText) {
      filtered = filtered.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    }

    // Date range filter
    const [startDate, endDate] = selectedDateRange;
    if (startDate && endDate) {
      filtered = filtered.filter(row => {
        const date = new Date(row.date); // Adjust according to your date field
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
    setColumns(prevColumns =>
      prevColumns.map(column => {
        if (column.key === columnKey) {
          return { ...column, isVisible: !column.isVisible };
        }
        return column;
      }),
    );
  };

  const handleSort = (columnKey: string) => {
    const sortOption = sortOptions.find(option => option.key === columnKey);
    if (sortOption) {
      sortOption.mode = sortOption.mode === "asc" ? "desc" : sortOption.mode === "desc" ? "" : "asc";

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
  const displayedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
          <CiSearch
            size={20}
            className="ml-2 cursor-pointer"
            onClick={handleSearch}
          />
          <div className="ml-4">
            <DatePicker
              selectsRange
              startDate={selectedDateRange[0]!}
              endDate={selectedDateRange[1]!}
              onChange={(update: [Date | null, Date | null]) => handleDateRangeChange(update)}
              className="rounded border border-gray-300 px-4 py-1"
              isClearable={true}
              placeholderText="Select Date Range"
            />
          </div>
          <button
            className="ml-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            onClick={handleSearch}
          >
            Apply
          </button>
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
            <FaExpand />
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
                  <div className="flex items-center justify-between">
                    <span>{column.header}</span>
                    {column.isSortable && (
                      <>
                        {sortOptions.find((option) => option.key === column.key)?.mode === "asc" ? (
                          <FaAngleUp />
                        ) : (
                          <FaAngleDown />
                        )}
                      </>
                    )}
                  </div>
                </th>
              ) : null,
            )}
            <th className="border-b p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.filter((col) => col.isVisible).length + 1} // +1 for Action column
                className="p-2 text-center"
              >
                Loading...
              </td>
            </tr>
          ) : displayedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.filter((col) => col.isVisible).length + 1} // +1 for Action column
                className="p-2 text-center"
              >
                No data available.
              </td>
            </tr>
          ) : (
            displayedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) =>
                  column.isVisible ? (
                    <td key={column.key} className="border-b p-2">
                      {column.cell ? column.cell(row) : row[column.key]}
                    </td>
                  ) : null,
                )}
                <td className="border-b p-2">
                  <button onClick={() => onClickView(row.id)}>
                    <FaEye className="text-red-400"/>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default DataTable;
