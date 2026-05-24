import type { IProduto } from '@/types/IProduto';
import './index.css';

interface ICardProdutoProps {
  produto: IProduto;
  aoAdicionarAoCarrinho: (produto: IProduto, quantidade: number) => void;
  quantidadeNoCarrinho?: number;
}

const formatarMoeda = (valor: number): string => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export function CardProduto({ produto, aoAdicionarAoCarrinho, quantidadeNoCarrinho = 0 }: ICardProdutoProps) {
  const semEstoque = produto.estoque === 0;
  const estoqueBaixo = produto.estoque > 0 && produto.estoque <= 10;
  const temNoCarrinho = quantidadeNoCarrinho > 0;
  
  return (
    <div 
      className={`card-produto ${semEstoque ? 'card-produto--sem-estoque' : ''} ${temNoCarrinho ? 'card-produto--selecionado' : ''}`}
      role="button"
      tabIndex={0}
      data-testid={`card-produto-${produto.id}`}
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
      <div className="card-produto__acoes">
        <button
          className={`card-produto__botao ${semEstoque ? 'card-produto__botao--desabilitado' : ''} ${temNoCarrinho ? 'card-produto__botao--selecionado' : ''}`}
          onClick={() => !semEstoque && aoAdicionarAoCarrinho(produto, 1)}
          disabled={semEstoque}
          aria-label={semEstoque ? `${produto.nome} esgotado` : `Selecionar ${produto.nome}`}
          data-testid={`botao-adicionar-${produto.id}`}
        >
          {temNoCarrinho ? 'ADICIONAR' : 'SELECIONAR'}
        </button>
        {temNoCarrinho && (
          <div className="card-produto__badge-quantidade" data-testid={`badge-quantidade-${produto.id}`}>
            {quantidadeNoCarrinho}
          </div>
        )}
      </div>
    </div>
  );
}
