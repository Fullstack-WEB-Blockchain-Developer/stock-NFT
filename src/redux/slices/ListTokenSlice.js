import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allUserTokens: [],
  openedPreviews: [],
  openedTokens: [],
  tokens: [],
  error: null,
};

export const getAllUserTokens = createAsyncThunk(
  "tokens/getAllUserTokens",
  async (params, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const {
        data: { data },
      } = await axios.get(`${process.env.BACKEND_URL}/users/account/assets`, {
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

export const listToken = createSlice({
  name: "listToken",
  initialState,
  reducers: {
    addToken: (state, { payload }) => {
      state.tokens = [...state.tokens, payload];
      state.openedTokens = [...state.openedTokens, payload.id];
      state.openedPreviews = [...state.openedTokens, payload.id];
    },
    deleteToken: (state, { payload }) => {
      state.tokens = [...state.tokens.filter(({ id }) => id !== payload)];
    },
    toggleOpenToken: (state, { payload }) => {
      if (state.openedTokens.includes(payload)) {
        state.openedTokens = [...state.openedTokens.filter((id) => id !== payload)];
      } else {
        state.openedTokens = [...state.openedTokens, payload];
      }
    },
    toggleOpenPreview: (state, { payload }) => {
      if (state.openedPreviews.includes(payload)) {
        state.openedPreviews = [...state.openedPreviews.filter((id) => id !== payload)];
      } else {
        state.openedPreviews = [...state.openedPreviews, payload];
      }
    },
    changeToken: (state, { payload: { id, field, newValue } }) => {
      state.tokens = state.tokens.map((token) => {
        if (token.id === id) {
          token[field] = newValue;
        }
        return token;
      });
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUserTokens.fulfilled, (state, { payload }) => {
      if (payload) {
        state.allUserTokens = payload;
      }
    });
    builder.addCase(getAllUserTokens.rejected, (state, { payload }) => {
      state.error = payload;
    });
  },
});

export const { addToken, deleteToken, toggleOpenToken, changeToken, toggleOpenPreview, clearError } =
  listToken.actions;

export default listToken.reducer;
