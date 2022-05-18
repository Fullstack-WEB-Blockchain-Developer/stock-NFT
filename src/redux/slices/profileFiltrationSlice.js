//redux
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//axios
import axios from 'axios';
//utils
import { constructUrl } from '../../page-components/ProfilePage/components/ContentWrapper/ContentWrapper.utils';

const initialState = {
  //FE
  choosenSection: 'collected',
  createdNfts: 0,
  error: null,
  favoritedNfts: 0,
  filterText: '',
  isShownAllOffers: false,
  itemsSelect: 'Single Items',
  maxValue: 0,
  mostCompleteCollection: 0,
  offset: 0,
  ownedNfts: 0,
  readyFilterOption: { text: 'Price: High to Low', sortOrder: 'ASC', sortBy: 'price' },
  selectedChains: [],
  selectedCollections: { filter: '', rows: [] },
  selectedEventTypes: [],
  selectedOnSaleIn: { filter: '', rows: [] },
  selectedStatuses: [],
  selectedCategories: [],
  selectedPrice: { min: undefined, max: undefined, currency: undefined },
  items: [],
  itemsGridScale: 'large',
  totalValue: 0,
  volumeTraded: 0,
};

export const getItems = createAsyncThunk('items/getItems', async (isOffers, { getState, rejectWithValue }) => {
  const {
    profileFiltration: {
      choosenSection,
      filterText,
      offset,
      readyFilterOption,
      selectedCategories,
      selectedChains,
      selectedCollections,
      selectedEventTypes,
      selectedPrice,
      selectedStatuses,
    },
  } = getState();

  try {
    const accessToken = localStorage.getItem('accessToken');
    const { sortOrder, sortBy } = readyFilterOption;

    let url = `${process.env.BACKEND_URL}/users/account/assets?offset=${offset}&limit=30&tab=${choosenSection}&sortOrder=${sortOrder}&sortBy=${sortBy}`;

    url = constructUrl(
      url,
      selectedStatuses,
      selectedCollections,
      selectedPrice,
      selectedChains,
      selectedCategories,
      filterText,
      choosenSection
    );

    url +=
      choosenSection === 'activity' && selectedEventTypes.length > 0
        ? `&eventType=${selectedEventTypes.map(({ name }) => name).join(',')}`
        : '';

    const { data } = await axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });

    return data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const profileFiltration = createSlice({
  name: 'profileFiltration',
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
      state.selectedCollections = { filter: '', rows: [] };
      state.selectedChains = [];
      state.selectedOnSaleIn = { filter: '', rows: [] };
      state.selectedEventTypes = [];
      state.selectedCategories = [];
    },
    clearError: (state) => {
      state.error = null;
    },
    clearOffsetAndItems: (state) => {
      state.offset = 0;
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getItems.fulfilled,
      (state, { payload: { data, ownedNfts, totalValue, maxValue, createdNfts, favoritedNfts } }) => {
        if (data) {
          state.createdNfts = createdNfts;
          state.favoritedNfts = favoritedNfts;
          state.maxValue = maxValue;
          state.offset = state.items.length + data.length;
          state.ownedNfts = ownedNfts;
          state.items = [...state.items, ...data];
          state.totalValue = totalValue;
        }
      }
    );
    builder.addCase(getItems.rejected, (state, { payload }) => {
      state.error = payload;
    });
  },
});

export const {
  clearError,
  clearOffsetAndItems,
  deleteAll,
  deleteFromArray,
  deleteFromArrayOfObjects,
  deletePrice,
  setData,
} = profileFiltration.actions;

export default profileFiltration.reducer;
