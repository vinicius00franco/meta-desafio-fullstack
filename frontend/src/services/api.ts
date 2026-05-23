import axios from 'axios';
import type { RespostaCheckout } from '@/types/IApiResponse';
import type { DadosCheckout } from '@/types/ICheckoutFormData';
import type { Produto } from '@/types/IProduto';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function processarCheckout(
  dados: DadosCheckout
): Promise<RespostaCheckout> {
  const response = await api.post<RespostaCheckout>('/checkout', dados);
  return response.data;
}

export async function obterProdutos(): Promise<Produto[]> {
  const response = await api.get<Produto[]>('/produtos');
  return response.data;
}
