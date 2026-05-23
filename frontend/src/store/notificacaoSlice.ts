import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type TipoNotificacao = 'sucesso' | 'erro' | 'aviso' | 'informacao';

interface Notificacao {
  id: string;
  mensagem: string;
  tipo: TipoNotificacao;
  duracao?: number;
}

interface NotificacaoState {
  notificacoes: Notificacao[];
}

const estadoInicial: NotificacaoState = {
  notificacoes: [],
};

const notificacaoSlice = createSlice({
  name: 'notificacoes',
  initialState: estadoInicial,
  reducers: {
    adicionarNotificacao: (state, action: PayloadAction<Omit<Notificacao, 'id'>>) => {
      const id = Date.now().toString();
      state.notificacoes.push({
        ...action.payload,
        id,
      });
    },
    removerNotificacao: (state, action: PayloadAction<string>) => {
      state.notificacoes = state.notificacoes.filter((n) => n.id !== action.payload);
    },
    limparNotificacoes: (state) => {
      state.notificacoes = [];
    },
  },
});

export const { adicionarNotificacao, removerNotificacao, limparNotificacoes } = notificacaoSlice.actions;

export default notificacaoSlice.reducer;
