/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3030",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const bearerToken = getState()?.auth?.accessToken;

    if (bearerToken) {
      headers.set("authorization", `Bearer ${bearerToken}`);
    }

    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions);

  if (response?.error?.status === 403) {
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }));

      response = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired. You will be logged out";
      }

      return refreshResult;
    }
  }

  return response;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Ticket", "User"],
  endpoints: (builder) => ({}),
});