import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: null || localStorage?.getItem("token"),
  email: "" || localStorage?.getItem("email"),
};
export const Userslice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setToken(state, action) {
      console.log("payload value", action.payload);
      state.token = action.payload.token;
      state.email = action.payload.email;
      localStorage.setItem("token", state.token);
      localStorage.setItem("email", state.email);
      // console.log("token value is initialised in the reducer", action.payload);
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      state.token = null;
      state.email = null;
    },
  },
});

export const { setToken, logout } = Userslice.actions;
export default Userslice.reducer;
