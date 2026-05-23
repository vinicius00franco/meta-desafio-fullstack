import type { ItemCarrinho } from '@/types/IProduto';
import { EstadoProcessando } from '@/components/moleculas/EstadoProcessando';
import { EstadoSucesso } from '@/components/moleculas/EstadoSucesso';
import { EstadoErro } from '@/components/moleculas/EstadoErro';
import { IndicadorEtapasCheckout } from '@/components/moleculas/IndicadorEtapasCheckout';
import './index.css';

interface ISidebarCheckoutProps {
  carrinho: ItemCarrinho[];
  aoAlterarQuantidade: (produtoId: number, quantidade: number) => void;
  aoRemoverDoCarrinho: (produtoId: number) => void;
  aoFinalizar: () => void;
  aoNovaCompra: () => void;
  aoFechar: () => void;
  processando: boolean;
  estado: 'inicial' | 'processando' | 'sucesso' | 'erro';
  mensagemErro?: string;
  shake?: boolean;
}

const formatarMoeda = (valor: number): string => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const ETAPAS_CHECKOUT = [
  { id: 'selecao', nome: 'Seleção', descricao: 'Produtos no carrinho' },
  { id: 'validacao', nome: 'Validação', descricao: 'Verificando estoque' },
  { id: 'processamento', nome: 'Processamento', descricao: 'Processando pagamento' },
  { id: 'confirmacao', nome: 'Confirmação', descricao: 'Compra finalizada' },
];

export function SidebarCheckout({
  carrinho,
  aoAlterarQuantidade,
  aoRemoverDoCarrinho,
  aoFinalizar,
  aoNovaCompra,
  aoFechar,
  processando,
  estado,
  mensagemErro,
  shake,
}: ISidebarCheckoutProps) {
  const valorTotal = carrinho.reduce((total, item) => total + item.produto.preco * item.quantidade, 0);

  const obterEtapaAtual = (): number => {
    if (estado === 'sucesso') return 3;
    if (estado === 'processando') return 1;
    if (estado === 'erro') return 1;
    return 0;
  };

  const etapaAtual = obterEtapaAtual();

  if (estado === 'sucesso') {
    return (
      <div className="sidebar-checkout sidebar-checkout--sucesso" data-testid="sidebar-sucesso">
        <button className="sidebar-checkout__botao-fechar" onClick={aoFechar} aria-label="Fechar carrinho" data-testid="botao-fechar-carrinho">
          ✕
        </button>
        <IndicadorEtapasCheckout etapaAtual={etapaAtual} etapas={ETAPAS_CHECKOUT} />
        <EstadoSucesso
          valorTotal={valorTotal}
          aoNovaCompra={aoNovaCompra}
        />
      </div>
    );
  }

  if (estado === 'erro') {
    return (
      <div className="sidebar-checkout sidebar-checkout--erro" data-testid="sidebar-erro">
        <button className="sidebar-checkout__botao-fechar" onClick={aoFechar} aria-label="Fechar carrinho" data-testid="botao-fechar-carrinho">
          ✕
        </button>
        <IndicadorEtapasCheckout etapaAtual={etapaAtual} etapas={ETAPAS_CHECKOUT} />
        <EstadoErro
          valorTotal={valorTotal}
          mensagemErro={mensagemErro || 'Erro ao processar compra'}
          aoTentarNovamente={aoFinalizar}
        />
      </div>
    );
  }

  return (
    <div className={`sidebar-checkout ${shake ? 'sidebar-checkout--shake' : ''} ${estado === 'processando' ? 'sidebar-checkout--processando' : ''}`} data-testid="sidebar-carrinho">
      <div className="sidebar-checkout__cabecalho">
        <h2 className="sidebar-checkout__titulo">SEU CARRINHO</h2>
        <button className="sidebar-checkout__botao-fechar" onClick={aoFechar} aria-label="Fechar carrinho" data-testid="botao-fechar-carrinho">
          ✕
        </button>
      </div>
      
      <IndicadorEtapasCheckout etapaAtual={etapaAtual} etapas={ETAPAS_CHECKOUT} />
      
      {carrinho.length === 0 ? (
        <p className="sidebar-checkout__vazio" data-testid="mensagem-carrinho-vazio">Seu carrinho está vazio</p>
      ) : (
        <>
          <div className={`sidebar-checkout__lista ${estado === 'processando' ? 'sidebar-checkout__lista--desabilitado' : ''}`} data-testid="lista-itens-carrinho">
            {carrinho.map((item) => (
              <div key={item.produto.id} className="sidebar-checkout__item" data-testid={`item-carrinho-${item.produto.id}`}>
                <div className="sidebar-checkout__item-info">
                  <h3 className="sidebar-checkout__item-nome">{item.produto.nome}</h3>
                  <p className="sidebar-checkout__item-preco">{formatarMoeda(item.produto.preco)}</p>
                </div>
                <div className="sidebar-checkout__item-controles">
                  <div className="sidebar-checkout__controle-quantidade">
                    <button
                      className="sidebar-checkout__botao-quantidade"
                      onClick={() => aoAlterarQuantidade(item.produto.id, item.quantidade - 1)}
                      disabled={item.quantidade <= 1 || processando}
                      aria-label="Diminuir quantidade"
                      data-testid={`botao-diminuir-item-${item.produto.id}`}
                    >
                      -
                    </button>
                    <span className="sidebar-checkout__quantidade" data-testid={`quantidade-item-${item.produto.id}`}>{item.quantidade}</span>
                    <button
                      className="sidebar-checkout__botao-quantidade"
                      onClick={() => aoAlterarQuantidade(item.produto.id, item.quantidade + 1)}
                      disabled={item.quantidade >= Math.min(item.produto.estoque, 10) || processando}
                      aria-label="Aumentar quantidade"
                      data-testid={`botao-aumentar-item-${item.produto.id}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="sidebar-checkout__botao-remover"
                    onClick={() => aoRemoverDoCarrinho(item.produto.id)}
                    disabled={processando}
                    aria-label={`Remover ${item.produto.nome} do carrinho`}
                    data-testid={`botao-remover-item-${item.produto.id}`}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="sidebar-checkout__total" data-testid="total-carrinho">
            <p className="sidebar-checkout__total-label">Total:</p>
            <p className="sidebar-checkout__total-valor" data-testid="valor-total-carrinho">{formatarMoeda(valorTotal)}</p>
          </div>
          {estado === 'processando' ? (
            <EstadoProcessando />
          ) : (
            <button
              className="sidebar-checkout__botao-finalizar"
              onClick={aoFinalizar}
              disabled={processando}
              aria-label="Finalizar compra"
              data-testid="botao-finalizar-compra"
            >
              FINALIZAR
              <br />
              <span>COMPRA</span>
            </button>
          )}
        </>
      )}
    </div>
  );
}
