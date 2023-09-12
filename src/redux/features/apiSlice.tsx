import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  secretKey,
  LoginCredentials,
  LoginResponse,
  GetUsersResponse,
  GetStoresResponse,
  AddStoreRequest,
  AddStoreResponse,
  GetProductsResponse,
  GetOrdersResponse,
  GetBestSellersResponse,
  GetBestProductsResponse,
  GetStoreProductsResponse,
  getStoreDetailsRequest,
  DeleteStoreResponse,
} from "../app/constants";
import CryptoJS from "crypto-js";
import { RootState } from "../app/store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vzzoz.pythonanywhere.com",
    prepareHeaders: (headers,{getState}) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (token) {
        const decryptedBytes = CryptoJS.AES.decrypt(token, secretKey);
        const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
        headers.set("Authorization", `token ${decryptedText}`);
      } else {
        return;
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    getUsers: builder.query<GetUsersResponse, void>({
      query: () => "getusers",
    }),
    getStores: builder.query<GetStoresResponse, void>({
      query: () => "getstores",
    }),
    addStore: builder.mutation<AddStoreResponse, AddStoreRequest>({
      query: (requestBody) => {
        const formData = new FormData();
        formData.append("Image", requestBody.Image);
        formData.append("Email", requestBody.Email);
        formData.append("Name", requestBody.Name);
        return {
          url: "addstore",
          method: "POST",
          body: formData,
        };
      },
    }),
    getProducts: builder.query<GetProductsResponse, void>({
      query: () => "getproducts",
    }),
    getOrders: builder.query<GetOrdersResponse, void>({
      query: () => "getorders",
    }),
    getBestSellers: builder.query<GetBestSellersResponse, void>({
      query: () => "getmostorderedstores",
    }),
    getBestProducts: builder.query<GetBestProductsResponse, void>({
      query: () => "getmostorderedproducts",
    }),
    getStoreProducts: builder.mutation<GetStoreProductsResponse, getStoreDetailsRequest>({
      query: (credentials) => ({
        url: "getstoreproducts",
        method: "POST",
        body: credentials,
      }),
    }),
    getStoreCategories: builder.mutation<GetStoreProductsResponse, getStoreDetailsRequest>({
      query: (credentials) => ({
        url: "getstorecategories",
        method: "POST",
        body: credentials,
      }),
    }),
    getStoreOrders: builder.mutation<GetOrdersResponse, getStoreDetailsRequest>({
      query: (credentials) => ({
        url: "getstoreorders",
        method: "POST",
        body: credentials,
      }),
    }),
    deleteStore: builder.mutation<DeleteStoreResponse, getStoreDetailsRequest>({
      query: (credentials) => ({
        url: "deletestore",
        method: "POST",
        body: credentials,
      }),
    }),
    getUsersPops: builder.mutation<GetUsersResponse, void>({
      query: () => "getusers",
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUsersQuery,
  useGetStoresQuery,
  useAddStoreMutation,
  useGetProductsQuery,
  useGetOrdersQuery,
  useGetBestSellersQuery,
  useGetBestProductsQuery,
  useGetStoreProductsMutation,
  useGetStoreCategoriesMutation,
  useGetStoreOrdersMutation,
  useDeleteStoreMutation,
  useGetUsersPopsMutation,
} = apiSlice;
export default apiSlice.reducer;
