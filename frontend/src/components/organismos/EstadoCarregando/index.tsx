import './index.css';

export function EstadoCarregando() {
  return (
    <div className="estado-carregando">
      <h2 className="estado-carregando__titulo">PRODUTOS DISPONÍVEIS</h2>
      <div className="estado-carregando__loading">
        <div className="estado-carregando__spinner"></div>
        <p>Carregando produtos...</p>
      </div>
    </div>
  );
}
