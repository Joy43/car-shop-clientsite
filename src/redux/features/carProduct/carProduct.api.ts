import { TProduct, TQueryParam } from '../../../types';
import { baseApi } from '../../api/baseApi';
import { TResponseRedux } from '../../../types/global';

const carProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});



export const {useGetAllcarsQuery} = carProductApi ;