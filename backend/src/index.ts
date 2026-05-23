import express from 'express';
import { CheckoutController } from './controllers/CheckoutController';
import { CheckoutService } from './services/CheckoutService';
import { ProdutoRepository } from './repositories/ProdutoRepository';
import { erroHandler } from './middlewares/erroHandler';
import { logger } from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const produtoRepository = new ProdutoRepository();
const checkoutService = new CheckoutService(produtoRepository);
const checkoutController = new CheckoutController(checkoutService);

app.post('/checkout', (req, res) => checkoutController.processarCheckout(req, res));

app.use(erroHandler);

app.listen(PORT, () => {
  logger(`Servidor rodando na porta ${PORT}`);
});

export { app, produtoRepository };
