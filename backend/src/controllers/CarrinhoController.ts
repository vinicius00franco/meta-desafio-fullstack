import { Request, Response } from 'express';
import { ICarrinhoService } from '../services/ICarrinhoService';
import { ICarrinhoRequest } from '../dtos/ICarrinhoRequest';

export class CarrinhoController {
  constructor(private readonly carrinhoService: ICarrinhoService) {}

  processarCarrinho(req: Request, res: Response): void {
    const request: ICarrinhoRequest = req.body;
    const response = this.carrinhoService.processarCarrinho(request);
    res.status(201).json(response);
  }
}
