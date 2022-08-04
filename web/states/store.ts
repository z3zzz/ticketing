import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/login';
import formReducer from './slices/form';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
