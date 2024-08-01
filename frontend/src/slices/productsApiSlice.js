import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => PRODUCTS_URL,
      keepUnusedDataFor: 5
    }),
    getProductsDetails: builder.query({
      query : (productId) => ({
        url : `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }), 
});

export const { useGetProductsQuery,useGetProductsDetailsQuery } = productsApi;