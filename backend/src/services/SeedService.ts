import { IProdutoRepository } from '../repositories/IProdutoRepository';
import { ISeedService } from './ISeedService';

export class SeedService implements ISeedService {
  private seedOriginal: any[] = [];

  constructor(private readonly produtoRepository: IProdutoRepository) {}

  carregarSeed(produtos: any[]): void {
    this.seedOriginal = produtos;
    this.produtoRepository.carregarSeed(produtos);
  }

  restaurarEstoqueInicial(): void {
    this.produtoRepository.resetarProximoId();
    this.produtoRepository.carregarSeed(this.seedOriginal);
  }
}
