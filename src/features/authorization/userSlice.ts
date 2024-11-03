import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  email: null,
  role: null,
  user_id: null,
  isLoggedIn: false,
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.user_id = action.payload.user_id;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.username = null;
      state.email = null;
      state.role = null;
      state.user_id = null;
      state.isLoggedIn = false;
    },
  },
});
export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
