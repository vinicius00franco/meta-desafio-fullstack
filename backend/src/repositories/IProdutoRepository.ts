import { IProduto } from '../models/IProduto';

export interface IProdutoRepository {
  obterPorId(id: number): IProduto | undefined;
  obterTodos(): IProduto[];
  atualizarEstoque(id: number, novaQuantidade: number): void;
}
