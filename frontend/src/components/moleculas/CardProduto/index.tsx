import { useState } from 'react';
import type { Produto } from '@/types/IProduto';
import './index.css';

interface ICardProdutoProps {
  produto: Produto;
  aoAdicionarAoCarrinho: (produto: Produto, quantidade: number) => void;
}

const formatarMoeda = (valor: number): string => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export function CardProduto({ produto, aoAdicionarAoCarrinho }: ICardProdutoProps) {
  const [quantidade, setQuantidade] = useState<number>(1);
  const semEstoque = produto.estoque === 0;
  const estoqueBaixo = produto.estoque > 0 && produto.estoque <= 10;
  const quantidadeMaxima = Math.min(produto.estoque, 10);

  const handleAdicionar = () => {
    aoAdicionarAoCarrinho(produto, quantidade);
    setQuantidade(1);
  };

  return (
    <div className={`card-produto ${semEstoque ? 'card-produto--sem-estoque' : ''}`} data-testid={`card-produto-${produto.id}`}>
      <img src={produto.urlImagem} alt={produto.nome} className="card-produto__imagem" />
      <div className="card-produto__conteudo">
        <h3 className="card-produto__nome">{produto.nome}</h3>
        <p className="card-produto__preco">{formatarMoeda(produto.preco)}</p>
        {estoqueBaixo && (
          <p className="card-produto__estoque card-produto__estoque--baixo">Estoque: {produto.estoque}</p>
        )}
        {semEstoque && (
          <p className="card-produto__estoque card-produto__estoque--esgotado">Esgotado</p>
        )}
        {!semEstoque && (
          <div className="card-produto__controle-quantidade">
            <button
              className="card-produto__botao-quantidade"
              onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
              disabled={quantidade <= 1}
              aria-label="Diminuir quantidade"
              data-testid={`botao-diminuir-quantidade-${produto.id}`}
            >
              -
            </button>
            <span className="card-produto__quantidade" data-testid={`quantidade-exibida-${produto.id}`}>{quantidade}</span>
            <button
              className="card-produto__botao-quantidade"
              onClick={() => setQuantidade(Math.min(quantidadeMaxima, quantidade + 1))}
              disabled={quantidade >= quantidadeMaxima}
              aria-label="Aumentar quantidade"
              data-testid={`botao-aumentar-quantidade-${produto.id}`}
            >
              +
            </button>
          </div>
        )}
        <button
          className={`card-produto__botao ${semEstoque ? 'card-produto__botao--desabilitado' : ''}`}
          onClick={handleAdicionar}
          disabled={semEstoque}
          aria-label={semEstoque ? `${produto.nome} esgotado` : `Adicionar ${produto.nome} ao carrinho`}
          data-testid={`botao-adicionar-${produto.id}`}
        >
          {semEstoque ? 'ESGOTADO' : 'ADICIONAR'}
        </button>
      </div>
    </div>
  );
}
