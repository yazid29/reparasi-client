/* eslint-disable no-unused-vars */
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import {store} from './store';
const ticketsAdapter = createEntityAdapter({});

const initialState = ticketsAdapter.getInitialState();
const token = store.getState().auth.token;
const ticketsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAlltickets: builder.query({
      // query: () => "/tickets",
      query: () => {
        return {
          url: "/tickets",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",  // Add Bearer token if it exists
          },
        };
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        console.log("responseData get all tickets",responseData);
        
        const loadedtickets = responseData.data.map((Ticket) => {
          Ticket.id = Ticket._id;
          return Ticket;
        });
        return ticketsAdapter.setAll(initialState, loadedtickets);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            {
              type: "Ticket",
              id: "LIST",
            },
            ...result.ids.map((id) => ({ type: "Ticket", id })),
          ];
        }
      },
    }),
    createTicket: builder.mutation({
      query: (initialTicketData) => ({
        url: "/tickets",
        method: "POST",
        body: {
          ...initialTicketData,
        },
        headers: {
          Authorization: token ? `Bearer ${token}` : "",  // Add Bearer token if it exists
        },
      }),
      invalidateTags: [{ type: "Ticket", id: "LIST" }],
    }),
    updateTicket: builder.mutation({
      query: (newTicketData) => (
        console.log("newTicketData",newTicketData),
        {
        url: "/tickets",
        method: "PATCH",
        body: {
          ...newTicketData,
        },
        headers: {
          Authorization: token ? `Bearer ${token}` : "",  // Add Bearer token if it exists
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Ticket", id: arg.id }],
    }),
    deleteTicket: builder.mutation({
      query: ({ id }) => ({
        url: "/tickets",
        method: "DELETE",
        body: { id },
      }),
      headers: {
        Authorization: token ? `Bearer ${token}` : "",  // Add Bearer token if it exists
      },
      invalidatesTags: (result, error, arg) => [{ type: "Ticket", id: arg.id }],
    }),// Menambahkan getTicketById
    getTicketById: builder.query({
      query: (id) => `/tickets/${id}`,  // Mendapatkan data pengguna berdasarkan ID
      transformResponse: (responseData) => {
        responseData.id = responseData.data._id; // Pastikan field ID konsisten
        return responseData.data;
      },
      headers: {
        Authorization: token ? `Bearer ${token}` : "",  // Add Bearer token if it exists
      },
      providesTags: (result, error, arg) => [
        { type: "Ticket", id: arg },  // Memberikan tag untuk Ticket berdasarkan ID
      ],
      invalidatesTags: (result, error, arg) => [{ type: "Ticket", id: arg.id }],
    }),
    getAllUsersTicket: builder.query({
      // query: () => "/users",
      query: () => {
        return {
          url: "/tickets/user",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",  // Add Bearer token if it exists
          },
        };
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return loadedUsers;
      },
    }),
  }),
  
});

export const {
  useGetAllticketsQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
  useGetTicketByIdQuery,
  useGetAllUsersTicketQuery,
} = ticketsApiSlice;

export const selectticketsResult = ticketsApiSlice.endpoints.getAlltickets.select();

const selectticketsData = createSelector(
  selectticketsResult,
  (ticketsResult) => ticketsResult.data
);

export const {
  selectAll: selectAlltickets,
  selectById: selectTicketById,
  selectIds: selectTicketIds,
} = ticketsAdapter.getSelectors(
  (state) => selectticketsData(state) ?? initialState // selectticketsData(state) ? selectticketsData(state) : initialState
);
