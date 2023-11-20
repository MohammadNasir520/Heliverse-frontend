import { baseApi } from "../baseApi";
const authUrl = "/auth";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: `${authUrl}/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = userApi;
