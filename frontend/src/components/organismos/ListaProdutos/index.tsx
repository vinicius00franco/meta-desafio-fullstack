import type { IProduto } from '@/types/IProduto';
import { CardProduto } from '@/components/moleculas/CardProduto';
import './index.css';

interface IListaProdutosProps {
  produtos: IProduto[];
  aoAdicionarAoCarrinho: (produto: IProduto, quantidade: number) => void;
  obterQuantidadeNoCarrinho: (produtoId: number) => number;
}

export function ListaProdutos({ 
  produtos, 
  aoAdicionarAoCarrinho,
  obterQuantidadeNoCarrinho 
}: IListaProdutosProps) {
  return (
    <div className="lista-produtos">
      <h2 className="lista-produtos__titulo">PRODUTOS DISPONÍVEIS</h2>
      <div className="lista-produtos__grid">
        {produtos.map((produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
            aoAdicionarAoCarrinho={aoAdicionarAoCarrinho}
            quantidadeNoCarrinho={obterQuantidadeNoCarrinho(produto.id)}
          />
        ))}
      </div>
    </div>
  );
}
