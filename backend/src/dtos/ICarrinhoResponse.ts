export interface ItemCarrinhoResponse {
  produtoId: number;
  quantidade: number;
  valorTotal: number;
  estoqueAtual: number;
}

export interface ICarrinhoResponse {
  id: string;
  itens: ItemCarrinhoResponse[];
  valorTotal: number;
}
