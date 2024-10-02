
interface CreatePayloadBooksForTax {
    price: number;
    item_id: number | null;
    cat_id: number | null;
    textbook_id: number | null;
    is_textbook: number;
    variationId: number | null;
    variable_item: number;
    is_deal?: number;
    deal_id: number | null;
    premium_upgrades_CPM: []; // Assuming this can be an array of any type
  }

  export default CreatePayloadBooksForTax