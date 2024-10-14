import Image from "next/image";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
interface Stock {
  quantity: number; // Just use number; 0 is included
}

interface CartItemProps {
  title: string;
  size: string;
  color: string;
  price: number;
  
  imageSrc?: string | null;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  showRemove: boolean;
  onChangeQuantity?: (id: number, quantity: number) => void;
  itemQuantity: number;
  showQuantityIncriment?: boolean,
  stock: Stock
}

const CartItem: React.FC<CartItemProps> = ({
  title,
  size,
  color,
  price,
 
  imageSrc,
  onIncrease,
  onDecrease,
  onRemove,
  showRemove,
  onChangeQuantity,
  itemQuantity,
  showQuantityIncriment,
  stock
}) => {
  return (
    <>
    <div className="flex flex-row items-start space-x-4 border-b py-4 bg-white dark:bg-slate-700">
      {/* Image */}
      <Image
        src={ imageSrc
          ? `https://ipos-storage.s3.amazonaws.com/${imageSrc}`
          : '/assets/images/products/product.png'}
        alt={title}
        className="h-20 w-20 rounded bg-gray-200 object-contain mb-4 md:mb-0"
        width={800}
        height={800}
      />

      {/* Product details */}
      <div className="flex-1">
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs">
          Size:<span className="pl-1 text-gray-500 dark:text-gray-200">{size}</span>
        </p>
        <p className="text-xs">
        Available Stock: :<span className="pl-1 text-gray-500 dark:text-gray-200">{stock?.quantity}</span>
        </p>
        <p className="text-xs">
          Color:<span className="pl-1 text-gray-500 dark:text-gray-200">{color}</span>
        </p>
        <p className="font-bold text-md">${price}</p>
      </div>

      {/* Delete and Plus/Minus buttons */}
      <div className="flex flex-col gap-6 items-end w-auto">
        {/* Delete button at the top-right */}
        <button className="self-end text-red-500 mb-2 text-sm" onClick={()=>onRemove()}>
          <FaTrashAlt size={16} />
        </button>

        {/* Plus and minus buttons at the bottom */}
        <div className="flex items-center space-x-2 rounded bg-gray-200 dark:bg-gray-500 p-1  justify-between mt-auto w-auto">
          <button className="p-1" disabled={itemQuantity < 2} onClick={onDecrease}>
            <HiOutlineMinus size={14} />
          </button>
          <span className="text-sm">{itemQuantity}</span>
          <button className="p-1" onClick={onIncrease}>
            <HiOutlinePlus size={14} />
          </button>
        </div>
      </div>
      
    </div>
    {stock?.quantity < itemQuantity && (
      <p className="bg-yellow-200 rounded dark:bg-yellow-500 p-3 text-sm">
        {/* <MdWarning size={23} /> */}
        {`Although we can't fulfill your request for quantity, we'll backorder the remaining ${itemQuantity - stock.quantity}.`}
      </p>
    )}
    </>
  );
};

export default CartItem;
