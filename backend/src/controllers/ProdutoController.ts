import { Request, Response } from 'express';
import { IProdutoRepository } from '../repositories/IProdutoRepository';
import { ISeedService } from '../services/ISeedService';
import { validarPaginacao } from '../validators/ProdutoValidator';

export class ProdutoController {
  constructor(
    private readonly produtoRepository: IProdutoRepository,
    private readonly seedService: ISeedService
  ) {}

  listarProdutos(req: Request, res: Response): void {
    const paginacao = validarPaginacao(req.query);
    
    const produtos = this.produtoRepository.obterTodos(paginacao.pagina, paginacao.limite);
    const total = this.produtoRepository.obterTotal();
    
    res.status(200).json({
      produtos,
      paginacao: {
        pagina: paginacao.pagina,
        limite: paginacao.limite,
        total,
        totalPaginas: Math.ceil(total / paginacao.limite),
      },
    });
  }

  restaurarEstoque(_req: Request, res: Response): void {
    this.seedService.restaurarEstoqueInicial();
    res.status(200).json({ mensagem: 'Estoque restaurado' });
  }
}
