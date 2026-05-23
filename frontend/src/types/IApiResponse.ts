export interface ICheckoutResponse {
  id: string;
  produtoId: string;
  quantidade: number;
  valorTotal: number;
  estoqueAtual: number;
}

export interface IErroResponse {
  mensagem: string;
  estoqueDisponivel?: number;
}

export type CheckoutResult = {
  sucesso: true;
  dados: ICheckoutResponse;
} | {
  sucesso: false;
  erro: string;
  estoqueDisponivel?: number;
};
