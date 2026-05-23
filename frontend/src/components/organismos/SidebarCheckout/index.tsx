import type { Produto } from '@/types/IProduto';
import { InfoCarrinho } from '@/components/moleculas/InfoCarrinho';
import { ControleQuantidadeCarrinho } from '@/components/moleculas/ControleQuantidadeCarrinho';
import { EstadoProcessando } from '@/components/moleculas/EstadoProcessando';
import { EstadoSucesso } from '@/components/moleculas/EstadoSucesso';
import { EstadoErro } from '@/components/moleculas/EstadoErro';
import './index.css';

interface ISidebarCheckoutProps {
  produtoSelecionado: Produto | null;
  quantidade: number;
  aoAlterarQuantidade: (quantidade: number) => void;
  aoFinalizar: () => void;
  aoNovaCompra: () => void;
  processando: boolean;
  estado: 'inicial' | 'processando' | 'sucesso' | 'erro';
  mensagemErro?: string;
  shake?: boolean;
}

export function SidebarCheckout({
  produtoSelecionado,
  quantidade,
  aoAlterarQuantidade,
  aoFinalizar,
  aoNovaCompra,
  processando,
  estado,
  mensagemErro,
  shake,
}: ISidebarCheckoutProps) {
  const valorTotal = produtoSelecionado ? produtoSelecionado.preco * quantidade : 0;

  if (estado === 'processando') {
    return (
      <div className="sidebar-checkout sidebar-checkout--processando">
        <EstadoProcessando />
      </div>
    );
  }

  if (estado === 'sucesso' && produtoSelecionado) {
    return (
      <div className="sidebar-checkout sidebar-checkout--sucesso">
        <EstadoSucesso
          produto={produtoSelecionado}
          quantidade={quantidade}
          valorTotal={valorTotal}
          aoNovaCompra={aoNovaCompra}
        />
      </div>
    );
  }

  if (estado === 'erro') {
    return (
      <div className="sidebar-checkout sidebar-checkout--erro">
        <EstadoErro
          produto={produtoSelecionado}
          quantidade={quantidade}
          valorTotal={valorTotal}
          mensagemErro={mensagemErro || 'Erro ao processar compra'}
          aoTentarNovamente={aoFinalizar}
        />
      </div>
    );
  }

  return (
    <div className={`sidebar-checkout ${shake ? 'sidebar-checkout--shake' : ''}`}>
      <h2 className="sidebar-checkout__titulo">SEU CARRINHO</h2>
      
      {!produtoSelecionado ? (
        <p className="sidebar-checkout__vazio">Selecione um produto para continuar</p>
      ) : (
        <>
          <ControleQuantidadeCarrinho
            quantidade={quantidade}
            aoAlterarQuantidade={aoAlterarQuantidade}
            quantidadeMaxima={Math.min(produtoSelecionado.estoque, 10)}
          />
          <InfoCarrinho
            produto={produtoSelecionado}
            quantidade={quantidade}
            valorTotal={valorTotal}
          />
          <button
            className="sidebar-checkout__botao-finalizar"
            onClick={aoFinalizar}
            disabled={processando}
            aria-label="Finalizar compra"
          >
            FINALIZAR
            <br />
            <span>COMPRA</span>
          </button>
        </>
      )}
    </div>
  );
}
