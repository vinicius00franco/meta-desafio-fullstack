import { z } from 'zod';
import { ErroValidacao } from '../utils/Erros';

export const paginacaoSchema = z.object({
  pagina: z.coerce.number().min(1).default(1),
  limite: z.coerce.number().min(1).max(100).default(10),
});

export type PaginacaoInput = z.infer<typeof paginacaoSchema>;

export function validarPaginacao(data: unknown): PaginacaoInput {
  const resultado = paginacaoSchema.safeParse(data);
  
  if (!resultado.success) {
    const erros = resultado.error.issues.map((e: any) => e.message).join(', ');
    throw new ErroValidacao(erros);
  }
  
  return resultado.data;
}
