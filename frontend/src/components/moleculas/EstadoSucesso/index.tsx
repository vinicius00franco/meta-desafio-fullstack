import type { Produto } from '@/types/IProduto';
import './index.css';

interface IEstadoSucessoProps {
  produto: Produto;
  quantidade: number;
  valorTotal: number;
  aoNovaCompra: () => void;
}

const formatarMoeda = (valor: number): string => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export function EstadoSucesso({ produto, quantidade, valorTotal, aoNovaCompra }: IEstadoSucessoProps) {
  return (
    <div className="estado-sucesso" role="alert" aria-live="assertive">
      <h2 className="estado-sucesso__titulo">✅ COMPRA REALIZADA!</h2>
      <p className="estado-sucesso__mensagem">Sua compra foi processada com sucesso!</p>
      
      <div className="estado-sucesso__campo">
        <span className="estado-sucesso__label">Produto:</span>
        <span className="estado-sucesso__valor">{produto.nome}</span>
      </div>
      <div className="estado-sucesso__campo">
        <span className="estado-sucesso__label">Quantidade:</span>
        <span className="estado-sucesso__valor">{quantidade} unidade{quantidade > 1 ? 's' : ''}</span>
      </div>
      <div className="estado-sucesso__campo">
        <span className="estado-sucesso__label">Total pago:</span>
        <span className="estado-sucesso__valor estado-sucesso__valor--destaque">{formatarMoeda(valorTotal)}</span>
      </div>
      
      <button className="estado-sucesso__botao-nova-compra" onClick={aoNovaCompra} aria-label="Iniciar nova compra">
        NOVA COMPRA
      </button>
    </div>
  );
}
