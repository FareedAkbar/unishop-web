/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Image from "next/image";
import React from "react";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import type { Stock } from "~/types/book";
import type DataCart from "~/types/book";

interface CartItemProps {
  title: string;
  price: number;

  imageSrc?: string | null;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  showRemove: boolean;
  onChangeQuantity?: (id: number, quantity: number) => void;
  itemQuantity: number;
  showQuantityIncrement?: boolean;
  stock: Stock;
  item?: DataCart;
  newPrice?: number
}

const CartItem: React.FC<CartItemProps> = ({
  title,
  price,
  imageSrc,
  onIncrease,
  onDecrease,
  onRemove,
  newPrice,
  showRemove,
  onChangeQuantity,
  itemQuantity,
  showQuantityIncrement,
  stock,
  item,
}) => {
  const quantity = item?.selected_variation?.stock
    ? item?.selected_variation?.stock.quantity
    : stock?.quantity
      ? stock.quantity
      : 0;

  return (
    <div className="border-b dark:border-b dark:border-gray-400 border-gray-700">
      <div className="flex flex-row items-start space-x-4  bg-white py-2 dark:bg-slate-800">
        <Image
          src={item?.selected_variation?.media?.length && item?.selected_variation?.media[0]?.object_path
            ? `https://ipos-storage.s3.amazonaws.com/${item?.selected_variation?.media[0]?.object_path}` :
            imageSrc
              ? `https://ipos-storage.s3.amazonaws.com/${imageSrc}`
              : "/assets/images/products/product.png"
          }
          alt={title || "Product"}
          className="mb-4 h-20 w-20 rounded bg-gray-200 object-contain md:mb-0"
          width={800}
          height={800}
        />
        <div className="flex-1">
          <h3 className="text-sm font-semibold">{title}</h3>
          {item?.selectedValues && (
            <div>
              <span className="text-xs font-semibold">Selected Variations</span>
              <ul>
                {Object.keys(item?.selectedValues).map((key, index) => (
                  <div key={`cartItem--${index}`}>
                    {item?.selectedValues[key] && (
                      <p className="text-xs capitalize" key={`cartItem-${item.item_id}-${index}`}>
                        {key}:{" "}
                        <span className="pl-1 text-gray-500 dark:text-gray-200">
                          {item?.selectedValues[key]}
                        </span>
                      </p>
                    )}
                  </div>
                ))}
              </ul>
            </div>
          )}

          <p className="text-xs">
            Available Stock:{" "}
            <span className="flex flex-row items-center gap-1 text-md sm:text-sm font-serif text-green-500">
              <FaCheckCircle />
              {quantity && quantity > 0
                ? "In stock"
                : "Backorder"

              }
            </span>
          </p>
          {(newPrice == 0 || !newPrice || price == newPrice) && (
            <p className="text-md font-bold">${price}</p>
          )}


          {newPrice && price != newPrice && newPrice != 0 && (
            <>
              <p className="text-sm font-bold text-red-500 line-through">${price.toFixed(2)}</p>
              <p className="text-md font-bold">${newPrice?.toFixed(
                2,
              )}</p>
            </>
          )}

        </div>

        <div className="flex w-auto flex-col items-end gap-6">
          <button
            className="mb-2 self-end text-sm text-red-500"
            onClick={() => onRemove()}
          >
            <FaTrashAlt size={16} />
          </button>

          <div className="mt-auto flex w-auto items-center justify-between space-x-2 rounded bg-gray-200 p-1 dark:bg-gray-500">
            <button
              className="p-1"
              disabled={itemQuantity < 2}
              onClick={onDecrease}
            >
              <HiOutlineMinus size={14} />
            </button>
            <span className="text-sm">{itemQuantity}</span>
            <button className="p-1" onClick={onIncrease}>
              <HiOutlinePlus size={14} />
            </button>
          </div>
        </div>
      </div>
      {quantity && quantity > -1
        ? quantity < itemQuantity && (
          <p className="rounded bg-yellow-200 p-3 mb-2 text-sm dark:bg-yellow-700">
            {/* <MdWarning size={23} /> */}
            {/* {`Although we can't fulfill your request for quantity, we'll back-order the remaining ${itemQuantity - quantity}.`} */}
            {`This item is currently on backorder. It may take longer than usual to be ready for shipping/collection.`}
          </p>
        )
        : ""}
      {(quantity == 0 || quantity == null) && (
        <p className="rounded bg-yellow-200 p-3 mb-2 text-sm dark:bg-yellow-700">
          {/* <MdWarning size={23} /> */}
          {/* {`Although we can't fulfill your request for quantity, we'll back-order the remaining ${itemQuantity}.`} */}
          {`This item is currently on backorder. It may take longer than usual to be ready for shipping/collection.`}
        </p>
      )}
    </div>
  );
};

export default CartItem;
