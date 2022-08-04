import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FieldState {
  email: string;
  password: string;
}

const initialState = { email: '', password: '' } as FieldState;

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<Pick<FieldState, 'email'>>) {
      state.email = action.payload.email;
    },
    setPassword(state, action: PayloadAction<Pick<FieldState, 'password'>>) {
      state.password = action.payload.password;
    },
  },
});

export const { setEmail, setPassword } = formSlice.actions;
export default formSlice.reducer;
