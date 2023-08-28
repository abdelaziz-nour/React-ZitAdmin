import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
import { secretKey } from "../app/constants";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: localStorage.getItem("token") === null ? false : true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      const encryptedData = CryptoJS.AES.encrypt(
        action.payload,
        secretKey
      ).toString();
      state.token = encryptedData;
      localStorage.setItem("token", encryptedData);
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
