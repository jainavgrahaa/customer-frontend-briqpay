import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApiUrl } from "@/_utils";
import apiService from "@/_utils/apiService";

// Create an async thunk for fetching plp data
export const fetchPlpData = createAsyncThunk(
  "plp/fetchPlpData",
  async ({ navigationhierarchyid, transcode, params }, { rejectWithValue }) => {
    try {
      const apiUrl = getApiUrl(
        `/solr/navigation/filter/search?navigationhierarchyid=${navigationhierarchyid}&transcode=${transcode}${params}`
      );
      const response = await apiService().get(apiUrl);
      const plpListingData =
        response?.expandedData &&
        Object?.entries(response?.expandedData)?.map(([code, details]) => {
          return details?.docs.map((doc) => {
            return {
              ...(!!doc.id && { id: doc.id }),
              ...(!!doc.bandwidth && { bandwidth: doc.bandwidth }),
              ...(!!doc.ringsize && { ringsize: doc.ringsize }),
              ...(!!doc.stonetype && { stonetype: doc.stonetype }),
              ...(!!doc.settingtype && { settingtype: doc.settingtype }),
              ...(!!doc.carat && { carat: doc.carat }),
              ...(!!doc.color && { color: doc.color }),
              ...(!!doc.stoneshape && { stoneshape: doc.stoneshape }),
              ...(!!doc.code && { code: doc.code }),
              ...(!!doc.name && { name: doc.name }),
              ...(!!doc.variantoptionname && {
                variantoptionname: doc.variantoptionname,
              }),
              ...(!!doc.navigationhierarchyid && {
                navigationhierarchy: doc.navigationhierarchyid,
              }),
              ...(!!doc.tags && { tags: doc.tags }),
              ...(!!doc.transcode && { transcode: doc.transcode }),
              price: Array.isArray(doc.price)
                ? doc.price[0] || {}
                : doc.price || {},
              fromprice: Array.isArray(doc.fromprice)
                ? doc.fromprice[0] || {}
                : doc.fromprice || {},
              collectionid: Array.isArray(doc.collectionid)
                ? doc.collectionid[0] || {}
                : doc.collectionid || {},
              ...(!!doc.metal && { metal: doc.metal }),
              ...(!!doc.image && { image: doc.image }),
              selected: false,
            };
          });
        });

      const mergeData = (expendedData, collapseData) => {
        const mergedData = [];
        collapseData?.forEach((collapseItem) => {
          const matchingExpended =
            expendedData.find((expendedArray) => {
              return expendedArray.some(
                (expendedItem) => expendedItem.code === collapseItem.code
              );
            }) ?? [];
          if (matchingExpended) {
            const mergedItem = {
              code: collapseItem?.code,
              prodcuctData: [
                { ...collapseItem, selected: true },
                ...matchingExpended,
              ],
            };

            const includedMetal = [];
            // added that only unique variants are rendered
            const filterData = mergedItem.prodcuctData.filter(
              ({ metal }, i, ar) => {
                if (!includedMetal.includes(metal)) {
                  const ob = ar.some((item) => item.metal === metal);
                  if (!ob) {
                    return;
                  }
                  includedMetal.push(metal);
                  return ob;
                }
                return;
              }
            );
            mergedData.push({
              code: mergedItem.code,
              // add upto 4 variants
              prodcuctData: filterData.slice(0, 4),
            });
          }
        });

        return mergedData;
      };
      return mergeData(plpListingData, response?.collapsedData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  plpUrl: {
    category: null,
    filter: [],
    sort: [],
  },
  plpData: null,
  error: null,
};

export const plpPageSlice = createSlice({
  name: "plp",
  initialState,
  reducers: {
    updatePlpUrl: (state, action) => {
      const [key, value] = Object.entries(action.payload).flat();
      state.plpUrl[key] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlpData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlpData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.plpData = action.payload;
      })
      .addCase(fetchPlpData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { updatePlpUrl } = plpPageSlice.actions;

export default plpPageSlice.reducer;
