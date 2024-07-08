import { combineReducers, configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "./user/userSlice";

// Define the store
const rootReducer = combineReducers({
  user: userSlice,
});


const persistConfig = {
  key: "root",
  version: 1,
  storage 
}

//add them into persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const peristor = persistStore(store);
