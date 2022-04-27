import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fees: {
        stokeFee: 2.5,
        creatorRoyalty: 10,
    },
    pagesForUnauthorized: [
        '/', '/connect-wallet', '/token/[tokenId]', '/create-nft', '/my-collections'
    ]
};

export const administration = createSlice({
    name: 'administration',
    initialState,
    reducers: {
        setFees: (state, action) => {
            state.fees = {...action.payload}
        },
        setPagesForUnauthorized: (state, action) => {
            state.pagesForUnauthorized = [...action.payload]
        }
    }
});

export const { setFees, setPagesForUnauthorized } = administration.actions;

export default administration.reducer;