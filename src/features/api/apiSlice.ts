import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Category,
  CategoryFormTypes,
  CategoryUpdateTypes,
} from "../../types/category";
import { APIResponse, OnlyMessageResponse } from "../../types/response";
import {
  Product,
  ProductFormTypes,
  ProductUpdateTypes,
} from "../../types/product";
import {
  authCheckResponse,
  LoginFormTypes,
  RegistrationFormTypes,
  User,
  UserUpdateTypes,
} from "../../types/user";
import {
  PaginatedQuery,
  QueryObjTypes,
  QueryWithPagination,
} from "../../types/query";
import { CartType } from "../../types/cart";
import { WishlistType } from "../../types/wishlist";
import { TotalCountsType, TotalSalesCategoryType } from "../../types/analytics";
import { Review, ReviewQueryArgs } from "../../types/review";
import { Order } from "../../types/order";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/",
    credentials: "include",
  }),
  tagTypes: [
    "Category",
    "Order",
    "Product",
    "Users",
    "Cart",
    "Wishlist",
    "Reviews",
  ],
  endpoints: (builder) => ({
    getCategories: builder.query<APIResponse<Category[]>, void>({
      query: () => "categories",
      providesTags: ["Category"],
    }),
    getOneCategory: builder.query<APIResponse<Category>, string | undefined>({
      query: (id) => `categories/${id}`,
    }),
    createCategory: builder.mutation<
      APIResponse<Category>,
      CategoryFormTypes["formData"]
    >({
      query: (formData) => ({
        url: "categories",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<
      APIResponse<Category>,
      CategoryUpdateTypes
    >({
      query: ({ id, formData }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Category", "Product"],
    }),
    getProducts: builder.query<
      APIResponse<Product[]>,
      QueryWithPagination<QueryObjTypes>
    >({
      query: ({
        limit,
        queryObj,
        page,
      }: QueryWithPagination<QueryObjTypes>) => {
        const queryObjKeys = Object.keys(queryObj).filter(
          (key): key is keyof QueryObjTypes => key in queryObj
        ) as (keyof QueryObjTypes)[];
        let queryStr = "?";
        for (let key of queryObjKeys) {
          if (key === "category" && queryObj[key].length !== 0) {
            const categoryArray = queryObj[key];
            const categoryStr = categoryArray.join(",");
            queryStr += `category=${categoryStr}&`;
          } else if (queryObj[key] !== "") {
            queryStr += `${key}=${queryObj[key]}&`;
          }
        }
        if (queryStr.endsWith("&")) {
          queryStr = queryStr.slice(0, -1);
        }
        return "products" + queryStr + "&page=" + page + "&limit=" + limit;
      },
      providesTags: ["Product"],
    }),
    getOneProduct: builder.query<APIResponse<Product>, string | undefined>({
      query: (id) => `products/${id}`,
    }),
    getPopularProducts: builder.query<APIResponse<Product[]>, void>({
      query: () => "/products/popular",
    }),
    getProductsBySearch: builder.query<APIResponse<Product[]>, string>({
      query: (searchInput) => `/products/search?search=${searchInput}`,
    }),
    createProduct: builder.mutation<
      APIResponse<Product>,
      ProductFormTypes["formData"]
    >({
      query: (formData) => ({
        url: "products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<APIResponse<Product>, ProductUpdateTypes>({
      query: ({ id, formData }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<APIResponse<Product>, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    login: builder.mutation<User, LoginFormTypes>({
      query: ({ email, password }) => ({
        url: "auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    signup: builder.mutation<User, RegistrationFormTypes>({
      query: ({ email, username, password }) => ({
        url: "auth/signup",
        method: "POST",
        body: { email, username, password },
      }),
    }),
    checkAuthorization: builder.query<authCheckResponse, void>({
      query: () => {
        return "auth/check-admin";
      },
    }),
    logout: builder.mutation<OnlyMessageResponse, void>({
      query: () => ({
        url: "auth/logout",
        method: "GET",
      }),
    }),
    checkLoggedIn: builder.query<APIResponse<User>, void>({
      query: () => "auth/check-logged-in",
    }),
    getUsers: builder.query<
      APIResponse<User[]>,
      { searchQuery?: string; page?: number; limit?: number }
    >({
      query: ({ searchQuery = "", page = 1, limit = 10 }) =>
        `/users?search=${encodeURIComponent(
          searchQuery
        )}&page=${page}&limit=${limit}`,
      providesTags: ["Users"],
    }),

    getOneUser: builder.query<APIResponse<User>, string | undefined>({
      query: (id) => `users/${id}`,
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation<User, UserUpdateTypes>({
      query: ({ id, formData }) => {
        return {
          url: `users/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Users"],
    }),
    getCartByUserId: builder.query<APIResponse<CartType>, string | null>({
      query: (user_id) => `carts/user/${user_id}`,
      providesTags: ["Cart"],
    }),
    addItemToCart: builder.mutation({
      query: ({ product_id, user_id, quantity }) => {
        return {
          url: `/carts/add-item`,
          method: "POST",
          body: { product_id, user_id, quantity },
        };
      },
      invalidatesTags: ["Cart"],
    }),
    updateQuantityOfItem: builder.mutation({
      query: ({ quantity, cart_item_id }) => {
        return {
          url: `/carts`,
          method: "PUT",
          body: { quantity, cart_item_id },
        };
      },
      invalidatesTags: ["Cart"],
    }),
    removeItemFromCart: builder.mutation({
      query: (cart_item_id) => {
        return {
          url: `/carts/${cart_item_id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation({
      query: (cart_id) => {
        return {
          url: "/carts",
          method: "DELETE",
          body: { cart_id },
        };
      },
      invalidatesTags: ["Cart"],
    }),
    getWishlistByUserId: builder.query<
      APIResponse<WishlistType>,
      string | null
    >({
      query: (user_id) => `wishlists/user/${user_id}`,
      providesTags: ["Wishlist"],
    }),

    addItemToWishlist: builder.mutation({
      query: ({ product_id, user_id }) => {
        return {
          url: `/wishlists/add-item`,
          method: "POST",
          body: { product_id, user_id },
        };
      },
      invalidatesTags: ["Wishlist"],
    }),
    removeItemFromWishlist: builder.mutation({
      query: ({ product_id, user_id }) => {
        return {
          url: `/wishlists/delete-item`,
          method: "DELETE",
          body: { product_id, user_id },
        };
      },
      invalidatesTags: ["Wishlist"],
    }),
    clearWishlist: builder.mutation({
      query: (user_id) => {
        return {
          url: `/wishlists`,
          method: "DELETE",
          body: {
            user_id,
          },
        };
      },
      invalidatesTags: ["Wishlist"],
    }),
    getOrders: builder.query<APIResponse<Order[]>, PaginatedQuery>({
      query: ({ page_size, current_page, queryObj }) => {
        const queryStr = `?search=${queryObj.search}&sortBy=${queryObj.sortBy}&sortOrder=${queryObj.sortOrder}`;

        console.log(
          `/orders${queryStr}&limit=${page_size}&page=${current_page}`
        );
        return `orders${queryStr}&limit=${page_size}&page=${current_page}`;
      },
      providesTags: ["Order"],
    }),
    addOrder: builder.mutation({
      query: ({ user_id, cart_id }) => {
        return {
          url: "/orders/add-order",
          method: "POST",
          body: {
            user_id,
            cart_id,
          },
        };
      },
      invalidatesTags: ["Cart", "Order"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ order_id, status }) => {
        return {
          url: `/orders/${order_id}`,
          method: "PUT",
          body: {
            status,
          },
        };
      },
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation<Order, string | undefined>({
      query: (order_id) => {
        return { url: `/orders/${order_id}`, method: "DELETE" };
      },
      invalidatesTags: ["Order"],
    }),
    getReviewsByProduct: builder.query<APIResponse<Review[]>, ReviewQueryArgs>({
      query: ({ product_id, page }) => {
        return `/reviews/${product_id}?page=${page}`;
      },
      providesTags: ["Reviews"],
    }),
    addReviewToProduct: builder.mutation({
      query: ({ product_id, user_id, rating, comment }) => {
        return {
          url: `/reviews`,
          method: "POST",
          body: {
            product_id,
            user_id,
            rating,
            comment,
          },
        };
      },
      invalidatesTags: ["Reviews"],
    }),
    getTotalCounts: builder.query<APIResponse<TotalCountsType>, void>({
      query: () => {
        return "/analytics/count";
      },
    }),
    getTotalSalesForCategories: builder.query<
      APIResponse<TotalSalesCategoryType[]>,
      void
    >({
      query: () => {
        return "/analytics/category-sales";
      },
    }),
    getProductSales: builder.query<APIResponse<Product[]>, void>({
      query: () => {
        return "/analytics/product-sales";
      },
    }),
  }),
});

export const {
  useGetWishlistByUserIdQuery,
  useClearCartMutation,
  useRemoveItemFromCartMutation,
  useCheckLoggedInQuery,
  useGetCategoriesQuery,
  useGetOneCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetOneProductQuery,
  useLogoutMutation,
  useGetProductsQuery,
  useGetProductsBySearchQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useLoginMutation,
  useCheckAuthorizationQuery,
  useSignupMutation,
  useGetUsersQuery,
  useGetOneUserQuery,
  useUpdateUserMutation,
  useGetPopularProductsQuery,
  useGetCartByUserIdQuery,
  useUpdateQuantityOfItemMutation,
  useAddItemToCartMutation,
  useAddItemToWishlistMutation,
  useClearWishlistMutation,
  useRemoveItemFromWishlistMutation,
  useGetOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderStatusMutation,
  useGetReviewsByProductQuery,
  useLazyGetReviewsByProductQuery,
  useAddReviewToProductMutation,
  useGetTotalCountsQuery,
  useGetTotalSalesForCategoriesQuery,
  useGetProductSalesQuery,
  useDeleteOrderMutation,
} = apiSlice;
