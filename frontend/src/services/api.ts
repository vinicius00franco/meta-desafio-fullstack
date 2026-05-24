import axios from 'axios';
import type { ICheckoutResponse } from '@/types/IApiResponse';
import type { ICheckoutFormData } from '@/types/ICheckoutFormData';
import type { IProduto } from '@/types/IProduto';
import type { ICarrinhoRequest } from '@/types/ICarrinhoRequest';
import type { ICarrinhoResponse } from '@/types/ICarrinhoResponse';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function processarCheckout(
  dados: ICheckoutFormData
): Promise<ICheckoutResponse> {
  const response = await api.post<ICheckoutResponse>('/checkout', dados);
  return response.data;
}

export async function processarCarrinho(
  dados: ICarrinhoRequest
): Promise<ICarrinhoResponse> {
  const response = await api.post<ICarrinhoResponse>('/checkout/carrinho', dados);
  return response.data;
}

interface RespostaProdutos {
  produtos: IProduto[];
  paginacao: {
    pagina: number;
    limite: number;
    total: number;
    totalPaginas: number;
  };
}

export async function obterProdutos(pagina: number = 1, limite: number = 10): Promise<RespostaProdutos> {
  const response = await api.get<RespostaProdutos>('/produtos', {
    params: { pagina, limite },
  });
  return response.data;
}
