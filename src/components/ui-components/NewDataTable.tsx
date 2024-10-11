"use client";

import React, { useEffect, useState } from "react";
import Card from "../card";
import Dropdown from "../dropdown";
import { FaAngleDown, FaAngleUp, FaExpand } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import MiniCalendar from "../calendar/MiniCalendar";
import { HiMiniViewColumns } from "react-icons/hi2";
import { MdDensitySmall, MdFullscreenExit } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaArrowUp, FaArrowDown, FaPlus } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Pagination from "../pagination/Pagination";
import { exportToExcel } from "@/utils/excelExport";

interface DataTableProps {
  tableData: any[];
  columns: {
    key: string;
    header: string;
    isSortable?: boolean | undefined;
    cell?: (info: any) => JSX.Element;
  }[];
  totalRecords: number;
  limit: number;
  switchTab: (index: number) => void;
  handleSearchwithDate: (
    text: string,
    startDate?: Date,
    endDate?: Date
  ) => void;
  // tabs: string[];
  actions: any[];
  tabs: string[];
  exportData?: (mode: string) => void;
  isLoading: boolean;
  createBtn: {
    title: string;
    onClick: () => void;
  };
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const DataTable = ({
  tableData,
  columns: tableColumns,
  totalRecords,
  limit,
  switchTab,
  handleSearchwithDate,
  actions,
  tabs,
  exportData,
  isLoading,
  createBtn,
  onPageChange,
  currentPage,
}: DataTableProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [selectedDateOption, setSelectedDateOption] = useState<number>(-1);
  const [data, setData] = useState([...tableData]);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState("");
  const initialColumns = tableColumns.map((column) => ({
    ...column,
    isVisible: true,
  }));
  const [columns, setColumns] = useState(initialColumns);
  const [sortOptions, setSortOptions] = useState(
    columns
      .filter((column) => column.isSortable)
      .map((column) => ({
        key: column.key,
        mode: "",
      }))
  );
  const [paddingClass, setPaddingClass] = useState<string>("5px");
  const [updatedColumns, setUpdatedColumns] = useState([...initialColumns]);
  const exportCurrent = () => {
    const filteredData = data.map((item) => {
      const filteredItem: any = {};
      columns.forEach((column) => {
        const columnHeader = column.header;
        filteredItem[columnHeader] = item[column.key];
      });
      return filteredItem;
    });
    const currentDate = new Date().toISOString().split("T")[0];
    exportToExcel(filteredData, currentDate);
  };

  const handleRowPadding = () => {
    setPaddingClass((prev) => {
      switch (prev) {
        case "5px":
          return "30px";
        case "30px":
          return "40px";
        case "40px":
          return "60px";
        case "60px":
          return "5px";
        default:
          return "5px";
      }
    });
  };
  const dateOptions: string[] = [
    "Year to Date",
    "Month to Date",
    "Last 30 days",
    "Last 60 days",
    "Last 90 days",
    "Select Date Range",
  ];

  useEffect(() => {
    setData([...tableData]);
  }, [tableData]);

  const handleFilterApply = () => {
    filterResult({ searchText, dateRange });
  };

  enum DATEOPTIONS {
    "Year to Date" = 0,
    "Month to Date" = 1,
    "Last 30 days" = 2,
    "Last 60 days" = 3,
    "Last 90 days" = 4,
    "Select Date Range" = 5,
  }
  const filterResult = ({ searchText, dateRange }) => {
    let startDate = "";
    let endDate = "";
    const now = new Date();

    switch (selectedDateOption) {
      case DATEOPTIONS["Year to Date"]: // Year to Date
        startDate = new Date(now.getFullYear(), 0, 1)
          .toISOString()
          .split("T")[0];
        endDate = now.toISOString().split("T")[0];
        break;
      case DATEOPTIONS["Month to Date"]: // Month to Date
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
          .toISOString()
          .split("T")[0];
        endDate = now.toISOString().split("T")[0];
        break;
      case DATEOPTIONS["Last 30 days"]: // Last 30 days
        startDate = new Date(now.setDate(now.getDate() - 30))
          .toISOString()
          .split("T")[0];
        endDate = new Date().toISOString().split("T")[0];
        break;
      case DATEOPTIONS["Last 60 days"]: // Last 60 days
        startDate = new Date(now.setDate(now.getDate() - 60))
          .toISOString()
          .split("T")[0];
        endDate = new Date().toISOString().split("T")[0];
        break;
      case DATEOPTIONS["Last 90 days"]: // Last 90 days
        startDate = new Date(now.setDate(now.getDate() - 90))
          .toISOString()
          .split("T")[0];
        endDate = new Date().toISOString().split("T")[0];
        break;
      case DATEOPTIONS["Select Date Range"]: // Select Date Range
        const [start, end] = dateRange.split("|");
        startDate = new Date(start).toISOString().split("T")[0];
        endDate = new Date(end).toISOString().split("T")[0];
        break;
      default:
        break;
    }
    console.log("start date", startDate);
    console.log("end date", endDate);
    if (dateRange) {
      handleSearchwithDate(
        searchText || "",
        new Date(startDate),
        new Date(endDate)
      );
    } else {
      handleSearchwithDate(searchText || "");
    }
  };

  const sortItems = (key: string) => {
    const sortedData = [...data].sort((a, b) => {
      // use mode to determine the sorting order
      const mode = sortOptions.find((option) => option.key === key)?.mode;
      if (mode === "asc") {
        if (a[key] < b[key]) {
          return -1;
        }
        if (a[key] > b[key]) {
          return 1;
        }
        return 0;
      } else {
        if (a[key] > b[key]) {
          return -1;
        }
        if (a[key] < b[key]) {
          return 1;
        }
        return 0;
      }
    });

    setSortOptions(
      sortOptions.map((option) => {
        if (option.key === key) {
          return {
            key,
            mode: option.mode === "asc" ? "desc" : "asc",
          };
        }
        return option;
      })
    );
    console.log(sortedData);
    setData(sortedData);
  };
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    const element = document.getElementById("tableContainer");
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch((err) => {
        console.error(
          "Error attempting to enable full-screen mode:",
          err.message
        );
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(
          "Error attempting to exit full-screen mode:",
          err.message
        );
      });
      setIsFullScreen(false);
    }
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newUpdatedColumns = updatedColumns.map((col, i) =>
      i === index ? { ...col, isVisible: e.target.checked } : col
    );
    setUpdatedColumns(newUpdatedColumns);
    setColumns(newUpdatedColumns.filter((col) => col.isVisible));
  };

  return (
    <div id="tableContainer" className="bg-white dark:!bg-stone-800">
      <Card extra={"w-full px-6 my-5 border py-3"}>
        {/* Header */}
        <div>
          {/* Tabs and Filter dropdown */}
          <div id="header" className="border-b ">
            <div className="flex flex-row justify-between gap-6">
              {/* Tabs */}
              <div className="flex flex-row overflow-x-scroll xl:overflow-x-hidden">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`mr-1 rounded rounded-b-none px-3 py-2 text-base text-gray-600  dark:text-gray-400  ${
                      activeTab === index
                        ? "bg-brand-500 text-white "
                        : "hover:text-gray-800 dark:hover:text-gray-200"
                    }`}
                    onClick={() => {
                      switchTab(index);
                      setActiveTab(index);
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Filter By Dropdown */}
              <div>
                <Dropdown
                  button={
                    <button className="flex items-center gap-2 rounded bg-brand-500 p-2 text-base text-gray-200 hover:text-gray-600">
                      Filter By <FaAngleDown />
                    </button>
                  }
                  animation={
                    "origin-top-right transition-all duration-300 ease-in-out"
                  }
                  classNames={"top-11 xl:w-100 right-5"}
                >
                  <div
                    style={{ transitionDuration: "2s" }}
                    className="z-50 mr-[-30px] rounded-xl border bg-white px-6 py-5 text-sm shadow-xl shadow-shadow-500 dark:!bg-stone-700 dark:shadow-none sm:w-[400px]"
                  >
                    <h4 className="font-bold">Filter By:</h4>
                    {/* Input field with search icon */}
                    <div className="mt-3 flex items-center">
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full rounded border border-gray-200 p-2"
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                        style={{ color: "gray" }}
                      />
                      <span className="absolute right-5 text-gray-400">
                        <CiSearch size={20} />
                      </span>
                    </div>

                    {/* Date filter */}

                    <div className="mb-3 mt-5 flex justify-between">
                      <h4 className="font-bold">Date</h4>
                      <button
                        onClick={() => setShowDateFilter(!showDateFilter)}
                      >
                        {showDateFilter ? <FaAngleUp /> : <FaAngleDown />}
                      </button>
                    </div>

                    {/* Date Accordian */}
                    {showDateFilter && (
                      <div
                        className={`origin-top transition-all duration-300 ease-in-out ${
                          showDateFilter
                            ? "h-auto opacity-100"
                            : "h-0 overflow-hidden opacity-0"
                        }`}
                      >
                        <div className="flex origin-top flex-row items-start gap-2 	">
                          <div>
                            {dateOptions?.map((dateOption, index) => (
                              <button
                                onClick={() => setSelectedDateOption(index)}
                                key={index}
                                className={`${
                                  index === selectedDateOption
                                    ? "bg-brand-500 text-white"
                                    : ""
                                } block rounded px-2 py-1 text-start`}
                              >
                                {dateOption}
                              </button>
                            ))}
                          </div>
                          <div className="w-60 overflow-hidden">
                            {selectedDateOption === 5 && (
                              <MiniCalendar
                                selectRange={true}
                                classNames="dark:hover:bg-brand-500"
                                onChange={(range: Date | [Date, Date]) => {
                                  if (Array.isArray(range)) {
                                    const [start, end] = range;
                                    setDateRange(
                                      `${start.toISOString()}|${end.toISOString()}`
                                    );
                                  }
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    <div>
                      <button
                        className="mt-5 block w-full rounded bg-brand-500 px-3 py-2 text-white"
                        onClick={handleFilterApply}
                      >
                        Apply
                      </button>
                      <button
                        className="mt-2 block w-full rounded bg-gray-200 px-3 py-2 text-gray-600"
                        onClick={() => {
                          setSearchText("");
                          setDateRange("");
                          setSelectedDateOption(-1);
                          setData([...tableData]);
                        }}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>

          {/* Fullscreen, export, density, column hide/unhide button */}
          <div className="mt-3 flex justify-end">
            <div className="flex items-center gap-3">
              <Dropdown
                button={
                  <button>
                    <HiMiniViewColumns
                      size={20}
                      className="text-brand-500 dark:text-white"
                    />
                  </button>
                }
                animation={
                  "origin-top-right transition-all duration-300 ease-in-out"
                }
                classNames={"top-5 w-100 right-5"}
              >
                <div className="z-50 w-[250px] rounded-xl border bg-white px-6 py-5 text-sm shadow-xl shadow-shadow-500 dark:!bg-stone-700 dark:shadow-none">
                  <h4 className="font-bold">Show/Hide Columns</h4>
                  {updatedColumns.map((column, index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between  py-2"
                    >
                      <p>{column.header}</p>
                      <label className="inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          value=""
                          className="peer sr-only"
                          checked={column.isVisible}
                          onChange={(e) => handleCheckboxChange(e, index)}
                        />
                        <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-brand-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-brand-800 rtl:peer-checked:after:-translate-x-full"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </Dropdown>

              <button onClick={handleRowPadding}>
                <MdDensitySmall
                  size={20}
                  className="text-brand-500 dark:text-white"
                />
              </button>
              <button onClick={toggleFullScreen}>
                {isFullScreen ? (
                  <MdFullscreenExit className="h-6 w-6 text-brand-500 dark:text-white" />
                ) : (
                  <FaExpand
                    size={20}
                    className="text-brand-500 dark:text-white"
                  />
                )}
              </button>
              {createBtn && (
                <button
                  className="ms-4 flex flex-row items-center gap-2 rounded bg-brand-500 p-2 text-white"
                  onClick={createBtn.onClick}
                >
                  <FaPlus color="white" />
                  {createBtn.title}
                </button>
              )}
              {exportData && (
                <Dropdown
                  button={
                    <button className="ms-4 rounded bg-brand-500 p-2">
                      <IoMdDownload
                        size={30}
                        className="text-white dark:text-white"
                      />
                    </button>
                  }
                  animation={
                    "origin-top-right transition-all duration-300 ease-in-out"
                  }
                  classNames={"top-10 w-100 right-10"}
                >
                  <div className="z-50 w-[150px] rounded-xl border bg-white px-6 py-5 text-sm shadow-xl shadow-shadow-500 dark:!bg-stone-700 dark:shadow-none">
                    <button
                      //    onClick={() => action.onClick(user)}
                      className="flex w-full cursor-pointer items-center gap-2 rounded p-1 text-base text-gray-600 hover:bg-brand-500 hover:font-medium hover:text-white"
                    >
                      All
                    </button>
                    <button
                      onClick={exportCurrent}
                      className="flex  w-full cursor-pointer items-center gap-2 rounded p-1 text-base text-gray-600 hover:bg-brand-500 hover:font-medium hover:text-white"
                    >
                      Current
                    </button>
                  </div>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
        <div
          className="overflow-x-scroll xl:overflow-x-hidden"
          style={{ height: "70vh" }}
        >
          {/* Main Table */}
          <table className="mt-3 w-full">
            <thead className=" border-b bg-gray-300 dark:bg-stone-800">
              <tr>
                {columns?.map((column, index) => (
                  <td key={index} className="w-auto p-2 font-bold">
                    <span
                      className={column?.isSortable ? `cursor-pointer` : ""}
                      {...(column?.isSortable && {
                        onClick: () => sortItems(column?.key),
                      })}
                    >
                      {column.header}
                    </span>
                    {column?.isSortable && (
                      <button
                        onClick={() => sortItems(column?.key)}
                        className="inline-block"
                      >
                        {sortOptions.find(
                          (sortOption) => sortOption.key === column?.key
                        ).mode === "asc" ? (
                          <FaArrowUp />
                        ) : sortOptions.find(
                            (sortOption) => sortOption.key === column?.key
                          ).mode === "desc" ? (
                          <FaArrowDown />
                        ) : (
                          ""
                        )}
                      </button>
                    )}
                  </td>
                ))}
                {actions && <td className="p-2 font-bold">{"Actions"}</td>}
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                {Array.from({ length: limit }).map((_, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="flex-1 border border-gray-300  "
                  >
                    {Array.from({
                      length: actions ? columns.length + 1 : columns.length,
                    }).map((_, colIndex) => (
                      <td key={colIndex} className="bg flex-1 p-4 ">
                        <Skeleton
                          width={"70%"}
                          highlightColor={
                            localStorage.getItem("theme") === "dark"
                              ? "#525252"
                              : null
                          }
                          baseColor={
                            localStorage.getItem("theme") === "dark"
                              ? "#3a3a3a"
                              : null
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ) : data?.length === 0 ? (
              <tbody>
                <tr>
                  <td
                    colSpan={actions ? columns.length + 1 : columns.length}
                    className="flex h-full items-center justify-center"
                  >
                    <div className="text-center">No data found</div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {data?.map((row, rowIndex) => (
                  <tr
                    className={`border-b border-gray-200 dark:border-gray-700`}
                    key={rowIndex}
                  >
                    {columns?.map((column, index) => (
                      <td
                        className="px-2"
                        style={{
                          paddingTop: paddingClass,
                          paddingBottom: paddingClass,
                          transition: "0.3s",
                        }}
                        key={index}
                      >
                        {column?.cell
                          ? column?.cell(row[column.key])
                          : row[column.key]}
                      </td>
                    ))}
                    {actions && (
                      <td className="min-w-[150px]  py-3 pr-4">
                        <Dropdown
                          button={
                            <button
                              // onClick={() => setOpen(!open)}
                              className={`dark:active:bg-white/10' linear flex items-center  justify-center rounded-lg bg-lightPrimary p-2 text-xl font-bold text-brand-500 transition
                              duration-200 hover:cursor-pointer hover:bg-gray-100 dark:bg-stone-700 dark:text-white dark:hover:bg-white/20`}
                            >
                              <HiDotsHorizontal className="h-6 w-6" />
                            </button>
                          }
                          animation={
                            "origin-top transition-all duration-300 ease-in-out"
                          }
                          classNames={` top-11  w-max`}
                        >
                          <div
                            style={{ zIndex: 9999 }}
                            className="z-50 w-36 rounded-xl border bg-white px-4 py-3 text-sm shadow-xl shadow-shadow-500 dark:!bg-stone-700 dark:shadow-none"
                          >
                            {actions.map((action, idx) => (
                              <button
                                key={idx}
                                onClick={() => action.onClick(row)}
                                className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-base text-gray-600 hover:bg-brand-500 hover:font-medium hover:text-white"
                              >
                                {action.name}
                              </button>
                            ))}
                          </div>
                        </Dropdown>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </Card>
      <Pagination
        totalRecords={data.length}
        limit={10}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default DataTable;