import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UserType = {
  id: string;
  name: string;
  user_name: string;
  email: string;
  is_admin: boolean;
};

export interface UserState {
  user: UserType | null;
  accessToken: string | null;
  loading: boolean;
}

export type AuthPayload = {
  user: UserType;
  accessToken: string;
};

const initialState: UserState = {
  user: null,
  accessToken: null,
  loading: false,
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
  },
});

export const { setUser, logout, loadingStart, loadingEnd } = authSlice.actions;
export default authSlice.reducer;