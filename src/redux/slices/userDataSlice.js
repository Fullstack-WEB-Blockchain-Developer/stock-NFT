import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageUrl: undefined,
  username: "Profile",
  banner: undefined,
  bio: "",
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
    setField: (state, { payload: {field, value} }) => {
      state[field] = value;
    },
  },
});

export const { setImage, setUsername, setBanner, setUserBio, setField } = userData.actions;

export default userData.reducer;
