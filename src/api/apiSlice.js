/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://reparasi-server.onrender.com",
    baseUrl: "http://localhost:3030/",
  }),
  tagTypes: ["Ticket", "User"],
  endpoints: (builder) => ({}),
});
