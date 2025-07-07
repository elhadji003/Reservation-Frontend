// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

let persistedState;
try {
  persistedState = JSON.parse(localStorage.getItem("auth")) || {
    user: null,
    accessToken: null,
    refreshToken: null,
    role: null,
  };
} catch {
  persistedState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    role: null,
  };
}

const authSlice = createSlice({
  name: "auth",
  initialState: persistedState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.accessToken = payload.access;
      state.refreshToken = payload.refresh;
      state.role = payload.user?.role;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
