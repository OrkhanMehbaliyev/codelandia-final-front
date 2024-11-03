export type Review = {
  username: string;
  email: string;
  comment: string;
  rating: number;
  created_at: string;
  user_id: string;
  product_id: string;
  users: { username: string };
};
export type ReviewQueryArgs = {
  product_id: string;
  page: number;
};
export type AddReviewForm = {
  comment: string;
  rating: string;
};
