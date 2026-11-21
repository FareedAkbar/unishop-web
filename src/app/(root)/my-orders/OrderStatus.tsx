// OrderStatus.tsx
import React from 'react';

class OrderStatus {
  // General Order Statuses
  static readonly orderInitiated: number = 1;
  static readonly acknowledged: number = 2;
  static readonly confirmed: number = 3;
  static readonly underProcess: number = 4;
  static readonly processingComplete: number = 5;
  static readonly outForDelivery: number = 6;
  static readonly closed: number = 7;
  static readonly orderCancelled: number = 8;
  static readonly inCart: number = 9;
  static readonly underReview: number = 10;
  static readonly checkoutPending: number = 11;
  static readonly orderReversed: number = 12;
  static readonly paymentReversed: number = 13;
  static readonly tabOpened: number = 14;
  static readonly partiallyReversed: number = 15;
  static readonly readyForPickup: number = 16;
  static readonly partiallyCompleted: number = 17;
  static readonly creditNoteInitiated: number = 20;

  // Backorder Statuses
  static readonly specialOrderInitiated: number = 66;
  static readonly specialOrderApproved: number = 67;
  static readonly specialOrderCancelled: number = 68;

  static readonly backorderInitiated: number = 69;
  static readonly backorderPayment: number = 70;
  static readonly backorderApproved: number = 71;
  static readonly backorderCompleted: number = 72;
  static readonly backorderReady: number = 73;
  static readonly backorderDelivery: number = 74;
  static readonly backorderPickup: number = 75;
  static readonly backorderCancelled: number = 691;

  // PO & Restock Statuses
  static readonly restockComplete: number = 1000;
  static readonly restockInitiated: number = 1001;
  static readonly restockCancelled: number = 1002;
  static readonly restockDrafted: number = 1003;
  static readonly manualCompleted: number = 1004;
  static readonly restockDeleted: number = 1005;
  static readonly manualDrafted: number = 1006;
  static readonly restockPartially: number = 1007;

  static getDisplayStatus(
    statusId: number | null | undefined
  ): string {
    switch (statusId) {
      case OrderStatus.orderInitiated:
        return "Initiated";
      case OrderStatus.acknowledged:
        return "Acknowledged";
      case OrderStatus.confirmed:
        return "Confirmed";
      case OrderStatus.underProcess:
        return "Under Process";
      case OrderStatus.processingComplete:
        return "Processing Complete";
      case OrderStatus.outForDelivery:
        return "Out for Delivery";
      case OrderStatus.closed:
        return "Completed";
      case OrderStatus.orderCancelled:
        return "Order Cancelled";
      case OrderStatus.inCart:
        return "In Cart";
      case OrderStatus.underReview:
        return "Under Review";
      case OrderStatus.checkoutPending:
        return "Checkout Pending";
      case OrderStatus.orderReversed:
        return "Fully Refunded";
      case OrderStatus.paymentReversed:
        return "Payment Reversed";
      case OrderStatus.tabOpened:
        return "Invoice Pending";
      case OrderStatus.partiallyReversed:
        return "Partially Refunded";
      case OrderStatus.readyForPickup:
        return "Ready for Pickup";
      case OrderStatus.partiallyCompleted:
        return "Part. Completed";
      case OrderStatus.creditNoteInitiated:
        return "CRN Initiated";
      case OrderStatus.specialOrderInitiated:
        return "Initiated";
      case OrderStatus.specialOrderApproved:
        return "Approved";
      case OrderStatus.specialOrderCancelled:
        return "Cancelled";
      case OrderStatus.backorderInitiated:
        return "Initiated";
      case OrderStatus.backorderPayment:
        return "Payment";
      case OrderStatus.backorderApproved:
        return "Accepted";
      case OrderStatus.backorderCompleted:
        return "Completed";
      case OrderStatus.backorderReady:
        return "Ready";
      case OrderStatus.backorderDelivery:
        return "Dispatched";
      case OrderStatus.backorderPickup:
        return "Pickup Initiated";
      case OrderStatus.backorderCancelled:
        return "Cancelled";
      case OrderStatus.restockComplete:
        return "Completed";
      case OrderStatus.restockInitiated:
        return "Initiated";
      case OrderStatus.restockCancelled:
        return "Cancelled";
      case OrderStatus.restockDrafted:
        return "Draft";
      case OrderStatus.restockDeleted:
        return "Deleted";
      case OrderStatus.restockPartially:
        return "Partially";
      case OrderStatus.manualCompleted:
        return "Manual Completed";
      case OrderStatus.manualDrafted:
        return "Manual Drafted";
      default:
        return "Unknown Status";
    }
  }
  static getBadgeColor(statusId: number | null | undefined): string {
    switch (statusId) {
      // Blue - Initiated
      case OrderStatus.orderInitiated:
      case OrderStatus.creditNoteInitiated:
      case OrderStatus.specialOrderInitiated:
      case OrderStatus.restockInitiated:
        return "bg-blue-600 text-white";

      // Light Blue - Acknowledged / Pickup
      case OrderStatus.acknowledged:
      case OrderStatus.backorderPickup:
        return "bg-sky-500 text-white";

      // Purple - Confirmed / Under Review / Approved
      case OrderStatus.confirmed:
      case OrderStatus.underReview:
      case OrderStatus.specialOrderApproved:
        return "bg-purple-600 text-white";

      // Yellow - Under Process
      case OrderStatus.underProcess:
        return "bg-yellow-400 text-gray-900";

      // Teal - Processing Complete
      case OrderStatus.processingComplete:
        return "bg-teal-600 text-white";

      // Deep Orange - Out for Delivery / Delivery
      case OrderStatus.outForDelivery:
      case OrderStatus.backorderDelivery:
        return "bg-orange-600 text-white";

      // Green - Closed / Ready / Completed
      case OrderStatus.closed:
      case OrderStatus.backorderReady:
      case OrderStatus.backorderCompleted:
      case OrderStatus.restockComplete:
      case OrderStatus.manualCompleted:
        return "bg-green-600 text-white";

      // Red - Cancelled / Deleted
      case OrderStatus.orderCancelled:
      case OrderStatus.specialOrderCancelled:
      case OrderStatus.backorderCancelled:
      case OrderStatus.restockCancelled:
      case OrderStatus.restockDeleted:
        return "bg-red-600 text-white";

      // Grey - In Cart
      case OrderStatus.inCart:
        return "bg-gray-500 text-white";

      // Orange Accent - Checkout Pending
      case OrderStatus.checkoutPending:
        return "bg-orange-400 text-white";

      // Pink - Order Reversed
      case OrderStatus.orderReversed:
        return "bg-pink-500 text-white";

      // Red Accent - Payment Reversed / Partially Reversed
      case OrderStatus.paymentReversed:
      case OrderStatus.partiallyReversed:
        return "bg-rose-500 text-white";

      // Indigo - Tab Opened
      case OrderStatus.tabOpened:
        return "bg-indigo-600 text-white";

      // Cyan - Ready for Pickup / Partially Completed / Approved
      case OrderStatus.readyForPickup:
      case OrderStatus.partiallyCompleted:
      case OrderStatus.backorderApproved:
        return "bg-cyan-600 text-white";

      // Orange - Backorder Initiated / Payment / Drafted
      case OrderStatus.backorderInitiated:
      case OrderStatus.backorderPayment:
      case OrderStatus.restockPartially:
      case OrderStatus.manualDrafted:
        return "bg-orange-500 text-white";

      // Amber - Restock Drafted
      case OrderStatus.restockDrafted:
        return "bg-amber-500 text-white";

      default:
        return "bg-gray-800 text-white";
    }
  }
}

export default OrderStatus;