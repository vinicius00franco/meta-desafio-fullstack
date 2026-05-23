import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CheckoutState {
  processando: boolean;
  sucesso: boolean;
  erro: string | null;
  mensagem: string | null;
}

const estadoInicial: CheckoutState = {
  processando: false,
  sucesso: false,
  erro: null,
  mensagem: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: estadoInicial,
  reducers: {
    iniciarProcessamento: (state) => {
      state.processando = true;
      state.sucesso = false;
      state.erro = null;
      state.mensagem = null;
    },
    processamentoSucesso: (state, action: PayloadAction<string>) => {
      state.processando = false;
      state.sucesso = true;
      state.mensagem = action.payload;
      state.erro = null;
    },
    processamentoFalha: (state, action: PayloadAction<string>) => {
      state.processando = false;
      state.sucesso = false;
      state.erro = action.payload;
      state.mensagem = null;
    },
    limparEstado: (state) => {
      state.processando = false;
      state.sucesso = false;
      state.erro = null;
      state.mensagem = null;
    },
  },
});

export const {
  iniciarProcessamento,
  processamentoSucesso,
  processamentoFalha,
  limparEstado,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
