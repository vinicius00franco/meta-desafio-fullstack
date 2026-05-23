import type { Produto } from '@/types/IProduto';
import './index.css';

interface IEstadoErroProps {
  produto: Produto | null;
  quantidade: number;
  valorTotal: number;
  mensagemErro: string;
  aoTentarNovamente: () => void;
}

const formatarMoeda = (valor: number): string => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export function EstadoErro({ produto, quantidade, valorTotal, mensagemErro, aoTentarNovamente }: IEstadoErroProps) {
  return (
    <div className="estado-erro" role="alert" aria-live="assertive">
      <h2 className="estado-erro__titulo">SEU CARRINHO</h2>
      
      {produto && (
        <>
          <div className="estado-erro__campo">
            <span className="estado-erro__label">Produto selecionado:</span>
            <span className="estado-erro__valor">{produto.nome}</span>
          </div>
          <div className="estado-erro__campo">
            <span className="estado-erro__label">Quantidade:</span>
            <span className="estado-erro__valor">{quantidade}</span>
          </div>
          <div className="estado-erro__campo">
            <span className="estado-erro__label">Preço unitário:</span>
            <span className="estado-erro__valor">{formatarMoeda(produto.preco)}</span>
          </div>
          <div className="estado-erro__campo">
            <span className="estado-erro__label">Subtotal:</span>
            <span className="estado-erro__valor">{formatarMoeda(valorTotal)}</span>
          </div>
          <div className="estado-erro__campo">
            <span className="estado-erro__label">Total:</span>
            <span className="estado-erro__valor">{formatarMoeda(valorTotal)}</span>
          </div>
        </>
      )}
      
      <div className="estado-erro__mensagem">
        <p>❌ {mensagemErro || 'Erro ao processar compra'}</p>
      </div>
      
      <button className="estado-erro__botao-tentar" onClick={aoTentarNovamente} aria-label="Tentar realizar a compra novamente">
        TENTAR NOVAMENTE
      </button>
    </div>
  );
}
