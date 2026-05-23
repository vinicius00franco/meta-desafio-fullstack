import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type TipoNotificacao = 'sucesso' | 'erro' | 'aviso' | 'informacao';

interface INotificacao {
  id: string;
  mensagem: string;
  tipo: TipoNotificacao;
  duracao?: number;
}

interface INotificacaoState {
  notificacoes: INotificacao[];
}

const estadoInicial: INotificacaoState = {
  notificacoes: [],
};

const notificacaoSlice = createSlice({
  name: 'notificacoes',
  initialState: estadoInicial,
  reducers: {
    adicionarNotificacao: (state, action: PayloadAction<Omit<INotificacao, 'id'>>) => {
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

export type { INotificacao, INotificacaoState };

export default notificacaoSlice.reducer;
