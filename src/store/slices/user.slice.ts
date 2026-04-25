import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


type UserType = {
    id : string
    name : string
    user_name : string
    email : string
}


interface UserState {
    user : UserType | null
    accessToken: string | null;
}

const initialState: UserState = {
  user: null,
  accessToken : null
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;