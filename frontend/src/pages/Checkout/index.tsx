import { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { buscarProdutos } from '@/store/produtoSlice';
import type { IProduto, ItemCarrinho } from '@/types/IProduto';
import { SidebarCheckout } from '@/components/organismos/SidebarCheckout';
import { Cabecalho } from '@/components/organismos/Cabecalho';
import { ListaProdutos } from '@/components/organismos/ListaProdutos';
import { EstadoCarregando } from '@/components/organismos/EstadoCarregando';
import { processarCarrinho } from '@/services/api';
import type { ICarrinhoRequest } from '@/types/ICarrinhoRequest';
import './index.css';

type EstadoCheckout = 'inicial' | 'processando' | 'sucesso' | 'erro';

export function Checkout() {
  const dispatch = useAppDispatch();
  const { produtos, carregando: carregandoProdutos, erro: erroCarregarProdutos, paginacao, carregandoMais } = useAppSelector((state) => state.produtos);
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [estado, setEstado] = useState<EstadoCheckout>('inicial');
  const [mensagemErro, setMensagemErro] = useState<string>('');
  const [shakeSidebar, setShakeSidebar] = useState<boolean>(false);
  const [carrinhoAberto, setCarrinhoAberto] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const carregarMaisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(buscarProdutos({ pagina: 1, limite: 10 }));
  }, [dispatch]);

  const carregarMais = useCallback(() => {
    if (paginacao && paginacao.pagina < paginacao.totalPaginas && !carregandoMais) {
      dispatch(buscarProdutos({ pagina: paginacao.pagina + 1, limite: 10 }));
    }
  }, [dispatch, paginacao, carregandoMais]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          carregarMais();
        }
      },
      { threshold: 0.1 }
    );

    if (carregarMaisRef.current) {
      observerRef.current.observe(carregarMaisRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [carregarMais]);

  const handleAdicionarAoCarrinho = (produto: IProduto, quantidade: number) => {
    setCarrinho((anterior) => {
      const itemExistente = anterior.find((item) => item.produto.id === produto.id);
      if (itemExistente) {
        return anterior.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      }
      return [...anterior, { produto, quantidade }];
    });
    setEstado('inicial');
    setMensagemErro('');
  };

  const handleAlterarQuantidade = (produtoId: number, novaQuantidade: number) => {
    if (novaQuantidade === 0) {
      setCarrinho((anterior) => anterior.filter((item) => item.produto.id !== produtoId));
    } else {
      setCarrinho((anterior) =>
        anterior.map((item) =>
          item.produto.id === produtoId ? { ...item, quantidade: novaQuantidade } : item
        )
      );
    }
  };

  const handleRemoverDoCarrinho = (produtoId: number) => {
    setCarrinho((anterior) => anterior.filter((item) => item.produto.id !== produtoId));
  };

  const handleAlternarCarrinho = () => {
    setCarrinhoAberto(!carrinhoAberto);
  };

  const handleFinalizar = async () => {
    if (carrinho.length === 0) {
      setShakeSidebar(true);
      setTimeout(() => setShakeSidebar(false), 500);
      return;
    }

    setEstado('processando');

    try {
      const request: ICarrinhoRequest = {
        itens: carrinho.map((item) => ({
          produtoId: item.produto.id,
          quantidade: item.quantidade,
        })),
      };

      const response = await processarCarrinho(request);
      console.log('Checkout realizado com sucesso:', response);
      setEstado('sucesso');
    } catch (error: any) {
      console.error('Erro ao processar checkout:', error);
      setEstado('erro');
      
      if (error.response?.data?.mensagem) {
        setMensagemErro(error.response.data.mensagem);
      } else {
        setMensagemErro('Erro ao processar compra. Tente novamente.');
      }
    }
  };

  const handleNovaCompra = () => {
    setCarrinho([]);
    setEstado('inicial');
    setMensagemErro('');
  };

  const quantidadeTotalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

  const obterQuantidadeNoCarrinho = (produtoId: number): number => {
    const item = carrinho.find((item) => item.produto.id === produtoId);
    return item ? item.quantidade : 0;
  };

  const produtosFiltrados = produtos;

  if (carregandoProdutos) {
    return (
      <div className="checkout">
        <Cabecalho
          aoAlternarCarrinho={handleAlternarCarrinho}
          carrinhoAberto={carrinhoAberto}
          quantidadeItens={quantidadeTotalItens}
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
    <>
      <div className="checkout">
        <Cabecalho
          aoAlternarCarrinho={handleAlternarCarrinho}
          carrinhoAberto={carrinhoAberto}
          quantidadeItens={quantidadeTotalItens}
        />

        <div className="checkout__conteudo">
          <ListaProdutos
            produtos={produtosFiltrados}
            aoAdicionarAoCarrinho={handleAdicionarAoCarrinho}
            obterQuantidadeNoCarrinho={obterQuantidadeNoCarrinho}
          />
          {paginacao && paginacao.pagina < paginacao.totalPaginas && (
            <div ref={carregarMaisRef} className="checkout__carregar-mais">
              {carregandoMais && <p>Carregando mais produtos...</p>}
            </div>
          )}
        </div>
      </div>

      {createPortal(
        <>
          <div 
            className={`checkout__overlay ${carrinhoAberto ? 'checkout__overlay--visivel' : ''}`}
            onClick={handleAlternarCarrinho}
          />

          <div className={`checkout__sidebar ${carrinhoAberto ? 'checkout__sidebar--aberto' : ''}`}>
            <SidebarCheckout
              carrinho={carrinho}
              aoAlterarQuantidade={handleAlterarQuantidade}
              aoRemoverDoCarrinho={handleRemoverDoCarrinho}
              aoFinalizar={handleFinalizar}
              aoNovaCompra={handleNovaCompra}
              processando={estado === 'processando'}
              estado={estado}
              mensagemErro={mensagemErro}
              shake={shakeSidebar}
              aoFechar={handleAlternarCarrinho}
            />
          </div>
        </>,
        document.body
      )}
    </>
  );
}
