import { IProduto } from '../models/IProduto';
import { IProdutoRepository } from './IProdutoRepository';

export class ProdutoRepository implements IProdutoRepository {
  private proximoId: number = 1;
  private produtos: IProduto[] = [];

  private gerarProximoId(): number {
    return this.proximoId++;
  }

  private inicializarProdutos(): void {
    this.produtos = [
      {
        id: this.gerarProximoId(),
        nome: 'Capinha iPhone 15',
        preco: 49.90,
        estoque: 10,
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha Samsung S24',
        preco: 39.90,
        estoque: 5,
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha iPhone 14',
        preco: 44.90,
        estoque: 3,
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha iPhone 13',
        preco: 34.90,
        estoque: 10,
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha iPhone 10',
        preco: 19.90,
        estoque: 10,
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha iPhone 12',
        preco: 29.90,
        estoque: 10,
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha iPhone 11',
        preco: 24.90,
        estoque: 100,
      },
    ];
  }

  constructor() {
    this.inicializarProdutos();
  }

  obterPorId(id: number): IProduto | undefined {
    return this.produtos.find(produto => produto.id === id);
  }

  obterTodos(): IProduto[] {
    return this.produtos;
  }

  atualizarEstoque(id: number, novaQuantidade: number): void {
    const produto = this.obterPorId(id);
    if (!produto) {
      throw new Error('Produto não encontrado');
    }
    produto.estoque = novaQuantidade;
  }

  restaurarEstoqueInicial(): void {
    this.proximoId = 1;
    this.inicializarProdutos();
  }
}
