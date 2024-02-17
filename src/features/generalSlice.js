import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "general",
  initialState: {
    currentPage: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.currentPage;
    },
    setLoading: (state, action) => {
      state.loading = !state.loading;
    },
  },
});

export const { setCurrentPage, setLoading } = generalSlice.actions;
export default generalSlice.reducer;
