import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "register/",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "login/",
        method: "POST",
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "token/refresh/",
        method: "POST",
        body: { refresh: refreshToken },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout/",
        method: "POST",
      }),
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: "delete-account",
        method: "DELETE",
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "profile/",
        method: "GET",
      }),
    }),
    updateProfileUser: builder.mutation({
      query: (formData) => ({
        url: "profile/",
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  //   useChangePasswordMutation,
  useLogoutMutation,
  useGetMeQuery,
  useUpdateProfileUserMutation,
} = authApi;
