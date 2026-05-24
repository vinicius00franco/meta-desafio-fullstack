import { ICheckoutRequest } from '../dtos/ICheckoutRequest';
import { ICheckoutResponse } from '../dtos/ICheckoutResponse';
import { IProdutoRepository } from '../repositories/IProdutoRepository';
import { ICheckoutService } from './ICheckoutService';
import { ErroProdutoNaoEncontrado, ErroEstoqueInsuficiente } from '../utils/Erros';
import { validarCheckoutRequest } from '../validators/CheckoutValidator';

export class CheckoutService implements ICheckoutService {
  constructor(private readonly produtoRepository: IProdutoRepository) {}

  processarCheckout(request: ICheckoutRequest): ICheckoutResponse {
    const dadosValidados = validarCheckoutRequest(request);

    const produto = this.produtoRepository.obterPorId(dadosValidados.produtoId);
    if (!produto) {
      throw new ErroProdutoNaoEncontrado('Produto não encontrado');
    }

    if (dadosValidados.quantidade > produto.estoque) {
      throw new ErroEstoqueInsuficiente('Estoque insuficiente', produto.estoque);
    }

    const novoEstoque = produto.estoque - dadosValidados.quantidade;
    this.produtoRepository.atualizarEstoque(dadosValidados.produtoId, novoEstoque);

    const valorTotal = produto.preco * dadosValidados.quantidade;

    return {
      id: this.gerarIdCompra(),
      produtoId: dadosValidados.produtoId,
      quantidade: dadosValidados.quantidade,
      valorTotal,
      estoqueAtual: novoEstoque,
    };
  }

  private gerarIdCompra(): string {
    return `compra-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
}
