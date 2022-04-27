import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserCollections = createAsyncThunk(
  "collections/getUserCollections",
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

const initialState = {
  banner: undefined,
  bio: "",
  userCollections: [],
  error: null,
  imageUrl: undefined,
  username: "Profile",
  ownedNfts: 0,
  totalValue: 0,
  maxValue: 0,
  createdNfts: 0,
  favoritedNfts: 0,
  mostCompleteCollection: 0,
  volumeTraded: 0,
};

export const userData = createSlice({
  name: "userData",
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

export const { setImage, setUsername, setBanner, setUserBio, clearError, setField } = userData.actions;

export default userData.reducer;
