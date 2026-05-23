import './index.css';

interface IControleQuantidadeCarrinhoProps {
  quantidade: number;
  aoAlterarQuantidade: (quantidade: number) => void;
  quantidadeMaxima?: number;
}

export function ControleQuantidadeCarrinho({ 
  quantidade, 
  aoAlterarQuantidade, 
  quantidadeMaxima = 10 
}: IControleQuantidadeCarrinhoProps) {
  return (
    <div className="controle-quantidade-carrinho__campo">
      <span className="controle-quantidade-carrinho__label">Quantidade:</span>
      <div className="controle-quantidade-carrinho__controle">
        <button
          className="controle-quantidade-carrinho__botao"
          onClick={() => aoAlterarQuantidade(Math.max(1, quantidade - 1))}
          disabled={quantidade <= 1}
          aria-label="Diminuir quantidade"
        >
          -
        </button>
        <span className="controle-quantidade-carrinho__quantidade">{quantidade}</span>
        <button
          className="controle-quantidade-carrinho__botao"
          onClick={() => aoAlterarQuantidade(Math.min(quantidadeMaxima, quantidade + 1))}
          disabled={quantidade >= quantidadeMaxima}
          aria-label="Aumentar quantidade"
        >
          +
        </button>
      </div>
    </div>
  );
}
