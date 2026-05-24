import { z } from 'zod';
import { ErroValidacao } from '../utils/Erros';

export const checkoutRequestSchema = z.object({
  produtoId: z.number({
    message: 'Produto deve ser um número',
  }).positive('Produto deve ser um número positive'),
  quantidade: z.number({
    message: 'Quantidade deve ser um número',
  }).min(1, 'Quantidade deve ser maior que zero')
   .max(10, 'Quantidade máxima por pedido é 10'),
});

export type CheckoutRequestInput = z.infer<typeof checkoutRequestSchema>;

export function validarCheckoutRequest(data: unknown): CheckoutRequestInput {
  const resultado = checkoutRequestSchema.safeParse(data);
  
  if (!resultado.success) {
    const erros = resultado.error.issues.map((e: any) => e.message).join(', ');
    throw new ErroValidacao(erros);
  }
  
  return resultado.data;
}
