"use client";

import React from 'react';
import { Button } from '../button';
import { MdDeleteForever } from "react-icons/md";
import BookIcon from '../../../../public/bookIcon.png'
// import isEmpty from "lodash/isEmpty";
import Image from 'next/image';

interface CartItemCardProps {
  id?: number;
  name: string;
  price?: number;
  imageUrl?: string;
  onRemove: () => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ id, name, price, imageUrl, onRemove }) => {
  return (
    <div key={id} className="flex items-center p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      <Image src={imageUrl ? `https://ipos-storage.s3.amazonaws.com/${imageUrl}` : BookIcon} width={15} height={15} alt={name} className="w-16 h-16 object-cover rounded-md" />
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">${price ? price.toFixed(2) : 0}</p>
      </div>
      <Button
        onClick={() => onRemove()}
        className="text-red-400 hover:text-red-900 bg-transparent hover:bg-transparent"
      >
       <MdDeleteForever size={25}/>
      </Button>
    </div>
  );
};

export default CartItemCard;