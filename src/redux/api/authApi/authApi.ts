import { baseApi } from "../baseApi";
const authUrl = "/auth";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: () => `${authUrl}/login`,
    }),
  }),
});

export const { useLoginMutation } = userApi;
