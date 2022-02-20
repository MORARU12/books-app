import { configureStore } from "@reduxjs/toolkit";
import viewedReducer from "./viewedSlice";

export default configureStore({
  reducer: viewedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
