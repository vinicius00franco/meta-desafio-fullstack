import axios from 'axios';
import type { ICheckoutResponse } from '../types/IApiResponse';
import type { ICheckoutFormData } from '../types/ICheckoutFormData';
import type { IProduto } from '../types/IProduto';

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

<<<<<<< Updated upstream
export async function obterProdutos(): Promise<IProduto[]> {
  const response = await api.get<IProduto[]>('/produtos');
=======
interface RespostaProdutos {
  produtos: Produto[];
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
>>>>>>> Stashed changes
  return response.data;
}
