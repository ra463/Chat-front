import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import roomSlice from "./roomSlice";
import chatSlice from "./chatSlice";
import generalSlice from "./generalSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    room: roomSlice,
    chat: chatSlice,
    general: generalSlice,
  },
});
