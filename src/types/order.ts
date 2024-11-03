export type Order = {
  order_id: string;
  user_id: string;
  created_at: string;
  status: string;
  order_items: OrderItem[];
  total_price: string;
  username: string;
};
export type OrderItem = {
  order_item_id: string;
  product_name: string;
  quantity: string;
  product_price: string;
  created_at: string;
};
