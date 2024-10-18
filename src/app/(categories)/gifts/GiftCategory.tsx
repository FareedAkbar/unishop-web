// GiftCategoryInfo.tsx
import React from 'react';

interface GiftCategory {
  name: string;
  description: string;
  additionalInfo?: string;
  history?: string;
  tagline?: string;
  mission?: string;
  featuredLocation: string;
  contact?: string;
  images: string[];
  socials?: string;
}

interface GiftCategoryInfoProps {
  category: GiftCategory;
}

const GiftCategoryInfo: React.FC<GiftCategoryInfoProps> = ({ category }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{category.name}</h2>
      {category.tagline && (
        <p className="font-semibold italic">{category.tagline}</p>
      )}
      <p className="mb-4">{category.description}</p>
      {category.additionalInfo && (
        <p className="mb-4">{category.additionalInfo}</p>
      )}
      {category.history && (
        <p className="mb-4">{category.history}</p>
      )}
      <p className="mb-4">{category.featuredLocation}</p>
      {category.contact && (
        <p className="mb-4">{category.contact}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={category.name}
            className="w-full h-48 object-cover rounded"
          />
        ))}
      </div>
      {category.socials && (
        <div className="mt-4">
          <a
            href={`https://instagram.com/${category.socials}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Follow on Instagram
          </a>
        </div>
      )}
    </div>
  );
};

export default GiftCategoryInfo;
