import Image from "next/image";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

interface CartItemProps {
  title: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  imageSrc: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  title,
  size,
  color,
  price,
  quantity,
  imageSrc,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div className="flex flex-row items-start space-x-4 border-b py-4">
      {/* Image */}
      <Image
        src={imageSrc}
        alt={title}
        className="h-20 w-20 rounded bg-gray-200 object-contain mb-4 md:mb-0"
        width={800}
        height={800}
      />

      {/* Product details */}
      <div className="flex-1">
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs">
          Size:<span className="pl-1 text-gray-500">{size}</span>
        </p>
        <p className="text-xs">
          Color:<span className="pl-1 text-gray-500">{color}</span>
        </p>
        <p className="font-bold text-md">${price}</p>
      </div>

      {/* Delete and Plus/Minus buttons */}
      <div className="flex flex-col gap-6 items-end w-auto">
        {/* Delete button at the top-right */}
        <button className="self-end text-red-500 mb-2 text-sm" onClick={onRemove}>
          <FaTrashAlt size={16} />
        </button>

        {/* Plus and minus buttons at the bottom */}
        <div className="flex items-center space-x-2 rounded bg-gray-200 p-1  justify-between mt-auto w-auto">
          <button className="p-1" onClick={onDecrease}>
            <HiOutlineMinus size={14} />
          </button>
          <span className="text-sm">{quantity}</span>
          <button className="p-1" onClick={onIncrease}>
            <HiOutlinePlus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
