import { Category } from "../types/category";

type optionsType = {
  label: string;
  value: string;
  key: string;
};
export const getCategoryNames: (categoryArray: Category[]) => string[] = (
  categoryArray
) => {
  return categoryArray.map((el) => el.name);
};
export const convertCategoriesToOptions: (
  categoryArray: Category[] | undefined
) => optionsType[] | undefined = (categoryArray) => {
  return categoryArray?.map((el) => {
    return {
      label: el.name,
      value: el.name,
      key: el.category_id,
    };
  });
};
export function isNumber(str: string) {
  const regex = /^\d+$/;
  if (str === "") return true;
  return regex.test(str);
}
