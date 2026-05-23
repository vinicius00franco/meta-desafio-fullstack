import './index.css';

interface ICabecalhoProps {
  aoAlternarCarrinho: () => void;
  carrinhoAberto: boolean;
  quantidadeItens: number;
}

export function Cabecalho({ aoAlternarCarrinho, carrinhoAberto, quantidadeItens }: ICabecalhoProps) {
  return (
    <header className="cabecalho">
      <div className="cabecalho__conteudo">
        <h1 className="cabecalho__logo">CaseCellShop</h1>
        <p className="cabecalho__subtitulo">📱 Capinhas</p>
      </div>
      
      <button
        className={`cabecalho__botao-carrinho ${carrinhoAberto ? 'cabecalho__botao-carrinho--aberto' : ''}`}
        onClick={aoAlternarCarrinho}
        aria-label={carrinhoAberto ? 'Fechar carrinho' : 'Abrir carrinho'}
        aria-expanded={carrinhoAberto}
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
          <span className="cabecalho__badge">{quantidadeItens}</span>
        )}
      </button>
    </header>
  );
}
