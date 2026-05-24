import { Request, Response } from 'express';
import { ICheckoutService } from '../services/ICheckoutService';
import { ICheckoutRequest } from '../dtos/ICheckoutRequest';

export class CheckoutController {
  constructor(private readonly checkoutService: ICheckoutService) {}

  processarCheckout(req: Request, res: Response): void {
    const request: ICheckoutRequest = req.body;
    const response = this.checkoutService.processarCheckout(request);
    res.status(201).json(response);
  }
}
