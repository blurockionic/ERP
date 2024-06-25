import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
};

export const signInReducer = createReducer(initialState, (builder) => {
  // Send OTP for registration
  builder
    .addCase("SIGN_IN_REQUEST", (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase("SIGN_IN_SUCCESS", (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.error = null;
    })
    .addCase("SIGN_IN_AUTHENTICATE", (state, action) => {
      state.loading = false;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.error = null;
    })
    .addCase("SIGN_IN_FAIL", (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload.error;
    });
});
