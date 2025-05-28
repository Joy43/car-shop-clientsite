import {  CResponseRedux, TQueryParam} from '../../../types';
import { baseApi } from '../../api/baseApi';

import { TWishlistItem } from '../../../types/wishlist.types';

const WishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ----------get all wishlist-------------------
    getAllwishlist: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: '/wishlist',
          method: 'GET',
          params,
        };
      },
      transformResponse: (response: CResponseRedux<TWishlistItem[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

  

// ----------ADD wishlist-----------

addWishlist: builder.mutation({
  query: (data) => ({
    url: '/wishlist',
    method: 'POST',
    body: data, 
    headers:{
      'appender': 'application/json',
    }
  }),
}),





// ----------------delete wishlist product-------------
deleteWishlist:builder.mutation({
  query:(id:string)=>({
    url:`/wishlist/${id}`,
    mehthod:"DELETE",
  }),
}),


  })
});

export const {
useAddWishlistMutation,
useDeleteWishlistMutation,
useGetAllwishlistQuery
} = WishlistApi ;