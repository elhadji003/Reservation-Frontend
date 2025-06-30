import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; // ⬅️ cette ligne manque
import { authApi } from "../features/auth/authAPI";
import { reservationApi } from "../features/reservation/reservationAPI";

const store = configureStore({
  reducer: {
    auth: authReducer, // OK maintenant
    [authApi.reducerPath]: authApi.reducer,
    [reservationApi.reducerPath]: reservationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      reservationApi.middleware
    ),
});

export default store;
