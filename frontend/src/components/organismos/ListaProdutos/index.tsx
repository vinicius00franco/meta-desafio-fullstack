import type { Produto } from '@/types/IProduto';
import { CardProduto } from '@/components/moleculas/CardProduto';
import './index.css';

interface IListaProdutosProps {
  produtos: Produto[];
  aoAdicionarAoCarrinho: (produto: Produto, quantidade: number) => void;
}

export function ListaProdutos({ 
  produtos, 
  aoAdicionarAoCarrinho 
}: IListaProdutosProps) {
  return (
    <div className="lista-produtos" data-testid="lista-produtos">
      <h2 className="lista-produtos__titulo">PRODUTOS DISPONÍVEIS</h2>
      <div className="lista-produtos__grid" data-testid="grid-produtos">
        {produtos.map((produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
            aoAdicionarAoCarrinho={aoAdicionarAoCarrinho}
          />
        ))}
      </div>
    </div>
  );
}
