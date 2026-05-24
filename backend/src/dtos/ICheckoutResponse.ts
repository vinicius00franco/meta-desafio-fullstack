export interface ICheckoutResponse {
  id: string;
  produtoId: number;
  quantidade: number;
  valorTotal: number;
  estoqueAtual: number;
}
