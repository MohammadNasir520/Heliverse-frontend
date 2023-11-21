import { baseApi } from "../baseApi";
const userUrl = "/users";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUser: build.query({
      query: (searchTerm) => ({
        url: `${userUrl}`,
        params: searchTerm,
      }),
    }),
    getSingleUser: build.query({
      query: (id) => ({
        url: `${userUrl}/${id}`,
      }),
    }),
  }),
});

export const { useGetAllUserQuery, useGetSingleUserQuery } = userApi;
