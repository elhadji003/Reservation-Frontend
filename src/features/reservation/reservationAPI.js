import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQuery";
import { RESERVATION_API } from "../../constants/enpoints";

export const reservationApi = createApi({
  reducerPath: "reservationApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Reservation"],
  endpoints: (builder) => ({
    // 🔹 Create reservation
    createReservation: builder.mutation({
      query: (data) => ({
        url: RESERVATION_API,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reservation"],
    }),

    // 🔹 Get all reservations
    getAllReservations: builder.query({
      query: () => `/reservations-all/`,
      providesTags: ["Reservation"],
    }),

    // 🔹 Get reservation by ID
    getReservationById: builder.query({
      query: (id) => `/reservations/${id}/`,
    }),

    // 🔹 Get my reservations
    getMyReservations: builder.query({
      query: () => `/reservations/me/`,
    }),

    // 🔹 Cancel reservation
    cancelReservation: builder.mutation({
      query: (id) => ({
        url: `/reservations/${id}/cancel/`,
        method: "POST",
      }),
      invalidatesTags: ["Reservation"],
    }),

    // 🔹 Delete reservation
    deleteReservation: builder.mutation({
      query: (id) => ({
        url: `/reservations/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reservation"],
    }),
  }),
});

export const {
  useCreateReservationMutation,
  useGetAllReservationsQuery,
  useGetReservationByIdQuery,
  useGetMyReservationsQuery,
  useCancelReservationMutation,
  useDeleteReservationMutation,
} = reservationApi;
