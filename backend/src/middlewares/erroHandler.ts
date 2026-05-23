import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export function erroHandler(
  erro: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  logger(`Erro: ${erro.message}`, 'error');

  if (erro.name === 'ErroValidacao') {
    res.status(400).json({ mensagem: erro.message });
    return;
  }

  if (erro.name === 'ErroProdutoNaoEncontrado') {
    res.status(404).json({ mensagem: erro.message });
    return;
  }

  res.status(500).json({ mensagem: 'Erro interno do servidor' });
}
