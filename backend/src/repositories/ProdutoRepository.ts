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
      {
        id: this.gerarProximoId(),
        nome: 'Capinha iPhone 13 Pro',
        preco: 64.90,
        estoque: 12,
        urlImagem: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=300&h=300&fit=crop',
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha Samsung Galaxy S23',
        preco: 74.90,
        estoque: 18,
        urlImagem: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop',
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha iPhone 12',
        preco: 54.90,
        estoque: 25,
        urlImagem: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=300&h=300&fit=crop',
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha Motorola Edge 40',
        preco: 49.90,
        estoque: 14,
        urlImagem: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=300&h=300&fit=crop',
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha iPhone 15',
        preco: 79.90,
        estoque: 16,
        urlImagem: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=300&h=300&fit=crop',
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha Samsung Galaxy A54',
        preco: 44.90,
        estoque: 22,
        urlImagem: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=300&h=300&fit=crop',
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha iPhone 11',
        preco: 44.90,
        estoque: 30,
        urlImagem: 'https://images.unsplash.com/photo-1574755393849-623942d6a876?w=300&h=300&fit=crop',
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha Xiaomi Poco X5',
        preco: 39.90,
        estoque: 28,
        urlImagem: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop',
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha iPhone 15 Pro',
        preco: 94.90,
        estoque: 9,
        urlImagem: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=300&fit=crop',
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha Samsung Galaxy S24 Ultra',
        preco: 99.90,
        estoque: 7,
        urlImagem: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop',
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha iPhone 14 Pro',
        preco: 84.90,
        estoque: 11,
        urlImagem: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=300&h=300&fit=crop',
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha Xiaomi Redmi Note 12',
        preco: 49.90,
        estoque: 19,
        urlImagem: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha iPhone 13',
        preco: 59.90,
        estoque: 21,
        urlImagem: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=300&h=300&fit=crop',
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha Samsung Galaxy A34',
        preco: 39.90,
        estoque: 24,
        urlImagem: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop',
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha iPhone SE',
        preco: 34.90,
        estoque: 35,
        urlImagem: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=300&h=300&fit=crop',
      },
      {
        id: this.gerarProximoId(),
        nome: 'Capinha Xiaomi Redmi 12',
        preco: 34.90,
        estoque: 32,
        urlImagem: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop',
      },
    ];
  }

  constructor() {
    this.inicializarProdutos();
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
      throw new Error('Produto não encontrado');
    }
    produto.estoque = novaQuantidade;
  }

  restaurarEstoqueInicial(): void {
    this.proximoId = 1;
    this.inicializarProdutos();
  }
}
