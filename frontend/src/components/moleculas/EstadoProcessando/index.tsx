import './index.css';

export function EstadoProcessando() {
  return (
    <div className="estado-processando" role="status" aria-live="polite" data-testid="estado-processando">
      <h2 className="estado-processando__titulo">PROCESSANDO COMPRA</h2>
      <div className="estado-processando__loading">
        <p>⏳ Processando...</p>
        <p className="estado-processando__subtexto">(aprox. 3 segundos)</p>
      </div>
      <div className="estado-processando__etapas">
        <p>✅ Produto selecionado</p>
        <p>✅ Quantidade definida</p>
        <p>⏳ Validando estoque...</p>
        <p>⬜ Processando compra</p>
        <p>⬜ Confirmação</p>
      </div>
      <div className="estado-processando__progresso">
        <div className="estado-processando__barra-progresso">
          <div className="estado-processando__barra-preenchida" style={{ width: '40%' }}></div>
        </div>
        <p className="estado-processando__porcentagem">40%</p>
      </div>
      <button className="estado-processando__botao-cancelar" onClick={() => {}} aria-label="Cancelar compra" data-testid="botao-cancelar-compra">
        CANCELAR
      </button>
    </div>
  );
}
