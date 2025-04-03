import { TProduct, TQueryParam } from '../../../types';
import { baseApi } from '../../api/baseApi';
import { TResponseRedux } from '../../../types/global';

const carProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ----------get all product-------------------
    getAllcars: builder.query({
      query: (args: TQueryParam[] | undefined) => {
        const params: Record<string, any> = {};
        if (args) {
          args.forEach((item: TQueryParam) => {
            params[item.name] = item.value;
          });
        }
        return {
          url: '/cars',
          method: 'GET',
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // ----------get product by id---------------

    getCarById:builder.query({
      query:(id:string)=>({
        url:`/cars/${id}`,
        method:"GET",
        query: (data:any) => ({
          url: '/cars',
          method: 'POST',
          body: data,
          
        }),
        

      }),
      transformResponse: (response: TResponseRedux<TProduct>) => response,
    }),

// ----------ADD CAR PRODUCT-----------
addCarProduct: builder.mutation({
  query: (data) => ({
    url: '/cars',
    method: 'POST',
    body: data,
 
  }),
  
}),


// -------------update car product--------------
updateCarProduct:builder.mutation({
  query:({id,...data})=>({
 url:`/cars/${id}`,
 mathod:"PATCH",
 body:data,
  }),
}),

// ----------------delete car product-------------
deleteCarProduct:builder.mutation({
  query:(id:string)=>({
    url:`/cars/${id}`,
    mehthod:"DELETE",
  }),
}),


  })
});



export const {
  useGetAllcarsQuery,
  useGetCarByIdQuery,
  useAddCarProductMutation,
  useDeleteCarProductMutation,
  useUpdateCarProductMutation
} = carProductApi ;