import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removerNotificacao } from '../../store/notificacaoSlice';
import { NotificacaoToast } from '../molecules/NotificacaoToast';
import './ContainerNotificacoes.css';

export function ContainerNotificacoes() {
  const dispatch = useAppDispatch();
  const notificacoes = useAppSelector((state) => state.notificacoes.notificacoes);

  useEffect(() => {
    notificacoes.forEach((notificacao) => {
      const duracao = notificacao.duracao || 5000;
      const timer = setTimeout(() => {
        dispatch(removerNotificacao(notificacao.id));
      }, duracao);

      return () => clearTimeout(timer);
    });
  }, [notificacoes, dispatch]);

  return (
    <div className="container-notificacoes">
      {notificacoes.map((notificacao) => (
        <NotificacaoToast
          key={notificacao.id}
          mensagem={notificacao.mensagem}
          tipo={notificacao.tipo}
          onClose={() => dispatch(removerNotificacao(notificacao.id))}
        />
      ))}
    </div>
  );
}
