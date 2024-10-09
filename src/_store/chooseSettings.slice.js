import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApiUrl } from "@/_utils";
import apiService from "@/_utils/apiService";

// Create an async thunk for fetching page data
export const fetchChooseSettingsPageData = createAsyncThunk(
  "chooseSettings/fetchPageData",
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

export const fetchChooseYourSettingData = createAsyncThunk(
  "chooseSettings/fetchChooseYourSettingData",
  async (payload, { rejectWithValue }) => {
    try {
      const apiUrl = getApiUrl("/choose-your-setting");
      const response = await apiService().post(apiUrl, payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSettingDetailsData = createAsyncThunk(
  "chooseSettings/fetchSettingDetailsData",
  async (payload, { rejectWithValue }) => {
    try {
      const apiUrl = getApiUrl("/choose-your-setting/details");
      const response = await apiService().post(apiUrl, payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  chooseYourSettingData: [],
  count: 0,
  pageData: null,
  settingDetailData: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  chooseYourSettingStatus: "idle",
  settingDetailStatus: "idle",
  error: null,
  selectedSettingDetail: null,
  filters: {
    style: null,
    shape: null,
    metal: null,
    price: null,
  },
};

export const chooseSettingsSlice = createSlice({
  name: "chooseSettings",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.filters[filterType] = value;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setSelectedSettingDetail: (state, action) => {
      state.selectedSettingDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChooseSettingsPageData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChooseSettingsPageData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pageData = action.payload;
      })
      .addCase(fetchChooseSettingsPageData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchChooseYourSettingData.pending, (state) => {
        state.chooseYourSettingStatus = "loading";
      })
      .addCase(fetchChooseYourSettingData.fulfilled, (state, action) => {
        state.chooseYourSettingStatus = "succeeded";
        state.count = action.payload.count?.total_count || 0;
        state.chooseYourSettingData = action.payload?.data || [];
      })
      .addCase(fetchChooseYourSettingData.rejected, (state, action) => {
        state.chooseYourSettingStatus = "failed";
        state.error = action.payload;
      })
      .addCase(fetchSettingDetailsData.pending, (state) => {
        state.settingDetailStatus = "loading";
      })
      .addCase(fetchSettingDetailsData.fulfilled, (state, action) => {
        state.settingDetailStatus = "succeeded";
        state.settingDetailData = action.payload;
      })
      .addCase(fetchSettingDetailsData.rejected, (state, action) => {
        state.settingDetailStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { setFilter, resetFilters, setSelectedSettingDetail } =
  chooseSettingsSlice.actions;

export default chooseSettingsSlice.reducer;
