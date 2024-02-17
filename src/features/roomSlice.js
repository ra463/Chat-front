import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [],
    room: {},
  },
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload.rooms;
    },
    setRoom: (state, action) => {
      state.room = action.payload.room;
    },
  },
});

export const { setRooms, setRoom } = authSlice.actions;
export default authSlice.reducer;
