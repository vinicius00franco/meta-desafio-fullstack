import './index.css';

interface IQuantidadeInputProps {
  valor: number;
  onChange: (valor: number) => void;
  erro?: string;
  max?: number;
}

export function QuantidadeInput({ valor, onChange, erro, max = 10 }: IQuantidadeInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novoValor = parseInt(e.target.value, 10);
    if (!isNaN(novoValor) && novoValor >= 0) {
      onChange(novoValor);
    }
  };

  return (
    <div className="campo-quantidade">
      <label htmlFor="quantidade" className="campo-quantidade__label">
        Quantidade
      </label>
      <input
        id="quantidade"
        type="number"
        min="1"
        max={max}
        className={`campo-quantidade__input ${erro ? 'campo-quantidade__input--erro' : ''}`}
        value={valor}
        onChange={handleChange}
        data-testid="quantidade-input"
      />
      {erro && <span className="campo-quantidade__erro">{erro}</span>}
    </div>
  );
}
