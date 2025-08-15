import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token : ''
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.currentUser = action.payload.currentUser;
      state.token = action.payload.token;
    },
    logout(state) {
      state.currentUser = null;
      state.token = null;
      console.log("logout");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;