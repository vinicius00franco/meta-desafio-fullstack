import { z } from 'zod';
import { ErroValidacao } from '../utils/Erros';

export const itemCarrinhoSchema = z.object({
  produtoId: z.number({
    message: 'Produto deve ser um número',
  }).positive('Produto deve ser um número positivo'),
  quantidade: z.number({
    message: 'Quantidade deve ser um número',
  }).min(1, 'Quantidade deve ser maior que zero')
   .max(10, 'Quantidade máxima por item é 10'),
});

export const carrinhoRequestSchema = z.object({
  itens: z.array(itemCarrinhoSchema).min(1, 'Carrinho deve ter pelo menos um item'),
});

export type CarrinhoRequestInput = z.infer<typeof carrinhoRequestSchema>;

export function validarCarrinhoRequest(data: unknown): CarrinhoRequestInput {
  const resultado = carrinhoRequestSchema.safeParse(data);
  
  if (!resultado.success) {
    const erros = resultado.error.issues.map((e: any) => e.message).join(', ');
    throw new ErroValidacao(erros);
  }
  
  return resultado.data;
}
