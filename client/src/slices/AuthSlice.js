import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  User: localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : null,
}

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.User = action.payload
      localStorage.setItem("User", JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.User = null
      localStorage.removeItem("User")
    }
  }


})

export const { setUser, logout } = AuthSlice.actions
export default AuthSlice.reducer;
