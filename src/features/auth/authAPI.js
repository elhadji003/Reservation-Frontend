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
    registerHotelier: builder.mutation({
      query: (data) => ({
        url: "register/hotelier/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"]
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "login/",
        method: "POST",
        body: credentials,
      }),
    }),
    listeUsers: builder.query({
      query: () => ({
        url: "users/",
        method: "GET",
      }),
      invalidatesTags: ["Users"]
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
    adminDeleteAccount: builder.mutation({
      query: (userId) => ({
        url: `admin/delete-account/${userId}/`,
        method: "DELETE",
    }),
    invalidatesTags: ["Users"]
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
      invalidatesTags: ["Users"]
    }),
    changePassword: builder.mutation({
      query: (passwords) => ({
        url: "change-pasword/",
        method: "PUT",
        body: passwords,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "password-reset/",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ uid, token, new_password, re_new_password }) => ({
        url: `password-reset-confirm/${uid}/${token}/`,
        method: "POST",
        body: { new_password, re_new_password },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useRegisterHotelierMutation,
  useLoginMutation,
  useListeUsersQuery,
  useRefreshTokenMutation,
  useChangePasswordMutation,
  useLogoutMutation,
  useGetMeQuery,
  useUpdateProfileUserMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useDeleteAccountMutation,
  useAdminDeleteAccountMutation,
} = authApi;
