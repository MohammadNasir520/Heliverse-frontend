import { baseApi } from "../baseApi";
const userUrl = "/users";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUser: build.query({
      query: () => `${userUrl}`,
    }),
  }),
});

export const { useGetAllUserQuery } = userApi;
