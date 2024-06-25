"use client";

import { configureStore } from "@reduxjs/toolkit";
import { signInReducer } from "./reducers/signInReducer";

// Define the store
export const store = configureStore({
  reducer: {
    // Add your reducers here
    // posts: postsReducer,
    // comments: commentsReducer,
    signInCredential: signInReducer,
  },
});
