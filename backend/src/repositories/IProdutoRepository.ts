import { IProduto } from '../models/IProduto';

export interface IProdutoRepository {
  obterPorId(id: number): IProduto | undefined;
  obterTodos(pagina?: number, limite?: number): IProduto[];
  obterTotal(): number;
  atualizarEstoque(id: number, novaQuantidade: number): void;
  carregarSeed(produtos: any[]): void;
  resetarProximoId(): void;
}
