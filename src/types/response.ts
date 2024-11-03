export type APIResponse<T> = {
  data: T;
  count: null | number;
  status: number;
  message: string | null;
};
export type OnlyMessageResponse = {
  message: string;
};
export type ErrorResponse = {
  data: {
    message: string;
  };
};
