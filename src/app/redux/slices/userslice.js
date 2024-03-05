import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: "",
};
export const Userslice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      console.log("token value is initialised in the reducer", action.payload);
    },
  },
});

export const { setToken } = Userslice.actions;
export default Userslice.reducer;
