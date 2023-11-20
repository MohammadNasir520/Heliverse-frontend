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
  }),
});

export const { useGetAllUserQuery } = userApi;
