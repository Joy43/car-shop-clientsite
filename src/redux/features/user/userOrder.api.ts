import { TQueryParam, TResponseRedux } from "../../../types";
import { TOrder } from "../../../types/order.type";
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
   
// ------------varify order-------
    verifyOrder: builder.query({
        query: (order_id) => ({
          url: "/order/verify-payment",
          params: { order_id },
          method: "GET",
        }),
      }),

// -------------get order by id--------
getAllOrder:builder.query({
  query: (args) => {
    const params = new URLSearchParams();
    if (args) {
      args.forEach((item:TQueryParam) => {
        params.append(item.name, item.value as string);
      });
    }
    return {
      url: "/order",
      method: "GET",
      params: params,
    };
  },

  transformResponse: (response: TResponseRedux<TOrder[]>) => {
    return {
      data: response.data,
      meta: response.meta,
    };
  },
}),
// --------delete order------
deleteOrder: builder.mutation({
  query: (id) => ({
    url: `/order/${id}`,
    method: "DELETE",
  }),
}),
// ------------ update order------
updateOrder: builder.mutation({
  query: (args) => ({
    url: `/order/${args.id}`,
    method: "PATCH",
    body: args.data,
  }),
}),

    }),
});

export const { useCreateOrderMutation, 
  useVerifyOrderQuery,
  useGetAllOrderQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation 

} = userOrderApi;
