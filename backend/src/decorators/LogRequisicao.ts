import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export function logRequisicao(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const inicio = Date.now();
  const metodo = req.method;
  const rota = req.path;
  const corpo = req.body ? JSON.stringify(req.body) : '{}';

  logger(`[${metodo}] ${rota} - Iniciando`, 'info');
  logger(`Corpo da requisição: ${corpo}`, 'info');

  const enviarRespostaOriginal = res.json.bind(res);
  res.json = function (data: unknown): Response {
    const duracao = Date.now() - inicio;
    const status = res.statusCode;
    logger(
      `[${metodo}] ${rota} - Concluído (${status}) - ${duracao}ms`,
      'info'
    );
    return enviarRespostaOriginal(data);
  };

  next();
}
