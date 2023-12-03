import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../models/User';
import { RootState } from '../../store';

export interface AuthState {
  user: null | User;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectUserId = (state: RootState) => state.auth.user?.id;

export default authSlice.reducer;
