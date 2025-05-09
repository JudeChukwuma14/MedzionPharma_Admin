import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false, // Add this field
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true; // Set to true when user logs in
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false; // Set to false when user logs out
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;