"use client";

const TermsAndConditions = () => {
  const sections = [
    {
      title: "UNISHOP’S PRICE MATCH GUARANTEE",
      content: [
        "Price Match Guarantee is available on textbooks.",
        "The Price Match Guarantee applies to identical products with the exact ISBN, in new condition and in the same format. The identical product must be in stock at an Australian retailer with physical stores or selected Australian online book retailers.",
        "UniShop will match the price of identical products immediately in stock at online retailers including booktopia.com.au, zookal.com and Amazon Australian website. The product must be lower than UniShop’s price once all shipping costs and any additional charges have been accounted for.",
        "The price being matched must be inclusive of any postage charges which would be applied to the identical product.",
        "Price Match Guarantee excludes peer-to-peer marketplaces (like other sellers on Amazon or fulfilled by Amazon, and all types of Buy and Sell marketplaces).",
        "Books that receive a price match credit cannot be returned.",
        "Limit one price match per title per customer.",
        "Not valid with any other offer.",
        "Clearance items are not eligible for Price Match Guarantee.",
        "This policy is subject to change or refusal at management’s discretion.",
      ],
    },
    {
      title: "EXPRESS CLICK AND COLLECT",
      content: [
        "Get your items faster with Express Click and Collect.",
        "Shop online and pick up your order at your nearest UniShop store.",
        "Orders placed before 12:00 PM will be ready for pickup the same day.",
        "Bring your order confirmation email and a valid ID for collection.",
      ],
    },
    {
      title: "PULSE PERKS MEMBERSHIP",
      content: [
        "Join the Pulse Perks membership program for exclusive discounts.",
        "Members receive additional points on every purchase.",
        "Enjoy birthday rewards and special offers throughout the year.",
        "Sign up today and start saving!",
      ],
    },
    {
      title: "OVERSEAS SHIPPING AVAILABLE",
      content: [
        "We offer overseas shipping for select items.",
        "Check the product details to see if it qualifies for international delivery.",
        "Shipping rates vary by destination and weight of the items.",
        "Contact our support team for assistance with overseas orders.",
      ],
    },
  ];

  return (
    <div className="p-6  pt-28 bg-gray-100">
    {sections.map((section, index) => (
      <div key={index} className="mb-4 p-4 bg-white rounded shadow-lg">
        <h2 className="text-xl font-bold text-red-600 mb-2">{section.title}</h2>
        <ul className="list-disc list-inside">
          {section.content.map((paragraph, idx) => (
            <li key={idx} className="text-gray-700 mb-1">
              {paragraph}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
  );
};

export default TermsAndConditions;
