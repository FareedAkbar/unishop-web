/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import moment from "moment";
import React from "react";
import DataTable from "~/components/ui-components/DataTable";
import type { GetSpecialOrder } from "~/types/getSpecialBackOrders";
import OrderStatus from "./OrderStatus";

interface dataTable {
  data: GetSpecialOrder[];
  orderStatus: OrderStatus[];
  onRefresh?: () => void;
  isLoading?: boolean;
}

const OrdersDataTable = ({ data, orderStatus, onRefresh, isLoading }: dataTable) => {
  function formatToSydneyDateOnly(
    date: string | Date | number | null | undefined,
    format = "MM/DD/YYYY",
  ): string {
    if (!date) return "";

    // Parse date WITHOUT applying UTC or timezone shift

    const safe =
      typeof date === "string" ? date.replace(/Z$/, "") : String(date);

    return moment(safe).format(format);
    //  return moment.parseZone(date).local().format(format);
  }
  const columns = [
    { key: "order_id", header: "Order ID", isSortable: false },
    { key: "tracking_id", header: "Tracking ID", isSortable: false },
    {
      key: "order_status",
      header: "Status",
      isSortable: true,
      cell: (info: GetSpecialOrder) => {
        const status = info.order_status;

        return (
          <span
            className={`inline-block rounded px-2.5 py-1 text-xs font-semibold ${OrderStatus.getBadgeColor(
              status
            )}`}
          >
            {OrderStatus.getDisplayStatus(status)?.toUpperCase() || "STATUS"}
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
        const date = formatToSydneyDateOnly(info.started, "DD/MM/YYYY");
        return <span>{date}</span>;
      },
    },
    {
      key: "total_discounted_price",
      header: "Price",
      isSortable: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: any) => (
        <span>{`$${info?.total_discounted_price?.toFixed(2)}`}</span>
      ), // Changed to JSX element
    },
  ];

  return (
    <DataTable
      tableData={data}
      columns={columns}
      isLoading={isLoading ?? false}
      onRefresh={onRefresh}
    />
  );
};

export default OrdersDataTable;
