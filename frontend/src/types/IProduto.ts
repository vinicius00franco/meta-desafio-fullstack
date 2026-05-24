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
