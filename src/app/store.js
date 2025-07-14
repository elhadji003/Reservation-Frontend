import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; // ⬅️ cette ligne manque
import { authApi } from "../features/auth/authAPI";
import { reservationApi } from "../features/reservation/reservationAPI";
import { slotApi } from "../features/slot/slotAPI";

const store = configureStore({
  reducer: {
    auth: authReducer, // OK maintenant
    [authApi.reducerPath]: authApi.reducer,
    [reservationApi.reducerPath]: reservationApi.reducer,
    [slotApi.reducerPath]: slotApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      reservationApi.middleware,
      slotApi.middleware
    ),
});

export default store;
