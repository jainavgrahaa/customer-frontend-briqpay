import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApiUrl } from "@/_utils";
import apiService from "@/_utils/apiService";
import { getSettingsDiamonds } from "./api/chooseYourDiamond";

// Create an async thunk for fetching page data
export const fetchChooseDiamondssPageData = createAsyncThunk(
  "chooseDiamonds/fetchPageData",
  async ({ storeId, slug }, { rejectWithValue }) => {
    try {
      const apiUrl = getApiUrl(
        `/navigation-hierarchy/getDataForPageUrl?storeId=${storeId}&slug=${slug}`
      );
      const response = await apiService().get(apiUrl);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const chooseDiamondSlice = createSlice({
  name: "choose-diamond",
  initialState: {
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    pageData: null,
    featureGroup: [],
    advanced_filters: [],
    category_filters: [],
    dataList: [],
  },
  reducers: {
    setAdvancedFilters(state, action) {
      const advance_filters = action.payload
        .filter((row) => row.featureGroupFeatureMapType === "filter")
        .map((item) => ({
          title: item.label,
          lowerLimit: 0,
          upperLimit: 80,
          currentLowerLimit: 0,
          currentUpperLimit: 25,
          extraClass: "col-md-6",
          infoTitle: item.label,
          infoDescription:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          marks: item.featureOptions?.map((option, index) => ({
            value: index,
            label: option.label,
          })),
        }));
      state.advanced_filters = advance_filters;
    },

    setCategoryFilters(state, action) {
      const category_filters = action.payload
        .find((row) => row.featureGroupFeatureMapType === "category")
        .featureOptions?.map((item) => ({
          label: item.name,
          value: item.featureOptionId,
          infoTitle: item.name,
          infoDescription:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        }));
      state.category_filters = category_filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChooseDiamondssPageData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChooseDiamondssPageData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pageData = action.payload;
      })
      .addCase(fetchChooseDiamondssPageData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getSettingsDiamonds.pending, () => {})
      .addCase(getSettingsDiamonds.fulfilled, (state, action) => {
        state.dataList = action.payload?.data || [];
      });
  },
});

export default chooseDiamondSlice.reducer;

export const { setAdvancedFilters, setCategoryFilters } =
  chooseDiamondSlice.actions;
