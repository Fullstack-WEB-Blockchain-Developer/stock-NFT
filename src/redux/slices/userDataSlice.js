import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserCollections = createAsyncThunk(
  'collections/getUserCollections',
  async (userData, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const { data } = await axios.get(`${process.env.BACKEND_URL}/collections`, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const initialState = {
  banner: undefined,
  bio: '',
  createdNfts: 0,
  error: null,
  favoritedNfts: 0,
  imageUrl: undefined,
  maxValue: 0,
  mostCompleteCollection: 0,
  ownedNfts: 0,
  totalValue: 0,
  userCollections: [],
  userId: 0,
  username: 'Profile',
  volumeTraded: 0
};

export const userData = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setImage: (state, action) => {
      if (action.payload === null) {
        state.imageUrl = `/create-nft/empty-profileImage.png`;
      } else {
        state.imageUrl = `${process.env.BACKEND_ASSETS_URL}/profileImages/${action.payload}`;
      }
    },
    setBanner: (state, action) => {
      if (action.payload === null) {
        state.banner = `/create-nft/empty-profileBanner.png`;
      } else {
        state.banner = `${process.env.BACKEND_ASSETS_URL}/profileBanners/${action.payload}`;
      }
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setUserBio: (state, action) => {
      state.bio = action.payload;
    },
    setField: (state, { payload: { field, value } }) => {
      state[field] = value;
    },
    addCollection: (state, { payload }) => {
      state.userCollections = [...state.userCollections, payload];
    },
    deleteCollection: (state, { payload }) => {
      state.userCollections = state.userCollections.filter(({ id }) => id !== payload);
    },
    editCollection: (state, { payload }) => {
      state.userCollections = state.userCollections.map((elem) => {
        if (payload.id === elem.id) {
          return payload;
        }
        return elem;
      });
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserCollections.fulfilled, (state, { payload }) => {
      state.userCollections = payload;
    });
    builder.addCase(getUserCollections.rejected, (state, { payload }) => {
      state.error = payload;
    });
  },
});

export const {
  addCollection,
  clearError,
  deleteCollection,
  editCollection,
  setBanner,
  setField,
  setImage,
  setUserBio,
  setUsername,
} = userData.actions;

export default userData.reducer;
