import type { Produto } from '@/types/IProduto';
import './index.css';

interface InfoCarrinhoProps {
  produto: Produto;
  quantidade: number;
  valorTotal: number;
}

const formatarMoeda = (valor: number): string => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export function InfoCarrinho({ produto, quantidade, valorTotal }: InfoCarrinhoProps) {
  return (
    <>
      <div className="info-carrinho__campo" data-testid="campo-produto-selecionado">
        <span className="info-carrinho__label">Produto selecionado:</span>
        <span className="info-carrinho__valor" data-testid="valor-produto-selecionado">{produto.nome}</span>
      </div>
      
      <div className="info-carrinho__campo" data-testid="campo-quantidade">
        <span className="info-carrinho__label">Quantidade:</span>
        <span className="info-carrinho__valor" data-testid="valor-quantidade">{quantidade}</span>
      </div>
      
      <div className="info-carrinho__campo" data-testid="campo-preco-unitario">
        <span className="info-carrinho__label">Preço unitário:</span>
        <span className="info-carrinho__valor" data-testid="valor-preco-unitario">{formatarMoeda(produto.preco)}</span>
      </div>
      
      <div className="info-carrinho__campo" data-testid="campo-subtotal">
        <span className="info-carrinho__label">Subtotal:</span>
        <span className="info-carrinho__valor" data-testid="valor-subtotal">{formatarMoeda(valorTotal)}</span>
      </div>
      
      <div className="info-carrinho__campo info-carrinho__campo--total" data-testid="campo-total">
        <span className="info-carrinho__label">Total:</span>
        <span className="info-carrinho__valor info-carrinho__valor--destaque" data-testid="valor-total">{formatarMoeda(valorTotal)}</span>
      </div>
    </>
  );
}
