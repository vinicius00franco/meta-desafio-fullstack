import { configureStore } from '@reduxjs/toolkit';
import produtoReducer from '@/store/produtoSlice';
import checkoutReducer from '@/store/checkoutSlice';
import notificacaoReducer from '@/store/notificacaoSlice';

export const store = configureStore({
  reducer: {
    produtos: produtoReducer,
    checkout: checkoutReducer,
    notificacoes: notificacaoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
