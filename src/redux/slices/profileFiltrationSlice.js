import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedStatuses: [],
  selectedPrice: {
    min: undefined,
    max: undefined,
    currency: undefined,
  },
  selectedCollections: { filter: "", rows: [] },
  selectedChains: [],
  selectedOnSaleIn: { filter: "", rows: [] },
  filterText: "",
  itemsSelect: "Single Items",
  readyFilterOption: { text: "Price: High to Low", sortOrder: "ASC", sortBy: "price" },
  tokensGridScale: "large",
  isShownAllOffers: true,
};

export const profileFiltration = createSlice({
  name: "profileFiltration",
  initialState,
  reducers: {
    setData: (state, { payload: { field, data } }) => {
      state[field] = data;
    },
    deleteFromArray: (state, { payload: { field, data } }) => {
      if (data.rows) {
        state[field] = { ...state[field], rows: state[field].rows.filter((elem) => elem !== data.rows) };
      } else {
        state[field] = state[field].filter((elem) => elem !== data);
      }
    },
    deleteFromArrayOfObjects: (state, { payload: { field, objectField, data } }) => {
      if (data.rows) {
        state[field] = { ...state[field], rows: state[field].rows.filter((elem) => elem.name !== data.rows) };
      } else {
        state[field] = state[field].filter((elem) => elem[objectField] !== data);
      }
    },
    deletePrice: (state) => {
      state.selectedPrice = {
        ...state.selectedPrice,
        min: undefined,
        max: undefined,
      };
    },
    deleteAll: (state) => {
      state.selectedStatuses = [];
      state.selectedPrice = {
        min: undefined,
        max: undefined,
        currency: undefined,
      };
      state.selectedCollections = { filter: "", rows: [] };
      state.selectedChains = [];
      state.selectedOnSaleIn = { filter: "", rows: [] };
    },
  },
});

export const { setData, deleteFromArray, deletePrice, deleteFromArrayOfObjects, deleteAll } =
  profileFiltration.actions;

export default profileFiltration.reducer;
