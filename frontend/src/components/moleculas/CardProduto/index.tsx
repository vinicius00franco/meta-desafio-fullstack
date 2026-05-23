import type { Produto } from '@/types/IProduto';
import './index.css';

interface ICardProdutoProps {
  produto: Produto;
  selecionado: boolean;
  aoSelecionar: (produtoId: number) => void;
  quantidadeSelecionada?: number;
  aoAlterarQuantidade?: (produtoId: number, quantidade: number) => void;
}

const formatarMoeda = (valor: number): string => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export function CardProduto({ produto, selecionado, aoSelecionar, quantidadeSelecionada = 1, aoAlterarQuantidade }: ICardProdutoProps) {
  const semEstoque = produto.estoque === 0;
  const estoqueBaixo = produto.estoque > 0 && produto.estoque <= 10;
  const quantidadeMaxima = Math.min(produto.estoque, 10);
  return (
    <div 
      className={`card-produto ${selecionado ? 'card-produto--selecionado' : ''} ${semEstoque ? 'card-produto--sem-estoque' : ''}`}
      role="button"
      tabIndex={0}
      aria-pressed={selecionado}
      onClick={() => !selecionado && !semEstoque && aoSelecionar(produto.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          !selecionado && !semEstoque && aoSelecionar(produto.id);
        }
      }}
    >
      <img src={produto.urlImagem} alt={produto.nome} className="card-produto__imagem" />
      <h3 className="card-produto__nome">{produto.nome}</h3>
      <p className="card-produto__preco">{formatarMoeda(produto.preco)}</p>
      {estoqueBaixo && (
        <p className="card-produto__estoque card-produto__estoque--baixo">Estoque: {produto.estoque}</p>
      )}
      {semEstoque && (
        <p className="card-produto__estoque card-produto__estoque--esgotado">Esgotado</p>
      )}
      {selecionado && aoAlterarQuantidade && (
        <div className="card-produto__controle-quantidade">
          <button
            className="card-produto__botao-quantidade"
            onClick={(e) => {
              e.stopPropagation();
              aoAlterarQuantidade(produto.id, Math.max(1, quantidadeSelecionada - 1));
            }}
            disabled={quantidadeSelecionada <= 1}
            aria-label="Diminuir quantidade"
          >
            -
          </button>
          <span className="card-produto__quantidade">{quantidadeSelecionada}</span>
          <button
            className="card-produto__botao-quantidade"
            onClick={(e) => {
              e.stopPropagation();
              aoAlterarQuantidade(produto.id, Math.min(quantidadeMaxima, quantidadeSelecionada + 1));
            }}
            disabled={quantidadeSelecionada >= quantidadeMaxima}
            aria-label="Aumentar quantidade"
          >
            +
          </button>
        </div>
      )}
      <button
        className={`card-produto__botao ${selecionado ? 'card-produto__botao--selecionado' : ''} ${semEstoque ? 'card-produto__botao--desabilitado' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          if (!semEstoque) aoSelecionar(produto.id);
        }}
        disabled={selecionado || semEstoque}
        aria-label={selecionado ? `${produto.nome} já selecionado` : semEstoque ? `${produto.nome} esgotado` : `Selecionar ${produto.nome}`}
      >
        {semEstoque ? 'ESGOTADO' : selecionado ? 'SELECIONADO' : 'SELECIONAR'}
      </button>
    </div>
  );
}
