export type CartType = {
  cart_id: string;
  cart_items: CartItemType[];
  created_at: string;
  user_id: string;
  total_price: string;
};
export type CartItemType = {
  cart_item_id: string;
  product_id: string;
  product_name: string;
  product_price: string;
  quantity: string;
};
export type CartQueryObjType = {
  cart_item_id: string;
  quantity?: string;
};
export type CartItemsType = CartItemType[];
