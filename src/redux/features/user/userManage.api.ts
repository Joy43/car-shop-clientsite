import { TQueryParam, TResponseRedux } from "../../../types";

import { baseApi } from "../../api/baseApi";
import { TUser } from "../auth/authSlice";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (args) => {
        // console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/user",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TUser[]>) => {
        return {
          data: response.data,
         
        };
      },
    }),
    updateUser: builder.mutation({
      query: (args) => ({
        url: `/user/${args._id}`,
        method: "PATCH",
        body: args.data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (_id) => ({
        url: `/user/${_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userManagementApi;