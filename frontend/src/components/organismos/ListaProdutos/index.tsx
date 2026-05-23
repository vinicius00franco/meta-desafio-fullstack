import type { Produto } from '@/types/IProduto';
import { CardProduto } from '@/components/moleculas/CardProduto';
import './index.css';

interface IListaProdutosProps {
  produtos: Produto[];
  produtoId: number;
  quantidade: number;
  aoSelecionar: (id: number) => void;
  aoAlterarQuantidade: (id: number, quantidade: number) => void;
}

export function ListaProdutos({ 
  produtos, 
  produtoId, 
  quantidade, 
  aoSelecionar, 
  aoAlterarQuantidade 
}: IListaProdutosProps) {
  return (
    <div className="lista-produtos">
      <h2 className="lista-produtos__titulo">PRODUTOS DISPONÍVEIS</h2>
      <div className="lista-produtos__grid">
        {produtos.map((produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
            selecionado={produto.id === produtoId}
            aoSelecionar={aoSelecionar}
            quantidadeSelecionada={produto.id === produtoId ? quantidade : 1}
            aoAlterarQuantidade={aoAlterarQuantidade}
          />
        ))}
      </div>
    </div>
  );
}
