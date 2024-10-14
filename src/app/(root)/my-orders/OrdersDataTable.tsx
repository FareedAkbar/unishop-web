/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import React from "react";
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

  const tableData = generateDummyOrders();

  const columns = [
    { key: "orderId", header: "Order ID", isSortable: false },
    { key: "trackingId", header: "Tracking ID", isSortable: false },
    {
      key: "status",
      header: "Status",
      isSortable: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const status = info.status ? info.status : "";
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      cell: (info: any) => info.creationDate.toLocaleDateString(),
    },
    {
      key: "price",
      header: "Price",
      isSortable: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: any) => `$${info.price}`,
    },
  ];

  return (
    <DataTable tableData={tableData} columns={columns} isLoading={false} />
  );
};

export default OrdersDataTable;
