export type QueryObjTypes = {
  category: string[];
  search: string;
  sortBy: string;
  sortOrder: string;
  minPrice: string;
  maxPrice: string;
};

export type SetQueryObjTypes = React.Dispatch<
  React.SetStateAction<QueryObjTypes>
>;

export type UpdateQueryTypes = {
  field: string;
  queryObjSetter: SetQueryObjTypes;
  value: string;
};
export type QueryWithPagination<T> = Partial<T> & {
  page: number;
  limit: number;
  queryObj: T;
  searchQuery?: string;
};
export type PaginatedQuery = {
  page_size: number;
  current_page: number;
};
