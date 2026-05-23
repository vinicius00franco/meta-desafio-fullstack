import { Request, Response, NextFunction } from 'express';

export function jsonParser(req: Request, res: Response, next: NextFunction): void {
  if (req.method === 'POST' && req.is('application/json')) {
    try {
      req.body = JSON.parse(req.body);
    } catch (erro) {
      res.status(400).json({ mensagem: 'JSON inválido' });
      return;
    }
  }
  next();
}
