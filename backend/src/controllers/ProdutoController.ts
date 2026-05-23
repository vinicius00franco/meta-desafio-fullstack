import { Request, Response } from 'express';
import { IProdutoRepository } from '../repositories/IProdutoRepository';

export class ProdutoController {
  constructor(private readonly produtoRepository: IProdutoRepository) {}

  async listarProdutos(req: Request, res: Response): Promise<void> {
    try {
      const pagina = parseInt(req.query.pagina as string) || 1;
      const limite = parseInt(req.query.limite as string) || 10;
      
      const produtos = this.produtoRepository.obterTodos(pagina, limite);
      const total = this.produtoRepository.obterTotal();
      
      res.status(200).json({
        produtos,
        paginacao: {
          pagina,
          limite,
          total,
          totalPaginas: Math.ceil(total / limite),
        },
      });
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao listar produtos' });
    }
  }
}
