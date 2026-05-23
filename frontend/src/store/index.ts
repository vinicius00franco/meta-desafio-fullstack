import { configureStore } from '@reduxjs/toolkit';
import produtoReducer from './produtoSlice';
import checkoutReducer from './checkoutSlice';
import notificacaoReducer from './notificacaoSlice';

export const store = configureStore({
  reducer: {
    produtos: produtoReducer,
    checkout: checkoutReducer,
    notificacoes: notificacaoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
