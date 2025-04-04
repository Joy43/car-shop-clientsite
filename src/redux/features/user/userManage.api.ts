import { TQueryParam, TResponseRedux } from "../../../types";

import { baseApi } from "../../api/baseApi";
import { TUser } from "../auth/authSlice";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // -----------get all suer-----------
    getUsers: builder.query({
      query: (args) => {
       console.log(args);
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
    // -------------update user status----------
    updateUser: builder.mutation({
      query: (args) => ({
        url: `/user/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
    }),
    // ----------DELETE USER------
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
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