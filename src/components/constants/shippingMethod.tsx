const shippingOptions = [
  {
    value: "free",
    amount: 0,
    type: "Click and Collect.",
    label:
      "Click and Collect at UniShop service desk.",
      label2: "Building 11, 2 Northfields Avenue Keiraville",
      label3: "You will be notified once the order is ready for collection.",
  },
  {
    value: "fixed",
    amount: 10,
    type: "delivery",
    label: "Fixed Rate- Australia wide",
    label2: "Metro NSW - 1-2 days",
    label3: "Regional NSW - 2-4 days",
    label4: "Interstate - 3-5 days",
    label5: "Perth - 7-8 days",
    label6: "Please note these are estimates only.",
  },
  // { value: 'express', label: 'Express Shipping' },
];
export default shippingOptions;
