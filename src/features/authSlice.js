import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem("token");
const email = localStorage.getItem("email");
const mobile = localStorage.getItem("mobile");
const name = localStorage.getItem("name");
const id = localStorage.getItem("id");
const profile = localStorage.getItem("profile");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token,
    name: name,
    email: email,
    mobile: mobile,
    profile: profile,
    id: id,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.mobile = action.payload.mobile;
      state.profile = action.payload.profile;
      state.id = action.payload.id;
    },
    removeToken: (state, action) => {
      state.token = null;
      state.email = null;
      state.name = null;
      state.mobile = null;
      state.id = null;
      state.profile = null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
