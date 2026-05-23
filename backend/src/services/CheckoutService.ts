import { ICheckoutRequest } from '../dtos/ICheckoutRequest';
import { ICheckoutResponse } from '../dtos/ICheckoutResponse';
import { IProdutoRepository } from '../repositories/IProdutoRepository';
import { ICheckoutService } from './ICheckoutService';
import { ErroValidacao, ErroProdutoNaoEncontrado, ErroEstoqueInsuficiente } from '../utils/Erros';
import { QUANTIDADE_MINIMA, QUANTIDADE_MAXIMA } from '../utils/Constantes';

export class CheckoutService implements ICheckoutService {
  constructor(private readonly produtoRepository: IProdutoRepository) {}

  processarCheckout(request: ICheckoutRequest): ICheckoutResponse {
    this.validarRequest(request);

    const produto = this.produtoRepository.obterPorId(request.produtoId);
    if (!produto) {
      throw new ErroProdutoNaoEncontrado('Produto não encontrado');
    }

    this.validarEstoque(produto.estoque, request.quantidade);

    const novoEstoque = produto.estoque - request.quantidade;
    this.produtoRepository.atualizarEstoque(request.produtoId, novoEstoque);

    const valorTotal = produto.preco * request.quantidade;

    return {
      id: this.gerarIdCompra(),
      produtoId: request.produtoId,
      quantidade: request.quantidade,
      valorTotal,
      estoqueAtual: novoEstoque,
    };
  }

  private validarRequest(request: ICheckoutRequest): void {
    if (!request.produtoId) {
      throw new ErroValidacao('Produto é obrigatório');
    }

    if (request.quantidade === undefined || request.quantidade === null) {
      throw new ErroValidacao('Quantidade é obrigatória');
    }

    if (typeof request.quantidade !== 'number') {
      throw new ErroValidacao('Quantidade deve ser um número');
    }

    if (request.quantidade < QUANTIDADE_MINIMA) {
      throw new ErroValidacao('Quantidade deve ser maior que zero');
    }

    if (request.quantidade > QUANTIDADE_MAXIMA) {
      throw new ErroValidacao(`Quantidade máxima por pedido é ${QUANTIDADE_MAXIMA}`);
    }
  }

  private validarEstoque(estoque: number, quantidade: number): void {
    if (quantidade > estoque) {
      throw new ErroEstoqueInsuficiente('Estoque insuficiente', estoque);
    }
  }

  private gerarIdCompra(): string {
    return `compra-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
