export type Category = {
  category_id: string;
  created_at: string;
  name: string;
  image: string;
};
export type CategoryFormTypes = {
  name: string;
  image: string;
  formData: FormData;
};
export type CategoryUpdateTypes = {
  id: string | undefined;
  formData: FormData;
};
