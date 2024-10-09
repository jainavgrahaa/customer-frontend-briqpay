import { createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { getCookie } from "cookies-next";

const headers = {
  authorization: `Bearer ${getCookie("token")}`,
};
export const chooseYourDiamondApi = createApi({
  reducerPath: "choose_your_diamond",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://apistaging.nj.nvizion.io/njapi",
  }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: (args) => {
        const { storeId, slug } = args;
        return {
          url: `navigation-hierarchy/getDataForPageUrl`,
          params: { storeId, slug },
          headers,
        };
      },
    }),
  }),
});

export const getSettingsDiamonds = createAsyncThunk(
  "fetchSettingsDiamonds",
  async (payload) => {
    try {
      const response = await axios.post(
        `https://apistaging.nj.nvizion.io/njapi/choose-your-setting/diamond`,
        payload,
        {
          headers,
        }
      );
      return response.data;
    } catch (error) {}
  }
);

export const { useGetDataQuery } = chooseYourDiamondApi;
