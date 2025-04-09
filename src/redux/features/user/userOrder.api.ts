import { baseApi } from "../../api/baseApi";

const userOrderApi=baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
          query: (userInfo) => ({
            url: "/order",
            method: "POST",
            body: userInfo,
          }),
        }),
   

    verifyOrder: builder.query({
        query: (order_id) => ({
          url: "/order/verify-payment",
          params: { order_id },
          method: "GET",
        }),
      }),
    }),
});

export const { useCreateOrderMutation, useVerifyOrderQuery } = userOrderApi;
