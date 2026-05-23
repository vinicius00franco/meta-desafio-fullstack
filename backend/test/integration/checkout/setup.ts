import { produtoRepository } from '../../../src/index';
import { carregarSeedProdutos } from '../../helpers/carregarSeed';

export function configurarAmbienteCheckout(): void {
  const produtosSeed = carregarSeedProdutos();
  produtoRepository.restaurarEstoqueInicial(produtosSeed);
}
