import { configureStore } from "@reduxjs/toolkit";
import administrationReducer from "./slices/adminSlice";
import carouselReducer from "./slices/carouselSlice";
import errorSnackbarReducer from "./slices/errorSnackbarSlice";
import generalDataReducer from './slices/generalDataSlice'
import listTokenReducer from './slices/ListTokenSlice'
import logoutModalReducer from "./slices/logoutModalSlice";
import myWalletOptionsPopupReducer from "./slices/myWalletOptionsPopupSlice";
import offersReducer from "./slices/offersSlice";
import profileFiltrationReducer from "./slices/profileFiltrationSlice";
import profilePopupReducer from "./slices/profilePopupSlice";
import successSnackbarReducer from "./slices/successSnackbarSlice";
import successfulOrderModalReducer from "./slices/successfulOrderSlice";
import userDataReducer from "./slices/userDataSlice";
import walletPopupReducer from "./slices/walletPopupSlice";

export const store = configureStore({
  reducer: {
    administration: administrationReducer,
    carousel: carouselReducer,
    errorSnackbar: errorSnackbarReducer,
    generalData: generalDataReducer
    listToken: listTokenReducer
    logoutModal: logoutModalReducer,
    myWalletOptionsPopup: myWalletOptionsPopupReducer,
    offers: offersReducer,
    profileFiltration: profileFiltrationReducer,
    profilePopup: profilePopupReducer,
    successSnackbar: successSnackbarReducer,
    successfulOrderModal: successfulOrderModalReducer,
    userData: userDataReducer,
    walletPopup: walletPopupReducer,
  },
});
