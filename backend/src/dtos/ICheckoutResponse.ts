export interface ICheckoutResponse {
  id: string;
  produtoId: string;
  quantidade: number;
  valorTotal: number;
  estoqueAtual: number;
}
