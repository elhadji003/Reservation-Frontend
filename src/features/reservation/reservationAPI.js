import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQuery";
import {
  RESERVATION_API,
  RESOURCES_API,
  SLOTS_API,
} from "../../constants/enpoints";

export const reservationApi = createApi({
  reducerPath: "reservationApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Reservation", "Slot", "Resource"],
  endpoints: (builder) => ({
    // 🔹 Get all slots
    getSlots: builder.query({
      query: () => SLOTS_API,
      providesTags: ["Slot"],
    }),

    // 🔹 Get all resources
    getSlotById: builder.query({
      query: (id) => `${SLOTS_API}${id}/`,
      providesTags: (result, error, id) => [{ type: "Slot", id }],
    }),

    // 🔹 Get all resources
    getResources: builder.query({
      query: () => RESOURCES_API,
      providesTags: ["Resource"],
    }),

    // 🔹 Create reservation
    createReservation: builder.mutation({
      query: (data) => ({
        url: RESERVATION_API,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reservation"],
    }),
    getReservationById: builder.query({
      query: (id) => `/reservations/${id}/`,
    }),
    getMyReservations: builder.query({
      query: () => `/reservations/me/`,
    }),
    cancelReservation: builder.mutation({
      query: (id) => ({
        url: `/reservations/${id}/cancel/`,
        method: "POST",
      }),
      invalidatesTags: ["Reservations"],
    }),

    deleteReservation: builder.mutation({
      query: (id) => ({
        url: `/reservations/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reservations"],
    }),
  }),
});

export const {
  useGetSlotsQuery,
  useGetSlotByIdQuery,
  useGetResourcesQuery,
  useCreateReservationMutation,
  useGetReservationByIdQuery,
  useGetMyReservationsQuery,
  useCancelReservationMutation,
  useDeleteReservationMutation,
} = reservationApi;
