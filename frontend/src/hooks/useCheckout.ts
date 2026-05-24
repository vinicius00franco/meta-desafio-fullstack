import { useState, useCallback } from 'react';
import type { ICheckoutFormData } from '@/types/ICheckoutFormData';
import type { CheckoutResult } from '@/types/IApiResponse';
import { processarCheckout } from '@/services/api';

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CheckoutResult | null>(null);

  const executarCheckout = useCallback(async (dados: ICheckoutFormData) => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await processarCheckout(dados);
      setResult({
        sucesso: true,
        dados: response,
      });
      return response;
    } catch (erro: any) {
      console.error('Erro no checkout:', erro);
      const mensagem = erro.response?.data?.mensagem || erro.message || 'Erro ao processar compra';
      const estoqueDisponivel = erro.response?.data?.estoqueDisponivel;
      
      setResult({
        sucesso: false,
        erro: mensagem,
        estoqueDisponivel,
      });
      throw erro;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const limparResultado = useCallback(() => {
    setResult(null);
  }, []);

  return {
    isLoading,
    result,
    executarCheckout,
    limparResultado,
  };
}
