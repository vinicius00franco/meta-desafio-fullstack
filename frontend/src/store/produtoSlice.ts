import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IProduto } from '@/types/IProduto';
import { obterProdutos } from '@/services/api';

interface IPaginacao {
  pagina: number;
  limite: number;
  total: number;
  totalPaginas: number;
}

interface IProdutoState {
  produtos: IProduto[];
  carregando: boolean;
  erro: string | null;
  paginacao: IPaginacao | null;
  carregandoMais: boolean;
}

const estadoInicial: IProdutoState = {
  produtos: [],
  carregando: false,
  erro: null,
  paginacao: null,
  carregandoMais: false,
};

export const buscarProdutos = createAsyncThunk(
  'produtos/buscarProdutos',
  async ({ pagina = 1, limite = 10 }: { pagina?: number; limite?: number } = {}) => {
    return await obterProdutos(pagina, limite);
  }
);

const produtoSlice = createSlice({
  name: 'produtos',
  initialState: estadoInicial,
  reducers: {
    limparProdutos: (state) => {
      state.produtos = [];
      state.paginacao = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buscarProdutos.pending, (state, action) => {
        if (action.meta.arg.pagina === 1) {
          state.carregando = true;
        } else {
          state.carregandoMais = true;
        }
        state.erro = null;
      })
      .addCase(buscarProdutos.fulfilled, (state, action) => {
        const { produtos, paginacao } = action.payload;
        
        if (paginacao.pagina === 1) {
          state.produtos = produtos;
        } else {
          state.produtos = [...state.produtos, ...produtos];
        }
        
        state.paginacao = paginacao;
        state.carregando = false;
        state.carregandoMais = false;
        state.erro = null;
      })
      .addCase(buscarProdutos.rejected, (state, action) => {
        state.carregando = false;
        state.carregandoMais = false;
        state.erro = action.error.message || 'Erro ao carregar produtos';
      });
  },
});

export const { limparProdutos } = produtoSlice.actions;

export type { IProdutoState };

export default produtoSlice.reducer;
