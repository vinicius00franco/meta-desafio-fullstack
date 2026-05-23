export interface IProduto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}
