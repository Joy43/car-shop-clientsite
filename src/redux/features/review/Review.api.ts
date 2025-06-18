import {  TQueryParam } from '../../../types';
import { baseApi } from '../../api/baseApi';
import { CResponseRedux, TResponseRedux } from '../../../types/global';
import { TReview } from '../../../types/review.types';

const ReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ----------get all product-------------------
    getAllReview: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: '/review',
          method: 'GET',
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TReview[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // ----------get product by id---------------

    getReviewById:builder.query({
      query:(id:string)=>({
        url:`/review/${id}`,
        method:"GET",
        query: (data:any) => ({
          url: '/review',
          method: 'POST',
          body: data,
          
        }),
        

      }),
      transformResponse: (response: CResponseRedux<TReview>) => response,
    }),

// ----------ADD CAR PRODUCT-----------
// Example RTK Query definition
addReview: builder.mutation({
  query: (data) => ({
    url: '/review',
    method: 'POST',
    body: data, 
    headers:{
      'appender': 'application/json',
    }
  }),
}),



// -------------update car product--------------
updateReview:builder.mutation({
  query:({id,...data})=>({
 url:`/review/${id}`,
 mathod:"PATCH",
 body:data,
  }),
}),

// ----------------delete car product-------------
deleteReview:builder.mutation({
  query:(id:string)=>({
    url:`/review/${id}`,
    mehthod:"DELETE",
  }),
}),


  })
});



export const {
 useAddReviewMutation,
 useGetAllReviewQuery,
 useGetReviewByIdQuery,
 useDeleteReviewMutation
} = ReviewApi ;