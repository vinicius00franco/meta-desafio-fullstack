import { Router } from 'express';
import { CheckoutController } from '../controllers/CheckoutController';
import { ProdutoController } from '../controllers/ProdutoController';

export function configurarRotas(
  checkoutController: CheckoutController,
  produtoController: ProdutoController
): Router {
  const router = Router();

  router.get('/produtos', (req, res) => produtoController.listarProdutos(req, res));
  router.post('/checkout', (req, res) => checkoutController.processarCheckout(req, res));
  router.post('/checkout/reset-estoque', (_req, res) => {
    res.status(200).json({ mensagem: 'Estoque restaurado' });
  });

  return router;
}
