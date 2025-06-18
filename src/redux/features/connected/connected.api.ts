
import { baseApi } from '../../api/baseApi';



const WishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

// ----------ADD wishlist-----------

addContract: builder.mutation({
  query: (data) => ({
    url: '/contract',
    method: 'POST',
    body: data, 
    headers:{
      'appender': 'application/json',
    }
  }),
}),
addSubscribe: builder.mutation({
  query: (data) => ({
    url: '/subscribe',
    method: 'POST',
    body: data, 
    headers:{
      'appender': 'application/json',
    }
  }),
}),
  })
});

export const {
useAddContractMutation,
useAddSubscribeMutation
} = WishlistApi ;