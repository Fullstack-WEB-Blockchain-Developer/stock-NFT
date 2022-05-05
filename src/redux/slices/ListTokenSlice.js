import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokens: [],
  openedTokens: [],
};

export const listToken = createSlice({
  name: "listToken",
  initialState,
  reducers: {
    addToken: (state, { payload }) => {
      state.tokens = [...state.tokens, payload];
      state.openedTokens = [...state.openedTokens, payload.id];
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
    changeToken: (state, { payload: { id, field, newValue } }) => {
      state.tokens = state.tokens.map((token) => {
        if (token.id === id) {
          token[field] = newValue;
        }
        return token;
      });
    },
  },
});

export const { addToken, deleteToken, toggleOpenToken, changeToken } = listToken.actions;

export default listToken.reducer;
