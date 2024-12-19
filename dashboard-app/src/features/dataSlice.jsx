import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    items: [],
    filters: {
      sortBy: "name",
      searchQuery: "",
    },
    settings: {
      theme: "light",
      itemsPerPage: 10,
    },
  },
  reducers: {
    setData: (state, action) => {
      state.items = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

export const { setData, setFilters, updateSettings } = dataSlice.actions;
export default dataSlice.reducer;
