import type { Produto } from '@/types/IProduto';
import './index.css';

interface IProdutoSelectProps {
  produtos: Produto[];
  valor: number;
  onChange: (valor: number) => void;
  erro?: string;
}

export function ProdutoSelect({ produtos, valor, onChange, erro }: IProdutoSelectProps) {
  return (
    <div className="campo-produto">
      <label htmlFor="produto" className="campo-produto__label">
        Produto
      </label>
      <select
        id="produto"
        className={`campo-produto__select ${erro ? 'campo-produto__select--erro' : ''}`}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        data-testid="produto-select"
      >
        <option value={0}>Selecione um produto</option>
        {produtos.map((produto) => (
          <option key={produto.id} value={produto.id}>
            {produto.nome} - R$ {produto.preco.toFixed(2)} (Estoque: {produto.estoque})
          </option>
        ))}
      </select>
      {erro && <span className="campo-produto__erro">{erro}</span>}
    </div>
  );
}
