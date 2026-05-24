import { ICarrinhoRequest } from '../dtos/ICarrinhoRequest';
import { ICarrinhoResponse } from '../dtos/ICarrinhoResponse';
import { IProdutoRepository } from '../repositories/IProdutoRepository';
import { ICarrinhoService } from './ICarrinhoService';
import { ErroProdutoNaoEncontrado, ErroEstoqueInsuficiente } from '../utils/Erros';
import { validarCarrinhoRequest } from '../validators/CarrinhoValidator';

export class CarrinhoService implements ICarrinhoService {
  constructor(private readonly produtoRepository: IProdutoRepository) {}

  processarCarrinho(request: ICarrinhoRequest): ICarrinhoResponse {
    const dadosValidados = validarCarrinhoRequest(request);

    // Validar todos os produtos e estoques antes de processar
    const itensProcessados = dadosValidados.itens.map((item) => {
      const produto = this.produtoRepository.obterPorId(item.produtoId);
      if (!produto) {
        throw new ErroProdutoNaoEncontrado(`Produto ${item.produtoId} não encontrado`);
      }

      if (item.quantidade > produto.estoque) {
        throw new ErroEstoqueInsuficiente(
          `Estoque insuficiente para ${produto.nome}. Disponível: ${produto.estoque}`,
          produto.estoque
        );
      }

      return {
        produto,
        quantidade: item.quantidade,
        valorTotal: produto.preco * item.quantidade,
        novoEstoque: produto.estoque - item.quantidade,
      };
    });

    // Atualizar estoques de todos os produtos
    itensProcessados.forEach((item) => {
      this.produtoRepository.atualizarEstoque(item.produto.id, item.novoEstoque);
    });

    const valorTotal = itensProcessados.reduce((total, item) => total + item.valorTotal, 0);

    return {
      id: this.gerarIdCompra(),
      itens: itensProcessados.map((item) => ({
        produtoId: item.produto.id,
        quantidade: item.quantidade,
        valorTotal: item.valorTotal,
        estoqueAtual: item.novoEstoque,
      })),
      valorTotal,
    };
  }

  private gerarIdCompra(): string {
    return `compra-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
}
