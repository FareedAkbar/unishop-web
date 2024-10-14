/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import moment from "moment";
import React from "react";
import DataTable from "~/components/ui-components/DataTable";
import type {
  GetSpecialOrder,
  OrderStatus,
} from "~/types/getSpecialBackOrders";

interface dataTable {
  data: GetSpecialOrder[];
  orderStatus: OrderStatus[];
}

const OrdersDataTable = ({ data, orderStatus }: dataTable) => {
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
  function getOrderStatusById(orderStatusId: number | null) {
    return orderStatus.find((status) => status.status_id === orderStatusId);
  }

  // const tableData = generateDummyOrders();

  const columns = [
    { key: "order_id", header: "Order ID", isSortable: false },
    { key: "tracking_id", header: "Tracking ID", isSortable: false },
    {
      key: "order_status",
      header: "Status",
      isSortable: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: GetSpecialOrder) => {
        const status = info.order_status;
        const badgeColor = "bg-green-500"; // Simplified for now
        return (
          <span
            className={`inline-block rounded px-2 py-1 text-white ${badgeColor}`}
          >
            {getOrderStatusById(status)?.status_name}
          </span>
        );
      },
    },
    {
      key: "started",
      header: "Creation Date",
      isSortable: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: any) => {
        const date = moment(info.started).format("MM/DD/YYYY");
        return <span>{date}</span>;
      },
    },
    {
      key: "total_discounted_price",
      header: "Price",
      isSortable: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: any) => <span>{`$${info.total_discounted_price}`}</span>, // Changed to JSX element
    },
  ];

  return <DataTable tableData={data} columns={columns} isLoading={false} />;
};

export default OrdersDataTable;
