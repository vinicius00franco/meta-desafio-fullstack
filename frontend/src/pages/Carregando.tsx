import './Carregando.css';

interface CarregandoProps {
  mensagem?: string;
}

export function Carregando({ mensagem = 'Carregando...' }: CarregandoProps) {
  return (
    <div className="carregando">
      <div className="carregando__container">
        <div className="carregando__spinner"></div>
        <p className="carregando__mensagem">{mensagem}</p>
      </div>
    </div>
  );
}
