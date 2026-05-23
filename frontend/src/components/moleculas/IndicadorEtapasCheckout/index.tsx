import './index.css';

interface IEtapaCheckout {
  id: string;
  nome: string;
  descricao: string;
}

interface IIndicadorEtapasCheckoutProps {
  etapaAtual: number;
  etapas: IEtapaCheckout[];
}

export function IndicadorEtapasCheckout({ etapaAtual, etapas }: IIndicadorEtapasCheckoutProps) {
  return (
    <div className="indicador-etapas-checkout" data-testid="indicador-etapas-checkout">
      <h3 className="indicador-etapas-checkout__titulo">Fluxo de Pagamento</h3>
      <div className="indicador-etapas-checkout__etapas">
        {etapas.map((etapa, indice) => {
          const estado = indice < etapaAtual ? 'concluida' : indice === etapaAtual ? 'em-andamento' : 'pendente';
          
          return (
            <div key={etapa.id} className={`indicador-etapas-checkout__etapa indicador-etapas-checkout__etapa--${estado}`} data-testid={`etapa-${etapa.id}`}>
              <div className="indicador-etapas-checkout__linha-conectora">
                {indice < etapas.length - 1 && <div className="indicador-etapas-checkout__linha" />}
              </div>
              <div className="indicador-etapas-checkout__conteudo-etapa">
                <div className="indicador-etapas-checkout__icone-wrapper">
                  {estado === 'concluida' && (
                    <span className="indicador-etapas-checkout__icone indicador-etapas-checkout__icone--concluida">✓</span>
                  )}
                  {estado === 'em-andamento' && (
                    <span className="indicador-etapas-checkout__icone indicador-etapas-checkout__icone--em-andamento">⏳</span>
                  )}
                  {estado === 'pendente' && (
                    <span className="indicador-etapas-checkout__icone indicador-etapas-checkout__icone--pendente">○</span>
                  )}
                </div>
                <div className="indicador-etapas-checkout__texto">
                  <p className="indicador-etapas-checkout__nome-etapa">{etapa.nome}</p>
                  <p className="indicador-etapas-checkout__descricao-etapa">{etapa.descricao}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
