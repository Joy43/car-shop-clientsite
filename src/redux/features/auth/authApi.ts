import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --------------login----------
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
// -----------register---------
register: builder.mutation({
  query: (userInfo) => ({
    url: "/auth/register",
    method: "POST",
    body: userInfo,
    headers: { "Content-Type": "application/json" }, // Explicitly set headers
  }),
}),


  }),
});

export const { useLoginMutation,useRegisterMutation } = authApi;