export type WishlistType = {
  wishlist_id: string;
  wishlist_items: WishlistItemType[];
};
export type WishlistItemType = {
  category_name: string;
  product_name: string;
  product_price: string;
  product_id: string;
  wishlist: string;
  product_image: string;
};
