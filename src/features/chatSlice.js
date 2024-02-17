import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload.chats;
    },
  },
});

export const { setChats } = authSlice.actions;
export default authSlice.reducer;
