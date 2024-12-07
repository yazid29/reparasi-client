/* eslint-disable no-unused-vars */
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import {store} from './store';
const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();
const token = store.getState().auth.token;
const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      // query: () => "/users",
      query: () => {
        return {
          url: "/users",
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
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            {
              type: "User",
              id: "LIST",
            },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        }
      },
    }),
    createUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "POST",
        body: {
          ...initialUserData,
        },
        headers: {
          Authorization: token ? `Bearer ${token}` : "",  // Add Bearer token if it exists
        },
      }),
      invalidateTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (newUserData) => (
        console.log("newUserData",newUserData),
        {
        url: "/users",
        method: "PATCH",
        body: {
          ...newUserData,
        },
        headers: {
          Authorization: token ? `Bearer ${token}` : "",  // Add Bearer token if it exists
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: "/users",
        method: "DELETE",
        body: { id },
      }),
      headers: {
        Authorization: token ? `Bearer ${token}` : "",  // Add Bearer token if it exists
      },
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),// Menambahkan getUserById
    getUserById: builder.query({
      query: (id) => `/users/${id}`,  // Mendapatkan data pengguna berdasarkan ID
      transformResponse: (responseData) => {
        responseData.id = responseData._id; // Pastikan field ID konsisten
        return responseData;
      },
      headers: {
        Authorization: token ? `Bearer ${token}` : "",  // Add Bearer token if it exists
      },
      providesTags: (result, error, arg) => [
        { type: "User", id: arg },  // Memberikan tag untuk user berdasarkan ID
      ],
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
} = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getAllUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState // selectUsersData(state) ? selectUsersData(state) : initialState
);
