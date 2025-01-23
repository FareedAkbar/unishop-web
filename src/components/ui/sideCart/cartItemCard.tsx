"use client";

import React, { useState } from "react";
import { Button } from "../button";
import { MdDeleteForever } from "react-icons/md";
import BookIcon from "../../../../public/bookIcon.png";
// import isEmpty from "lodash/isEmpty";
import Image from "next/image";
import { Input } from "../input";
interface Stock {
  quantity: number;
}

interface CartItemCardProps {
  id?: number;
  name: string;
  price?: number;
  final_price_including_tax?: number;
  imageUrl: string | null;
  onRemove: () => void;
  showRemove: boolean;
  showQuantityIncrement: boolean;
  itemQuantity: number;
  stock: Stock;
  onChangeQuantity?: (id: number, quantity: number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  onRemove,
  showRemove = false,
  final_price_including_tax,
  onChangeQuantity,
  itemQuantity,
  stock,
  showQuantityIncrement = false,
}) => {
  const [quantity, setQuantity] = useState(itemQuantity > 1 ? itemQuantity : 1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Allow empty input or numbers only
    if (newValue === "" || /^[0-9]*$/.test(newValue)) {
      // Update quantity only if there is a valid number
      if (newValue) {
        const newQuantity = parseInt(newValue, 10);
        setQuantity(newQuantity);
        if (onChangeQuantity && id) {
          onChangeQuantity(id, newQuantity);
        }
      } else {
        if (onChangeQuantity && id) {
          onChangeQuantity(id, 1);
        }
        setQuantity(1); // Reset to 1 if input is empty
      }
    }
  };
 
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div key={id} className="flex items-center">
        <Image
          src={
            imageUrl
              ? `https://ipos-storage.s3.amazonaws.com/${imageUrl}`
              
              : BookIcon
          }
          width={0}
          height={0}
          alt={name}
          className="w-20 rounded-md object-cover"
          // layout="responsive"
        />
        <div className="ml-4 flex-1">
          <h3 className="text-md font-serif font-semibold">{name}</h3>
          <div className="flex flex-row justify-between">
            <p className="text-sm">Price</p>
            <p className="text-sm text-gray-600">
              ${price ? price.toFixed(2) : 0}
            </p>
          </div>
          {!showQuantityIncrement && (
            <div className="flex flex-row justify-between">
              <p className="text-sm">Quantity</p>
              <p className="text-sm text-gray-600">{itemQuantity}</p>
            </div>
          )}
          {final_price_including_tax && (
            <div className="flex flex-row justify-between">
              <p className="text-sm">Discounted Price</p>
              <p className="text-sm text-gray-600">
                $
                {final_price_including_tax
                  ? final_price_including_tax.toFixed(2)
                  : 0}
              </p>
            </div>
          )}

          {showQuantityIncrement && (
            <div className="flex flex-row items-center justify-between">
              <label
                htmlFor={`quantity-${id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <Input
                placeholder="1"
                type="number"
                id={`quantity-${id}`}
                name={`quantity-${id}`}
                min="1"
                // max={stock.quantity}
                value={quantity}
                onChange={handleQuantityChange}
                className="mt-1 block h-8 w-20 overflow-visible rounded-md border-gray-500 bg-zinc-200 py-2 pl-2 pr-1 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                style={{
                  minWidth: "50px",
                  maxWidth: "100px",
                  textOverflow: "ellipsis",
                }}
              />

              {/* <input
                type="number"
                id={`quantity-${id}`}
                name={`quantity-${id}`}
                min="1"
                value={inputValue}
                onChange={handleQuantityChange}
                className="mt-1 block w-20 rounded-md border-gray-500 bg-zinc-200 py-2 pl-2 pr-1 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm overflow-visible"
                style={{ minWidth: '50px', maxWidth: '100px', textOverflow: 'ellipsis' }}              /> */}
            </div>
          )}
        </div>
      </div>

      {showRemove && (
        <div className="flex justify-end">
          <Button
            onClick={() => onRemove()}
            className="bg-transparent text-red-400 hover:bg-transparent hover:text-red-900"
          >
            <MdDeleteForever size={25} />
          </Button>
        </div>
      )}
      {stock.quantity < itemQuantity && (
        <p className="bg-yellow-200 p-3 text-sm">
          {/* <MdWarning size={23} /> */}
          We don&apos;t have as many quantity as you requested, but we&apos;ll
          back order the remaining {itemQuantity - stock.quantity}.
        </p>
      )}
    </div>
  );
};

export default CartItemCard;
