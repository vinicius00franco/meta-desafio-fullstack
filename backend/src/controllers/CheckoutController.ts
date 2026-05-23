import { Request, Response } from 'express';
import { ICheckoutService } from '../services/ICheckoutService';
import { ICheckoutRequest } from '../dtos/ICheckoutRequest';
import { ErroEstoqueInsuficiente } from '../utils/Erros';

export class CheckoutController {
  constructor(private readonly checkoutService: ICheckoutService) {}

  async processarCheckout(req: Request, res: Response): Promise<void> {
    try {
      const request: ICheckoutRequest = req.body;
      const response = this.checkoutService.processarCheckout(request);
      res.status(201).json(response);
    } catch (erro) {
      if (erro instanceof Error) {
        if (erro.name === 'ErroValidacao') {
          res.status(400).json({ mensagem: erro.message });
          return;
        }

        if (erro.name === 'ErroProdutoNaoEncontrado') {
          res.status(404).json({ mensagem: erro.message });
          return;
        }

        if (erro instanceof ErroEstoqueInsuficiente) {
          res.status(400).json({ 
            mensagem: erro.message,
            estoqueDisponivel: erro.estoqueDisponivel,
          });
          return;
        }
      }

      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }
}
