import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import type { Produto } from '@/types/IProduto';
import { SidebarCheckout } from '@/components/organismos/SidebarCheckout';
import { Cabecalho } from '@/components/organismos/Cabecalho';
import { ListaProdutos } from '@/components/organismos/ListaProdutos';
import { EstadoCarregando } from '@/components/organismos/EstadoCarregando';
import './index.css';

type EstadoCheckout = 'inicial' | 'processando' | 'sucesso' | 'erro';

export function Checkout() {
  const { produtos, carregando: carregandoProdutos, erro: erroCarregarProdutos } = useAppSelector((state) => state.produtos);
  const [produtoId, setProdutoId] = useState<number>(0);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [estado, setEstado] = useState<EstadoCheckout>('inicial');
  const [mensagemErro, setMensagemErro] = useState<string>('');
  const [shakeSidebar, setShakeSidebar] = useState<boolean>(false);
  const [carrinhoAberto, setCarrinhoAberto] = useState<boolean>(true);

  const produtoSelecionado = produtos.find((p: Produto) => p.id === produtoId);

  const handleSelecionarProduto = (id: number) => {
    setProdutoId(id);
    setQuantidade(1);
    setEstado('inicial');
    setMensagemErro('');
  };

  const handleAlterarQuantidade = (novaQuantidade: number) => {
    setQuantidade(novaQuantidade);
  };

  const handleAlterarQuantidadeNoCard = (idProduto: number, novaQuantidade: number) => {
    if (idProduto === produtoId) {
      setQuantidade(novaQuantidade);
    }
  };

  const handleAlternarCarrinho = () => {
    setCarrinhoAberto(!carrinhoAberto);
  };

  const handleFinalizar = async () => {
    if (!produtoSelecionado) {
      setShakeSidebar(true);
      setTimeout(() => setShakeSidebar(false), 500);
      return;
    }

    setEstado('processando');

    setTimeout(() => {
      if (quantidade > produtoSelecionado.estoque) {
        setEstado('erro');
        setMensagemErro(`Estoque insuficiente. Disponível: ${produtoSelecionado.estoque} unidades`);
      } else {
        setEstado('sucesso');
      }
    }, 3000);
  };

  const handleNovaCompra = () => {
    setProdutoId(0);
    setQuantidade(1);
    setEstado('inicial');
    setMensagemErro('');
  };

  if (carregandoProdutos) {
    return (
      <div className="checkout">
        <Cabecalho
          aoAlternarCarrinho={handleAlternarCarrinho}
          carrinhoAberto={carrinhoAberto}
          quantidadeItens={quantidade}
        />
        <div className="checkout__conteudo">
          <EstadoCarregando />
          {carrinhoAberto && (
            <div className="checkout__sidebar">
              <div className="sidebar-checkout">
                <h2 className="sidebar-checkout__titulo">SEU CARRINHO</h2>
                <p className="sidebar-checkout__vazio">Carregando...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (erroCarregarProdutos) {
    return (
      <div className="checkout">
        <Cabecalho
          aoAlternarCarrinho={handleAlternarCarrinho}
          carrinhoAberto={carrinhoAberto}
          quantidadeItens={0}
        />
        <div className="checkout__container">
          <p className="checkout__erro">{erroCarregarProdutos}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <Cabecalho
        aoAlternarCarrinho={handleAlternarCarrinho}
        carrinhoAberto={carrinhoAberto}
        quantidadeItens={quantidade}
      />

      <div className="checkout__conteudo">
        <ListaProdutos
          produtos={produtos}
          produtoId={produtoId}
          quantidade={quantidade}
          aoSelecionar={handleSelecionarProduto}
          aoAlterarQuantidade={handleAlterarQuantidadeNoCard}
        />

        {carrinhoAberto && (
          <div className="checkout__sidebar">
            <SidebarCheckout
              produtoSelecionado={produtoSelecionado || null}
              quantidade={quantidade}
              aoAlterarQuantidade={handleAlterarQuantidade}
              aoFinalizar={handleFinalizar}
              aoNovaCompra={handleNovaCompra}
              processando={estado === 'processando'}
              estado={estado}
              mensagemErro={mensagemErro}
              shake={shakeSidebar}
            />
          </div>
        )}
      </div>
    </div>
  );
}
