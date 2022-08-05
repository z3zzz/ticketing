import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { sendRequest } from '../../utils';

export interface User {
  id: number;
  email: string;
}

interface LoginState {
  isLogin: boolean;
  user: User | null;
}

const initialState = {
  isLogin: false,
  user: null,
} as LoginState;

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    doLogin(state, action: PayloadAction<User>) {
      state.isLogin = true;
      state.user = action.payload;
    },
    doLogout(state) {
      state.isLogin = false;
      state.user = null;
      sendRequest({ method: 'GET', path: '/api/auth/signout' });
    },
  },
});

export const { doLogin, doLogout } = loginSlice.actions;
export default loginSlice.reducer;
