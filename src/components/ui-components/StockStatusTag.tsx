import React from "react";
import { FaCheckCircle, FaExclamationTriangle, FaArrowCircleLeft } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import type { Stock } from "~/types/book";

export type StockStatusType = "in-stock" | "low-stock" | "backorder" | "out-of-stock" | "variable-item";

interface StockStatusTagProps {
  // Option 1: Pass individual stock parameters
  quantity?: number | null;
  lowestLevel?: string | number | null;
  allowSpecialOrder?: number | null;
  itemsType?: number | null;

  // Option 2: Pass stock object directly
  stock?: Stock | null;

  // Optional: check if quantity satisfies a required quantity (like cart item quantity)
  requiredQuantity?: number | null;

  // Option 3: Force a specific status override
  status?: StockStatusType;

  // Optional styling customization
  size?: "xs" | "sm" | "md";
  className?: string;
}

const StockStatusTag: React.FC<StockStatusTagProps> = ({
  quantity,
  lowestLevel,
  allowSpecialOrder,
  itemsType,
  stock,
  requiredQuantity,
  status,
  size = "xs",
  className = "",
}) => {
  // Resolve final status
  let finalStatus: StockStatusType = "out-of-stock";

  if (status) {
    finalStatus = status;
  } else if (itemsType === 1) {
    finalStatus = "variable-item";
  } else {
    // Determine from stock properties
    const actualStock = stock || {
      quantity: quantity ?? null,
      lowest_level: String(lowestLevel ?? "0"),
    };
    const qty = actualStock.quantity ?? 0;
    const lowest = typeof actualStock.lowest_level === "string"
      ? parseInt(actualStock.lowest_level, 10)
      : (actualStock.lowest_level ?? 0);
    const lowestVal = isNaN(lowest) ? 0 : lowest;

    const satisfiesRequired = requiredQuantity !== undefined && requiredQuantity !== null
      ? qty >= requiredQuantity
      : true;

    if (qty > 0 && satisfiesRequired) {
      if (qty > lowestVal) {
        finalStatus = "in-stock";
      } else {
        finalStatus = "low-stock";
      }
    } else {
      if (allowSpecialOrder === 1) {
        finalStatus = "backorder";
      } else {
        finalStatus = "out-of-stock";
      }
    }
  }

  // Configurations for each status style
  const config = {
    "in-stock": {
      bgClass: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/30",
      icon: <FaCheckCircle className="flex-shrink-0" />,
      label: "In stock",
    },
    "low-stock": {
      bgClass: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 dark:border-amber-500/30",
      icon: <FaExclamationTriangle className="flex-shrink-0" />,
      label: "Low Stock",
    },
    "backorder": {
      bgClass: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 dark:border-amber-500/30",
      icon: <FaArrowCircleLeft className="flex-shrink-0" />,
      label: "Backorder",
    },
    "out-of-stock": {
      bgClass: "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 dark:border-rose-500/30",
      icon: <IoIosCloseCircle className="flex-shrink-0" />,
      label: "Out of stock",
    },
    "variable-item": {
      bgClass: "bg-red-500 text-white border border-transparent shadow-sm dark:bg-red-600",
      icon: null,
      label: "Variable Item",
    },
  };

  const currentConfig = config[finalStatus];

  // Resolve sizes classes
  const sizeClasses = {
    xs: "text-[11px] px-2 py-0.5 rounded-md gap-1",
    sm: "text-xs px-2 py-1 rounded-md gap-1",
    md: "text-sm px-2.5 py-1 rounded-lg gap-1.5",
  };

  return (
    <span
      className={`inline-flex w-fit flex-row items-center font-sans font-medium ${sizeClasses[size]} ${currentConfig.bgClass} ${className}`}
    >
      {currentConfig.icon}
      <span>{currentConfig.label}</span>
    </span>
  );
};

export default StockStatusTag;
