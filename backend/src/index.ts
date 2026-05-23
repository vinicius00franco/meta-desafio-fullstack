import express from 'express';
import cors from 'cors';
import { CheckoutController } from './controllers/CheckoutController';
import { ProdutoController } from './controllers/ProdutoController';
import { CheckoutService } from './services/CheckoutService';
import { ProdutoRepository } from './repositories/ProdutoRepository';
import { erroHandler } from './middlewares/erroHandler';
import { logger } from './utils/logger';
import { configurarRotas } from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const produtoRepository = new ProdutoRepository();
const checkoutService = new CheckoutService(produtoRepository);
const checkoutController = new CheckoutController(checkoutService);
const produtoController = new ProdutoController(produtoRepository);

app.use(configurarRotas(checkoutController, produtoController));

app.post('/checkout/reset-estoque', (_req, res) => {
  produtoRepository.restaurarEstoqueInicial();
  res.status(200).json({ mensagem: 'Estoque restaurado' });
});

app.use(erroHandler);

app.listen(PORT, () => {
  logger(`Servidor rodando na porta ${PORT}`);
});

export { app, produtoRepository };
