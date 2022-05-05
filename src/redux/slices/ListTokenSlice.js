import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokens: [],
  openedTokens: [],
};

export const listToken = createSlice({
  name: "listToken",
  initialState,
  reducers: {
    setTokens: (state, { payload }) => {
      state.tokens = [...payload];
    },
    addToken: (state, { payload }) => {
      state.tokens = [...state.tokens, payload];
    },
    deleteToken: (state, { payload }) => {
      state.tokens = [...state.tokens.filter(({ id }) => id !== payload)];
    },
    toggleOpenToken: (state, { payload }) => {
      if (openedTokens.includes(payload)) {
        state.openedTokens = [...state.openedTokens.filter((id) => id !== payload)];
      } else {
        state.openedTokens = [...state.openedTokens, payload];
      }
    },
  },
});

export const { setTokens, addToken, deleteToken, toggleOpenToken } = listToken.actions;

export default listToken.reducer;
