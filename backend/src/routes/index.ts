import { Router } from 'express';
import { CheckoutController } from '../controllers/CheckoutController';
import { ProdutoController } from '../controllers/ProdutoController';
import { CarrinhoController } from '../controllers/CarrinhoController';

export function configurarRotas(
  checkoutController: CheckoutController,
  produtoController: ProdutoController,
  carrinhoController: CarrinhoController
): Router {
  const router = Router();

  router.get('/produtos', (req, res) => produtoController.listarProdutos(req, res));
  router.post('/checkout', (req, res) => checkoutController.processarCheckout(req, res));
  router.post('/checkout/carrinho', (req, res) => carrinhoController.processarCarrinho(req, res));
  router.post('/checkout/reset-estoque', (req, res) => produtoController.restaurarEstoque(req, res));

  return router;
}
