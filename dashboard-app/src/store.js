import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./features/dataSlice";

const store = configureStore({
  reducer: {
    data: dataReducer, // Adds dataSlice to store
  },
});

export default store;
