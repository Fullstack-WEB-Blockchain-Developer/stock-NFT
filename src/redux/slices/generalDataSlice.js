import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  chains: [],
  collections: [],
  currencies: [],
  error: null,
};

export const getAllChains = createAsyncThunk("chains/getAllChains", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${process.env.BACKEND_URL}/nfts/blockchainTypes/all`);
    return data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const getAllCurrencies = createAsyncThunk(
  "chains/getAllCurrencies",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${process.env.BACKEND_URL}/offers/currencyTypes/all`);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getAllCollections = createAsyncThunk(
  "collections/getAllCollections",
  async (userData, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${process.env.BACKEND_URL}/collections`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const generalData = createSlice({
  name: "generalData",
  initialState,
  reducers: {
    setAllData: (state, { payload }) => {
      state = { ...payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllChains.fulfilled, (state, action) => {
      state.chains = action.payload;
    });
    builder.addCase(getAllChains.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getAllCollections.fulfilled, (state, action) => {
      state.collections = action.payload;
    });
    builder.addCase(getAllCollections.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getAllCurrencies.fulfilled, (state, action) => {
      state.currencies = action.payload;
    });
    builder.addCase(getAllCurrencies.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { setAllData, clearError } = generalData.actions;

export default generalData.reducer;
