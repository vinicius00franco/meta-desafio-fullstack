import { IProduto } from '../models/IProduto';

export interface IProdutoRepository {
  obterPorId(id: string): IProduto | undefined;
  atualizarEstoque(id: string, novaQuantidade: number): void;
}
