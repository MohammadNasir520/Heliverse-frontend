import { authKey, getFromLocalStorage } from "../../../utils/localStorage";
import { baseApi } from "../baseApi";
const teamUrl = "/teams";
const accessToken = getFromLocalStorage(authKey) as string;

const teamApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createATeam: build.mutation({
      query: (data) => ({
        url: `${teamUrl}`,
        body: data,
        method: "POST",
        headers: {
          Authorization: accessToken,
        },
      }),
    }),
    addMemberToTeam: build.mutation({
      query: (data) => ({
        url: `${teamUrl}/add-member`,
        body: data,
        method: "POST",
        headers: {
          Authorization: accessToken,
        },
      }),
    }),
  }),
});

export const { useCreateATeamMutation, useAddMemberToTeamMutation } = teamApi;
