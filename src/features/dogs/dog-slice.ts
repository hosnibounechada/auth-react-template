import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "live_2yNwI32XkAR5MCOuv0nkCWFus6S7WpcQmzO5Y1WJ6YNdsde3SNbtzE85O8gjntJE";

interface Breed {
  id: string;
  name: string;
  image: {
    url: string;
  };
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.thedogapi.com/v1",
    prepareHeaders(headers) {
      headers.set("x-api-key", API_KEY);
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchBreeds: builder.query<Breed[], number | void>({
        query(limit = 10) {
          return `/beards?limit=${limit}`;
        },
      }),
    };
  },
});

export const { useFetchBreedsQuery } = apiSlice;
