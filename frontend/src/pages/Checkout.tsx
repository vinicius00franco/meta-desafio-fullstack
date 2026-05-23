import { useState } from 'react';
import type { ICheckoutFormData } from '../types/ICheckoutFormData';
import { useCheckout } from '../hooks/useCheckout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { adicionarNotificacao } from '../store/notificacaoSlice';
import { ProdutoSelect } from '../components/molecules/ProdutoSelect';
import { QuantidadeInput } from '../components/molecules/QuantidadeInput';
import { BotaoCompra } from '../components/molecules/BotaoCompra';
import './Checkout.css';

export function Checkout() {
  const dispatch = useAppDispatch();
  const { produtos, carregando: carregandoProdutos, erro: erroCarregarProdutos } = useAppSelector((state) => state.produtos);
  const [formData, setFormData] = useState<ICheckoutFormData>({
    produtoId: 0,
    quantidade: 1,
  });
  const [erros, setErros] = useState<{ produtoId?: string; quantidade?: string }>({});

  const { isLoading, executarCheckout } = useCheckout();

  const validarFormulario = (): boolean => {
    const novosErros: { produtoId?: string; quantidade?: string } = {};

    if (formData.produtoId === 0) {
      novosErros.produtoId = 'Selecione um produto';
    }

    if (formData.quantidade <= 0) {
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
      dispatch(adicionarNotificacao({
        mensagem: 'Compra realizada com sucesso!',
        tipo: 'sucesso',
      }));
    } catch (erro: any) {
      const mensagemErro = erro.response?.data?.mensagem || erro.message || 'Erro ao processar compra';
      dispatch(adicionarNotificacao({
        mensagem: mensagemErro,
        tipo: 'erro',
      }));
    }
  };

  const handleProdutoChange = (valor: number) => {
    setFormData({ ...formData, produtoId: valor });
    setErros({ ...erros, produtoId: undefined });
  };

  const handleQuantidadeChange = (valor: number) => {
    setFormData({ ...formData, quantidade: valor });
    setErros({ ...erros, quantidade: undefined });
  };

  const produtoSelecionado = produtos.find((p) => p.id === formData.produtoId);
  const valorTotal = produtoSelecionado ? produtoSelecionado.preco * formData.quantidade : 0;

  if (carregandoProdutos) {
    return (
      <div className="checkout">
        <div className="checkout__container">
          <p>Carregando produtos...</p>
        </div>
      </div>
    );
  }

  if (erroCarregarProdutos) {
    return (
      <div className="checkout">
        <div className="checkout__container">
          <p className="checkout__erro">{erroCarregarProdutos}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout__container">
        <h1 className="checkout__titulo">Checkout</h1>

        <form className="checkout__form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <ProdutoSelect
            produtos={produtos}
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
            disabled={formData.produtoId === 0 || formData.quantidade < 1 || formData.quantidade > 10}
            isLoading={isLoading}
          />
        </form>
      </div>
    </div>
  );
}
