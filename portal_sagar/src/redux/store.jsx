// src/redux/store.jsx
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootSlice";

const store = configureStore({
  reducer: {
    root: rootReducer, // ⚠️ This must be an object mapping slice names to reducers
  },
});

export default store;
