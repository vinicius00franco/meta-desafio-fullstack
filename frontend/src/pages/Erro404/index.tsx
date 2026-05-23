import './index.css';

export function Erro404() {
  return (
    <div className="erro-404">
      <div className="erro-404__container">
        <h1 className="erro-404__codigo">404</h1>
        <h2 className="erro-404__titulo">Página não encontrada</h2>
        <p className="erro-404__mensagem">
          A página que você está procurando não existe ou foi movida.
        </p>
        <button 
          className="erro-404__botao"
          onClick={() => window.location.href = '/'}
        >
          Voltar para a página inicial
        </button>
      </div>
    </div>
  );
}
