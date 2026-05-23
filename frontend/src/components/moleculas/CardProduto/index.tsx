import type { IProduto } from '@/types/IProduto';
import './index.css';

interface ICardProdutoProps {
  produto: IProduto;
  aoAdicionarAoCarrinho: (produto: IProduto, quantidade: number) => void;
}

const formatarMoeda = (valor: number): string => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export function CardProduto({ produto, aoAdicionarAoCarrinho }: ICardProdutoProps) {
  const semEstoque = produto.estoque === 0;
  const estoqueBaixo = produto.estoque > 0 && produto.estoque <= 10;
  
  return (
    <div 
      className={`card-produto ${semEstoque ? 'card-produto--sem-estoque' : ''}`}
      role="button"
      tabIndex={0}
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
      <button
        className={`card-produto__botao ${semEstoque ? 'card-produto__botao--desabilitado' : ''}`}
        onClick={() => !semEstoque && aoAdicionarAoCarrinho(produto, 1)}
        disabled={semEstoque}
        aria-label={semEstoque ? `${produto.nome} esgotado` : `Selecionar ${produto.nome}`}
      >
        SELECIONAR
      </button>
    </div>
  );
}
