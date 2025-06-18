import {  TQueryParam } from '../../../types';
import { baseApi } from '../../api/baseApi';
import { CResponseRedux } from '../../../types/global';

import { IBlogs } from '../../../types/blog.type';

const BlogApi= baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ----------get all product-------------------
    getAllBlogs: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: '/carblog',
          method: 'GET',
          params,
        };
      },
      transformResponse: (response: CResponseRedux<IBlogs[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // ----------get product by id---------------

    getblogsById:builder.query({
      query:(id:string)=>({
        url:`/carblog/${id}`,
        method:"GET",
        query: (data:any) => ({
          url: '/carblog',
          method: 'POST',
          body: data,
          
        }),
        

      }),
      transformResponse: (response: CResponseRedux<IBlogs>) => response,
    }),

// ----------ADD CAR PRODUCT-----------
// Example RTK Query definition
addBlogs: builder.mutation({
  query: (data) => ({
    url: '/carblog',
    method: 'POST',
    body: data, 
    headers:{
      'appender': 'application/json',
    }
  }),
}),





// ----------------delete car product-------------
deleteBlog:builder.mutation({
  query:(id:string)=>({
    url:`/carblog/${id}`,
    mehthod:"DELETE",
  }),
}),


  })
});



export const {
useAddBlogsMutation,
useDeleteBlogMutation,
useGetAllBlogsQuery,
useGetblogsByIdQuery
} = BlogApi;