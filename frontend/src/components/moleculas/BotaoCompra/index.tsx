import './index.css';

interface IBotaoCompraProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export function BotaoCompra({ onClick, disabled = false, isLoading = false }: IBotaoCompraProps) {
  return (
    <button
      className={`botao-compra ${disabled ? 'botao-compra--disabled' : ''} ${isLoading ? 'botao-compra--loading' : ''}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      data-testid="botao-comprar"
    >
      {isLoading ? 'Processando...' : 'Finalizar Compra'}
    </button>
  );
}
