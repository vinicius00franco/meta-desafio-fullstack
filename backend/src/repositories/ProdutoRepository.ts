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
        nome: 'Capinha iPhone 15 Pro Max',
        preco: 89.90,
        estoque: 10,
        urlImagem: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha Samsung Galaxy S24',
        preco: 79.90,
        estoque: 15,
        urlImagem: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop',
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha iPhone 14',
        preco: 69.90,
        estoque: 8,
        urlImagem: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop',
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha Xiaomi Redmi Note 13',
        preco: 59.90,
        estoque: 20,
        urlImagem: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
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
