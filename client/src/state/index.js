import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  resto: null,
  restos:[]
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setRestos: (state, action) => {
      state.restos = action.payload.restos
    },
    setResto: (state, action) => {
      state.resto = action.payload.resto
    },
  },
});

export const { setMode, setLogin, setLogout, setRestos , setResto } =
  authSlice.actions;
export default authSlice.reducer;