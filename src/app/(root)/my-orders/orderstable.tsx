"use client";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import {
  GetSpecialOrder,
  OrderStatus,
  SpecialOrderItem,
} from "~/types/getSpecialBackOrders";
interface OrdersData {
  data: GetSpecialOrder[];
  orderStatus: OrderStatus[];
  handlePayment: (invoice: GetSpecialOrder) => void;
  title: string;
}

const OrdersTable = ({
  data,
  orderStatus,
  handlePayment,
  title,
}: OrdersData) => {
  function getOrderStatusById(orderStatusId: number) {
    return orderStatus.find((status) => status.status_id === orderStatusId);
  }

  return (
    <Table className={`rounded-lg ${title == "orders" ? "bg-red-100" : 'bg-blue-200'}`}>
      {/* <TableCaption>{title ? title : 'A list of your recent Special Orders.'}</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead>Order Status</TableHead>

          <TableHead>Price</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          {title == "specialOrders" ? (
            <>
              <TableHead className="text-center">items</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </>
          ) : (
            ""
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((invoice) => (
          <TableRow key={invoice.tracking_id}>
            <TableCell className="font-medium">
              {getOrderStatusById(invoice.order_status)?.status_detail}
            </TableCell>
            <TableCell>{invoice.total_discounted_price}</TableCell>
            <TableCell>
              {moment(invoice.started).format("MM/DD/YYYY")}
            </TableCell>
            <TableCell className="text-right">
              {invoice.total_discounted_price}
            </TableCell>

            {title == "specialOrders" && invoice?.special_order_items &&
            invoice?.special_order_items?.length > 0 ? (
              <TableCell>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="grid grid-cols-2 justify-between">
                        <div className="flex flex-col">
                          <span className="font-sans text-sm">
                            Special order Items:{" "}
                            {invoice?.special_order_items?.length}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="w-3/4">
                      <ScrollArea className="h-sm rounded-md border">
                        {invoice?.special_order_items?.length > 0 ? (
                          invoice?.special_order_items?.map(
                            (item: SpecialOrderItem, index: number) => (
                              <div className="flex flex-col" key={index}>
                                <div>Title: {item?.special_items?.title}</div>
                                <div>Author: {item?.special_items?.author}</div>

                                <div>
                                  Publication Date:{" "}
                                  {item?.special_items?.pubDate}
                                </div>
                                <div>Peice: {item?.special_items?.price}</div>
                              </div>
                            ),
                          )
                        ) : (
                          <div>
                            <p>You have no items.</p>
                          </div>
                        )}
                      </ScrollArea>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TableCell>
            ) : (
              ""
            )}
            {invoice?.special_order_items?.length > 0 ? (
              <TableCell className="text-center">
                {invoice.order_status == 67 && (
                  <Button
                    onClick={() => handlePayment(invoice)}
                    disabled={invoice?.special_order_items?.length == 0}
                  >
                    Payment
                  </Button>
                )}
              </TableCell>
            ) : (
              ""
            )}
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter> */}
    </Table>
  );
};

export default OrdersTable;
