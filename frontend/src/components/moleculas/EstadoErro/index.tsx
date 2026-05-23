import './index.css';

interface IEstadoErroProps {
  valorTotal: number;
  mensagemErro: string;
  aoTentarNovamente: () => void;
}

const formatarMoeda = (valor: number): string => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export function EstadoErro({ valorTotal, mensagemErro, aoTentarNovamente }: IEstadoErroProps) {
  return (
    <div className="estado-erro" role="alert" aria-live="assertive">
      <h2 className="estado-erro__titulo">SEU CARRINHO</h2>
      
      <div className="estado-erro__campo">
        <span className="estado-erro__label">Total:</span>
        <span className="estado-erro__valor">{formatarMoeda(valorTotal)}</span>
      </div>
      
      <div className="estado-erro__mensagem">
        <p>❌ {mensagemErro || 'Erro ao processar compra'}</p>
      </div>
      
      <button className="estado-erro__botao-tentar" onClick={aoTentarNovamente} aria-label="Tentar realizar a compra novamente">
        TENTAR NOVAMENTE
      </button>
    </div>
  );
}
