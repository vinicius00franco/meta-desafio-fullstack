export interface RespostaCheckout {
  id: string;
  produtoId: string;
  quantidade: number;
  valorTotal: number;
  estoqueAtual: number;
}

export interface RespostaErro {
  mensagem: string;
  estoqueDisponivel?: number;
}

export type ResultadoCheckout = {
  sucesso: true;
  dados: RespostaCheckout;
} | {
  sucesso: false;
  erro: string;
  estoqueDisponivel?: number;
};
