import { IProduto } from '../models/IProduto';
import { IProdutoRepository } from './IProdutoRepository';

export class ProdutoRepository implements IProdutoRepository {
  private produtos: IProduto[] = [
    {
      id: 'prod-1',
      nome: 'Capinha iPhone 15',
      preco: 49.90,
      estoque: 10,
    },
    {
      id: 'prod-2',
      nome: 'Capinha Samsung S24',
      preco: 39.90,
      estoque: 5,
    },
    {
      id: 'prod-3',
      nome: 'Capinha iPhone 14',
      preco: 44.90,
      estoque: 3,
    },
    {
      id: 'prod-4',
      nome: 'Capinha iPhone 13',
      preco: 34.90,
      estoque: 10,
    },
    {
      id: 'prod-5',
      nome: 'Capinha iPhone 10',
      preco: 19.90,
      estoque: 10,
    },
    {
      id: 'prod-6',
      nome: 'Capinha iPhone 12',
      preco: 29.90,
      estoque: 10,
    },
    {
      id: 'prod-7',
      nome: 'Capinha iPhone 11',
      preco: 24.90,
      estoque: 100,
    },
  ];

  obterPorId(id: string): IProduto | undefined {
    return this.produtos.find(produto => produto.id === id);
  }

  atualizarEstoque(id: string, novaQuantidade: number): void {
    const produto = this.obterPorId(id);
    if (!produto) {
      throw new Error('Produto não encontrado');
    }
    produto.estoque = novaQuantidade;
  }

  restaurarEstoqueInicial(): void {
    this.produtos = [
      {
        id: 'prod-1',
        nome: 'Capinha iPhone 15',
        preco: 49.90,
        estoque: 10,
      },
      {
        id: 'prod-2',
        nome: 'Capinha Samsung S24',
        preco: 39.90,
        estoque: 5,
      },
      {
        id: 'prod-3',
        nome: 'Capinha iPhone 14',
        preco: 44.90,
        estoque: 3,
      },
      {
        id: 'prod-4',
        nome: 'Capinha iPhone 13',
        preco: 34.90,
        estoque: 10,
      },
      {
        id: 'prod-5',
        nome: 'Capinha iPhone 10',
        preco: 19.90,
        estoque: 10,
      },
      {
        id: 'prod-6',
        nome: 'Capinha iPhone 12',
        preco: 29.90,
        estoque: 10,
      },
      {
        id: 'prod-7',
        nome: 'Capinha iPhone 11',
        preco: 24.90,
        estoque: 100,
      },
    ];
  }
}
