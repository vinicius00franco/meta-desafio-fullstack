import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IProduto } from '../types/IProduto';
import { obterProdutos } from '../services/api';

interface ProdutoState {
  produtos: IProduto[];
  carregando: boolean;
  erro: string | null;
}

const estadoInicial: ProdutoState = {
  produtos: [],
  carregando: false,
  erro: null,
};

export const buscarProdutos = createAsyncThunk(
  'produtos/buscarProdutos',
  async () => {
    return await obterProdutos();
  }
);

const produtoSlice = createSlice({
  name: 'produtos',
  initialState: estadoInicial,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(buscarProdutos.pending, (state) => {
        state.carregando = true;
        state.erro = null;
      })
      .addCase(buscarProdutos.fulfilled, (state, action: PayloadAction<IProduto[]>) => {
        state.carregando = false;
        state.produtos = action.payload;
        state.erro = null;
      })
      .addCase(buscarProdutos.rejected, (state, action) => {
        state.carregando = false;
        state.erro = action.error.message || 'Erro ao carregar produtos';
      });
  },
});

export default produtoSlice.reducer;
