import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQuery";
import { SLOTS_API, RESOURCES_API } from "../../constants/enpoints";

export const slotApi = createApi({
  reducerPath: "slotApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Slot", "Resource"],
  endpoints: (builder) => ({
    // 🔹 Create slot
    createSlot: builder.mutation({
      query: (formData) => ({
        url: SLOTS_API,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Slot"],
    }),

    // 🔹 Update slot
    updateSlot: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${SLOTS_API}${id}/`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Slot", id }],
    }),

    // 🔹 Delete slot
    deleteSlot: builder.mutation({
      query: (id) => ({
        url: `${SLOTS_API}${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Slot"],
    }),

    // 🔹 Get all slots
    getSlots: builder.query({
      query: () => SLOTS_API,
      providesTags: ["Slot"],
    }),

    // 🔹 Get slot by ID
    getSlotById: builder.query({
      query: (id) => `${SLOTS_API}${id}/`,
      providesTags: (result, error, id) => [{ type: "Slot", id }],
    }),

    // 🔹 Get all resources
    getResources: builder.query({
      query: () => RESOURCES_API,
      providesTags: ["Resource"],
    }),

    // 🔹 Get facilities
    getFacilities: builder.query({
      query: () => "/facilities/",
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useUpdateSlotMutation,
  useDeleteSlotMutation,
  useGetSlotsQuery,
  useGetSlotByIdQuery,
  useGetResourcesQuery,
  useGetFacilitiesQuery,
} = slotApi;
