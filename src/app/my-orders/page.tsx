"use client";

import { Controls, Player } from "@lottiefiles/react-lottie-player";
// import Header from "~/components/header";
import ProductGradient from "../../components/productGradient";
import { useRouter, useSearchParams } from "next/navigation";
import BooksImage from "../../../public/book.json";
import { useAuthContext } from "~/Context/AuthContext";
import type DataCart from "~/types/book";
import { Suspense, useEffect, useState } from "react";
import SearchInput from "~/components/Fields/search";
import { FiSearch } from "react-icons/fi";
import SpecialOrderCard from "~/components/specialOrderCard";
import type {
  BookDetailType,
  SpecialBookType,
  SpecialOrderDataApiResponse,
  SpecialOrderPayload,
} from "~/types/specialOrderBook";
import Spinner from "~/components/spinner";
import Image from "next/image";
import moment from "moment";
import { FaCartPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import BooknetForm from "~/components/Forms/booknet-form";
import CheckoutForm from "~/components/Forms/checkout-form";
import type { CheckoutForm as checkoutFormValue } from "~/types/checkoutForm";
import { formatDate, formatDateTime } from "~/utils/dateAndTime";
import { useToast } from "~/hooks/use-toast";
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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

interface ApiResponse {
  // meta: PaginationData; // Adjust based on your actual structure
  data: SpecialOrderDataApiResponse[];
  status: boolean;
}

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MzQ5LCJwcm9maWxlX2lkIjoxOTgsIm91dGxldF9pZCI6IjIyMSIsImZpcnN0X25hbWUiOiJTaGFtcyIsImxhc3RfbmFtZSI6IlFhemkiLCJ0ZW1wbGF0ZV9pZCI6NSwicGFzc3BvcnRfbm8iOm51bGwsImRhdGVfb2ZfYmlydGgiOm51bGwsImdlbmRlciI6bnVsbCwiZGVzaWduYXRpb25faWQiOlsxXSwiZW1haWwiOiJzaGFtcy5xYXppQGdtYWlsLmNvbSIsInBob25lX251bWJlciI6Iis5MjMyMTk1NjUwMjUiLCJzaWduX3VwIjoiMjAyMy0xMi0yMVQwNToxMTo0OC4wMDBaIiwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMjFUMDU6MTE6NDguMDAwWiIsInNlc3Npb25faWQiOjExNjg1LCJzYWx0IjpudWxsLCJpYXQiOjE3MjU5NTgyMDJ9.R-8jJlaDp2ExXVWLJa_X-fgc4lMAsjlWq3DhPjBXs2U`;

const requestOptions: RequestInit = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json", // Optional, depending on your API
  },
  redirect: "follow", // Use the correct type for `redirect`
};

const MyComponent = () => {
  const { cartItems, addCartItems, removeCartItems,bookentcustomerId } = useAuthContext();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState<SpecialOrderDataApiResponse[]>([]);
  const { toast } = useToast();
  const [dataDetail, setDataDetail] = useState<BookDetailType | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
 
  const [view, setView] = useState("checkout");
  const [showCheckout, setShowCheckout] = useState(false);

  const params = useSearchParams();
  const detail = params.get("detail");

  const fetchData = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        `https://booknet-dev.iconsole.com.au/api/special/customer?booknet_customer_id=${bookentcustomerId}&special=1`,
        requestOptions,
      );
      const result: ApiResponse = (await response.json()) as ApiResponse;

      // Check if result has the expected structure
      if (result?.status) {
        // setMeta(result.meta);
        setData(result.data);
      } else {
        console.error("Unexpected result structure:", result);
        // Handle unexpected structure here
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };


  // Handle add to cart

  useEffect(()=>{
    if(!bookentcustomerId) return
    fetchData()
  },[bookentcustomerId])

  

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {/* {name}
      <Button onClick={()=>ChangeName()}>change name</Button> */}
        {loader && <Spinner />}

        <div className="border rounded-md z-30">
          <Table>
            <TableCaption>A list of your recent orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </main>
    </div>
  );
};
const SpecialOrderPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
};

export default SpecialOrderPage;
