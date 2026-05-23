import { useState } from 'react';
import './index.css';

interface ICabecalhoProps {
  aoAlternarCarrinho: () => void;
  carrinhoAberto: boolean;
  quantidadeItens: number;
  aoPesquisar?: (termo: string) => void;
}

export function Cabecalho({ aoAlternarCarrinho, carrinhoAberto, quantidadeItens, aoPesquisar }: ICabecalhoProps) {
  const [termoPesquisa, setTermoPesquisa] = useState<string>('');

  const handlePesquisa = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setTermoPesquisa(valor);
    aoPesquisar?.(valor);
  };

  return (
    <header className="cabecalho" data-testid="cabecalho">
      <div className="cabecalho__logo-container">
        <h1 className="cabecalho__logo">CaseCellShop</h1>
      </div>

      <div className="cabecalho__barra-pesquisa">
        <input
          type="text"
          className="cabecalho__input-pesquisa"
          placeholder="Buscar produtos..."
          value={termoPesquisa}
          onChange={handlePesquisa}
          data-testid="input-pesquisa"
        />
        <svg
          className="cabecalho__icone-pesquisa"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      <button
        className={`cabecalho__botao-carrinho ${carrinhoAberto ? 'cabecalho__botao-carrinho--aberto' : ''}`}
        onClick={aoAlternarCarrinho}
        aria-label={carrinhoAberto ? 'Fechar carrinho' : 'Abrir carrinho'}
        aria-expanded={carrinhoAberto}
        data-testid="botao-abrir-carrinho"
      >
        <svg
          className="cabecalho__icone-carrinho"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        {quantidadeItens > 0 && (
          <span className="cabecalho__badge" data-testid="badge-quantidade-itens">{quantidadeItens}</span>
        )}
      </button>
    </header>
  );
}
