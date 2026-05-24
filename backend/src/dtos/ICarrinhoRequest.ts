export interface ItemCarrinhoRequest {
  produtoId: number;
  quantidade: number;
}

export interface ICarrinhoRequest {
  itens: ItemCarrinhoRequest[];
}
