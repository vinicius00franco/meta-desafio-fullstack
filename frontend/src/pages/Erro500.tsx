import './Erro500.css';

export function Erro500() {
  return (
    <div className="erro-500">
      <div className="erro-500__container">
        <h1 className="erro-500__codigo">500</h1>
        <h2 className="erro-500__titulo">Erro interno do servidor</h2>
        <p className="erro-500__mensagem">
          Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.
        </p>
        <button 
          className="erro-500__botao"
          onClick={() => window.location.reload()}
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
