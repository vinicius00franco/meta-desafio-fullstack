import type { IProduto } from '@/types/IProduto';
import './index.css';

interface InfoCarrinhoProps {
  produto: IProduto;
  quantidade: number;
  valorTotal: number;
}

const formatarMoeda = (valor: number): string => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export function InfoCarrinho({ produto, quantidade, valorTotal }: InfoCarrinhoProps) {
  return (
    <>
      <div className="info-carrinho__campo">
        <span className="info-carrinho__label">Produto selecionado:</span>
        <span className="info-carrinho__valor">{produto.nome}</span>
      </div>
      
      <div className="info-carrinho__campo">
        <span className="info-carrinho__label">Quantidade:</span>
        <span className="info-carrinho__valor">{quantidade}</span>
      </div>
      
      <div className="info-carrinho__campo">
        <span className="info-carrinho__label">Preço unitário:</span>
        <span className="info-carrinho__valor">{formatarMoeda(produto.preco)}</span>
      </div>
      
      <div className="info-carrinho__campo">
        <span className="info-carrinho__label">Subtotal:</span>
        <span className="info-carrinho__valor">{formatarMoeda(valorTotal)}</span>
      </div>
      
      <div className="info-carrinho__campo info-carrinho__campo--total">
        <span className="info-carrinho__label">Total:</span>
        <span className="info-carrinho__valor info-carrinho__valor--destaque">{formatarMoeda(valorTotal)}</span>
      </div>
    </>
  );
}
