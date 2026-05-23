import axios from 'axios';
import type { ICheckoutResponse } from '../types/IApiResponse';
import type { ICheckoutFormData } from '../types/ICheckoutFormData';

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

export async function obterProdutos(): Promise<ICheckoutResponse[]> {
  const response = await api.get<ICheckoutResponse[]>('/produtos');
  return response.data;
}
