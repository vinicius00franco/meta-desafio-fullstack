import { Request, Response } from 'express';
import { IProdutoRepository } from '../repositories/IProdutoRepository';

export class ProdutoController {
  constructor(private readonly produtoRepository: IProdutoRepository) {}

  async listarProdutos(_req: Request, res: Response): Promise<void> {
    try {
      const produtos = this.produtoRepository.obterTodos();
      res.status(200).json(produtos);
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao listar produtos' });
    }
  }
}
