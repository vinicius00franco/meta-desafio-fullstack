import { IProduto } from '../models/IProduto';
import { IProdutoRepository } from './IProdutoRepository';
import { ErroProdutoNaoEncontrado } from '../utils/Erros';

export class ProdutoRepository implements IProdutoRepository {
  private proximoId: number = 1;
  private produtos: IProduto[] = [];

  private gerarProximoId(): number {
    return this.proximoId++;
  }

  carregarSeed(produtos: any[]): void {
    this.produtos = produtos.map(produto => ({
      id: produto.id || this.gerarProximoId(),
      nome: produto.nome,
      preco: produto.preco,
      estoque: produto.estoque,
      urlImagem: produto.urlImagem || null,
    }));
  }

  obterPorId(id: number): IProduto | undefined {
    return this.produtos.find(produto => produto.id === id);
  }

  obterTodos(pagina: number = 1, limite: number = 10): IProduto[] {
    const inicio = (pagina - 1) * limite;
    const fim = inicio + limite;
    return this.produtos.slice(inicio, fim);
  }

  obterTotal(): number {
    return this.produtos.length;
  }

  atualizarEstoque(id: number, novaQuantidade: number): void {
    const produto = this.obterPorId(id);
    if (!produto) {
      throw new ErroProdutoNaoEncontrado('Produto não encontrado');
    }
    produto.estoque = novaQuantidade;
  }

  resetarProximoId(): void {
    this.proximoId = 1;
  }
}
