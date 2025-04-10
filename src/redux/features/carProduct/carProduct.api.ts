import { CProduct, TQueryParam } from '../../../types';
import { baseApi } from '../../api/baseApi';
import { CResponseRedux } from '../../../types/global';

const carProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ----------get all product-------------------
    getAllcars: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: '/cars',
          method: 'GET',
          params,
        };
      },
      transformResponse: (response: CResponseRedux<CProduct[]>) => {
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
      transformResponse: (response: CResponseRedux<CProduct>) => response,
    }),

// ----------ADD CAR PRODUCT-----------
// Example RTK Query definition
addCarProduct: builder.mutation({
  query: (data) => ({
    url: '/cars',
    method: 'POST',
    body: data, 
    headers:{
      'appender': 'application/json',
    }
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