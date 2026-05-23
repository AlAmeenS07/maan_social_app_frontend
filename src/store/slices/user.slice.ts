import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserType = {
  id: string;
  name: string;
  user_name: string;
  email: string;
  is_blocked: boolean;
  is_verified: boolean;
  is_admin: boolean;
  createdAt: string;
};

export interface UserState {
  user: UserType | null;
  accessToken: string | null;
  loading: boolean;
  authChecked: boolean
}

export type AuthPayload = {
  user: UserType;
  accessToken: string;
};

const initialState: UserState = {
  user: null,
  accessToken: null,
  loading: false,
  authChecked: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadingStart: (state) => {
      state.loading = true;
    },
    setUser: (state, action: PayloadAction<AuthPayload>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
    },
    loadingEnd: (state) => {
      state.loading = false;
    },
    setAuthChecked: (state, action) => {
      state.authChecked = action.payload;
    },
  }
});

export const { setUser, logout, loadingStart, loadingEnd , setAuthChecked } = authSlice.actions;
export default authSlice.reducer;