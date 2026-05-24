import express from 'express';
import cors from 'cors';
import { CheckoutController } from './controllers/CheckoutController';
import { ProdutoController } from './controllers/ProdutoController';
import { CarrinhoController } from './controllers/CarrinhoController';
import { CheckoutService } from './services/CheckoutService';
import { CarrinhoService } from './services/CarrinhoService';
import { SeedService } from './services/SeedService';
import { ProdutoRepository } from './repositories/ProdutoRepository';
import { erroHandler } from './middlewares/erroHandler';
import { logger } from './utils/logger';
import { configurarRotas } from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const produtoRepository = new ProdutoRepository();
const seedService = new SeedService(produtoRepository);
const produtosSeed = require('./seeds/produtos.json');
seedService.carregarSeed(produtosSeed);
const checkoutService = new CheckoutService(produtoRepository);
const carrinhoService = new CarrinhoService(produtoRepository);
const checkoutController = new CheckoutController(checkoutService);
const carrinhoController = new CarrinhoController(carrinhoService);
const produtoController = new ProdutoController(produtoRepository, seedService);

app.use(configurarRotas(checkoutController, produtoController, carrinhoController));

app.use(erroHandler);

if (require.main === module) {
  app.listen(PORT, () => {
    logger(`Servidor rodando na porta ${PORT}`);
  });
}

export { app, produtoRepository, seedService };
