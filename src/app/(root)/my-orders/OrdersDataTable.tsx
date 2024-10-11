import React, { useState } from "react";
import DataTable from "~/components/ui-components/DataTable";

const OrdersDataTable = () => {
  // Dummy data for orders
  const generateDummyOrders = () => {
    const orders = [];
    const statuses = ["Completed", "Incompleted"];
    for (let i = 1; i <= 100; i++) {
      orders.push({
        id: i,
        orderId: `ORD-${i}`,
        trackingId: `TRCK-${Math.random().toString(36).substring(2, 8)}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        creationDate: new Date(
          Date.now() - Math.floor(Math.random() * 10000000000),
        ),
        price: (Math.random() * 100).toFixed(2),
      });
    }
    return orders;
  };

  const [tableData, setTableData] = useState(generateDummyOrders());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Completed", "Incompleted"];

  // Filter table data based on the selected tab
  const filteredData = tableData.filter((order) => {
    return activeTab === 0
      ? order.status === "Completed"
      : order.status === "Incompleted";
  });

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Columns definition
  const columns = [
    { key: "orderId", header: "Order ID", isSortable: false },
    { key: "trackingId", header: "Tracking ID", isSortable: false },
    {
      key: "status",
      header: "Status",
      isSortable: true,
      cell: (info: any) => {
        const status = info.status;
        const badgeColor =
          status === "Completed" ? "bg-green-500" : "bg-red-500";
        return (
          <span
            className={`inline-block rounded px-2 py-1 text-white ${badgeColor}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      key: "creationDate",
      header: "Creation Date",
      isSortable: true,
      cell: (info: any) => info.creationDate.toLocaleDateString(),
    },
    {
      key: "price",
      header: "Price",
      isSortable: true,
      cell: (info: any) => `$${info.price}`,
    },
  ];

  return (
    <DataTable
      tableData={filteredData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
      )}
      columns={columns}
      totalRecords={filteredData.length}
      limit={pageSize}
      switchTab={setActiveTab}
      handleSearchwithDate={() => {}}
      tabs={tabs}
      isLoading={false}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  );
};

export default OrdersDataTable;
