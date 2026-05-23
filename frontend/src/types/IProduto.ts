export interface IProduto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  urlImagem: string;
}

export interface ItemCarrinho {
  produto: IProduto;
  quantidade: number;
}

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}
