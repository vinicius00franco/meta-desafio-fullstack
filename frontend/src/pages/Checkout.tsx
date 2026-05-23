import { useState } from 'react';
import type { IProduto } from '../types/IProduto';
import type { ICheckoutFormData } from '../types/ICheckoutFormData';
import { useCheckout } from '../hooks/useCheckout';
import { ProdutoSelect } from '../components/molecules/ProdutoSelect';
import { QuantidadeInput } from '../components/molecules/QuantidadeInput';
import { BotaoCompra } from '../components/molecules/BotaoCompra';
import { ToastFeedback } from '../components/molecules/ToastFeedback';
import './Checkout.css';

const PRODUTOS_MOCK: IProduto[] = [
  {
    id: 'prod-1',
    nome: 'Capinha iPhone 15',
    preco: 49.90,
    estoque: 10,
  },
  {
    id: 'prod-2',
    nome: 'Capinha Samsung S24',
    preco: 39.90,
    estoque: 5,
  },
  {
    id: 'prod-3',
    nome: 'Capinha iPhone 14',
    preco: 44.90,
    estoque: 3,
  },
  {
    id: 'prod-4',
    nome: 'Capinha iPhone 13',
    preco: 34.90,
    estoque: 10,
  },
  {
    id: 'prod-5',
    nome: 'Capinha iPhone 10',
    preco: 19.90,
    estoque: 10,
  },
  {
    id: 'prod-6',
    nome: 'Capinha iPhone 12',
    preco: 29.90,
    estoque: 10,
  },
  {
    id: 'prod-7',
    nome: 'Capinha iPhone 11',
    preco: 24.90,
    estoque: 100,
  },
];

export function Checkout() {
  const [formData, setFormData] = useState<ICheckoutFormData>({
    produtoId: '',
    quantidade: 1,
  });
  const [erros, setErros] = useState<{ produtoId?: string; quantidade?: string }>({});
  const [mostrarToast, setMostrarToast] = useState(false);

  const { isLoading, result, executarCheckout, limparResultado } = useCheckout();

  const validarFormulario = (): boolean => {
    const novosErros: { produtoId?: string; quantidade?: string } = {};

    if (!formData.produtoId) {
      novosErros.produtoId = 'Selecione um produto';
    }

    if (formData.quantidade < 1) {
      novosErros.quantidade = 'Quantidade deve ser maior que zero';
    }

    if (formData.quantidade > 10) {
      novosErros.quantidade = 'Quantidade máxima por pedido é 10';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async () => {
    if (!validarFormulario()) {
      return;
    }

    try {
      await executarCheckout(formData);
      setMostrarToast(true);
    } catch (erro) {
      setMostrarToast(true);
    }
  };

  const handleProdutoChange = (valor: string) => {
    setFormData({ ...formData, produtoId: valor });
    setErros({ ...erros, produtoId: undefined });
  };

  const handleQuantidadeChange = (valor: number) => {
    setFormData({ ...formData, quantidade: valor });
    setErros({ ...erros, quantidade: undefined });
  };

  const handleFecharToast = () => {
    setMostrarToast(false);
    limparResultado();
  };

  const produtoSelecionado = PRODUTOS_MOCK.find((p) => p.id === formData.produtoId);
  const valorTotal = produtoSelecionado ? produtoSelecionado.preco * formData.quantidade : 0;

  return (
    <div className="checkout">
      <div className="checkout__container">
        <h1 className="checkout__titulo">Checkout</h1>
        
        {mostrarToast && result && (
          <ToastFeedback
            mensagem={result.sucesso ? 'Compra realizada com sucesso!' : result.erro}
            tipo={result.sucesso ? 'sucesso' : 'erro'}
            onClose={handleFecharToast}
          />
        )}

        <form className="checkout__form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <ProdutoSelect
            produtos={PRODUTOS_MOCK}
            valor={formData.produtoId}
            onChange={handleProdutoChange}
            erro={erros.produtoId}
          />

          <QuantidadeInput
            valor={formData.quantidade}
            onChange={handleQuantidadeChange}
            erro={erros.quantidade}
            max={10}
          />

          {produtoSelecionado && (
            <div className="checkout__resumo">
              <p className="checkout__resumo-item">
                <span>Preço unitário:</span>
                <span>R$ {produtoSelecionado.preco.toFixed(2)}</span>
              </p>
              <p className="checkout__resumo-item">
                <span>Valor total:</span>
                <span className="checkout__resumo-valor">R$ {valorTotal.toFixed(2)}</span>
              </p>
            </div>
          )}

          <BotaoCompra
            onClick={handleSubmit}
            disabled={!formData.produtoId || formData.quantidade < 1}
            isLoading={isLoading}
          />
        </form>
      </div>
    </div>
  );
}
